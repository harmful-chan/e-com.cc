'use client'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod'
import { Button } from "@/components/ui/button";

const signinFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .trim(),
})






export default function SigninPage() {
  const form = useForm<z.infer<typeof signinFormSchema>>(
    {
      resolver: zodResolver(signinFormSchema),
      defaultValues: {
        email: '',
        password: '',
      }
    }
  );
  
  const onSubmit = (data: z.infer<typeof signinFormSchema>) => {
    // TODO: Implement login logic
    console.log(data)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
        <FormField
          control={form.control}
          name='email'
          render={({ field }) =>(
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@email.com" {...field}></Input>
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) =>(
            <FormItem>
              <FormLabel  className="flex items-end justify-between">Password
                <a href="/forgot-password" className="underline hover:text-destructive">Forgot Your Password?</a>
              </FormLabel>
              <FormControl>
                <Input type="password" {...field}></Input>
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        />
        <Button type='submit'>Go</Button>
      </form>
    </Form>
  );
}