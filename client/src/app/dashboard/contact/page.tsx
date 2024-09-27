"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import * as React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@durhack/web-components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@durhack/web-components/ui/form"
import { Input } from "@durhack/web-components/ui/input"
import { PhoneInput } from "@durhack/web-components/ui/phone-number-input"

import "@/lib/zod-phone-extension"
import { Skeleton } from "@/components/dashboard/skeleton"
import { useApplicationContext } from "@/hooks/use-application-context"
import { updateApplication } from "@/lib/update-application"

type ContactFormFields = {
  phone: string
  email: string
}

const contactFormSchema = z.object({
  phone: z.string().phone(),
})

export default function ContactPage() {
  const router = useRouter()
  const { application, applicationIsLoading } = useApplicationContext()

  const form = useForm<ContactFormFields, unknown, z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      phone: "",
      email: "",
    },
  })

  React.useEffect(() => {
    if (applicationIsLoading || !application) return
    form.reset({
      phone: application.phone ?? "",
      email: application.email ?? "",
    })
  }, [applicationIsLoading, application, form])

  async function onSubmit(values: z.infer<typeof contactFormSchema>): Promise<void> {
    await updateApplication("contact", values)
    router.push("/dashboard/education")
  }

  function getForm() {
    return (
      <>
        <div className="mb-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <PhoneInput
                    countrySelectProps={{ prominentCountries: new Set(["GB"]) }}
                    defaultCountry="GB"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mb-4">
          <FormField
            disabled={true}
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
        <h2 className="text-2xl">Contact Information</h2>
        {applicationIsLoading ? <Skeleton rows={2} className="mt-4" /> : getForm()}
      </form>
    </Form>
  )
}
