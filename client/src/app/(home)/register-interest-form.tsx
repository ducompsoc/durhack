"use client"

import * as React from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { cva, type VariantProps } from "class-variance-authority";

import { Button } from "durhack-web-components/ui/button"
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage
} from "durhack-web-components/ui/form"
import { Input } from "durhack-web-components/ui/input"

const registerInterestFormSchema = z.object({
  firstNames: z.string().trim().min(1),
  lastNames: z.string().trim().min(1),
  email: z.string().email(),
})

export function RegisterInterestForm(props: React.HTMLAttributes<HTMLFormElement>) {
  const form = useForm<z.infer<typeof registerInterestFormSchema>>({
    resolver: zodResolver(registerInterestFormSchema),
    defaultValues: {
      firstNames: "",
      lastNames: "",
      email: "",
    }
  })

  async function onSubmit(values: z.infer<typeof registerInterestFormSchema>): Promise<void> {
    console.log(values)
  }

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} {...props}>
        <FormField
          control={form.control}
          name="firstNames"
          render={({ field}) => (
            <FormItem>
              <FormLabel>First name(s)</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
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
              <FormMessage />
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
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel><br/></FormLabel>
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
