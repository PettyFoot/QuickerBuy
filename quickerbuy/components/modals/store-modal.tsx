"use client";

import * as z from "zod";
import {Form, useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const formSchema = z.object({
    name: z.string().min(1),
});


export const StoreModal =  () => {
    const storeModal = useStoreModal();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "name for form schema",
        },
      });

    const onSubmit = async(values: z.infer<typeof formSchema>) => {

        console.log(values);
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
                                    <Input placeholder="E-com" {...field}/>
                                </FormControl>
                            </FormItem>
                        )}/>
                        <div className="pt-6 space-x-2 items-center justify-left w-screen">
                            <Button variant={"outline"} onClick={storeModal.onClose}>Cancel</Button>
                            <Button type="submit">Continue</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    </Modal>
    );
};