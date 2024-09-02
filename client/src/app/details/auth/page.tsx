"use client"

import * as React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import "@/lib/zod-phone-extension"

import type { Profile } from "@/app/details/page";
import { Input } from "@durhack/web-components/ui/input";
import {
    Form,
    FormField,
    FormItem,
    FormControl,
    FormLabel,
    FormMessage,
} from "@durhack/web-components/ui/form";
import { Button } from "@durhack/web-components/ui/button";
import { LinkBox } from "../linkbox";

type PersonalFormFields = {
    firstNames: string
    lastNames: string
    preferredName: string
    pronouns: string
    age: string
}

const personalFormSchema = z.object({
    firstNames: z.string().trim().min(1).max(256),
    lastNames: z.string().trim().min(1).max(256),
    preferredName: z.string().trim().min(1).max(256),
    pronouns: z.string().trim().min(1).max(256),
    age: z.coerce.number({ invalid_type_error: "Please provide a valid age." })
      .positive("Please provide a valid age.")
      .min(16, { message: "Age must be >= 16" })
      .max(256, { message: "Ain't no way you're that old." })
      .int("Please provide your age rounded down to the nearest integer."),
});

export default function AuthPage(profile: Profile) {
    const form = useForm<PersonalFormFields, any, z.infer<typeof personalFormSchema>>({
        resolver: zodResolver(personalFormSchema),
        defaultValues: {
            firstNames: "",
            lastNames: "",
            preferredName: "",
            pronouns: "",
            age: "",
        }
    });

    async function onSubmit(values: z.infer<typeof personalFormSchema>): Promise<void> {
        console.log(values)
    }
    
    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <h2 className="text-2xl">
                    Authentication
                </h2>

                <LinkBox links={["Keycloak"]} />

                <div className="mt-16">
                    <Button variant="default" className="mx-[45%] py-2 px-4 text-center rounded-sm text-white bg-white bg-opacity-15 hover:bg-green-500 hover:cursor-pointer hover:shadow-[0_0px_50px_0px_rgba(34,197,94,0.8)] transition-all" type="submit">
                        Submit
                    </Button>
                </div>
            </form>
        </Form>
    )
}