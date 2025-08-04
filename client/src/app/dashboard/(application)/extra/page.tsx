"use client"

import { dietaryRequirementOptions, dietaryRequirementSchema } from "@durhack/durhack-common/input/dietary-requirement"
import { pizzaFlavorSchema, pizzaFlavourOptions } from "@durhack/durhack-common/input/pizza-flavor"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@durhack/web-components/ui/form"
import { MultiSelect } from "@durhack/web-components/ui/multi-select"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectValueViewport,
} from "@durhack/web-components/ui/select"
import { Textarea } from "@durhack/web-components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod/v4"
import { FormSkeleton } from "@/components/dashboard/form-skeleton"
import { FormSubmitButton } from "@/components/dashboard/form-submit-button"
import type { Application } from "@/hooks/use-application"
import { useApplicationContext } from "@/hooks/use-application-context"
import { isLoaded } from "@/lib/is-loaded"
import { updateApplication } from "@/lib/update-application"

type ExtraDetailsFormFields = {
  tShirtSize: string
  hackathonExperience: string
  dietaryRequirements: string[]
  pizzaFlavors: string[]
  accessRequirements: string
  midnightSnack: string
}

const extraDetailsFormSchema = z.object({
  tShirtSize: z.enum(["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "prefer-not-to-answer"], {
    message: "Please select a t-shirt size.",
  }),
  hackathonExperience: z.enum(["zero", "up-to-two", "three-to-seven", "eight-or-more"], {
    message: "Please provide your hackathon experience.",
  }),
  dietaryRequirements: z.array(dietaryRequirementSchema).refine((list) => {
    const mutuallyExclusivePreferences = list.filter(
      (item) => item === "vegan" || item === "vegetarian" || item === "pescatarian",
    )
    return mutuallyExclusivePreferences.length <= 1
  }, "Please select at most one of 'vegan', 'vegetarian', 'pescatarian'."),
  midnightSnack: z.enum(["pizza", "alternative", "nothing"], { message: "Please select a midnight snack." }),
  pizzaFlavors: z.array(pizzaFlavorSchema),
  accessRequirements: z.string().trim(),
})

/**
 * This component accepts <code>application</code> via props, rather than via
 * <code>useApplicationContext</code>, because it requires the application to already be loaded before being rendered.
 */
function ExtraDetailsForm({ application }: { application: Application }) {
  const router = useRouter()
  const { mutateApplication } = useApplicationContext()

  const form = useForm<ExtraDetailsFormFields, unknown, z.infer<typeof extraDetailsFormSchema>>({
    resolver: zodResolver<ExtraDetailsFormFields, unknown, z.infer<typeof extraDetailsFormSchema>>(
      extraDetailsFormSchema,
    ),
    defaultValues: {
      tShirtSize: application.tShirtSize ?? "",
      hackathonExperience: application.hackathonExperience ?? "",
      dietaryRequirements: application.dietaryRequirements ?? [],
      accessRequirements: application.accessRequirements ?? "",
      midnightSnack: application.midnightSnack ?? "",
      pizzaFlavors: application.pizzaFlavors ?? [],
    },
  })

  async function onSubmit(values: z.infer<typeof extraDetailsFormSchema>): Promise<void> {
    await updateApplication("extra", values)
    await mutateApplication({ ...application, ...values })
    if (application.tShirtSize == null) router.push("/dashboard/education")
  }

  const [snackChoice, setSnackChoice] = useState<string>(application.midnightSnack ?? "")

  function handleSnackChoice(value: string): void {
    setSnackChoice(value)
    form.setValue("midnightSnack", value)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-4">
          <FormField
            control={form.control}
            name="tShirtSize"
            render={({ field: { onChange, ref, ...field } }) => (
              <FormItem>
                <FormLabel>T-Shirt Size</FormLabel>
                <FormDescription>
                  We need this to be able to order t-shirts in appropriate sizes. If you respond &lsquo;prefer not to
                  say&rsquo;, we can&apos;t guarantee a shirt in your size for you.
                </FormDescription>
                <Select onValueChange={onChange} {...field}>
                  <FormControl>
                    <SelectTrigger ref={ref}>
                      <SelectValueViewport>
                        <SelectValue placeholder="Select t-shirt size..." />
                      </SelectValueViewport>
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
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mb-4">
          <FormField
            control={form.control}
            name="hackathonExperience"
            render={({ field: { onChange, ref, ...field } }) => (
              <FormItem>
                <FormLabel>Hackathon Experience</FormLabel>
                <Select onValueChange={onChange} {...field}>
                  <FormControl>
                    <SelectTrigger ref={ref}>
                      <SelectValueViewport>
                        <SelectValue placeholder="Select..." />
                      </SelectValueViewport>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="zero">Hacka-novice: Attended no hackathons</SelectItem>
                    <SelectItem value="up-to-two">Hack-tastic Tourist: Attended 1-2 hackathons</SelectItem>
                    <SelectItem value="three-to-seven">Hack Wizard: Attended 3-7 hackathons</SelectItem>
                    <SelectItem value="eight-or-more">Hackathon Guru: Attended 8+ hackathons</SelectItem>
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
            name="dietaryRequirements"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dietary Requirements</FormLabel>
                <FormDescription>
                  If any of your requirements are not listed, please include 'Other' in your selection and identify
                  additional requirements clearly in your response to the following query regarding &lsquo;access
                  requirements&rsquo;.
                </FormDescription>
                <FormControl>
                  <MultiSelect {...field} options={dietaryRequirementOptions} hidePlaceholderWhenSelected />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mb-4">
          <FormField
            control={form.control}
            name="midnightSnack"
            render={({ field: { ref, ...field } }) => (
              <FormItem>
                <FormLabel>Midnight Snack (on us)</FormLabel>
                <FormDescription>
                  We normally offer pizza as a midnight snack. If you are not able to have pizza, select "alternative" and we
                  will get in touch with you!
                </FormDescription>
                <Select onValueChange={handleSnackChoice} {...field}>
                  <FormControl>
                    <SelectTrigger ref={ref}>
                      <SelectValueViewport>
                        <SelectValue placeholder="Select..." />
                      </SelectValueViewport>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="pizza">Pizza</SelectItem>
                    <SelectItem value="alternative">Alternative</SelectItem>
                    <SelectItem value="nothing">Nothing</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          {snackChoice === "pizza" && (
            <FormField
              control={form.control}
              name="pizzaFlavors"
              render={({ field }) => (
                <FormItem>
                  <FormDescription>Please choose your preferred pizza toppings/flavours</FormDescription>
                  <FormControl>
                    <MultiSelect {...field} options={pizzaFlavourOptions} hidePlaceholderWhenSelected />
                  </FormControl>
                </FormItem>
              )}
            />
          )}
        </div>

        <div className="mb-4">
          <FormField
            control={form.control}
            name="accessRequirements"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Access Requirements</FormLabel>
                <FormDescription>
                  Is there anything else we need to know to make sure you&apos;re comfortable at DurHack?
                </FormDescription>
                <FormControl>
                  <Textarea
                    className="min-h-[150px]"
                    placeholder="Enter... (Please leave blank if you have no specific requests)"
                    {...field}
                  />
                </FormControl>
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

function ExtraDetailsFormSkeleton() {
  return <FormSkeleton rows={4} className="mt-2" />
}

export default function ExtraDetailsPage() {
  const { application, applicationIsLoading } = useApplicationContext()

  if (!isLoaded(application, applicationIsLoading)) {
    return <ExtraDetailsFormSkeleton />
  }

  return <ExtraDetailsForm application={application} />
}
