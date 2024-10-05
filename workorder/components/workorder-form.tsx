"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { updateWO } from "@/app/functions/actions"

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
import { Select, SelectGroup, SelectItem, SelectContent, SelectTrigger, SelectValue } from "./ui/select"
import { Input } from "@/components/ui/input"
import Link from "next/link"

const formSchema = z.object({
  brief_description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  work_order_type: z.string(),
  work_category: z.string(),
})

export function EditForm({workOrder}: {workOrder :{
  id: number,
  brief_description: string,
  work_order_type: string,
  work_category: string,

}})
 {
  console.log(workOrder)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brief_description: workOrder.brief_description,
      work_order_type:workOrder.work_order_type,
      work_category:workOrder.work_category,
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
   await updateWO(workOrder.id, values)
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="brief_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Work Order Description</FormLabel>
              <FormControl>
                <Input placeholder="enter description..." {...field} />
              </FormControl>
              <FormDescription>
                This is the current description.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="work_order_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Work Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select work type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="mechanical">mechanical</SelectItem>
                  <SelectItem value="electrical">electrical</SelectItem>
                  <SelectItem value="laborer">laborer</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="work_category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Work Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select work category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="environmental">Environmental</SelectItem>
                  <SelectItem value="safety">Safety</SelectItem>
                  <SelectItem value="production">Production</SelectItem>
                  <SelectItem value="regulatory">Regulatory</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
