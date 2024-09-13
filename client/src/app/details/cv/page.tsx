"use client"


import * as React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    Form,
    FormField,
    FormItem,
    FormControl,
    FormLabel,
    FormMessage,
} from "@durhack/web-components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@durhack/web-components/ui/select"
import {
  FileUpload,
  FileUploadDropzoneRoot,
  FileUploadDropzoneBasket,
  FileUploadDropzoneInput,
  FileUploadFileList,
} from "@durhack/web-components/ui/file-upload";
import { Button } from "@durhack/web-components/ui/button";
import { useRouter } from 'next/navigation';
import { useApplication } from "@/hooks/useApplication";
import { updateApplication } from "@/lib/updateApplication";

type CvFormFields = {
    cv: string
}

const cvFormSchema = z.object({
    cv: z.enum(["true", "false"], { invalid_type_error: "Please choose yes or no!" })
});

export default function EducationPage() {
    const router = useRouter()
    const { data, isLoading } = useApplication()
    const [files, setFiles] = React.useState<File[]>([])
    const [showForm, setShowForm] = React.useState(false)

    React.useEffect(() => {
        if (!isLoading && data) {
            form.setValue("cv", data?.cv?.toString() ?? "")
            setShowForm(data.cv ?? false)
        }
    }, [isLoading, data])

    const form = useForm<CvFormFields, any, z.infer<typeof cvFormSchema>>({
        resolver: zodResolver(cvFormSchema
        ),
        defaultValues: {
            cv: ""
        }
    });

    async function onSubmit(values: z.infer<typeof cvFormSchema>): Promise<void> {
        if (values.cv === "true" && files.length === 0) {
            form.setError("cv", { message: "Please provide a CV!" })
            return
        }

        const formData = new FormData()
        formData.append("cv", values.cv)
        if (files.length === 1) formData.append("file", files[0])

        await updateApplication("cv", formData)
        router.push("/details/submit")
    }

    function cvChange(onChange: (str: string) => void) {
        return (value: string) => {
            if (value !== "") {
                onChange(value)
                setShowForm(value === "true")
            }
        }
    }
    
    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <h2 className="text-2xl">
                    CV Submission
                </h2>
                <div className="mb-4">
                    <FormField
                        control={form.control}
                        name="cv"
                        render={({ field: {onChange, value, ...field} }) => (
                            <FormItem>
                            <FormLabel>Would you like to submit a CV (shared with our sponsors)?</FormLabel>
                            <Select onValueChange={cvChange(onChange)} value={value} >
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue className="" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                <SelectItem value="true">Yes</SelectItem>
                                <SelectItem value="false">No (remind me later)</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="mb-4">
                    { showForm && <FileUpload multiDropBehaviour="replace" onChange={setFiles}>
                        <FileUploadDropzoneRoot>
                            <FileUploadDropzoneBasket />
                            <FileUploadDropzoneInput />
                        </FileUploadDropzoneRoot>
                        <FileUploadFileList />
                    </FileUpload> }
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