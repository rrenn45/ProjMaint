"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { createWO } from "@/app/functions/actions"

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
  workorder_descript: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  work_group:z.string().min(2),
  impact_category:z.string().min(2),
  asset:z.string(),
})

export function WorkOrderForm({asset}:{asset:string}) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workorder_descript: "",
      work_group:"",
      impact_category:"",
      asset:"",
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-2 border h-full w-1/4">
        <FormField
          control={form.control}
          name="workorder_descript"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Create Work Order for {asset}</FormLabel>
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
          name="work_group"
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
                Work Order Description.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="impact_category"
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
              <FormDescription>
                Work Order Description.
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
