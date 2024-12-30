import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SigninPage from "../../_components/sign-in";
import SignupPage from "../../_components/sign-up";
import Agreement from "@/markdown/agreement.mdx";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function LoginPage() {
    return (
        <>
            <div className="flex flex-row-reverse items-center h-screen">
                <div className="hidden lg:block lg:w-[100px] h-screen bg-black text-white">
                   
                </div>
                <div className="flex flex-auto items-center justify-center md:max-w-96 ">
                    <div className="text-9xl text-">账号惠普好的外婆</div>
                    <Tabs defaultValue='signin' >
                        <TabsList className='grid grid-cols-2'>
                            <TabsTrigger value='signin' >登录</TabsTrigger>
                            <TabsTrigger value='signup'>注册</TabsTrigger>
                        </TabsList>
                        <TabsContent value='signin'>
                            <Card>
                                <CardHeader>
                                    <CardTitle >账号</CardTitle>
                                    <CardDescription>使用账号登录</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <SigninPage></SigninPage>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value='signup'>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Account</CardTitle>
                                    <CardDescription>Use your email address as your login account</CardDescription>
                                </CardHeader>
                                <CardContent>

                                    <SignupPage></SignupPage>
                                </CardContent>

                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
                <div className="hidden md:block flex-auto bg-black h-screen"> 
    
                </div>
            </div>
        </>
    );
}