'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import {Api} from '@/app/_components/_api'
import { Loader2 } from 'lucide-react';

const emailCheckSchema = z.object({
  email: z.string().email({message:'格式错误'}).trim(),
})

export default function UpPage(props:any){
  const [isWaitEmailCode, setIsWaitEmailCode] = useState(false)
  const [countdown, setCountdown] = useState(30);

  const router = useRouter();
  

  const form = useForm<z.infer<typeof emailCheckSchema>>({
    resolver: zodResolver(emailCheckSchema),
    defaultValues:{
      email: 'abc.test@e-com.cc'
    }
  })

  const onEmailCheck = async (data: z.infer<typeof emailCheckSchema>) =>{

    setIsWaitEmailCode(true)
    try{
      const { data:{ isSend, isVerify } } = await Api.check(data.email);
      // 未发送 || 已发送，未校验
      if(!isSend || !isVerify){    
        console.log(data)
        await Api.send(data.email)
        props.email = data.email
        router.push('/sign/up/send')
        
      }else{  // 已校验
  
      }
    }catch(error){

    }finally{
      setIsWaitEmailCode(false)
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






  return(
    <>

          {/* 邮箱验证表单 */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onEmailCheck)} 
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
              <Button className='rounded-full' type='submit' disabled={isWaitEmailCode}>
                <div  className={ isWaitEmailCode ? 'hidden' : 'block' }>下一步</div>
                <div  className={ `${isWaitEmailCode ? 'block' : 'hidden'}  flex items-center gap-2` }>                        
                  <Loader2 className="animate-spin" />等待
                </div>
              </Button>
            </form>
          </Form>
    </>
  )

}