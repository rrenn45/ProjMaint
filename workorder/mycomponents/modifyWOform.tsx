"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import { Select, SelectContent,SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  type: z.string(),
  category: z.string(),
  updatedAt: z.date()

})

export function ModifyWOForm({workOrder}: {workOrder :{
  id: number;
  brief_description: string;
  work_order_type: string;
  work_category: string;
  priority_category: string;
  requested_by: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  asset_id: number;
}}) {
  console.log(workOrder)
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: workOrder.brief_description,
      type: workOrder.work_order_type,
      category: workOrder.work_category
      
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                Work order description.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Work Group</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose craft type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="electrical">electrical</SelectItem>
                  <SelectItem value="mechanical">mechanical</SelectItem>
                  <SelectItem value="facility_maintenance">facility maintenance</SelectItem>
                  <SelectItem value="laborer">laborer</SelectItem>
                </SelectContent>
              </Select>
              
              <FormMessage />
            </FormItem>
          )}
        /> 
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Impact Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="impact category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="environmental">environmental</SelectItem>
                  <SelectItem value="safety">safety</SelectItem>
                  <SelectItem value="production">production</SelectItem>
                  <SelectItem value="regulatory">regulatory</SelectItem>
                </SelectContent>
              </Select>
              
              <FormMessage />
            </FormItem>
          )}
        /> 
        <Button type="submit">Update</Button>
      </form>
    </Form>
  )
}
