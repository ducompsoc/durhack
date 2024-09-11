"use client"

import * as React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import "@/lib/zod-phone-extension"

import { Form } from "@durhack/web-components/ui/form";
import { Button } from "@durhack/web-components/ui/button";
import { useRouter } from 'next/navigation';
import useUser from "@/lib/useUser";

type PersonalFormFields = {
    authenticated: boolean,
}

const personalFormSchema = z.object({
    authenticated: z.boolean(),
});

export default function AuthPage() {
    const router  = useRouter()
    const { profile, updateProfile } = useUser();

    const form = useForm<PersonalFormFields, any, z.infer<typeof personalFormSchema>>({
        resolver: zodResolver(personalFormSchema),
        defaultValues: {
            authenticated: false,
        }
    });

    async function onSubmit(values: z.infer<typeof personalFormSchema>): Promise<void> {
        updateProfile(values)
        router.push("/details/submit")
    }
    
    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <h2 className="text-2xl">
                    Authentication
                </h2>

                <div className="bg-white bg-opacity-10 py-8 px-32 rounded-md mb-8 mt-2">
                    <div className={`rounded-sm p-4 my-4 text-center hover:cursor-pointer ${profile.authenticated ? "bg-green-400 bg-opacity-90" : "bg-white bg-opacity-10"}`}>
                        Keycloak
                    </div>
                </div>

                <div className="mt-16 flex justify-center">
                    <Button variant="default" className="py-2 px-4 text-center rounded-sm text-white bg-white bg-opacity-15 hover:bg-green-500 hover:cursor-pointer hover:shadow-[0_0px_50px_0px_rgba(34,197,94,0.8)] transition-all" type="submit">
                        Save Progress
                    </Button>
                </div>
            </form>
        </Form>
    )
}