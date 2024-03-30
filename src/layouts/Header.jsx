import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoIosArrowDown } from "react-icons/io";

import Search from "../assets/png/search.png"
import Notification from "../assets/png/notification.png"

const Header = () => {
  return (
    <div className='bg-[#fff] px-[28px] py-3 w-full flex items-center justify-between'>
        <div>
            <GiHamburgerMenu className="text-[#000] cursor-pointer" />
        </div>
        <div className='flex items-center gap-4'>
            <img src={Search} alt='search' className='w-[40px] h-[40px]'/>
            <img src={Notification} alt='notification' className='w-[40px] h-[40px]'/>
            <div className='w-[218px] h-[40px] bg-[#EDF2F780] rounded-2xl flex justify-between items-center p-3'>
                <div className='flex items-center gap-3'>
                    <div className='rounded-full w-[32px] h-[32px] bg-[#CDD0FE] flex justify-center items-center'>
                        <p className='text-[#8CAD07] text-center'>A</p>
                    </div>
                    <p className='text-[#2E4457] font-Dm'>Admin</p>
                </div>
                <IoIosArrowDown className='text-[#000]'/>
            </div>
        </div>

    </div>
  )
}

export default Header