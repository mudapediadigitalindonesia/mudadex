import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from '@/components/ui/input';
import { } from 'next-auth';
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import SelectPhone from '@/components/ui/selectPhone';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { LoaderCircle } from 'lucide-react';
import axios from 'axios';

const ModalLoginReg = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [tabsValue, setTabsValue] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { data: session }: any = useSession()
  const [load, setLoad] = useState(false)
  const [fullname, setFullname] = useState('')
  const [rePassword, setRepassword] = useState('')
  const [regTabValue, setRegTabValue] = useState('')
  const [emailOtpCode, setEmailOtpCode] = useState('')
  const [verLoad, setVerLoad] = useState(false)

  const handleSignInUser = async () => {
    if (!email || !password) {
      toast.error('The field must be filled!')
    } else {
      setLoad(true)
      try {
        const resp = await signIn('user', { email, password, redirect: false })
        if (resp?.status === 401) {
          toast.error('Failed to logged in! wrong credentials')
          setLoad(false)
        } else if (resp?.error) {
          toast.error('Failed fo fetch! please contact de developer')
          setLoad(false)
        } else {
          toast.success('Login succesfully!')
          setModalOpen(false)
          setLoad(false)
          console.log(session)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    if (!modalOpen) {
      setFullname('')
      setEmail('')
      setPassword('')
      setRepassword('')
      setRegTabValue('')
      setEmailOtpCode('')
    }
  }, [modalOpen])

  const handleLoginGoogle = async () => {
    try {
      const resp = await signIn('google', { redirect: false, callbackUrl: '/exchange' })
      if (resp?.error) {
        toast.error('Error while logging in!')
        console.log(resp.error)
      }
    } catch (error) {
      toast.error('Login failed, please check your network or contact the developer!')
      console.log(error)
    }
  }

  const handleLoginGithub = async () => {
    try {
      const resp = await signIn('github', { redirect: false, callbackUrl: '/exchange' })
      if (resp?.error) {
        toast.error('Error while logging in!')
        console.log(resp.error)
      }
    } catch (error) {
      toast.error('Login failed, please check your network or contact the developer!')
      console.log(error)
    }
  }


  const handleNextStep = async () => {
    if (!fullname || !email || !password || !rePassword) {
      toast.error('Please complete the field!')
    } else {
      if (password.length < 8) {
        toast.error('Password at least 8 character')
      } else {
        if (password !== rePassword) {
          toast.error('Password doenst match!')
        } else {
          setRegTabValue('verify')
          try {
            const body = {
              to: email
            }
            await axios.post('/api/auth/sendEmailOtp', body)
          } catch (error: any) {
            if (error.status === 401) {
              toast.error('Failed to send an email otp!')
            } else {
              toast.error('Internal server error!')
              console.log(error)
            }
          }
        }
      }
    }
  }

  const handleVerifyOtp = async () => {
    setVerLoad(true)
    try {
      await axios.post('/api/otp/verify', { code: emailOtpCode })
      const sendToDatabase = await axios.post('/api/auth/register', {
        fullname,
        email,
        password,
        emailVerified: true,
        phoneVerified: true,
      })
      if (sendToDatabase.status === 200) {
        toast.success('Your account has been verified!!')
        setRegTabValue('')
        setTabsValue('login')
      } 
      setVerLoad(false)
    } catch (error: any) {
      if (error.status === 401) {
        setVerLoad(false)
        toast.error(error.response.data)
      } else if (error.status === 303) {
        toast.error('Sorry, the email has been registered!')
        setVerLoad(false)
      } else {
        setVerLoad(false)
        toast.error('Internal server error!')
        console.log(error)
      }
    }
  }

  useEffect(() => {
    if (tabsValue === 'login') {
      setFullname('')
      setEmail('')
      setPassword('')
      setRepassword('')
      setEmailOtpCode('')
    } else {
      setFullname('')
      setEmail('')
      setPassword('')
      setRepassword('')
      setEmailOtpCode('')
    }
  }, [tabsValue])

  return (
    <Dialog onOpenChange={setModalOpen} open={modalOpen}>
      <Button onClick={() => setModalOpen(true)} size={'sm'}>Login & Register</Button>
      <DialogContent className='xl:max-w-screen-lg md:max-w-screen-md lg:max-w-screen-lg sm:max-w-screen-sm'>
        <DialogHeader className='flex justify-between items-start gap-16 flex-row mt-3'>
          <DialogTitle className='w-1/2 text-center lg:flex hidden flex-col gap-3 items-center'>
            <h1 className='text-3xl font-semibold'>Unlock rewards exclusively for new users</h1>
            <img src="https://www.okx.com/cdn/assets/plugins/contentful/a0gcvrswkr1o/4GexLcXKBCbjakXDa0uvPR/eb59807f353f0bfb0a4e56483c9faf53/Global_Join_Page_Icon.png?x-oss-process=image/format,webp/format,webp" alt="banners" />
          </DialogTitle>
          <DialogDescription className='lg:w-1/2 w-full'>
            <div className='w-full'>
              <Tabs className="w-full" defaultValue='login' value={tabsValue} onValueChange={setTabsValue}>

                <TabsList className='w-full'>
                  <TabsTrigger value="login" className='w-full'>Login</TabsTrigger>
                  <TabsTrigger value="register" className='w-full'>Register</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <div className='w-full p-3 space-y-5 text-start'>
                    <p className='text-muted-foreground italic'>Please fill this field</p>
                    <div className='w-full flex items-start flex-col gap-3'>
                      <div className='space-y-2 w-full'>
                        <label htmlFor="email" className='font-medium text-foreground'>Email</label>
                        <Input className='w-full' type='text' placeholder='type your email here...' value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>
                      <div className='space-y-2 w-full'>
                        <label htmlFor="password" className='font-medium text-foreground'>Password</label>
                        <Input className='w-full' type='password' placeholder='type your password here...' onChange={(e) => setPassword(e.target.value)} value={password} />
                      </div>
                    </div>
                    <p className='text-center w-full'>Don't have an account? <button onClick={() => setTabsValue('register')} className='underline hover:text-foreground'>Register</button> here</p>
                    <Button disabled={load} className='w-full font-semibold' size={'lg'} onClick={handleSignInUser}>
                      {!load ? 'Login' : (
                        <div className="flex items-center gap-2">
                          <LoaderCircle size={18} className='animate-spin' />
                          Loading...
                        </div>
                      )}
                    </Button>
                    <p className='text-center text-sm'>Or login with</p>
                    <div className='flex items-center justify-center w-full gap-3'>
                      <Button size={'icon'} variant={'default'} onClick={handleLoginGoogle}>
                        <img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="google" />
                      </Button>
                      <Button onClick={handleLoginGithub} size={'icon'} variant={'default'}>
                        <img src="https://cdn2.iconfinder.com/data/icons/social-media-outline-1/32/github_social_media_online-256.png" alt="github" />
                      </Button>

                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="register">
                  {regTabValue === '' ? (
                    <div className="w-full p-3 space-y-5 text-start">
                      <p className='text-muted-foreground italic'>Please fill this field</p>
                      <div className='w-full flex items-start flex-col gap-3'>
                        <div className='space-y-2 w-full'>
                          <label htmlFor="email" className='font-medium text-foreground'>Fullname</label>
                          <Input required className='w-full' type='text' placeholder='type your fullname here...' value={fullname} onChange={(e) => setFullname(e.target.value)} />
                        </div>
                        <div className='space-y-2 w-full'>
                          <label htmlFor="password" className='font-medium text-foreground'>Email</label>
                          <Input required className='w-full' type='email' placeholder='your email here...' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        {/* <div className='flex flex-col gap-2 w-full'>
                          <label htmlFor="password" className='font-medium text-foreground'>Phone</label>
                          <Input className='w-full' type='text' placeholder='your phone here...' />
                          <SelectPhone setPhone={setPhone} />
                        </div> */}
                        <div className='space-y-2 w-full'>
                          <label htmlFor="password" className='font-medium text-foreground'>Password</label>
                          <Input required className='w-full' value={password} type='password' placeholder='your password here...' onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className='space-y-2 w-full'>
                          <label htmlFor="password" className='font-medium text-foreground'>Re-type Password</label>
                          <Input required className='w-full' type='password' value={rePassword} placeholder='re-type your password here...' onChange={(e) => setRepassword(e.target.value)} />
                        </div>
                      </div>
                      <div className='flex justify-end w-full'>
                        <Button onClick={handleNextStep} size={'lg'} className='w-full'>Next</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full p-3 space-y-5 text-center">
                      <div className='space-y-1 '>
                        <p>Please verify your email & phone!</p>
                        <p>The otp code has been send in your email & we have text in your phone number!</p>
                      </div>
                      <p className='text-center'>Enter your email OTP</p>
                      <div className='w-full flex justify-center'>
                        <InputOTP maxLength={6} value={emailOtpCode} onChange={(value) => setEmailOtpCode(value)}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                      <p className='text-center'>Enter your phone OTP</p>
                      <div className='w-full flex justify-center'>
                        <InputOTP maxLength={6}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                      <div className='flex justify-end w-full'>
                        <Button size={'lg'} disabled={verLoad} onClick={handleVerifyOtp} className='w-full'>{
                          !verLoad ? 'Verify' : (
                            <div className="flex items-center gap-2">
                              <LoaderCircle size={18} className='animate-spin' />
                              Loading...
                            </div>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}

                </TabsContent>
              </Tabs>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ModalLoginReg;