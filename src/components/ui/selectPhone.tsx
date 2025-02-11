import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import data from '../../../public/phone.json'
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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

interface props {
  setPhone: Dispatch<SetStateAction<string>>
}

const SelectPhone = ({ setPhone }: props) => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [inputFocus, setInputFocus] = useState(false)
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (!inputFocus) {
      setPhone(value + inputValue)
    }
  }, [inputFocus])


  return (
    <div className='flex items-center gap-2 w-full border rounded-md'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-fit justify-between border-0"
          >
            {value
              ? data.find((item) => item.dial_code === value)?.dial_code
              : "Select country"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search country" />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {data.map((item) => (
                  <CommandItem
                    key={item.code}
                    value={item.dial_code}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === item.dial_code ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {item.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <input required onFocus={() => setInputFocus(true)} onBlur={() => setInputFocus(false)} type="text" className='w-full h-9 bg-transparent focus:outline-none' placeholder='type you phone here' onChange={(e) => setInputValue(e.target.value)} />
    </div>
  );
};

export default SelectPhone;