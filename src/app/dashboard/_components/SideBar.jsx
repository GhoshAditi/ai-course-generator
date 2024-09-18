"use client"

import React from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {HiOutlineHome, HiOutlinePower, HiOutlineShieldCheck, HiOutlineSquare3Stack3D} from "react-icons/hi2";
// import Link from 'next/link';
import { Progress } from '@/components/ui/progress';



function SideBar() {
const Menu=[
{
    id:1,
    name:'Home',
    icon:<HiOutlineHome/>,
    link:'/dashboard'
},
{
    id:1,
    name:'Explore',
    icon:<HiOutlineSquare3Stack3D/>,
    link:'/dashboard/explore'
},
{
    id:1,
    name:'Upgrade',
    icon:<HiOutlineShieldCheck/>,
    link:'/dashboard/upgrade'
},
{
    
    id:1,
    name:'Logout',
    icon:<HiOutlinePower/>,
    link:'/dashboard/logout'
},
]

const path=usePathname();


  return (
    <div className='fixed h-full md:w-64 shadow-md'>
        <div className='flex items-center'>    
            <div className='ml-[-2]'>   
        <Image src={'/images/logo.webp'} width={100} height={50} />
        </div>
        <p className='text-xl font-bold'>LearnEasy</p>
      </div>
      <hr className='my-5'/>
      <ul>

        {Menu.map((item) => (
        //  <Link href={item.path}>
          <li key={item.id} className={`flex items-center gap-2 my-2
          p-3 cursor-pointer hover:bg-gray-100 hover:text-black rounded-lg mb-3 ${item.path==path&&'bg-gray-100 text-black'}`}>
            <div className='mr-2 ml-3 text-2xl'>{item.icon}</div>
            <a href={item.link} className='text-lg foot-bold'>
              {item.name}
            </a>
          </li>
        //  </Link>
        ))}

      </ul>
      <div className='bottom-10 width-[80%]'>
        <Progress value={33}/>
        <h2 className='text-sm my-2'>3 out of 5 Courses created</h2>
        <h2 className='text-xs text-gray-500'>Upgrade your plan for Unlimited Course Generation</h2>
      </div>
    </div>
  
  )
}

export default SideBar