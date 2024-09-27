"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import * as React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@durhack/web-components/ui/button"
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
import { useApplicationContext } from "@/hooks/use-application-context"
import { updateApplication } from "@/lib/update-application"

type SubmitFormFields = {
  mlhCodeOfConduct: boolean | "indeterminate"
  mlhTerms: boolean | "indeterminate"
  mlhMarketing: boolean | "indeterminate"
}

const submitFormSchema = z.object({
  mlhCodeOfConduct: z.literal(true, { errorMap: () => ({ message: "Required" }) }),
  mlhTerms: z.literal(true, { errorMap: () => ({ message: "Required" }) }),
  mlhMarketing: z.literal(true, { errorMap: () => ({ message: "Required" }) }),
})

export default function SubmitPage() {
  const { setIsFinalSubmitHovering } = useBackgroundContext()

  const router = useRouter()
  const { application, applicationIsLoading, mutateApplication } = useApplicationContext()

  const form = useForm<SubmitFormFields, unknown, z.infer<typeof submitFormSchema>>({
    resolver: zodResolver(submitFormSchema),
    defaultValues: {
      mlhCodeOfConduct: false,
      mlhTerms: false,
      mlhMarketing: false,
    },
  })

  React.useEffect(() => {
    if (applicationIsLoading || !application) return
    form.reset({
      mlhCodeOfConduct: application.consents.find((consent) => consent.name === "mlhCodeOfConduct")?.choice ?? "indeterminate",
      mlhTerms: application.consents.find((consent) => consent.name === "mlhTerms")?.choice ?? "indeterminate",
      mlhMarketing: application.consents.find((consent) => consent.name === "mlhMarketing")?.choice ?? "indeterminate",
    })
  }, [applicationIsLoading, application, form])

  async function onSubmit(values: z.infer<typeof submitFormSchema>): Promise<void> {
    try {
      await updateApplication("submit", values)
      await mutateApplication()
      router.push("/dashboard")
    } catch (e: unknown) {
      form.setError("mlhMarketing", {
        message: "Application is incomplete or already submitted!",
      })
    }
    setIsFinalSubmitHovering(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h2 className="text-2xl">Submit Application</h2>
        <div className="mb-4">
          <FormField
            control={form.control}
            name="mlhCodeOfConduct"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      className="mt-[0.2em] lg:mt-0"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      required
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
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
            name="mlhTerms"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      className="mt-[0.2em] lg:mt-0"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      required
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
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
            name="mlhMarketing"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      className="mt-[0.2em] lg:mt-0"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      required
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>MLH Marketing</FormLabel>
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

        <div className="mt-16 flex justify-center">
          <Button
            variant="default"
            className="py-2 px-4 text-center rounded-sm text-white bg-white bg-opacity-15 hover:bg-green-500 hover:cursor-pointer hover:shadow-[0_0px_50px_0px_rgba(34,197,94,0.8)] transition-all"
            type="submit"
            onMouseEnter={() => setIsFinalSubmitHovering(true)}
            onMouseLeave={() => setIsFinalSubmitHovering(false)}
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  )
}
