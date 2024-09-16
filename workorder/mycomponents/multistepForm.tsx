'use client'

import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

// Define the Zod schema for our form
const formSchema = z.object({
  // Step 1: Personal Information
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  age: z.number().min(18, "You must be at least 18 years old"),

  // Step 2: Contact Details
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),

  // Step 3: Preferences
  favoriteColor: z.enum(["red", "green", "blue", "other"]),
  newsletter: z.boolean(),
})

type FormValues = z.infer<typeof formSchema>

const steps = [
  { title: "Personal Information", fields: ["firstName", "lastName", "age"] },
  { title: "Contact Details", fields: ["email", "phone"] },
  { title: "Preferences", fields: ["favoriteColor", "newsletter"] },
]

export default function MultiStepForm() {
  const [step, setStep] = useState(0)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      age: 18,
      email: "",
      phone: "",
      favoriteColor: "red",
      newsletter: false,
    },
  })

  const onSubmit = (data: FormValues) => {
    console.log(data)
    // Here you would typically send the data to your server
    alert("Form submitted successfully!")
  }

  const currentStepFields = steps[step].fields

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Multi-Step Form</CardTitle>
        <CardDescription>Step {step + 1} of {steps.length}: {steps[step].title}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {currentStepFields.includes("firstName") && (
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {currentStepFields.includes("lastName") && (
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {currentStepFields.includes("age") && (
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {currentStepFields.includes("email") && (
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {currentStepFields.includes("phone") && (
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {currentStepFields.includes("favoriteColor") && (
              <FormField
                control={form.control}
                name="favoriteColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Favorite Color</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a color" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="red">Red</SelectItem>
                        <SelectItem value="green">Green</SelectItem>
                        <SelectItem value="blue">Blue</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {currentStepFields.includes("newsletter") && (
              <FormField
                control={form.control}
                name="newsletter"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Subscribe to newsletter
                      </FormLabel>
                      <FormDescription>
                        Get notified about updates and new features.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            )}
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 0}
        >
          Previous
        </Button>
        <Button
          type="button"
          onClick={() => {
            if (step < steps.length - 1) {
              form.trigger(currentStepFields as any)
                .then((isValid) => {
                  if (isValid) {
                    setStep((s) => s + 1)
                  }
                })
            } else {
              form.handleSubmit(onSubmit)()
            }
          }}
        >
          {step === steps.length - 1 ? "Submit" : "Next"}
        </Button>
      </CardFooter>
    </Card>
  )
}