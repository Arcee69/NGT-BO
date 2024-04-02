import React from 'react'
import Info from "../../../assets/svg/info.svg"

const AssignOrder = ({ handleClose }) => {
  return (
    <div className='w-[426px] h-[356px] mt-[150px] pt-[48px] px-[24px] pb-[32px] rounded-lg bg-[#fff]'>
        <div className='flex flex-col justify-center items-center gap-4'>
            <p className='font-Mont font-bold text-[32px] '>Assign order ⏳</p>
            <p className='font-Mont text-base text-center'>
                Are you sure you want to Assign this order as to <span className='text-lg font-semibold'>Amos Edos Osamudiamen?</span> 
            </p>
            <div className='bg-[#EDF2F780] px-4 py-2.5 w-[378px] h-[68px] rounded flex items-center gap-3'>
                <img src={Info} alt='info' />
                <p className='font-Mont text-sm text-[#5C6F7F]'>
                    When you click Yes, Assign It,  this order will be moved automatically to awaiting Acceptance
                </p>
            </div>
            <div className='flex items-center gap-[18px]'>
                <button
                    type='button'
                    className='w-[180px] h-[48px] bg-[#fff] border border-[#5C6F7F] rounded'
                    onClick={handleClose}
                >
                    <p className='font-Dm font-medium text-base'>Cancel</p>
                </button>
                <button
                    type='button'
                    className='w-[180px] h-[48px] bg-[#50724D] text-center rounded'
                >
                    <p className='text-[#fff] font-Dm font-medium text-base' >Yes, Assign it</p>
                </button>
            </div>
        </div>
    </div>
  )
}

export default AssignOrder