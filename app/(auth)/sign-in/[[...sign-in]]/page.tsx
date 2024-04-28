'use client';

import { Input } from '@/components/ui/input'
import { LoadingSpinner } from '@/components/ui/loader/Loader';
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
  

  const onSubmit = async(data:any)=>{

console.log(data);
reset()
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
            minLength:{
              value:10,
              message:"Password must be at least 10 characters"
            }
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


   
    </div>
  )
}

export default SignInForm
