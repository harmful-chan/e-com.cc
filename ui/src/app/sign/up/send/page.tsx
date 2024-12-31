'use client'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/router';


import {Api} from '@/app/_components/_api'

const emailVerifySchema = z.object({
  email: z.string().email({message:'格式错误'}).trim(),
  code: z.string().optional(),
})




export default function SendPage(props:any){

  const [isWaitEmailCode, setIsWaitEmailCode] = useState(false)
  const [isEmailVertifyPass, setIsEmailVertifyPass] = useState(false)
  const [countdown, setCountdown] = useState(30);

  const router = useRouter();

  const onSendVertifyEmailCode = async () => {
    const { success, data } =  z.string().email().safeParse(emailVerifyForm.getValues('email'))

    if(success){
        const { data: { isSend , isVerify}} =  await Api.send(data);
        setIsEmailVertifyPass(true)
        setIsWaitEmailCode(true)
        setCountdown(30)
    }
  } 


  const onEmailVerify = async (data: z.infer<typeof emailVerifySchema>) => {
    console.log(data)
    const { data:{ isSend, isVerify, email } } = await Api.check(data.email, data.code);
    if(isSend && isVerify){
      router.push('/sign/up/register')
    }
  }




  useEffect(() => {
    let timer: any;
    if (isWaitEmailCode && countdown > 0) {
        // 每秒更新倒计时
        timer = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);
    }else if(isWaitEmailCode && countdown == 0){
      setIsWaitEmailCode(false)
    }


    return () => {
        // 组件卸载或者倒计时结束等情况，清除定时器
        console.log(countdown)
        clearInterval(timer);
    };
  }, [countdown, isWaitEmailCode]);


  const emailVerifyForm = useForm<z.infer<typeof emailVerifySchema>>({
    resolver: zodResolver(emailVerifySchema),
    defaultValues:{
      email: props.email,
      code: '',
    }
  })
  


  return(
    <>

      <Form {...emailVerifyForm}>
        <form onSubmit={emailVerifyForm.handleSubmit(onEmailVerify)} 
          className='grid gap-2'>
          <FormField name='email' render={({field}) =>(
            <FormItem>
              <FormLabel className='flex items-center *:text-sm'>
                <span className=' text-destructive'>*</span>&nbsp;  邮箱 &nbsp;<FormMessage></FormMessage>
                <FormMessage></FormMessage>
              </FormLabel>
              <FormControl>
                <Input {...field}  type='email' placeholder='abc@mail.com' disabled={!(`${props.email}` === '')} ></Input>
              </FormControl>
            </FormItem>
          )}></FormField>
          <FormField name='code' render={({field}) => (
            <FormItem>
              <FormLabel className='flex items-center *:text-sm'>
                <span className=' text-destructive'>*</span>&nbsp; 验证码 &nbsp;<FormMessage></FormMessage>
                <FormMessage></FormMessage>
              </FormLabel>
              <div className='flex gap-2'>
                <FormControl>
                  <Input {...field} ></Input>
                </FormControl>
                <Button type='button' onClick={onSendVertifyEmailCode} className='w-[180px]' disabled={isWaitEmailCode}>
                  <div  className={ isWaitEmailCode ? 'hidden' : 'block' }>重获验证码</div>
                  <div  className={ `${isWaitEmailCode ? 'block' : 'hidden'}  flex items-center gap-2` }>                        
                    <Loader2 className="animate-spin" />等待 ({countdown})s
                  </div>
                </Button>
              </div>
            </FormItem>
          )}></FormField>
          <Button className='rounded-full' type='submit'>下一步</Button>
        </form>
      </Form>
    </>
  )

}