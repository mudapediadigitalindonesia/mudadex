import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const ComponentDetailsContent = () => {
    return (
        <div>
            <Tabs defaultValue="24H" className="w-full">
                <div className='flex'>
                    <TabsContent value="24H">
                        <Card className='border-0'>
                            <CardHeader>
                                <CardTitle>Chart</CardTitle>
                                <CardDescription>
                                    Make changes to your account here. Click save when you're done.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" defaultValue="Pedro Duarte" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="username">Username</Label>
                                    <Input id="username" defaultValue="@peduarte" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Save changes</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="7D">
                        <Card>
                            <CardHeader>
                                <CardTitle>Password</CardTitle>
                                <CardDescription>
                                    Change your password here. After saving, you'll be logged out.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="current">Current password</Label>
                                    <Input id="current" type="password" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="new">New password</Label>
                                    <Input id="new" type="password" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Save password</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="30D">
                        <Card>
                            <CardHeader>
                                <CardTitle>Password</CardTitle>
                                <CardDescription>
                                    Change your password here. After saving, you'll be logged out.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="current">Current password</Label>
                                    <Input id="current" type="password" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="new">New password</Label>
                                    <Input id="new" type="password" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Save password</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </div>
                <TabsList className="grid lg:w-52 grid-cols-3 mx-auto bg-transparent">
                    <TabsTrigger value="24H" className="data-[state=active]:bg-[#95f121] data-[state=active]:text-[#09090b]">24H</TabsTrigger>
                    <TabsTrigger value="7D" className="data-[state=active]:bg-[#95f121] data-[state=active]:text-[#09090b]">7D</TabsTrigger>
                    <TabsTrigger value="30D" className="data-[state=active]:bg-[#95f121] data-[state=active]:text-[#09090b]">30D</TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
    );
};

export default ComponentDetailsContent;