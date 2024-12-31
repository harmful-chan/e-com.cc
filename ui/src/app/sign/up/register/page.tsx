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
import { log } from 'console';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ReactDOM from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';

import SlackConfirmEmail from '@/components/email-template/slack-confirm';

import {Api} from '@/app/_components/_api'
import { Resolver } from 'dns';

import { ArrowLeft, ArrowRight } from '@icon-park/react';

const signupSchema = z.object({
  email: z.string().email({message: "格式错误"}).trim(),
  phoneCountry: z.string(),
  phoneNumber: z.string().optional(),
  password: z.string().min(6, {message: '大于6位由英文数字组成'}),
  repeatPassword: z.string(),
  isAgree: z.boolean().optional()
}).superRefine(({ repeatPassword, password }, ctx) => {
  if (repeatPassword !== password) {
    ctx.addIssue({
      code: 'custom',
      message: '密码不相同',
      path: ['repeatPassword'],
    });
  }
})

const emailCheckSchema = z.object({
  email: z.string().email({message:'格式错误'}).trim(),
})

const emailVerifySchema = z.object({
  email: z.string().email({message:'格式错误'}).trim(),
  code: z.string().optional(),
})




export default function Up(){

  const [open, setOpen] = useState(false)
  const [isWaitEmailCode, setIsWaitEmailCode] = useState(false)
  const [isEmailVertifyPass, setIsEmailVertifyPass] = useState(false)
  const [countdown, setCountdown] = useState(30);





  const onRegister = (data: z.infer<typeof signupSchema>) =>{

  }

  
  const onEmailCheck = async (data: z.infer<typeof emailCheckSchema>) =>{

    const { data:{ isSend, isVerify } } = await Api.check(data.email);
    // 未发送 || 已发送，未校验
    if(!isSend || !isVerify){    
      console.log(data)
      await Api.send(data.email)

      setIsWaitEmailCode(true)
      setCountdown(30)
      onRight()
      emailVerifyForm.setValue('email', data.email)
    }else{  // 已校验

    }
  }

  const onEmailVerify = async (data: z.infer<typeof emailVerifySchema>) => {
    console.log(data)
    const { data:{ isSend, isVerify, email } } = await Api.check(data.email, data.code);
    if(isSend && isVerify){
      onRight()
      signupForm.setValue('email', email)
    }
  }

  const onSendVertifyEmailCode = async () => {
    const { success, data } =  z.string().email()
      .safeParse(emailVerifyForm.getValues('email'))

    if(success){
        const { data: { isSend , isVerify}} =  await Api.send(emailVerifyForm.getValues('email'));
        setIsEmailVertifyPass(true)
        setIsWaitEmailCode(true)
        setCountdown(30)
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
  }, [countdown, isWaitEmailCode, isCanLeft]);

  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues:{
      email: '',
      phoneCountry: '',
      phoneNumber: '',
      password: '',
      repeatPassword: '',
    }
  })
  
  const emailCheckForm = useForm<z.infer<typeof emailCheckSchema>>({
    resolver: zodResolver(emailCheckSchema),
    defaultValues:{
      email: 'abc.test@e-com.cc'
    }
  })

  const emailVerifyForm = useForm<z.infer<typeof emailVerifySchema>>({
    resolver: zodResolver(emailVerifySchema),
    defaultValues:{
      email: '',
      code: '',
    }
  })
  


  return(
    <>

          {/* 邮箱验证表单 */}
          <Form {...emailCheckForm}>
            <form onSubmit={emailCheckForm.handleSubmit(onEmailCheck)} 
              className='grid gap-2' >
              <FormField name='email' render={({field}) =>(
                <FormItem>
                  <FormLabel className='flex items-center *:text-sm'>
                    <span className=' text-destructive'>*</span>&nbsp;  邮箱 &nbsp;<FormMessage></FormMessage>
                  </FormLabel>
                  <FormControl>
                      <Input {...field}  type='email' placeholder='abc@mail.com'></Input>
                    </FormControl>
                </FormItem>
              )}></FormField>
              <Button className='rounded-full' type='submit'>下一步</Button>
            </form>
          </Form>

          {/* 验证码验证表单 */}
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
                    <Input {...field}  type='email' placeholder='abc@mail.com'></Input>
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

          {/* 注册表单 */}
          <Form {...signupForm}  >
            <form onSubmit={signupForm.handleSubmit(onRegister)} 
              className='grid gap-2'>
              {/* 邮件 */}
              <FormField  name="email" render={({ field }) =>(
                <FormItem>
                  <FormLabel className='flex items-center *:text-sm '>
                    <span className=' text-destructive'>*</span>&nbsp; 邮箱 &nbsp;
                    <FormMessage></FormMessage>
                  </FormLabel>
                  <FormControl>
                    <Input  type="email" placeholder='adc@mail.com' {...field}></Input>
                  </FormControl>
                </FormItem>
              )}/>

              <FormField  name='password' render={({ field }) =>(
                <FormItem>
                  <FormLabel className='flex items-center  *:text-sm'><span className=' text-destructive'>*</span>  密码 &nbsp;<FormMessage></FormMessage></FormLabel>
                  <FormControl>
                      <Input type="password"  {...field}></Input>
                    </FormControl>
                </FormItem>
              )}/>
              <FormField  name='repeatPassword' render={({ field }) =>(
                <FormItem>
                  <FormLabel className='flex items-center  *:text-sm'><span className=' text-destructive'>*</span> 确认密码  &nbsp;<FormMessage></FormMessage></FormLabel>
                  <FormControl>
                    <Input type="password"  {...field}></Input>
                  </FormControl>
                </FormItem>
              )}/>

              <FormLabel>手机号</FormLabel>
              <div className='flex gap-4 justify-stretch'>
                <FormField name='phoneCountry' render={({ field }) =>(
                  <FormItem className='w-[120px]'>
                    <Select onValueChange={field.onChange} defaultValue={field.value} >
                      <FormControl>
                        <SelectTrigger >
                          <SelectValue placeholder="CN +86">CN +86</SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value='CN +86'>CN +86</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}/>
                <FormField  name='phoneNumber'  render={({ field }) =>(
                  <FormItem className='flex-1'>
                      <FormControl >
                        <Input  {...field}></Input>
                      </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage></FormMessage>
                  </FormItem>
                )} />
              </div>

              {/* 同意条款 */}
              <FormField  name='isAgree'  render={({ field }) =>(
                  <FormItem className='flex-1'>
                    <div className='flex items-center gap-2 '>
                      <Checkbox id="isAgree" checked={field.value} onCheckedChange={field.onChange}></Checkbox>
                      <Label className='p-0 m-0 text-xs font-semibold *:underline '>创建账号即表示同意  
                        <Link href="/help/#" className='hover:text-destructive'>服务条款</Link>、
                        <Link href="/help/#" className='hover:text-destructive'>风险合规</Link>及
                        <Link href="/help/#" className='hover:text-destructive'>隐私政策声明</Link>
                      </Label>
                    </div>
                    <FormDescription></FormDescription>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <Button type='submit' className='rounded-full'>下一步</Button>
            </form>

          </Form>
          <Dialog open={open}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>注意</DialogTitle>
                <DialogDescription>
                  服务条款、风险合规及隐私政策声明
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 *:underline">
                <Link href="/">服务条款</Link>
                <Link href="/">风险合规</Link>
                <Link href="/">隐私政策声明</Link>
              </div>
              <DialogFooter>
                <Button onClick={(e)=>{ setOpen(false); form.setValue("isAgree", true )}}>同意</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog> 

    </>
  )

}