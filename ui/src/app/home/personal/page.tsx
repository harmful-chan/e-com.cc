import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "@icon-park/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function PersonalPage() {
  return <>
    <div className="pt-24 px-20 w-full">
      {/* 滚动条 */}
      <div className="rounded-sm border-black border-2 mt-2">
        <div className="overflow-x-auto flex   no-scrollbar ">
          <p className="whitespace-nowrap animate-scroll-x bg-white">是一段很长很长的文字内容，会自动在水平方向滚动起来，而且不会超出这个div容器哦，是不是很有意思呀</p>
        </div>
      </div>
      <div className="flex flex-row-reverse p-4">
        <div></div>
        <div className="w-[400px]">
          <Card>
            <CardHeader>
              <div className=" text-lg font-semibold">资产总值</div>
              <div className="flex items-end gap-2">
                <div className=" text-4xl ">0.11</div>
                <div>USD</div>
              </div>
              <div className="flex gap-2">
                <Button className=" rounded-full">充值</Button>
                <Button className=" rounded-full">转账</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>账户余额列表</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
      
    </div>
  </>
}