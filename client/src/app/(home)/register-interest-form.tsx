"use client"

import { useToast } from "@durhack/web-components/hooks/use-toast"
import { Button } from "@durhack/web-components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@durhack/web-components/ui/form"
import { Input } from "@durhack/web-components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import type * as React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod/v4"

import { siteConfig } from "@/config/site"

const registerInterestFormSchema = z.object({
  firstNames: z.string().trim().min(1),
  lastNames: z.string().trim().min(1),
  email: z.email(),
})

export function RegisterInterestForm(props: React.HTMLAttributes<HTMLFormElement>) {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof registerInterestFormSchema>>({
    resolver: zodResolver(registerInterestFormSchema),
    defaultValues: {
      firstNames: "",
      lastNames: "",
      email: "",
    },
  })

  async function onSubmit(values: z.infer<typeof registerInterestFormSchema>): Promise<void> {
    const response = await fetch(`${siteConfig.apiUrl}/register-interest`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (response.status === 409) {
      form.setError("email", {
        type: "server",
        message: "You've already registered your interest with that email address!",
      })
      return
    }

    if (!response.ok) {
      form.setError("root", {
        type: "server",
        message: "Something went wrong. Try again later.",
      })
      return
    }

    toast({
      description: "Successfully registered interest!",
      variant: "success",
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} {...props}>
        <FormField
          control={form.control}
          name="firstNames"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name(s)</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormMessage className="text-balance text-center max-w-min min-w-full" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastNames"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name(s)</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage className="text-balance text-center max-w-min min-w-full" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="abcd12@durham.ac.uk" {...field} />
              </FormControl>
              <FormMessage className="text-balance text-center max-w-min min-w-full" />
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel className="hidden lg:inline-block">&nbsp;</FormLabel>
          <FormControl>
            <Button variant="default" className="w-full border border-input" type="submit">
              Register Interest
            </Button>
          </FormControl>
        </FormItem>
      </form>
    </Form>
  )
}
