"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import * as React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@durhack/web-components/ui/form"
import { Input } from "@durhack/web-components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@durhack/web-components/ui/select"

import { FormSkeleton } from "@/components/dashboard/form-skeleton"
import { FormSubmitButton } from "@/components/dashboard/form-submit-button";
import { useApplicationContext } from "@/hooks/use-application-context"
import type { Application } from "@/hooks/use-application"
import { updateApplication } from "@/lib/update-application"
import { isLoaded } from "@/lib/is-loaded"

type PersonalFormFields = {
  firstNames: string
  lastNames: string
  preferredNames: string
  pronouns: string
  age: string
}

const personalFormSchema = z.object({
  firstNames: z.string().trim().min(1, { message: "Please provide your first name(s)" }).max(256),
  lastNames: z.string().trim().min(1, { message: "Please provide your last name(s)" }).max(256),
  preferredNames: z.string().trim().max(256),
  pronouns: z.enum(["prefer-not-to-answer", "he/him", "she/her", "they/them", "xe/xem", "other"]),
  age: z.coerce
    .number({ invalid_type_error: "Please provide a valid age." })
    .positive("Please provide a valid age.")
    .min(16, { message: "Age must be >= 16" })
    .max(256, { message: "Ain't no way you're that old." })
    .int("Please provide your age rounded down to the nearest integer."),
})

/**
 * This component accepts <code>application</code> via props, rather than via
 * <code>useApplicationContext</code>, because it requires the application to already be loaded before being rendered.
 */
function PersonalForm({ application }: { application: Application }) {
  const router = useRouter()
  const { mutateApplication } = useApplicationContext()

  const form = useForm<PersonalFormFields, unknown, z.infer<typeof personalFormSchema>>({
    resolver: zodResolver(personalFormSchema),
    defaultValues: {
      pronouns: application.pronouns ?? "prefer-not-to-answer",
      firstNames: application.firstNames ?? "",
      lastNames: application.lastNames ?? "",
      preferredNames: application.preferredNames ?? "",
      age: application.age?.toString() ?? "",
    },
  })

  async function onSubmit(values: z.infer<typeof personalFormSchema>): Promise<void> {
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
              render={({field}) => (
                <FormItem>
                  <FormLabel>First name(s)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <div className="mb-4">
            <FormField
              control={form.control}
              name="lastNames"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Last name(s)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage/>
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
              render={({field}) => (
                <FormItem>
                  <FormLabel>Preferred name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <div className="mb-4">
            <FormField
              control={form.control}
              name="pronouns"
              render={({field: { onChange, value, ref, ...field }}) => (
                <FormItem>
                  <FormLabel>Pronouns</FormLabel>
                  <div className="flex">
                    <Select onValueChange={onChange} value={value} {...field}>
                      <FormControl>
                        <SelectTrigger ref={ref}>
                          <SelectValue/>
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
                    {value === "other" && <Input className="ml-4" placeholder="Pronouns..."/>}
                  </div>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="mb-4">
          <FormField
            control={form.control}
            name="age"
            render={({field}) => (
              <FormItem>
                <FormLabel>Age as of 2nd November 2024</FormLabel>
                <FormControl>
                  <Input placeholder="Enter age..." {...field} />
                </FormControl>
                <FormMessage/>
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

function PersonalFormSkeleton() {
  return <FormSkeleton rows={3} className="mt-2"/>
}

export default function PersonalPage() {
  const { application, applicationIsLoading } = useApplicationContext()

  if (!isLoaded(application, applicationIsLoading)) {
    return <PersonalFormSkeleton />
  }

  return <PersonalForm application={application} />
}
