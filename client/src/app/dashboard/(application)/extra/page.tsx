"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import * as React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@durhack/web-components/ui/form"
import { Textarea } from "@durhack/web-components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectValueClipper } from "@durhack/web-components/ui/select"
import { MultiSelect } from "@durhack/web-components/ui/multi-select"

import { FormSkeleton } from "@/components/dashboard/form-skeleton"
import { FormSubmitButton } from "@/components/dashboard/form-submit-button";
import { useApplicationContext } from "@/hooks/use-application-context"
import type { Application } from "@/hooks/use-application"
import { updateApplication } from "@/lib/update-application"
import { isLoaded } from "@/lib/is-loaded"

type ExtraDetailsFormFields = {
  tShirtSize: string
  hackathonExperience: string
  dietaryRequirements: string[]
  accessRequirements: string
}

const extraDetailsFormSchema = z.object({
  tShirtSize: z.enum(["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "prefer-not-to-answer"], { message: "Please select a t-shirt size." }),
  hackathonExperience: z.enum(["zero", "up-to-two", "three-to-seven", "eight-or-more"], { message: "Please provide your hackathon experience." }),
  dietaryRequirements: z.array(z.enum([
    "vegan",
    "vegetarian",
    "pescatarian",
    "halal",
    "kosher",
    "gluten-free",
    "dairy-free",
    "nut-allergy",
  ]))
    .refine((list) => {
      const mutuallyExclusivePreferences = list.filter((item) => item === "vegan" || item === "vegetarian" || item === "pescatarian")
      return mutuallyExclusivePreferences.length <= 1
    }, "Please select at most one of 'vegan', 'vegetarian', 'pescatarian'."),
  accessRequirements: z.string().trim()
})

/**
 * This component accepts <code>application</code> via props, rather than via
 * <code>useApplicationContext</code>, because it requires the application to already be loaded before being rendered.
 */
function ExtraDetailsForm({ application }: { application: Application }) {
  const router = useRouter()
  const { mutateApplication } = useApplicationContext()

  const form = useForm<ExtraDetailsFormFields, unknown, z.infer<typeof extraDetailsFormSchema>>({
    resolver: zodResolver(extraDetailsFormSchema),
    defaultValues: {
      tShirtSize: application.tShirtSize ?? "",
      hackathonExperience: application.hackathonExperience ?? "",
      dietaryRequirements: application.dietaryRequirements ?? [],
      accessRequirements: application.accessRequirements ?? "",
    }
  })

  async function onSubmit(values: z.infer<typeof extraDetailsFormSchema>): Promise<void> {
    await updateApplication("extra", values)
    await mutateApplication({ ...application, ...values })
    if (application.tShirtSize == null) router.push("/dashboard/education")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-4">
          <FormField
            control={form.control}
            name="tShirtSize"
            render={({field: {onChange, ref, ...field}}) => (
              <FormItem>
                <FormLabel>T-Shirt Size</FormLabel>
                <FormDescription>
                  We need this to be able to order t-shirts in appropriate sizes.
                  If you respond 'prefer not to say', we can't guarantee a shirt in your size for you.
                </FormDescription>
                <Select onValueChange={onChange} {...field}>
                  <FormControl>
                    <SelectTrigger ref={ref}>
                      <SelectValueClipper>
                        <SelectValue placeholder="Select t-shirt size..."/>
                      </SelectValueClipper>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="prefer-not-to-answer">Prefer not to say</SelectItem>
                    <SelectItem value="xs">Extra Small</SelectItem>
                    <SelectItem value="sm">Small</SelectItem>
                    <SelectItem value="md">Medium</SelectItem>
                    <SelectItem value="lg">Large</SelectItem>
                    <SelectItem value="xl">Extra Large</SelectItem>
                    <SelectItem value="2xl">2 Extra Large</SelectItem>
                    <SelectItem value="3xl">3 Extra Large</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage/>
              </FormItem>
            )}
          />
        </div>

        <div className="mb-4">
          <FormField
            control={form.control}
            name="hackathonExperience"
            render={({field: {onChange, ref, ...field}}) => (
              <FormItem>
                <FormLabel>Hackathon Experience</FormLabel>
                <Select onValueChange={onChange} {...field}>
                  <FormControl>
                    <SelectTrigger ref={ref}>
                      <SelectValueClipper>
                        <SelectValue placeholder="Select..."/>
                      </SelectValueClipper>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="zero">Hacka-novice: Attended no hackathons</SelectItem>
                    <SelectItem value="up-to-two">Hack-tastic Tourist: Attended 1-2 hackathons</SelectItem>
                    <SelectItem value="three-to-seven">Hack Wizard: Attended 3-7 hackathons</SelectItem>
                    <SelectItem value="eight-or-more">Hackathon Guru: Attended 8+ hackathons</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage/>
              </FormItem>
            )}
          />
        </div>

        <div className="mb-4">
          <FormField
            control={form.control}
            name="dietaryRequirements"
            render={({field}) => (
              <FormItem>
                <FormLabel>Dietary Requirements</FormLabel>
                <FormDescription>
                  If your requirement is not listed, please identify it clearly in your response
                  to the following query regarding 'access requirements'.
                </FormDescription>
                <FormControl>
                  <MultiSelect
                    {...field}
                    options={[
                      { label: "Vegan", value: "vegan" },
                      { label: "Vegetarian", value: "vegetarian" },
                      { label: "Pescatarian", value: "pescatarian" },
                      { label: "Halal", value: "halal" },
                      { label: "Kosher", value: "kosher" },
                      { label: "Gluten Free", value: "gluten-free" },
                      { label: "Dairy Free", value: "dairy-free" },
                      { label: "Nut Allergy", value: "nut-allergy" },
                    ]}
                    hidePlaceholderWhenSelected
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
        </div>

        <div className="mb-4">
          <FormField
            control={form.control}
            name="accessRequirements"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Access Requirements</FormLabel>
                <FormDescription>Is there anything else we need to know to make sure you're comfortable at DurHack?</FormDescription>
                <FormControl>
                  <Textarea className="min-h-[150px]" placeholder="Enter... (Please leave blank if you have no specific requests)" {...field} />
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

function ExtraDetailsFormSkeleton() {
  return <FormSkeleton rows={4} className="mt-2"/>
}

export default function ExtraDetailsPage() {
  const {application, applicationIsLoading} = useApplicationContext()

  if (!isLoaded(application, applicationIsLoading)) {
    return <ExtraDetailsFormSkeleton/>
  }

  return <ExtraDetailsForm application={application}/>
}
