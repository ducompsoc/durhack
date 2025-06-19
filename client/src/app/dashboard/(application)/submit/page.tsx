"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import * as React from "react"
import { useForm, useFormContext } from "react-hook-form"
import { z } from "zod"

import { Checkbox } from "@durhack/web-components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@durhack/web-components/ui/form"

import { useBackgroundContext } from "@/app/dashboard/background-context"
import { FormSkeleton } from "@/components/dashboard/form-skeleton"
import { FormSubmitButton } from "@/components/dashboard/form-submit-button"
import type { Application } from "@/hooks/use-application"
import { useApplicationContext } from "@/hooks/use-application-context"
import { isLoaded } from "@/lib/is-loaded"
import { updateApplication } from "@/lib/update-application"
import { cn } from "@/lib/utils"

type SubmitFormFields = {
  mlhCodeOfConduct: boolean | "indeterminate"
  mlhTerms: boolean | "indeterminate"
  mlhMarketing: boolean | "indeterminate"
  dsuPrivacy: boolean | "indeterminate"
  hukPrivacy: boolean | "indeterminate"
  hukMarketing: boolean | "indeterminate"
  media: boolean | "indeterminate"
}

const submitFormSchema = z.object({
  mlhCodeOfConduct: z.literal(true, { errorMap: () => ({ message: "Required" }) }),
  mlhTerms: z.literal(true, { errorMap: () => ({ message: "Required" }) }),
  mlhMarketing: z.boolean(),
  dsuPrivacy: z.literal(true, { errorMap: () => ({ message: "Required" }) }),
  hukPrivacy: z.literal(true, { errorMap: () => ({ message: "Required" }) }),
  hukMarketing: z.boolean(),
  media: z.boolean({ message: "Please specify" }),
})

function ConsentCard({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4", className)} {...props} />
  )
}

function ConsentCardCheckbox({ className, ...props }: React.ComponentProps<typeof Checkbox>) {
  return <Checkbox className={cn("mt-[0.2em] lg:mt-0", className)} {...props} />
}

function ConsentCardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-1 leading-none", className)} {...props} />
}

function FormRootMessage(
  {
    errorName,
    className,
    children,
    ...props
  }: React.ComponentProps<"p"> & { errorName: string }
) {
  const {
    formState: { errors },
  } = useFormContext()

  const error = errors.root?.[errorName]
  const body = error ? String(error.message) : children
  if (!body) return null

  return (
    <p className={cn("text-[0.8rem] font-medium text-destructive", className)} {...props}>
      {body}
    </p>
  )
}

/**
 * This component accepts <code>application</code> via props, rather than via
 * <code>useApplicationContext</code>, because it requires the application to already be loaded before being rendered.
 */
