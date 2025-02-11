import React from 'react';
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Globe, Twitter, MessageCircle, MessageSquare } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from './badge';

interface props {
  tokenAddress: string
  title: string
  pitch: string
  tokenImage: string
  website: string
  x: string
  telegram: string
  discord: string,
  btnDisabled?: boolean
  tokenSymbol?: string,
}

const TokenAdCard = ({ tokenAddress, title, pitch, tokenImage, website, x, telegram, discord, btnDisabled = false, tokenSymbol = 'N/A' }: props) => {
  return (
    <Card className="w-full max-w-sm overflow-hidden rounded-md">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className='flex items-center gap-3'>
            <Avatar className="h-10 w-10">
              <AvatarImage src={tokenImage} alt={title} />
              <AvatarFallback>{title.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-sm">{title}</h3>
              <p className="text-xs text-muted-foreground truncate max-w-[180px]">{tokenSymbol}</p>
            </div>
          </div>
          <p className='font-semibold text-[10px]'>Ad</p>
        </div>
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{pitch}</p>
        <div className="flex justify-between items-center">
          <div className="flex space-x-1">
            <TooltipProvider delayDuration={50}>
              {website && (
                <Tooltip>
                  <TooltipTrigger asChild onClick={() => window.open(website)}>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                      <Globe className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Website</p>
                  </TooltipContent>
                </Tooltip>
              )}
              {x && (
                <Tooltip>
                  <TooltipTrigger asChild onClick={() => window.open(x)}>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Twitter className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Twitter</p>
                  </TooltipContent>
                </Tooltip>
              )}
              {telegram && (
                <Tooltip>
                  <TooltipTrigger asChild onClick={() => window.open(telegram)}>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M23.1117 4.49449C23.4296 2.94472 21.9074 1.65683 20.4317 2.227L2.3425 9.21601C0.694517 9.85273 0.621087 12.1572 2.22518 12.8975L6.1645 14.7157L8.03849 21.2746C8.13583 21.6153 8.40618 21.8791 8.74917 21.968C9.09216 22.0568 9.45658 21.9576 9.70712 21.707L12.5938 18.8203L16.6375 21.8531C17.8113 22.7334 19.5019 22.0922 19.7967 20.6549L23.1117 4.49449ZM3.0633 11.0816L21.1525 4.0926L17.8375 20.2531L13.1 16.6999C12.7019 16.4013 12.1448 16.4409 11.7929 16.7928L10.5565 18.0292L10.928 15.9861L18.2071 8.70703C18.5614 8.35278 18.5988 7.79106 18.2947 7.39293C17.9906 6.99479 17.4389 6.88312 17.0039 7.13168L6.95124 12.876L3.0633 11.0816ZM8.17695 14.4791L8.78333 16.6015L9.01614 15.321C9.05253 15.1209 9.14908 14.9366 9.29291 14.7928L11.5128 12.573L8.17695 14.4791Z" fill="#ffffff" /> </g></svg>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Telegram</p>
                  </TooltipContent>
                </Tooltip>
              )}
              {discord && (
                <Tooltip>
                  <TooltipTrigger asChild onClick={() => window.open(discord)}>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M11 12.5C11 13.8807 10.1046 15 9 15C7.89543 15 7 13.8807 7 12.5C7 11.1193 7.89543 10 9 10C10.1046 10 11 11.1193 11 12.5ZM8.22293 12.5C8.22293 13.0365 8.57084 13.4713 9 13.4713C9.42916 13.4713 9.77707 13.0365 9.77707 12.5C9.77707 11.9635 9.42916 11.5287 9 11.5287C8.57084 11.5287 8.22293 11.9635 8.22293 12.5Z" fill="#ffffff" /> <path fillRule="evenodd" clipRule="evenodd" d="M15 15C16.1046 15 17 13.8807 17 12.5C17 11.1193 16.1046 10 15 10C13.8954 10 13 11.1193 13 12.5C13 13.8807 13.8954 15 15 15ZM15 13.4713C14.5708 13.4713 14.2229 13.0365 14.2229 12.5C14.2229 11.9635 14.5708 11.5287 15 11.5287C15.4292 11.5287 15.7771 11.9635 15.7771 12.5C15.7771 13.0365 15.4292 13.4713 15 13.4713Z" fill="#ffffff" /> <path fillRule="evenodd" clipRule="evenodd" d="M9.9864 3.33561C9.94083 3.06219 9.78382 2.81995 9.55284 2.66671C9.32186 2.51347 9.03764 2.46298 8.76801 2.52729C6.61476 3.04085 5.39826 3.471 3.47772 4.64723C3.33168 4.73668 3.21105 4.86214 3.1274 5.01158C1.9368 7.13867 1.14514 8.97344 0.657859 10.9416C0.171558 12.9058 1.51992e-05 14.9565 0 17.5C0 17.7652 0.105353 18.0196 0.292888 18.2071C1.35191 19.2661 2.45067 20.1002 3.71884 20.6638C4.99135 21.2294 6.3833 21.5 8 21.5C8.43043 21.5 8.81257 21.2246 8.94868 20.8162L9.62339 18.7921C10.3731 18.918 11.1769 19 12 19C12.8231 19 13.6269 18.918 14.3766 18.7921L15.0513 20.8162C15.1874 21.2246 15.5696 21.5 16 21.5C17.6167 21.5 19.0086 21.2294 20.2812 20.6638C21.5493 20.1002 22.6481 19.2661 23.7071 18.2071C23.8946 18.0196 24 17.7652 24 17.5C24 14.9565 23.8284 12.9058 23.3421 10.9416C22.8549 8.97344 22.0632 7.13867 20.8726 5.01158C20.789 4.86214 20.6683 4.73668 20.5223 4.64723C18.6017 3.471 17.3852 3.04085 15.232 2.52729C14.9624 2.46298 14.6781 2.51347 14.4472 2.66671C14.2162 2.81995 14.0592 3.06219 14.0136 3.33561L13.6356 5.60381C13.129 5.53843 12.5832 5.49994 12 5.49994C11.4168 5.49994 10.8709 5.53843 10.3644 5.60381L9.9864 3.33561ZM16.7135 19.4783L16.3365 18.3471C17.2221 18.0953 18.1008 17.7971 18.9331 17.4013C19.4309 17.1622 19.6405 16.5647 19.4014 16.0669C19.1622 15.5692 18.5647 15.3597 18.0669 15.5986C17.4725 15.8793 16.8456 16.1 16.2191 16.2953C15.0702 16.6535 13.5516 17 12 17C10.4484 17 8.92975 16.6535 7.78088 16.2953C7.15483 16.1001 6.53092 15.8781 5.93607 15.6C5.44219 15.3668 4.83698 15.5709 4.59864 16.0669C4.36123 16.561 4.57887 17.1681 5.0722 17.4039C5.90316 17.7978 6.77969 18.0958 7.66354 18.3471L7.28647 19.4783C6.22623 19.4118 5.33457 19.1933 4.53112 18.8362C3.65215 18.4455 2.83779 17.8709 2.00169 17.0797C2.02016 14.8272 2.19155 13.069 2.59925 11.4223C3.01458 9.74468 3.68586 8.13987 4.7452 6.2178C6.0043 5.46452 6.90106 5.0901 8.19227 4.73633L8.40706 6.02507C7.53196 6.29408 6.64115 6.64982 5.903 7.1977C5.46929 7.52129 5.37507 8.1667 5.7 8.59994C6.03024 9.04026 6.6539 9.1307 7.09547 8.80332C7.4639 8.53958 7.89071 8.34569 8.30889 8.17842C9.14624 7.84348 10.3952 7.49994 12 7.49994C13.6048 7.49994 14.8538 7.84348 15.6911 8.17842C16.1093 8.34568 16.5361 8.53955 16.9045 8.8033C17.3461 9.1307 17.9698 9.04027 18.3 8.59994C18.6241 8.16782 18.526 7.51604 18.0932 7.19491C17.3475 6.65617 16.4693 6.29447 15.5929 6.02507L15.8077 4.73633C17.0989 5.0901 17.9957 5.46452 19.2548 6.2178C20.3141 8.13987 20.9854 9.74468 21.4008 11.4223C21.8085 13.069 21.9798 14.8272 21.9983 17.0797C21.1622 17.8709 20.3479 18.4455 19.4689 18.8362C18.6654 19.1933 17.7738 19.4118 16.7135 19.4783ZM9 15C10.1046 15 11 13.8807 11 12.5C11 11.1193 10.1046 10 9 10C7.89543 10 7 11.1193 7 12.5C7 13.8807 7.89543 15 9 15ZM17 12.5C17 13.8807 16.1046 15 15 15C13.8954 15 13 13.8807 13 12.5C13 11.1193 13.8954 10 15 10C16.1046 10 17 11.1193 17 12.5ZM9 13.4713C8.57084 13.4713 8.22293 13.0365 8.22293 12.5C8.22293 11.9635 8.57084 11.5287 9 11.5287C9.42916 11.5287 9.77707 11.9635 9.77707 12.5C9.77707 13.0365 9.42916 13.4713 9 13.4713ZM15 13.4713C14.5708 13.4713 14.2229 13.0365 14.2229 12.5C14.2229 11.9635 14.5708 11.5287 15 11.5287C15.4292 11.5287 15.7771 11.9635 15.7771 12.5C15.7771 13.0365 15.4292 13.4713 15 13.4713Z" fill="#ffffff" /> </g></svg>

                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Discord</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </TooltipProvider>
          </div>
          <Button disabled={btnDisabled} onClick={() => location.href = `/tokens/details/${tokenAddress}`} variant="default" size="sm" className="text-xs">
            Trade Now!
          </Button>
        </div>
      </CardContent>
    </Card >
  );
};

export default TokenAdCard;