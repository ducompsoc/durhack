"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import * as React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod/v4"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@durhack/web-components/ui/form"
import { Input } from "@durhack/web-components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectValueViewport,
} from "@durhack/web-components/ui/select"

import {travelOriginOptions, travelOriginSchema} from "@durhack/durhack-common/input/travel-origin"

import { FormSkeleton } from "@/components/dashboard/form-skeleton"
import { FormSubmitButton } from "@/components/dashboard/form-submit-button"
import type { Application } from "@/hooks/use-application"
import { useApplicationContext } from "@/hooks/use-application-context"
import { isLoaded } from "@/lib/is-loaded"
import { updateApplication } from "@/lib/update-application"

type TravelDetailsFormFields = {
  travelOrigin: string
}
const travelDetailsFormSchema = z.object({
  travelOrigin: travelOriginSchema,
})
/**
 * This component accepts <code>application</code> via props, rather than via
 * <code>useApplicationContext</code>, because it requires the application to already be loaded before being rendered.
 */
function TravelDetailsForm({ application }: { application: Application }) {
  const router = useRouter()
  const { mutateApplication } = useApplicationContext()

  const form = useForm<TravelDetailsFormFields, unknown, z.infer<typeof travelDetailsFormSchema>>({
    resolver: zodResolver<TravelDetailsFormFields, unknown, z.infer<typeof travelDetailsFormSchema>>(travelDetailsFormSchema),
  })
  async function onSubmit(values: z.infer<typeof travelDetailsFormSchema>): Promise<void> {
    await updateApplication("travel", values)
    await mutateApplication({ ...application, ...values })
    if (application.travelOrigin == null) router.push("/dashboard/application/submit")
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-4">
          <FormField
            control={form.control}
            name="travelOrigin"
            render={({ field: { onChange, value, ref, ...field } }) => (
              <FormItem>
                <FormLabel>Travel Origin</FormLabel>
                <FormDescription>Where will you be travelling from?</FormDescription>
                <Select onValueChange={onChange} value={value} {...field}>
                  <FormControl>
                    <SelectTrigger ref={ref}>
                      <SelectValueViewport>
                        <SelectValue />
                      </SelectValueViewport>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {travelOriginOptions.map((option) => <SelectItem value={option.value}>{option.label}</SelectItem>)}
                  </SelectContent>
                </Select>
                {value === "prefer-not-to-answer" && (
                  <p className="ml-4 text-sm text-orange-300">
                    Warning: selecting this option disqualifies you from our travel reimbursement scheme.
                  </p>
                )}

                <FormMessage />
              </FormItem>
            )}
          />
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
