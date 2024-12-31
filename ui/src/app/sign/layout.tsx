
import Brand from "@/components/custom/brand";

export default function SignLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className=" grid grid-cols-2 gap-0 m-0 p-0">
        <div className=" h-screen flex  flex-col gap-1 justify-between p-12 bg-black text-white">
          <div>
            <Brand></Brand>
            <h1 className=" text-7xl mt-36 ml-10">E-COM.CC</h1>
          </div>
          <p className=" text-lg tracking-wide">"E-COM.CC 精準服務,電商專屬, 成就商業奇跡"</p>
        </div>
        <div>{children}</div>
      </div>
    </>
  );
}
