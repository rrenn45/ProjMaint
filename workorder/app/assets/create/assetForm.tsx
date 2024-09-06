"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { createAsset } from "@/app/functions/actions"

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
  asset_description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  asset_class:z.string(),
  location_id:z.string(),
  asset_status: z.string(),
})

export function AssetForm({data} : {data: {
  area: string;
  field: string;
  location_id: string | null;
  district: string;
}[]}) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    createAsset(values)
    console.log(values)

  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 m-4">
        <FormField
          control={form.control}
          name="asset_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Asset Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe details here..." {...field} />
              </FormControl>
              <FormDescription>
                Asset Description.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="asset_class"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Asset Class</FormLabel>
              <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a class" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Asset Classes</SelectLabel>
          <SelectItem value="pump">pump</SelectItem>
          <SelectItem value="compressor">compressor</SelectItem>
          <SelectItem value="tank">tank</SelectItem>
          <SelectItem value="pipeline">pipeline</SelectItem>
          <SelectItem value="facility">facility</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
              </FormControl>
              <FormDescription>
                Asset Description.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="asset_status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Asset Status</FormLabel>
              <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Asset Statuses</SelectLabel>
          <SelectItem value="operating">Operating</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
          <SelectItem value="not_ready">Not ready</SelectItem>
          <SelectItem value="decommissioned">Decommissioned</SelectItem>
          <SelectItem value="ta">TA</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
              </FormControl>
              <FormDescription>
                Asset Description.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Asset Location</FormLabel>
              <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select location" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Asset Locations</SelectLabel>
        
          {data.map((item) => <SelectItem key={item.location_id} value={item.area}>{item.field} {item.area}</SelectItem>)}
          
        </SelectGroup>
      </SelectContent>
    </Select>
              </FormControl>
              <FormDescription>
                Asset Location.
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
