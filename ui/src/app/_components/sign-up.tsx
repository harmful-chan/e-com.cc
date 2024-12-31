'use client'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod'
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import  Agreement  from "@/markdown/agreement.mdx";
import { log } from "console";


const signupFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .trim(),
  confirmPassword: z.string(),
  isAgree: z.boolean().default(false).optional(),
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: 'custom',
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    });
  }
})






export default function SignupPage() {
  const form = useForm<z.infer<typeof signupFormSchema>>(
    {
      resolver: zodResolver(signupFormSchema),
      defaultValues: {
        email: '',
        password: '',
        confirmPassword: '',
        isAgree: false,
      }
    }
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const onSubmit = (data: z.infer<typeof signupFormSchema>) => {
    // TODO: Implement login logic
    console.log(data)
  }

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const headleCheckbox = (data: any) => {
    console.log(data)
  }

  return (
    <>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel >Email</FormLabel>
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
            render={({ field }) => (
              <FormItem>
                <FormLabel >Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field}></Input>
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel >Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field}></Input>
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='isAgree'
            render={({ field }) => (
              <FormItem className='flex items-center space-x-3 space-y-0 border rounded-md p-4'>
                <FormControl>
                  <Checkbox  checked={field.value} onCheckedChange={field.onChange}  />
                </FormControl>
                <FormLabel >
                  I Confirm
                  <Dialog>
                    <DialogTrigger asChild>
                      <a href="#" className="underline hover:text-destructive"  > User Agreement. </a>
                    </DialogTrigger>
                    <DialogContent className="min-w-[30rem] max-w-[90vw]">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-semibold">User Agreement</DialogTitle>
                        <DialogDescription>
                          <ScrollArea className="h-[30rem]">
                            <Agreement></Agreement>
                          </ScrollArea>
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose asChild></DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </FormLabel>
                <FormDescription></FormDescription>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />
          <Button type='submit'>Go</Button>
        </form>
      </Form>
    </>
  );
}