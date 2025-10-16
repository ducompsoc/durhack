"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import * as React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@durhack/web-components/ui/form"
import { Input } from "@durhack/web-components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectValueClipper,
} from "@durhack/web-components/ui/select"

import { FormSkeleton } from "@/components/dashboard/form-skeleton"
import { FormSubmitButton } from "@/components/dashboard/form-submit-button"
import type { Application } from "@/hooks/use-application"
import { useApplicationContext } from "@/hooks/use-application-context"
import { isLoaded } from "@/lib/is-loaded"
import { updateApplication } from "@/lib/update-application"

type TravelDetailsFormFields = {
  travelOrigin: string
}
const TravelDetailsFormSchema = z.object({
  travelOrigin: z.enum(["prefer-not-to-answer", "Durham", "elsewhere in the UK", "abroad"]),
})
/**
 * This component accepts <code>application</code> via props, rather than via
 * <code>useApplicationContext</code>, because it requires the application to already be loaded before being rendered.
 */
function TravelDetailsForm({ application }: { application: Application }) {
  const router = useRouter()
  const { mutateApplication } = useApplicationContext()

  const form = useForm<TravelDetailsFormFields, unknown, z.infer<typeof TravelDetailsFormSchema>>({
    resolver: zodResolver(TravelDetailsFormSchema),
  })
  async function onSubmit(values: z.infer<typeof TravelDetailsFormSchema>): Promise<void> {
    await updateApplication("travel", values)
    await mutateApplication({ ...application, ...values })
    //if (application.travelOrigin == null) router.push("/dashboard/cv")
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="lg:columns-2">
          <div className="mb-4">
            <FormField
              control={form.control}
              name="travelOrigin"
              render={({ field: { onChange, value, ref, ...field } }) => (
                <FormItem>
                  <FormLabel>Where will you be travelling from</FormLabel>
                  <div className="flex">
                    <Select onValueChange={onChange} value={value} {...field}>
                      <FormControl>
                        <SelectTrigger ref={ref}>
                          <SelectValueClipper>
                            <SelectValue />
                          </SelectValueClipper>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="prefer-not-to-answer">Prefer Not To Say</SelectItem>
                        <SelectItem value="less-than-5-miles">Durham</SelectItem>
                        <SelectItem value="5-to-20-miles">&lt;20 miles (e.g. Newcastle)</SelectItem>
                        <SelectItem value="20-to-60-miles">20-60 miles (e.g. Middlesbrough)</SelectItem>
                        <SelectItem value="60-to-150-miles">60-150 miles (e.g. Lancaster)</SelectItem>
                        <SelectItem value="more-than-150-miles">&ge;150 miles (e.g. Oxford, London)</SelectItem>
                        <SelectItem value="abroad">Abroad</SelectItem>
                      </SelectContent>
                    </Select>
                    {value === "elsewhere-in-the-uk" && (
                      <Input className="ml-4" placeholder="enter a UK city/town..." />
                    )}
                    {value === "prefer-not-to-answer" && (
                      <p className="ml-4 text-sm text-red-600">
                        You will not be able to apply for travel reimbursement.
                      </p>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="mt-16 flex justify-center">
          <FormSubmitButton type="submit">Save Progress</FormSubmitButton>
        </div>
      </form>
    </Form>
  )
}
function TravelDetailsFormSkeleton() {
  return <FormSkeleton rows={1} className="mt-2" />
}

export default function TravelDetailsFormPage() {
  const { application, applicationIsLoading } = useApplicationContext()

  if (!isLoaded(application, applicationIsLoading)) {
    return <TravelDetailsFormSkeleton />
  }

  return <TravelDetailsForm application={application} />
}
