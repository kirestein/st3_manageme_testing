"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { NewEmployeeSchema } from "@/lib/schemas/NewEmployee"
import BirthdatePicker from "@/components/forms/BirthdatePicker"



export function InputForm() {
    const form = useForm<z.infer<typeof NewEmployeeSchema>>({
        resolver: zodResolver(NewEmployeeSchema),
        defaultValues: {
            name: "",
            email: "",
            tagName: "",
            tagLastName: "",
        },
    })

    async function onSubmit(data: z.infer<typeof NewEmployeeSchema>) {
        try {
            const response = await fetch("/api/employees", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.error)
            }
            const newEmployee = await response.json();
            console.log(newEmployee)
            toast({
                title: "You submitted the following values:",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                    </pre>
                ),
            })
        } catch (error) {
            console.error(error)
            toast({
                title: "Internal Server Error",
                description: "Failed to create employee",
                variant: "destructive",
            })

        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Type employee name" {...field} />
                            </FormControl>
                            <FormDescription>
                                {form.formState.errors.name?.message || field.value}
                            </FormDescription>
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
                                <Input placeholder="e-mail do funcionário" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="tagName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tag Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Nome para o crachá" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="tagLastName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tag Last Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Sobrenome para o crachá" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Telefone</FormLabel>
                            <FormControl>
                                <Input placeholder="Digite o telefone" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="birthDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Telefone</FormLabel>
                            <FormControl>
                                <BirthdatePicker field={{ ...field, value: field.value ?? new Date() }} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
