"use client";

import * as z from "zod";
import {useForm} from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import  axios  from "axios"

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import { FormControl, FormField, FormItem, FormLabel, Form, FormMessage  } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";


const formSchema = z.object({
    name: z.string().min(1),
});


export const StoreModal =  () => {
    const storeModal = useStoreModal();

    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "name for form schema",
        },
      });

    const onSubmit = async(values: z.infer<typeof formSchema>) => {

        try {
            setLoading(true);

            const response = await axios.post('/api/stores', values);

            console.log(response.data);
            
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    return (
    <Modal 
    title="Create store" 
    description="Add a new store" 
    isOpen={storeModal.isOpen}
    onClose={storeModal.onClose}
    >
        <div>
            <div className="space-y-4 py-2 pb-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="E-com" disabled={loading} {...field}/>
                                </FormControl>
                            </FormItem>
                        )}/>
                        <div className="pt-6 space-x-2 items-center justify-left w-full">
                            <Button disabled={loading} variant={"outline"} onClick={storeModal.onClose}>Cancel</Button>
                            <Button disabled={loading} type="submit">Continue</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    </Modal>
    );
};