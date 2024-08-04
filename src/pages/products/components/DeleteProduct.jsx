import React from 'react'
import { CgSpinner } from 'react-icons/cg';
import { toast } from 'react-toastify'

import Info from "../../../assets/svg/info.svg"

import { appUrls } from '../../../services/urls'
import { api } from '../../../services/api'

const DeleteProduct = ({ handleClose, deleteData, deleteProductLoading, setDeleteProductLoading }) => {


    console.log(deleteData, "deleteData")

    
    const submitForm = (values, action) => {
        setDeleteProductLoading(true)

        api.delete(appUrls?.PRODUCTS_URL + `/delete/${deleteData?.id}`)
        .then((res) => {
            console.log(res, "john")
            setDeleteProductLoading(false)
            toast(`${res?.data?.message}`, {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
            })
            handleClose();
        })
        .catch((err) => {
            console.log(err, "vitamin")
            setDeleteProductLoading(false)
            if(err?.status === 500) {
                toast(`Internal Server Error`, {
                    position: "top-right",
                    autoClose: 5000,
                    closeOnClick: true,
                })
            } else {
                toast(`${err?.data?.message}`, {
                    position: "top-right",
                    autoClose: 5000,
                    closeOnClick: true,
                })
            }
            handleClose()
        })
    }

  return (
    <div className='w-[426px] h-[356px] mt-[150px] pt-[48px] overflow-y-scroll px-[24px] pb-[32px] rounded-lg bg-[#fff]'>
        <div className='flex flex-col justify-center items-center gap-4'>
            <p className='font-Mont font-bold text-[32px] '>Delete Product ⏳</p>
            <p className='font-Mont text-base text-center'>
                Are you sure you want to Delete this product?
            </p>

            <div className='bg-[#EDF2F780] px-4 py-2.5 w-[378px] h-[68px] rounded flex items-center gap-3'>
                <img src={Info} alt='info' />
                <p className='font-Mont text-sm text-[#5C6F7F]'>
                    When you click Yes, Delete,  this product will be deleted
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
                    className='w-[180px] h-[48px] bg-[#50724D] text-center flex items-center justify-center rounded'
                    onClick={() => submitForm()}
                >
                    <p className='text-[#fff] font-Dm font-medium text-base'>{deleteProductLoading ? <CgSpinner className='animate-spin text-lg'/> : " Yes, Delete"}</p>
                </button>
            </div>
        </div>
    </div>
  )
}

export default DeleteProduct