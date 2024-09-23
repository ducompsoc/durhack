"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import * as React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@durhack/web-components/ui/button"
import {
  FileUpload,
  FileUploadDropzoneBasket,
  FileUploadDropzoneInput,
  FileUploadDropzoneRoot,
  FileUploadErrorMessage,
  FileUploadFileList,
} from "@durhack/web-components/ui/file-upload"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@durhack/web-components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@durhack/web-components/ui/select"

import { Skeleton } from "@/components/dashboard/skeleton"
import { useApplicationContext } from "@/hooks/use-application-context"
import { updateApplication } from "@/lib/update-application"

type CvFormFields = {
  cvUploadChoice: "indeterminate" | "upload" | "remind" | "noUpload"
  cvFiles: File[]
}

const cvFormSchema = z.discriminatedUnion("cvUploadChoice", [
  z.object({
    cvUploadChoice: z.literal("remind"),
  }),
  z.object({
    cvUploadChoice: z.literal("noUpload"),
  }),
  z.object({
    cvUploadChoice: z.literal("upload"),
    cvFiles: z.array(
      z.custom<File>((value) => value instanceof File, "How on earth did you manage this?")
        .refine((value) => value.size <= 10485760, "Maximum file size is 10MB!")
        .refine((value) => {
          if (!([
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/msword",
          ].includes(value.type))) return false

          const split = value.name.split(".")
          const extension = split[split.length - 1]
          return ["doc", "docx", "pdf"].includes(extension)
        }, "Please upload a PDF or Word doc!")
    ).length(1, "Please provide exactly one CV file!"),
  })
])

export default function CvPage() {
  const router = useRouter()
  const { application, applicationIsLoading } = useApplicationContext()
  const [showForm, setShowForm] = React.useState(false)

  React.useEffect(() => {
    if (applicationIsLoading || !application) return
    form.reset({
      cvUploadChoice: application.cvUploadChoice,
    })
    setShowForm(application.cvUploadChoice === "upload")
  }, [applicationIsLoading, application])

  const form = useForm<CvFormFields, unknown, z.infer<typeof cvFormSchema>>({
    resolver: zodResolver(cvFormSchema),
    defaultValues: {
      cvUploadChoice: "indeterminate",
      cvFiles: [],
    },
  })

  async function onSubmit(values: z.infer<typeof cvFormSchema>): Promise<void> {
    const formData = new FormData()
    formData.append("cvUploadChoice", values.cvUploadChoice)

    if (values.cvUploadChoice === "upload") {
      formData.append("cvFile", values.cvFiles[0])
    }

    try {
      await updateApplication("cv", formData)
      router.push("/dashboard/submit")
    } catch {
      form.setError("cvUploadChoice", { message: "CV file was rejected (try uploading a PDF)!" })
    }
  }

  function getForm() {
    return (
      <>
        <div className="mb-4">
          <FormField
            control={form.control}
            name="cvUploadChoice"
            render={({ field: { onChange, ...field } }) => (
              <FormItem>
                <FormLabel>Would you like to submit a CV (shared with our sponsors)?</FormLabel>
                <Select
                  onValueChange={(value) => { onChange(value); setShowForm(value === "upload") }}
                  {...field}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue className="" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="indeterminate" hidden>Choose...</SelectItem>
                    <SelectItem value="upload">Yes</SelectItem>
                    <SelectItem value="remind">No (remind me later)</SelectItem>
                    <SelectItem value="noUpload">No (don't remind me later)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mb-4">
          {showForm && (
            <FormField
              control={form.control}
              name="cvFiles"
              render={({ field: { value, ...field } }) => (
                <FormItem>
                  <FileUpload
                    multiDropBehaviour="replace"
                    dropzoneOptions={{
                      maxFiles: 1,
                      maxSize: 10485760,
                      accept: {
                        "application/pdf": [".pdf"],
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
                        "application/msword": [".doc"],
                      }
                    }}
                    files={value}
                    {...field}
                  >
                    <FileUploadDropzoneRoot>
                      <FileUploadDropzoneBasket />
                      <FileUploadDropzoneInput />
                    </FileUploadDropzoneRoot>
                    <FileUploadErrorMessage />
                    <FileUploadFileList />
                  </FileUpload>
                </FormItem>
              )}
            />
          )}
        </div>
        <div className="mt-16 flex justify-center">
          <Button
            variant="default"
            className="py-2 px-4 text-center rounded-sm text-white bg-white bg-opacity-15 hover:bg-green-500 hover:cursor-pointer hover:shadow-[0_0px_50px_0px_rgba(34,197,94,0.8)] transition-all"
            type="submit"
          >
            Save Progress
          </Button>
        </div>
      </>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h2 className="text-2xl">CV Submission</h2>
        {applicationIsLoading ? <Skeleton rows={1} className="mt-4" /> : getForm()}
      </form>
    </Form>
  )
}
