
"use client"

import  Link from "next/link";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { ArrowDown, ArrowRight, DoubleDown, Facebook, Telegram, Tiktok, Twitter, WeixinMiniApp, Youtobe } from '@icon-park/react'


const lang = [
  {
    value: "HK",
    label: "HK | USD",
  }
]


export default function HomePage() {

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <div className=" hidden md:block   bg-[#121212]  text-white  w-auto">

      <section className="fixed top-0 w-screen h-24 px-40 grid grid-flow-col justify-items-stretch bg-[#121212] z-10">
        <div className="flex items-center justify-items-center space-x-5" >
          <Image src='/ecom_logo_500.png' width={52} height={52} alt="icon" className=" rounded-lg"  ></Image>
          <div className="font-semibold text-lg text-left leading-5">Market Leader<br/>since 2003</div>
        </div>
        <div className=" flex flex-row-reverse gap-5 items-center ">
          <Link className="  bg-transparent rounded-full  border-2 text-white h-12 px-8  flex items-center justify-items-center hover:bg-white hover:text-black"  href="/personal" >个人中心</Link>
          <Link href="/help">帮助文档</Link>
        </div>
      </section>

      {/* 主页 */}
      <section id="section1" className="grid grid-rows-[96px_1fr_96px]  gap-32 h-screen px-40">
        <div></div>
        <div>
          <h1 className="text-7xl font-semibold">E-COM.CC</h1>
          <p className="pl-2 text-xl max-w-[600px] leading-7">如果所购买的外国网站礼品卡来源不合法，如明知是通过诈骗、盗窃等犯罪手段获取的赃卡而予以收购、销售，可能构成掩饰、隐瞒犯罪所得、犯罪所得收益罪.</p>
          <Button variant="secondary" className=" rounded-full px-24  py-4 mt-24" >
            <Link href="/personal" className="flex items-center gap-4">
                个人中心 <ArrowRight theme="filled" size="24" />
            </Link>
          </Button>

        </div>
        <Link className="grid items-center justify-items-center" href="#section2">
          <DoubleDown theme="filled" size="48" />
        </Link>
      </section>

      <section id="section2" className=" grid grid-rows-[96px_1fr_96px] gap-16 h-screen px-40">
        <div></div>
        <div className="grid  justify-items-end gap-4">
          <div className=" flex items-center  h-14 text-3xl">
            我们能为您提供什么服务?
          </div>

          <Tabs className=" h-[350px] w-[480px]"  defaultValue="btn1">
            <TabsList className=" rounded-full border border-white bg-black flex *:flex-1 *:rounded-full *:py-3 *:px-10 py-7 *:text-lg ">
              <TabsTrigger value="btn1" aria-checked >跨境采购</TabsTrigger>
              <TabsTrigger value="btn2">国际专线</TabsTrigger>
              <TabsTrigger value="btn3">跨境支付</TabsTrigger>
      
            </TabsList>
            <TabsContent value="btn1">
              {/* btn1 */}
              <div className=" grid  grid-cols-2 gap-3 pt-5 ">
                <div className="grid justify-items-end" >
                  <p className="text-3xl my-4" >电商采购账号  </p>
                  <p className="text-xs grid justify-items-end" > 
                    <span>电商成品号可直接用于采购推广</span>
                    <span>Amazon, Aliexpress</span>
                    <span>Tiktok,Ebay,Esty</span>
                  </p>
                </div>
                <div className="grid justify-items-end">
                  <p className="text-3xl  my-4">长效邮箱 </p>
                  <p className="text-xs">Email, Outlook, hotmail, Zyk</p>
                </div>
                <div className="grid justify-items-end">
                  <h1 className="text-3xl my-4">国际短信接码 </h1>
                  <p className="text-xs">美国，英国，日本，澳大利亚</p>            
                </div>
                <div className="grid justify-items-end">
                  <h1 className="text-3xl my-4">上网物流单号 </h1>
                  <p className="text-xs">DHL, Fedex, UPS, USPS, EMS, 邮政大包</p>            
                </div>
              </div>
            </TabsContent>

              <TabsContent value="btn2">
              {/* btn2 */}
              <div className=" grid  grid-cols-2 gap-3 pt-5 ">
                <div className="grid justify-items-end" >
                  <p className="text-3xl my-4" >白名单IP  </p>
                  <p className="text-xs" > 大数据过滤风险IP更适用单一平台<br/>Amazon, Aliexpress, Tiktok,Ebay,Esty,</p>
                </div>
                <div className="grid justify-items-end">
                  <p className="text-3xl  my-4 ">住宅IP </p>
                  <p className="text-xs">真实外国公寓IP, 流量计费低至$10/GB</p>
                </div>
                <div className="grid justify-items-end">
                  <h1 className="text-3xl my-4">机场节点IP </h1>
                  <p className="text-xs">可用于日常上网浏览视频，$5/月</p>            
                </div>
                <div className="grid justify-items-end">
                  <h1 className="text-3xl my-4">SD-WAN 专线 </h1>
                  <p className="text-xs">专业境外网络解决方案</p>            
                </div>
              </div>

            </TabsContent>
            <TabsContent value="btn3">
              <div className=" flex flex-col items-center justify-center h-[200px] justify-items-center">
                <Link className=" rounded-full bg-white text-black  text-3xl font-semibold p-3 px-6" href="/help">请来联系客服</Link>
              </div>
            </TabsContent>
          </Tabs>
    

        </div>
        <Link className="grid items-center justify-items-center" href="#section3">
          <DoubleDown theme="filled" size="48" />
        </Link>
      </section>

      <section id="section3" className="grid gap-32 px-40">
        <div className="h-[96px]"></div>
        <div>
          <h1 className="grid justify-items-center text-3xl font-semibold">常见问题</h1>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>问题1</AccordionTrigger>
              <AccordionContent>
                回答1.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>问题1</AccordionTrigger>
              <AccordionContent>
                回答1.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>问题1</AccordionTrigger>
              <AccordionContent>
                回答1.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>问题1</AccordionTrigger>
              <AccordionContent>
                回答1.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>


        
      </section>
      <div className="absolute top-20 right-0  w-[350px] h-[700px]  bg-no-repeat" 
        style={{backgroundImage: "url(/flower.svg)", backgroundSize: '700px'}}>
      </div>


      <div className="absolute left-0 top-[1024px]  w-[350px] h-[700px]  bg-no-repeat" 
        style={{backgroundImage: "url(/flower.svg)", backgroundSize: '700px', backgroundPosition: "-350px"}}>
      </div>


      <footer className="grid mt-[200px] px-40 h-[500px]">
        <div className=" flex items-center gap-2">
          <Image src="/ecom_logo_500.png" width={32} height={32} alt="icon"></Image>
          <span className="text-2xl font-semibold">易勘</span>
        </div>
        <div className=" text-gray-300 text-sm py-1">@2019-2024 E-COM.CC </div>
        {/* 地区 | 货币 */}
        <Popover open={open} onOpenChange={setOpen} >
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" aria-expanded={open} 
              className="w-[120px] justify-between bg-transparent  rounded-none my-7">
              {value ? lang.find((framework) => framework.value === value)?.label : lang[0].label}
              <ChevronsUpDown />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[120px] p-0">
            <Command>
              <CommandInput placeholder="Lang" className="h-9" />
              <CommandList>
                <CommandEmpty>Lang found.</CommandEmpty>
                <CommandGroup>
                  {lang.map((framework) => (
                    <CommandItem key={framework.value} value={framework.value} onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue)
                        setOpen(false)
                      }} >
                      {framework.label}
                      <Check className={cn( "ml-auto", value === framework.value ? "opacity-100" : "opacity-0" )} />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <div className=" grid grid-cols-4 gap-0  justify-items-start">
          <div className=" flex flex-col gap-2">
            <h1 className=" text-2xl font-semibold mb-2">关于 E-COM.CC</h1>
            <Link href="/about">关于公司</Link>
            <Link href="/about">关于公司</Link>
            <Link href="/about">关于公司</Link>
            <Link href="/about">关于公司</Link>
            <Link href="/about">关于公司</Link>
          </div>
          <div className=" flex flex-col gap-2">
            <h1 className=" text-2xl font-semibold mb-2">关于 E-COM.CC</h1>
            <Link href="/about">关于公司</Link>
            <Link href="/about">关于公司</Link>
            <Link href="/about">关于公司</Link>
            <Link href="/about">关于公司</Link>
            <Link href="/about">关于公司</Link>
          </div>
          <div className=" flex flex-col gap-2">
            <h1 className=" text-2xl font-semibold mb-2">关于 E-COM.CC</h1>
            <Link href="/about">关于公司</Link>
            <Link href="/about">关于公司</Link>
            <Link href="/about">关于公司</Link>
            <Link href="/about">关于公司</Link>
            <Link href="/about">关于公司</Link>
          </div>
          <Image src="/ecom_logo_500.png" width={100} height={100} alt="png"></Image>
        </div>
        {/* 社交媒体链接 */}
        <div className=" my-7 flex gap-5  *:text-white ">
          <div>相关链接</div>
          <Link href="/#"><Telegram theme="filled" size="24" /></Link>
          <Link href="/#"><Youtobe theme="outline" size="24" /></Link>
          <Link href="/#"><Twitter theme="filled" size="24" /></Link>
          <Link href="/#"><Facebook theme="filled" size="24" /></Link>
          <Link href="/#"><Tiktok theme="filled" size="24" /></Link>
          <Link href="/#"><WeixinMiniApp theme="outline" size="24" /></Link>
        </div>
      </footer>

    </div>
  );
}
