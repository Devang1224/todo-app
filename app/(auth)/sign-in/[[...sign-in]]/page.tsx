'use client';

import { Input } from '@/components/ui/input'
import { LoadingSpinner } from '@/components/ui/loader/Loader';
import Link from 'next/link';
import React from 'react'
import { useForm } from 'react-hook-form'

const SignInForm = () => {

  const {
    register,
    handleSubmit,
    reset,
    formState:{errors,isSubmitting},
    getValues,
  } = useForm()
  

  const onSubmit = (data:any)=>{

   try{

    const res = fetch("/api/verify_token",{
     method:"GET"
    }).then((data)=>data.json()).then((data)=>console.log(data))

    reset();
  }catch(err){
    console.log(err);
   }

  
  }
  
  return (
    <div className='flex flex-col items-center w-[280px] '>
      <h1 className='text-[30px] font-medium'>Sign In</h1>
      <form className="p-4 flex flex-col gap-4 items-center w-full" onSubmit={handleSubmit(onSubmit)}>
         <Input 
          type="email"
          placeholder='Email'
          {
            ...register("email",{
              required:"Email is required",
            })
          }
         />
          {errors.email && <p className="text-[12px] text-[red]">{errors.email.message?.toString()}</p>}
         <Input 
         type="password"
         placeholder='Password'
         {
          ...register("password",{
            required:"Password is required",
          })
         }
         />
          {errors.password && <p className="text-[12px] text-[red]">{errors.password.message?.toString()}</p>}

       {
        isSubmitting ? (
          <LoadingSpinner/>
        ):(
          <button
          disabled={isSubmitting}
          type="submit"
          className="bg-[#6666ff] rounded p-1 w-full"
          > 
            Submit
          </button>
        )
       }
         
      </form>


      <p className='text-[14px]'>
        Don't have an account?
        <Link href={'/sign-up'} className=' text-blue-500 underline'> Sign up</Link>
      </p>
    </div>
  )
}

export default SignInForm
