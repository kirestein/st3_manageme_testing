'use client'
import { NewEmployeeSchema, useNewEmployeeForm } from '@/lib/schemas/NewEmployee'
import React from 'react'
import { z } from 'zod'
import { toast } from '@/hooks/use-toast'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import BirthdatePicker from './BirthdatePicker'

const FormNewEmployee = () => {

    const form = useNewEmployeeForm()

    const removeCircularReferences = (obj: Record<string, unknown>) => {
        const seen = new WeakSet();
        return JSON.parse(JSON.stringify(obj, (key, value) => {
            if (typeof value === "object" && value !== null) {
                if (seen.has(value)) {
                    return;
                }
                seen.add(value);
            }
            return value;
        }));
    }


    const onSubmit = (values: z.infer<typeof NewEmployeeSchema>) => {
        console.log('values')
        console.log(values)
        const safeValues = removeCircularReferences(values);

        toast({
            title: "Form submitted",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(safeValues, null, 2)}</code>
                </pre>
            ),
        });
    }


    // const handleSubmit = () => {
    //     console.log('Olá');
    // }

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(
                onSubmit
            )} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder='Name' {...field} />
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
                                <Input placeholder='Tag Name' {...field} />
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
                                <Input placeholder='Tag Last Name' {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="birthDate"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Date of birth</FormLabel>
                            <BirthdatePicker field={{ ...field, value: field.value || new Date() }} />

                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Input placeholder='Phone Number' {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type='submit' onClick={form.handleSubmit(
                    onSubmit
                )}>Submit</Button>
            </form>
        </Form>
        // <form {...form} action="" className="space-y-8 gap-8">
        //     <div className="space-y-8">
        //         <div className="m-6">
        //             <label htmlFor="name" className="mt-4">
        //                 <span className="mt-8 mx-6">Name</span>
        //                 <input type="text" name="name" id="name" className="" />
        //             </label>
        //         </div>
        //         <div className="m-6">
        //             <label htmlFor="tagName" className="mt-4">
        //                 <span className="mt-8 mx-6">Tag Name</span>
        //                 <input type="text" name="tagName" id="tagName" className="" />
        //             </label>
        //         </div>
        //         <div className="m-6">
        //             <label htmlFor="tagLastName" className="mt-4">
        //                 <span className="mt-8 mx-6">Tag Last Name</span>
        //                 <input type="text" name="tagLastName" id="tagLastName" className="" />
        //             </label>
        //         </div>
        //         <div className="m-6">
        //             <label htmlFor="email" className="mt-4">
        //                 <span className="mt-8 mx-6">Email</span>
        //                 <input type="email" name="email" id="email" className="" />
        //             </label>
        //         </div>
        //         <div className="m-6">
        //             <label htmlFor="phoneNumber" className="mt-4">
        //                 <span className="mt-8 mx-6">Phone Number</span>
        //                 <input type="text" name="phoneNumber" id="phoneNumber" className="" />
        //             </label>
        //         </div>
        //     </div>
        //     <button type="button" onClick={(e) => onSubmit(, e)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
        // </form>
    )
}

export default FormNewEmployee



