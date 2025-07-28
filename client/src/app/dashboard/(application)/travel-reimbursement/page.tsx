"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import * as React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { MultiSelect } from "@durhack/web-components/ui/multi-select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@durhack/web-components/ui/form"
import { Input } from "@durhack/web-components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectValueClipper,
} from "@durhack/web-components/ui/select"
import {
  FileUpload,
  FileUploadDropzoneBasket,
  FileUploadDropzoneInput,
  FileUploadDropzoneRoot,
  FileUploadErrorMessage,
  FileUploadFileList,
} from "@durhack/web-components/ui/file-upload"


import { FormSkeleton } from "@/components/dashboard/form-skeleton"
import { FormSubmitButton } from "@/components/dashboard/form-submit-button"
import type { Application } from "@/hooks/use-application"
import { useApplicationContext } from "@/hooks/use-application-context"
import { isLoaded } from "@/lib/is-loaded"
import { updateApplication } from "@/lib/update-application"

type TravelReimbursementFormFields = {

  methodOfTravel: string
  receiptFiles: File[]
}

const TravelReimbursementFormSchema = z.object({
  methodoftravel: z
    .array(
  z.enum(["train", "bus", "private road vehicle", "international transport", "other"])
    ),
  receiptFiles: z
        .array(
          z
            .custom<File>((value) => value instanceof File)
            .refine((value) => value.size <= 10485760, "Maximum file size is 10MB!")
            .refine((value) => {
              if (
                ![
                  "application/pdf",
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                  "application/msword",
                  "application/png",
                  "application/jpg"
                ].includes(value.type)
              )
                return false

              const split = value.name.split(".")
              const extension = split[split.length - 1]
              return ["doc", "docx", "pdf","png", "jpg"].includes(extension)
            }, "Please upload a PDF or Word doc or a PNG or JPG image!"),
        )
        
    })


/**
 * This component accepts <code>application</code> via props, rather than via
 * <code>useApplicationContext</code>, because it requires the application to already be loaded before being rendered.
 */
function TravelReimbursementForm({ application }: { application: Application }) {
  const router = useRouter()
  const { mutateApplication } = useApplicationContext()

  const form = useForm<TravelReimbursementFormFields, unknown, z.infer<typeof TravelReimbursementFormSchema>>({
    resolver: zodResolver(TravelReimbursementFormSchema),
  })

  async function onSubmit(values: z.infer<typeof TravelReimbursementFormSchema>): Promise<void> {
    await updateApplication("travelReimbursement", values)
    await mutateApplication({ ...application, ...values })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="lg:columns-1">
         <div className="mb-4">
          <FormField
            control={form.control}
            name="methodOfTravel"
            render={({ field: { onChange, value, ref, ...field } }) => (
              <FormItem>
                <FormLabel>Method of travel</FormLabel>
                <div className="flex">
                    <FormControl>
                      <MultiSelect
                        {...field}
                        options={[
                          { label: "train", value: "train" },
                          { label: "bus", value: "bus" },
                          { label: "private road vehicle", value: "private road vehicle" },
                          { label: "international transport", value: "international transport" },
                          { label: "other", value: "other" }
                        ]}
                        hidePlaceholderWhenSelected
                      />
                    </FormControl>

                  {value === "other" && <Input className="ml-4" placeholder="Method of travel..." />}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        </div>
                    

        <div className="mb-4">
          <FormField
            control={form.control}
            name="receiptFiles"
            render={({ field: { value, ref, ...field } }) => (
              <FormItem>
              <FormLabel>Travel receipts</FormLabel>
              <FormDescription>
                  <p style={{ color: '#dc2626' }}>
                    Only pdf, doc, docs, png and jpg files are accepted.
                  </p>
                </FormDescription>
                <FileUpload
                  multiDropBehaviour="replace"
                  dropzoneOptions={{
                    maxFiles: 5,
                    maxSize: 10485760,
                    accept: {
                      "application/pdf": [".pdf"],
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
                      "application/msword": [".doc"],
                      "application/png": [".png"],
                      "application/jpg": [".jpg"]
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
          <FormSubmitButton type="submit">Submit travel reimbursement request</FormSubmitButton>
        </div>
      </form>
    </Form>
  )
}

function TravelReimbursementFormSkeleton() {
  return <FormSkeleton rows={2} className="mt-2" />
}

export default function TravelReimbursementFormPage() {
  const { application, applicationIsLoading } = useApplicationContext()

  if (!isLoaded(application, applicationIsLoading)) {
    return <TravelReimbursementFormSkeleton />  
  }

  return <TravelReimbursementForm application={application} />
}
