import Brand from "@/components/custom/brand";
import Image from "next/image";

import  Link from "next/link";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <section className="fixed top-0 w-screen h-24 px-40 grid grid-flow-col justify-items-stretch bg-[#121212] text-white z-10">
        <Brand></Brand>
        <div className=" flex flex-row-reverse gap-5 items-center ">
          <Link className="  bg-transparent rounded-full  border-2 text-white h-12 px-8  flex items-center justify-items-center hover:bg-white hover:text-black"  href="/personal" >个人中心</Link>
          <Link href="/help">帮助文档</Link>
        </div>
      </section>
      {children}
    </>
  );
}
