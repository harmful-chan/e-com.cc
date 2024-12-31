'use client'

import { H1 } from "@icon-park/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {  useForm } from "react-hook-form";

import { z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import  Link from "next/link";

const signinSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z.string().min(8, { message: 'Please enter a valid email.' }).trim(),
})




export default function In(){
  const form = useForm<z.infer<typeof signinSchema>>(
    {
      resolver: zodResolver(signinSchema),
      defaultValues:{
        email: '',
        password: '',
      }
    }
  );

  const onSumbit = (data: z.infer<typeof signinSchema>) => {
      console.log(123)
  };


  return (
    <>
      <div className=" h-screen flex flex-col gap-4 p-40">
        <h1 className=" text-2xl font-semibold ">登录</h1>
        <Tabs defaultValue="email" className="w-[400px]">
          <TabsList  className="h-min p-0 bg-transparent rounded-none ">
            <div className="flex  gap-4 *:rounded-none *:border-2 *:border-transparent *:p-0">
              <TabsTrigger value="email" className="data-[state=active]:shadow-none data-[state=active]:border-b-primary ">邮箱</TabsTrigger>
              <TabsTrigger value="phone" className="data-[state=active]:shadow-none data-[state=active]:border-b-primary">手机</TabsTrigger>
            </div>
          </TabsList>
          <TabsContent value="email">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSumbit)}>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) =>(
                    <FormItem>
                      <FormControl>
                        <Input type="email" placeholder="example@email.com" {...field}></Input>
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />
              </form>
              <Button type="submit" className="w-[400px] mt-4 rounded-full">下一步</Button>
            </Form>
            <div className="flex justify-center text-sm font-semibold mt-4 tracking-wide">还没有账号? <Link href="/auth/sign/up" className="underline">立即注册</Link></div>

          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}