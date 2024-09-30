"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import * as React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@durhack/web-components/ui/form"
import { Input } from "@durhack/web-components/ui/input"
import { PhoneInput } from "@durhack/web-components/ui/phone-number-input"

import "@/lib/zod-phone-extension"
import { FormSkeleton } from "@/components/dashboard/form-skeleton"
import { useApplicationContext } from "@/hooks/use-application-context"
import { updateApplication } from "@/lib/update-application"
import type { Application } from "@/hooks/use-application"
import { FormSubmitButton } from "@/components/dashboard/form-submit-button"
import { isLoaded } from "@/lib/is-loaded";

type ContactFormFields = {
  phone: string
  email: string
}

const contactFormSchema = z.object({
  phone: z.string().phone(),
})

/**
 * This component accepts <code>application</code> via props, rather than via
 * <code>useApplicationContext</code>, because it requires the application to already be loaded before being rendered.
 */
function ContactForm({ application }: { application: Application }) {
  const router = useRouter()
  const { mutateApplication } = useApplicationContext()

  const form = useForm<ContactFormFields, unknown, z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      phone: application.phone ?? "",
      email: application.email ?? "",
    },
  })

  async function onSubmit(values: z.infer<typeof contactFormSchema>): Promise<void> {
    await updateApplication("contact", values)
    await mutateApplication({ ...application, ...values })
    if (application.phone == null) router.push("/dashboard/extra")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-4">
          <FormField
            control={form.control}
            name="phone"
            render={({field}) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <PhoneInput
                    countrySelectProps={{prominentCountries: new Set(["GB"])}}
                    placeholder="Enter phone number..."
                    defaultCountry="GB"
                    {...field}
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
        </div>
        <div className="mb-4">
          <FormField
            disabled
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
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

function ContactFormSkeleton() {
  return <FormSkeleton rows={2} className="mt-2" />
}

export default function ContactPage() {
  const { application, applicationIsLoading } = useApplicationContext()

  if (!isLoaded(application, applicationIsLoading)) {
    return <ContactFormSkeleton />
  }

  return <ContactForm application={application} />
}
