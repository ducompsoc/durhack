"use client"

import type { FileInfo } from "@durhack/durhack-common/types/file-info"
import {
  type FileLike,
  FileUpload,
  FileUploadDropzoneBasket,
  FileUploadDropzoneInput,
  FileUploadDropzoneRoot,
  FileUploadErrorMessage,
  FileUploadFileList,
} from "@durhack/web-components/ui/file-upload"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@durhack/web-components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectValueViewport,
} from "@durhack/web-components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import * as React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod/v4"

import { CvSharingPrivacyPolicies } from "@/components/dashboard/cv-sharing-privacy-policies"
import { FormSkeleton } from "@/components/dashboard/form-skeleton"
import { FormSubmitButton } from "@/components/dashboard/form-submit-button"
import type { Application } from "@/hooks/use-application"
import { useApplicationContext } from "@/hooks/use-application-context"
import { useApplicationCvContext } from "@/hooks/use-application-cv-context"
import { isLoaded } from "@/lib/is-loaded"
import { updateApplication } from "@/lib/update-application"
import { cn } from "@/lib/utils"

type CvFormFields = {
  cvUploadChoice: "indeterminate" | "upload" | "remind" | "no-upload"
  cvFiles?: FileLike[] | undefined
}

const cvFormSchema = z.discriminatedUnion(
  "cvUploadChoice",
  [
    z.object({
      cvUploadChoice: z.literal("remind"),
    }),
    z.object({
      cvUploadChoice: z.literal("no-upload"),
    }),
    z.object({
      cvUploadChoice: z.literal("upload"),
      cvFiles: z
        .array(
          z
            .custom<File>((value) => value instanceof File, { error: () => "How on earth did you manage this?" })
            .refine((value) => value.size <= 10485760, { error: () => "Maximum file size is 10MB!" })
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
            }, { error: () => "Please upload a PDF or Word doc!" }),
        )
        .length(1, "Please provide exactly one CV file!"),
    }),
  ],
  { error: () => ({ message: "Please select an option." }) },
)

/**
 * This component accepts <code>application</code> via props, rather than via
 * <code>useApplicationContext</code>, because it requires the application to already be loaded before being rendered.
 */
function CvForm({ application, cvFileInfo }: { application: Application; cvFileInfo: FileInfo | null }) {
  const router = useRouter()
  const { mutateApplication } = useApplicationContext()
  const [showForm, setShowForm] = React.useState<boolean>(() => application?.cvUploadChoice === "upload")
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null)

  const form = useForm<CvFormFields, unknown, z.infer<typeof cvFormSchema>>({
    resolver: zodResolver<CvFormFields, unknown, z.infer<typeof cvFormSchema>>(cvFormSchema),
    defaultValues: {
      cvUploadChoice: application.cvUploadChoice ?? "indeterminate",
      cvFiles: cvFileInfo == null ? [] : [cvFileInfo],
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
      form.setError("cvUploadChoice", { message: "CV file was rejected (try uploading an A4 PDF)!" })
      return
    }
    setSuccessMessage("CV saved!")

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
            render={({ field: { onChange, ref, ...field } }) => (
              <FormItem>
                <FormLabel>Would you like to submit your CV?</FormLabel>
                <FormDescription asChild>
                  <div>
                    <p>
                      By submitting your CV, you agree to provide it to our sponsors, and therefore agree to their
                      privacy policies.
                    </p>
                    <CvSharingPrivacyPolicies className="ml-4" />
                  </div>
                </FormDescription>
                <Select
                  onValueChange={(value: string) => {
                    onChange(value)
                    setShowForm(value === "upload")
                  }}
                  {...field}
                >
                  <FormControl>
                    <SelectTrigger ref={ref}>
                      <SelectValueViewport>
                        <SelectValue />
                      </SelectValueViewport>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="indeterminate" className="hidden" disabled hidden>
                      <span className="text-muted-foreground">Choose...</span>
                    </SelectItem>
                    <SelectItem value="upload">Yes</SelectItem>
                    <SelectItem value="remind">Not right now (remind me later)</SelectItem>
                    <SelectItem value="no-upload">No (don&apos;t remind me later)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className={cn("mb-4", showForm ? "" : "hidden")}>
          <FormField
            control={form.control}
            name="cvFiles"
            render={({ field: { value, ref, ...field } }) => (
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
                    <FileUploadDropzoneBasket />
                    <FileUploadDropzoneInput />
                  </FileUploadDropzoneRoot>
                  <FileUploadErrorMessage />
                  <FileUploadFileList />
                </FileUpload>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-16 flex justify-center">
          <FormSubmitButton type="submit">Save Progress</FormSubmitButton>
        </div>
        {successMessage && (
          <div className="my-6 rounded-md bg-green-100 p-4 text-center text-sm text-green-800">{successMessage}</div>
        )}
      </form>
    </Form>
  )
}

function CvFormSkeleton() {
  return <FormSkeleton rows={1} className="mt-2" />
}

export default function CvPage() {
  const { application, applicationIsLoading } = useApplicationContext()
  const { cvFileInfo, cvFileInfoIsLoading } = useApplicationCvContext()

  if (!isLoaded(application, applicationIsLoading)) {
    return <CvFormSkeleton />
  }
  if (!isLoaded(cvFileInfo, cvFileInfoIsLoading)) {
    return <CvFormSkeleton />
  }

  return <CvForm application={application} cvFileInfo={cvFileInfo} />
}
