'use client';

import { Input } from '@/components/ui/input'
import { LoadingSpinner } from '@/components/ui/loader/Loader';
import Link from 'next/link';
import React from 'react'
import { useForm } from 'react-hook-form'

const SignUpForm = () => {

  const {
    register,
    handleSubmit,
    reset,
    formState:{errors,isSubmitting},
    getValues,
  } = useForm()
  

  const onSubmit = async(data:any)=>{

try{
   const res =  await fetch("/api/sign-up",{
        method:"POST",
        headers:{
           "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    })
    reset();
    console.log(res);
}catch(err:any){
    console.log(err.message);
}


}
  
  return (
    <div className='flex flex-col items-center w-[280px] '>
      <h1 className='text-[30px] font-medium'>Sign Up</h1>
      <form className="p-4 flex flex-col gap-4 items-center w-full" onSubmit={handleSubmit(onSubmit)}>
      <Input 
          type="text"
          placeholder='Username'
          {
            ...register("name",{
              required:"Username is required",
            })
          }
        />
        {errors.name && <p className="text-[12px] text-[red]">{errors.name.message?.toString()}</p>}
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
          <Input 
             className="rounded p-1"
             type="password"
             {
              ...register("confirmpassword",{
                required:"Confirm password is required",
                validate:(value)=>value===getValues("password") || "Password must match"
              })
             }
             placeholder="Confirm password"
            />
        {errors.confirmpassword && <p className="text-[12px] text-[red]">{errors.confirmpassword.message?.toString()}</p>}



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
        Already have an account?
        <Link href={'/sign-in'} className=' text-blue-500 underline'> Sign in</Link>
      </p>

    </div>
  )
}

export default SignUpForm
