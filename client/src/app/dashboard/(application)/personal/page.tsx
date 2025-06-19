"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@durhack/web-components/ui/form"
import { Input } from "@durhack/web-components/ui/input"
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
import { useForm } from "react-hook-form"
import { z } from "zod"

import { FormSkeleton } from "@/components/dashboard/form-skeleton"
import { FormSubmitButton } from "@/components/dashboard/form-submit-button"
import type { Application } from "@/hooks/use-application"
import { useApplicationContext } from "@/hooks/use-application-context"
import { isLoaded } from "@/lib/is-loaded"
import { updateApplication } from "@/lib/update-application"

type PersonalFormFields = {
  firstNames: string
  lastNames: string
  preferredNames: string
  pronouns: string
  age: string
  gender: string
  ethnicity: string
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
  gender: z.enum(["prefer-not-to-answer", "male", "female", "non-binary", "other"], {
    message: "Please select the gender you identify as",
  }),
  ethnicity: z.enum(["prefer-not-to-answer", "american", "asian", "black", "hispanic", "white", "other"], {
    message: "Please select an ethnicity",
  }),
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
      gender: application.gender?.toString() ?? "",
      ethnicity: application.ethnicity?.toString() ?? "",
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
                          <SelectValueViewport>
                            <SelectValue />
                          </SelectValueViewport>
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
                      <SelectValueViewport>
                        <SelectValue placeholder="Select gender identity..." />
                      </SelectValueViewport>
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
                      <SelectValueViewport>
                        <SelectValue placeholder="Select race/ethnicity..." />
                      </SelectValueViewport>
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

function PersonalFormSkeleton() {
  return <FormSkeleton rows={3} className="mt-2" />
}

export default function PersonalPage() {
  const { application, applicationIsLoading } = useApplicationContext()

  if (!isLoaded(application, applicationIsLoading)) {
    return <PersonalFormSkeleton />
  }

  return <PersonalForm application={application} />
}
