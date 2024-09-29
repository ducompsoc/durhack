"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import * as React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

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

import { FormSkeleton } from "@/components/dashboard/form-skeleton"
import { FormSubmitButton } from "@/components/dashboard/form-submit-button";
import { Application } from "@/hooks/use-application"
import { useApplicationContext } from "@/hooks/use-application-context"
import { updateApplication } from "@/lib/update-application"
import { isLoaded } from "@/lib/is-loaded";

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
    cvFiles: z
      .array(
        z
          .custom<File>((value) => value instanceof File, "How on earth did you manage this?")
          .refine((value) => value.size <= 10485760, "Maximum file size is 10MB!")
          .refine((value) => {
            if (
              ![
                "application/pdf",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "application/msword",
              ].includes(value.type)
            )
              return false

            const split = value.name.split(".")
            const extension = split[split.length - 1]
            return ["doc", "docx", "pdf"].includes(extension)
          }, "Please upload a PDF or Word doc!"),
      )
      .length(1, "Please provide exactly one CV file!"),
  }),
])

/**
 * This component accepts <code>application</code> via props, rather than via
 * <code>useApplicationContext</code>, because it requires the application to already be loaded before being rendered.
 */
function CvForm({ application }: { application: Application }) {
  const router = useRouter()
  const { mutateApplication } = useApplicationContext()
  const [showForm, setShowForm] = React.useState<boolean>(() => application?.cvUploadChoice === "upload")

  const form = useForm<CvFormFields, unknown, z.infer<typeof cvFormSchema>>({
    resolver: zodResolver(cvFormSchema),
    defaultValues: {
      cvUploadChoice: application.cvUploadChoice ?? "indeterminate",
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
    } catch {
      // todo: what about network errors? this handles too broadly
      form.setError("cvUploadChoice", { message: "CV file was rejected (try uploading a PDF)!" })
      return
    }

    await mutateApplication({ ...application, cvUploadChoice: values.cvUploadChoice })
    if (application.cvUploadChoice === "indeterminate") router.push("/dashboard/submit")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-4">
          <FormField
            control={form.control}
            name="cvUploadChoice"
            render={({field: {onChange, ref, ...field}}) => (
              <FormItem>
                <FormLabel>Would you like to submit a CV (shared with our sponsors)?</FormLabel>
                <Select
                  onValueChange={function (value: string) {
                    console.log(onChange)
                    console.log(value)
                    onChange(value)
                    setShowForm(value === "upload")
                  }}
                  {...field}
                >
                  <FormControl>
                    <SelectTrigger ref={ref}>
                      <SelectValue/>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="indeterminate" hidden>
                      Choose...
                    </SelectItem>
                    <SelectItem value="upload">Yes</SelectItem>
                    <SelectItem value="remind">No (remind me later)</SelectItem>
                    <SelectItem value="noUpload">No (don&apos;t remind me later)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage/>
              </FormItem>
            )}
          />
        </div>
        <div className="mb-4">
          {showForm && (
            <FormField
              control={form.control}
              name="cvFiles"
              render={({field: {value, ...field}}) => (
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
                      },
                    }}
                    files={value}
                    {...field}
                  >
                    <FileUploadDropzoneRoot>
                      <FileUploadDropzoneBasket/>
                      <FileUploadDropzoneInput/>
                    </FileUploadDropzoneRoot>
                    <FileUploadErrorMessage/>
                    <FileUploadFileList/>
                  </FileUpload>
                  <FormMessage/>
                </FormItem>
              )}
            />
          )}
        </div>
        <div className="mt-16 flex justify-center">
          <FormSubmitButton type="submit">Save Progress</FormSubmitButton>
        </div>
      </form>
    </Form>
  )
}

function CvFormSkeleton() {
  return <FormSkeleton rows={1} className="mt-2"/>
}

export default function CvPage() {
  const { application, applicationIsLoading } = useApplicationContext()

  if (!isLoaded(application, applicationIsLoading)) {
    return <CvFormSkeleton />
  }

  return <CvForm application={application} />
}