function SubmitForm({ application }: { application: Application }) {
  const router = useRouter()
  const { setIsFinalSubmitHovering } = useBackgroundContext()
  const { mutateApplication } = useApplicationContext()

  const form = useForm<SubmitFormFields, unknown, z.infer<typeof submitFormSchema>>({
    resolver: zodResolver(submitFormSchema),
    defaultValues: {
      mlhCodeOfConduct: application.consents.find((consent) => consent.name === "mlhCodeOfConduct")?.choice ?? false,
      mlhTerms: application.consents.find((consent) => consent.name === "mlhTerms")?.choice ?? false,
      mlhMarketing: application.consents.find((consent) => consent.name === "mlhMarketing")?.choice ?? false,
      dsuPrivacy: application.consents.find((consent) => consent.name === "dsuPrivacy")?.choice ?? false,
      hukPrivacy: application.consents.find((consent) => consent.name === "hukPrivacy")?.choice ?? false,
      hukMarketing: application.consents.find((consent) => consent.name === "hukMarketing")?.choice ?? false,
      media: application.consents.find((consent) => consent.name === "media")?.choice ?? "indeterminate",
    },
  })

  async function onSubmit(values: z.infer<typeof submitFormSchema>): Promise<void> {
    try {
      await updateApplication("submit", values)
    } catch {
      // todo: what about network errors? this handles too broadly
      form.setError("root.serverError", {
        message: "Application is incomplete or already submitted!",
      })
      return
    }

    await mutateApplication((currentData) => {
      if (!currentData) throw new Error()

      const updatedConsents = currentData.consents
        .filter((consent) => {
          if (consent.name === "mlhCodeOfConduct") return false
          if (consent.name === "mlhTerms") return false
          if (consent.name === "mlhMarketing") return false
          if (consent.name === "dsuPrivacy") return false
          if (consent.name === "hukPrivacy") return false
          if (consent.name === "hukMarketing") return false
          if (consent.name === "media") return false
          return true
        })
        .splice(
          0,
          0,
          { name: "mlhCodeOfConduct", choice: values.mlhCodeOfConduct },
          { name: "mlhTerms", choice: values.mlhTerms },
          { name: "mlhMarketing", choice: values.mlhMarketing },
          { name: "dsuPrivacy", choice: values.dsuPrivacy },
          { name: "hukPrivacy", choice: values.hukPrivacy },
          { name: "hukMarketing", choice: values.hukMarketing },
          { name: "media", choice: values.media },
        )

      return {
        ...currentData,
        applicationStatus: "submitted",
        consents: updatedConsents,
      } satisfies Application
    })
    setIsFinalSubmitHovering(false)
    router.push("/dashboard")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mt-2 mb-4">
          <FormField
            control={form.control}
            name="mlhCodeOfConduct"
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <ConsentCard>
                  <FormControl>
                    <ConsentCardCheckbox checked={value} onCheckedChange={onChange} required {...field} />
                  </FormControl>
                  <ConsentCardContent>
                    <FormLabel>MLH Code of Conduct</FormLabel>
                    <FormDescription>
                      I have read and agree to the{" "}
                      <Link
                        className="underline"
                        href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md"
                      >
                        MLH Code of Conduct
                      </Link>
                      .
                    </FormDescription>
                  </ConsentCardContent>
                </ConsentCard>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mb-4">
          <FormField
            control={form.control}
            name="mlhTerms"
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <ConsentCard>
                  <FormControl>
                    <ConsentCardCheckbox checked={value} onCheckedChange={onChange} required {...field} />
                  </FormControl>
                  <ConsentCardContent>
                    <FormLabel>MLH Policies, Terms & Conditions</FormLabel>
                    <FormDescription>
                      I authorize DU Computing Society to share my application/registration information with Major{" "}
                      League Hacking for event administration, ranking, and MLH administration in-line with the{" "}
                      <Link
                        className="underline"
                        href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md"
                      >
                        MLH Privacy Policy
                      </Link>
                      .
                    </FormDescription>
                    <FormDescription>
                      I further agree to the terms of both the{" "}
                      <Link className="underline" href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md">
                        MLH Contest Terms and Conditions
                      </Link>{" "}
                      and the{" "}
                      <Link
                        className="underline"
                        href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md"
                      >
                        MLH Privacy Policy
                      </Link>
                      .
                    </FormDescription>
                  </ConsentCardContent>
                </ConsentCard>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mb-4">
          <FormField
            control={form.control}
            name="mlhMarketing"
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox className="mt-[0.2em] lg:mt-0" checked={value} onCheckedChange={onChange} {...field} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      <span>MLH Marketing </span>
                      <span className="text-xs">(optional)</span>
                    </FormLabel>
                    <FormDescription>
                      I authorize MLH to send me occasional emails about relevant events, career opportunities, and{" "}
                      community announcements.
                    </FormDescription>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mb-4">
          <FormField
            control={form.control}
            name="dsuPrivacy"
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      required
                      className="mt-[0.2em] lg:mt-0"
                      checked={value}
                      onCheckedChange={onChange}
                      {...field}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      <span>DSU Privacy Policy</span>
                    </FormLabel>
                    <FormDescription>
                      I have read and accept the{" "}
                      <Link className="underline" href="https://www.durhamsu.com/privacy-policy">
                        Durham Students&apos; Union Student Privacy Policy
                      </Link>
                      . I consent to sharing information with Durham University Computing Society and Durham
                      Students&apos; Union.
                    </FormDescription>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mb-4">
          <FormField
            control={form.control}
            name="hukPrivacy"
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      required
                      className="mt-[0.2em] lg:mt-0"
                      checked={value}
                      onCheckedChange={onChange}
                      {...field}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      <span>Hackathons UK Privacy Policy</span>
                    </FormLabel>
                    <FormDescription>
                      I authorise DU Computing Society to share my application/registration information with{" "}
                      <Link className="underline" href="https://hackathons.org.uk">
                        Hackathons UK Ltd.
                      </Link>{" "}
                      for administrative purposes and, with my authorisation, email, in-line with the{" "}
                      <Link className="underline" href="https://hackuk.org/privacy">
                        Hackathons UK Limited Privacy Policy
                      </Link>
                      .
                    </FormDescription>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mb-4">
          <FormField
            control={form.control}
            name="hukMarketing"
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox className="mt-[0.2em] lg:mt-0" checked={value} onCheckedChange={onChange} {...field} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      <span>Hackathons UK Marketing </span>
                      <span className="text-xs">(optional)</span>
                    </FormLabel>
                    <FormDescription>
                      I authorise Hackathons UK Limited to send me occasional messages about hackathons and their
                      activities.
                    </FormDescription>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mb-4">
          <FormField
            control={form.control}
            name="media"
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox className="mt-[0.2em] lg:mt-0" checked={value} onCheckedChange={onChange} {...field} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      <span>Photography/Videography </span>
                      <span className="text-xs">(optional)</span>
                    </FormLabel>
                    <FormDescription>
                      I consent to the use of photographs and/or videos in which I appear for promotional purposes
                      related to the event.
                    </FormDescription>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormRootMessage errorName="serverError" />

        <div className="mt-16 flex justify-center">
          <FormSubmitButton
            className="py-2 px-4 text-center rounded-sm text-white bg-white bg-opacity-15 hover:bg-green-500 hover:cursor-pointer hover:shadow-[0_0px_50px_0px_rgba(34,197,94,0.8)] transition-all"
            type="submit"
            onMouseEnter={() => setIsFinalSubmitHovering(true)}
            onMouseLeave={() => setIsFinalSubmitHovering(false)}
          >
            Submit DurHack Application
          </FormSubmitButton>
        </div>
      </form>
    </Form>
  )
}

function SubmitFormSkeleton() {
  return <FormSkeleton rows={3} className="mt-2" />
}

/*
todo: conditionally render based on application status
 - don't allow the user to think submission is possible when already submitted
 - ensure the user can still view their responses to the various consent questions, with checkboxes disabled
 */
export default function SubmitPage() {
  const { application, applicationIsLoading } = useApplicationContext()

  if (!isLoaded(application, applicationIsLoading)) {
    return <SubmitFormSkeleton />
  }

  return <SubmitForm application={application} />
}
