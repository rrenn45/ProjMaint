"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { createWO } from "@/app/functions/actions"
import { useAuth, useUser } from "@clerk/nextjs"
import { FC } from "react";


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
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
  brief_description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  work_order_type:z.string().min(2),
  work_category:z.string().min(2),
  
})

interface Props {
  dataHeader: {
    assetId:number;
    username?:string;
  }
}

export const WorkOrderForm: FC<Props> = ({
  dataHeader: {assetId, username},}) => {
    console.log(username)
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
   
  })

  

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const createWOwithAssetIdAndUser = createWO.bind(null, {...values, priority_category: "urgent", asset_id:assetId, requested_by: username})
    console.log(values)
    //createWO({...values, asset_id:11, priority_category:"concern", requested_by:username})
    createWOwithAssetIdAndUser()
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-2 border h-full w-1/4">
        <FormField
          control={form.control}
          name="brief_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">Create Work Order</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe details here..." {...field} />
              </FormControl>
              <FormDescription>
                Work Order Description.
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
              <FormLabel>Work Group</FormLabel>
              <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a work group" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Work Groups</SelectLabel>
          <SelectItem value="electrician">Electrician</SelectItem>
          <SelectItem value="mechanic">Mechanic</SelectItem>
          <SelectItem value="automation">Automation</SelectItem>
          <SelectItem value="fmm">Facility Maintenance</SelectItem>
          <SelectItem value="laborer">Laborer</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
              </FormControl>
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
              <FormLabel>Impact Category</FormLabel>
              <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select an impact category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Impact Categories</SelectLabel>
          <SelectItem value="environmental">Environmental</SelectItem>
          <SelectItem value="safety">Safety</SelectItem>
          <SelectItem value="production">Production</SelectItem>
          <SelectItem value="regulatory">Regulatory</SelectItem>
          
        </SelectGroup>
      </SelectContent>
    </Select>
              </FormControl>
           
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
