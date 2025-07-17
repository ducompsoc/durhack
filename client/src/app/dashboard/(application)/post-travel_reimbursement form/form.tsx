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

type travelReimbursementFormFields = {
  firstNames: string
  lastNames: string
  email: string
  phoneNumber: string
  travelFromCity: string
  travelDate1: string
  travelDate2: string
  transport: string
  returnJourney: boolean
}

const travelReimbursementFormSchema = z.object({
  firstNames: z.string().trim().min(1, { message: "Please provide your first name(s)" }).max(256),
  lastNames: z.string().trim().min(1, { message: "Please provide your last name(s)" }).max(256),
  email: z.string().trim().min(1,{ message: "Please provide your email address" }).max(256),
  phoneNumber:z.string().trim().min(1,{ message: "Please provide your phone number" }).max(15),
  travelFromCity: z.string().trim().min(1, { message: "Please provide the city you are travelling from" }).max(256),
  travelDate1: z.string().trim().min(1, { message: "Please provide the date you are travelling to Durham in the format DD/MM/YYYY" }).max(256),
  travelDate2: z.string().trim().optional(),
  transport: z.enum(["train", "bus", "car", "other"]),
  returnJourney: z.boolean({required_error: "Please indicate if you require a return journey",}),
})

/**
 * This component accepts <code>application</code> via props, rather than via
 * <code>useApplicationContext</code>, because it requires the application to already be loaded before being rendered.
 */
function travelReimbursementForm({ application }: { application: Application }) {
  const router = useRouter()
  const { mutateApplication } = useApplicationContext()

  const form = useForm<travelReimbursementFormFields, unknown, z.infer<typeof travelReimbursementFormSchema>>({
    resolver: zodResolver(travelReimbursementFormSchema),
    defaultValues: {
      firstNames: application.firstNames ?? "",
      lastNames: application.lastNames ?? "",
    },
  })

  async function onSubmit(values: z.infer<typeof travelReimbursementFormSchema>): Promise<void> {
    await updateApplication("personal", values)
    await mutateApplication({ ...application, ...values })
    if (application.age == null) router.push("/dashboard/contact")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="lg:columns-2">
          <div className="mb-4">
            <FormField
              control={form.control}
              name="firstNames"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name(s)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter first name(s)..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mb-4">
            <FormField
              control={form.control}
              name="lastNames"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name(s)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter last name(s)..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mb-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter email address..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mb-4">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter phone number..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mb-4">
            <FormField
              control={form.control}
              name="travelFromCity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Travel From City</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter the city you are travelling from..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="mt-16 flex justify-center">
          <FormSubmitButton type="submit">Submit travel reimbursement request</FormSubmitButton>
        </div>
      </form>
    </Form>
  )
}

function TravelReimbursementFormSkeleton() {
  return <FormSkeleton rows={3} className="mt-2" />
}

export default function travelReimbursementForm() {
  const { application, applicationIsLoading } = useApplicationContext()

  if (!isLoaded(application, applicationIsLoading)) {
    return <TravelReimbursementFormSkeleton />  
  }

  return <TravelReimbursementForm application={application} />
}
