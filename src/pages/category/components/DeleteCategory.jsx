import React, { useState } from 'react'
import { CgSpinner } from 'react-icons/cg';
import Info from "../../../assets/svg/info.svg"
import { toast } from 'react-toastify';
import { api } from '../../../services/api';
import { appUrls } from '../../../services/urls';

const DeleteCategory = ({ handleClose, deleteData, deleteCategoryLoading, setDeleteCategoryLoading }) => {

    console.log(deleteData, "deleteData")

    
    const submitForm = (values, action) => {
        setDeleteCategoryLoading(true)

        api.delete(appUrls?.GET_PRODUCTS_CATEGORY_URL + `/delete/${deleteData?.id}`)
        .then((res) => {
            console.log(res, "john")
            setDeleteCategoryLoading(false)
            toast(`${res?.data?.message}`, {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
            })
            handleClose();
        })
        .catch((err) => {
            console.log(err, "vitamin")
            setDeleteCategoryLoading(false)
            toast(`${err?.data?.message}`, {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
            })
            handleClose()
        })
    }

  return (
    <div className='w-[426px] h-[356px] mt-[150px] pt-[48px] overflow-y-scroll px-[24px] pb-[32px] rounded-lg bg-[#fff]'>
        <div className='flex flex-col justify-center items-center gap-4'>
            <p className='font-Mont font-bold text-[32px] '>Delete Category ⏳</p>
            <p className='font-Mont text-base text-center'>
                Are you sure you want to Delete this category?
            </p>

            <div className='bg-[#EDF2F780] px-4 py-2.5 w-[378px] h-[68px] rounded flex items-center gap-3'>
                <img src={Info} alt='info' />
                <p className='font-Mont text-sm text-[#5C6F7F]'>
                    When you click Yes, Delete,  this category will be deleted
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
                    <p className='text-[#fff] font-Dm font-medium text-base'>{deleteCategoryLoading ? <CgSpinner className='animate-spin text-lg'/> : " Yes, Delete"}</p>
                </button>
            </div>
        </div>
    </div>
  )
}

export default DeleteCategory