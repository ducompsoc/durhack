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

type travelReimbursmentFormFields = {
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

const travelReimbursmentFormSchema = z.object({
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
function travelReimbursmentForm({ application }: { application: Application }) {
  const router = useRouter()
  const { mutateApplication } = useApplicationContext()

  const form = useForm<travelReimbursmentFormFields, unknown, z.infer<typeof travelReimbursmentFormSchema>>({
    resolver: zodResolver(travelReimbursmentFormSchema),
    defaultValues: {
      firstNames: application.firstNames ?? "",
      lastNames: application.lastNames ?? "",
    },
  })

  async function onSubmit(values: z.infer<typeof travelReimbursmentFormSchema>): Promise<void> {
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
        </div>
        <div className="lg:columns-2">
          <div className="mb-4">
            <FormField
              control={form.control}
              name="preferredNames"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred name(s)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter preferred name(s)..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mb-4">
            <FormField
              control={form.control}
              name="pronouns"
              render={({ field: { onChange, value, ref, ...field } }) => (
                <FormItem>
                  <FormLabel>Pronouns</FormLabel>
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
                        <SelectItem value="she/her">She/Her</SelectItem>
                        <SelectItem value="he/him">He/Him</SelectItem>
                        <SelectItem value="they/them">They/Them</SelectItem>
                        <SelectItem value="xe/xem">Xe/Xem</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {value === "other" && <Input className="ml-4" placeholder="Pronouns..." />}
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
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age as of 1st November 2025</FormLabel>
                <FormControl>
                  <Input placeholder="Enter age..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mb-4">
          <FormField
            control={form.control}
            name="gender"
            render={({ field: { onChange, value, ref, ...field } }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={onChange} value={value} {...field}>
                  <FormControl>
                    <SelectTrigger ref={ref}>
                      <SelectValueClipper>
                        <SelectValue placeholder="Select gender identity..." />
                      </SelectValueClipper>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="prefer-not-to-answer">Prefer Not To Say</SelectItem>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="non-binary">Non-binary</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mb-4">
          <FormField
            control={form.control}
            name="ethnicity"
            render={({ field: { onChange, value, ref, ...field } }) => (
              <FormItem>
                <FormLabel>Race/Ethnicity</FormLabel>
                <Select onValueChange={onChange} value={value} {...field}>
                  <FormControl>
                    <SelectTrigger ref={ref}>
                      <SelectValueClipper>
                        <SelectValue placeholder="Select race/ethnicity..." />
                      </SelectValueClipper>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="prefer-not-to-answer">Prefer Not To Say</SelectItem>
                    <SelectItem value="white">White / Caucasian</SelectItem>
                    <SelectItem value="american">American Indian or Alaskan Native</SelectItem>
                    <SelectItem value="asian">Asian / Pacific Islander</SelectItem>
                    <SelectItem value="black">Black or African American</SelectItem>
                    <SelectItem value="hispanic">Hispanic</SelectItem>
                    <SelectItem value="other">Multiple ethnicity / Other</SelectItem>
                  </SelectContent>
                </Select>
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

function travelReimbursmentFormSkeleton() {
  return <FormSkeleton rows={3} className="mt-2" />
}

export default function PersonalPage() {
  const { application, applicationIsLoading } = useApplicationContext()

  if (!isLoaded(application, applicationIsLoading)) {
    return <travelReimbursmentFormSkeleton />
  }

  return <travelReimbursmentFormSkeleton application={application} />
}
