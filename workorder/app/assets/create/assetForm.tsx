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
  asset_descript: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  work_group:z.string().min(2),
  asset_category:z.string().min(2),
})

export function AssetForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      asset_descript: "",
      asset_class:"",
      asset_category:"",
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 m-4">
        <FormField
          control={form.control}
          name="asset_descript"
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
          name="work_group"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Asset Class</FormLabel>
              <FormControl>
              <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select an asset class" />
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
          name="asset_category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Asset Category</FormLabel>
              <FormControl>
              <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select an asset category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Asset Categories</SelectLabel>
          <SelectItem value="pump">Pump</SelectItem>
          <SelectItem value="compressor">Compressor</SelectItem>
          <SelectItem value="production_well">Production well</SelectItem>
          <SelectItem value="injection_well">Injection well</SelectItem>
          
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
