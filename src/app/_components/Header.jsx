import React from 'react'
import Image from "next/image";
import { Button } from '@/components/ui/button';

function Header() {
  return (
    <div className='flex justify-between items-center shadow-sm bg-gray-50'>
      <div className='flex items-center'>       
        <Image src={'/images/logo.webp'} width={100} height={50}  />
        <p className='text-2xl font-bold'>LearnEasy</p>
      </div>

       <div className="mr-5">
       <Button>Get Started</Button>
       </div>
    </div>
  )
}

export default Header