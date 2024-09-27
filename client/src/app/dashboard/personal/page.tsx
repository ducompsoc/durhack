"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import * as React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@durhack/web-components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@durhack/web-components/ui/form"
import { Input } from "@durhack/web-components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@durhack/web-components/ui/select"

import { Skeleton } from "@/components/dashboard/skeleton"
import { useApplicationContext } from "@/hooks/use-application-context"
import { updateApplication } from "@/lib/update-application"
import "@/lib/zod-phone-extension"

type PersonalFormFields = {
  firstNames: string
  lastNames: string
  preferredNames: string
  pronouns: string
  age: string
}

const personalFormSchema = z.object({
  firstNames: z.string().trim().min(1).max(256),
  lastNames: z.string().trim().min(1).max(256),
  preferredNames: z.string().trim().min(1).max(256),
  pronouns: z.enum(["pnts", "he/him", "she/her", "they/them", "xe/xem", "other"]),
  age: z.coerce
    .number({ invalid_type_error: "Please provide a valid age." })
    .positive("Please provide a valid age.")
    .min(16, { message: "Age must be >= 16" })
    .max(256, { message: "Ain't no way you're that old." })
    .int("Please provide your age rounded down to the nearest integer."),
})

export default function PersonalPage() {
  const router = useRouter()
  const { application, applicationIsLoading } = useApplicationContext()

  const form = useForm<PersonalFormFields, unknown, z.infer<typeof personalFormSchema>>({
    resolver: zodResolver(personalFormSchema),
    defaultValues: {
      pronouns: "prefer-not-to-say",
      firstNames: "",
      lastNames: "",
      preferredNames: "",
      age: "",
    },
  })

  React.useEffect(() => {
    if (applicationIsLoading || !application) return
    form.reset({
      pronouns: application.pronouns ?? "prefer-not-to-say",
      firstNames: application.firstNames ?? "",
      lastNames: application.lastNames ?? "",
      preferredNames: application.preferredNames ?? "",
      age: application.age?.toString() ?? "",
    })
  }, [applicationIsLoading, application, form])

  async function onSubmit(values: z.infer<typeof personalFormSchema>): Promise<void> {
    await updateApplication("personal", values)
    router.push("/dashboard/contact")
  }

  function getForm() {
    return (
      <>
        <div className="lg:columns-2">
          <div className="mb-4">
            <FormField
              control={form.control}
              name="firstNames"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name(s)</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input {...field} />
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
                  <FormLabel>Preferred name</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
              render={({ field: { onChange, value } }) => (
                <FormItem>
                  <FormLabel>Pronouns</FormLabel>
                  <div className="flex">
                    <Select onValueChange={onChange} value={value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="pnts">Prefer Not To Say</SelectItem>
                        <SelectItem value="she/her">She/Her</SelectItem>
                        <SelectItem value="he/him">He/Him</SelectItem>
                        <SelectItem value="they/them">They/Them</SelectItem>
                        <SelectItem value="xe/xem">Xe/Xem</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {value === "other" && <Input placeholder="Pronouns..." />}
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
                <FormLabel>Age as of 2nd November 2024</FormLabel>
                <FormControl>
                  <Input placeholder="Enter age..." {...field} />
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
        <h2 className="text-2xl">Personal Details</h2>
        {applicationIsLoading ? <Skeleton rows={3} className="mt-4" /> : getForm()}
      </form>
    </Form>
  )
}
