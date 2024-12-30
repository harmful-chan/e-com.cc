import Image from "next/image"

export default function Brand(){
  return (
    <>
      <div className="flex items-center justify-items-center space-x-5" >
        <Image src='/ecom_logo_500.png' width={52} height={52} alt="icon" className=" rounded-lg"  ></Image>
        <div className="font-semibold text-lg text-left leading-5">Market Leader<br/>since 2003</div>
      </div>
    </>
  )
}