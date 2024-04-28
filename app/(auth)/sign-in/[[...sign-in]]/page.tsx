import { Input } from '@/components/ui/input'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-[30px] font-medium'>Sign In </h1>
      <div className="p-4 flex flex-col gap-4">
         <Input placeholder='Enter your Email'/>
         <Input placeholder='Enter your Password'/>
      </div>

    <p className="text-[#ff0000f3]">Error</p>

    </div>
  )
}

export default page
