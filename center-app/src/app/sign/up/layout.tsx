'use client'

import Brand from "@/components/custom/brand";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "@icon-park/react";
import React from "react";
import { useState } from "react";

export default function UpLayout({ children }: { children:any}) {
  const [isCanLeft, setIsCanLeft] = useState(false)
  const [isCanRight, setIsCanRight] = useState(false)

    const [isShowEmailCheckForm, setIsShowEmailCheckForm ] = useState(true)
    const [isShowEmailVertifyForm , setIsShowEmailVertifyForm] = useState(false)
    const [isShowPasswordForm , setIsShowPasswordForm] = useState(false)

  const [a, b ,c] = '';
  const email:string = '';

  const onLeft = () => {
    if(isShowEmailVertifyForm){
      setIsShowEmailCheckForm(true)
      setIsShowEmailVertifyForm(false)
      setIsShowPasswordForm(false)
      setIsCanLeft(false)
      setIsCanRight(false)
    }else if(isShowPasswordForm){
      setIsShowEmailCheckForm(false)
      setIsShowEmailVertifyForm(true)
      setIsShowPasswordForm(false)
      setIsCanLeft(true)
      setIsCanRight(false)
    }
  }


  const onRight = () => {
    if(isShowEmailCheckForm){
      setIsCanLeft(true)
      setIsCanRight(false)
      setIsShowEmailCheckForm(false)
      setIsShowEmailVertifyForm(true)
      setIsShowPasswordForm(false)
    }else if(isShowEmailVertifyForm){
      setIsCanLeft(true)
      setIsCanRight(false)
      setIsShowEmailCheckForm(false)
      setIsShowEmailVertifyForm(false)
      setIsShowPasswordForm(true)
    }
  }

  return (
    <div className="h-screen grid justify-items-center items-center ">
      <div className='flex flex-col w-[400px]'>
        <div className="text-2xl font-semibold pb-4 flex justify-between">
          <span>注册账号</span>  
          <div className=' space-x-2'>
            <Button variant='outline' onClick={onLeft} size="icon" disabled={!isCanLeft}>
              <ArrowLeft fill="#000"/>
            </Button>
          </div>
        </div>
      {React.cloneElement(children,{ email })}
      </div>
    </div>
  )
}
