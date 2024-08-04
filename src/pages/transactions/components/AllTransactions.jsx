import { Skeleton } from '@mui/material';
import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci';

import Empty from "../../../assets/png/empty.png"
import ReactPaginate from 'react-paginate';

const AllTransactions = ({
    allTransactions,
    loading,
    handleText
}) => {
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(10)
    const [itemOffset, setItemOffset] = useState(0);


    //Get Current data
    const endOffset = itemOffset + perPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentData = allTransactions.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(allTransactions.length / perPage);
     
     
    //Change Page 
    const handlePageClick = (event) => {
        const newOffset = (event.selected * perPage) % allTransactions.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
        setPage(event.selected);
    };

  return (
    <div className='mt-6'>
        {/* <div className='flex items-center justify-between'>
            <div className='w-[200px] h-[40px] bg-[#fff] flex items-center justify-between rounded p-2'>
                <input 
                name='search' 
                type='text' 
                placeholder='Search Product'
                onChange={(e) => handleText(e)} 
                className='outline-none w-[146px]'
                />
                <CiSearch className='w-[18px] h-[18px] text-[#8B909A]'/>
            </div>
        </div> */}
        {
        loading ?
        <Skeleton  variant="rectangular" width={1080} height={1000} style={{ backgroundColor: 'rgba(0,0,0, 0.06)', marginTop: "20px" }} />
        :
        <>
            <table className='w-full bg-[#fff] rounded-tr-xl rounded-tl-xl mt-4'>
                <tr className='h-[48px]'>
                    <th className="font-medium font-mont text-[#8B909A] px-4 text-[13px] uppercase text-left">
                        ID
                    </th>
                    <th className="font-medium font-mont text-[#8B909A] px-4 text-[13px] uppercase text-left">
                        Name
                    </th>
                    <th className="font-medium font-mont text-[#8B909A] px-4 text-[13px] uppercase text-left">
                        Email
                    </th>
                    <th className="font-medium font-mont text-[#8B909A] px-4 text-[13px] uppercase text-left">
                        Reference Code
                    </th>
                    <th className="font-medium font-mont text-[#8B909A] px-4 text-[13px] uppercase text-left">
                        Amount
                    </th>
                    <th className="font-medium font-mont text-[#8B909A] px-4 text-[13px] uppercase text-left">
                        Status
                    </th>
                    {/* <th className="font-medium font-mont text-[#8B909A] px-4 text-[13px] uppercase text-left">
                        Action
                    </th> */}
                </tr>

                {currentData?.length > 0 ? currentData?.map((data, index) =>  {
                    console.log(data, "cat")
                    return (
                        <tr key={index} className='bg-white h-[56px] border-t cursor-pointer border-grey-100' >
                            <td className='h-[70px] px-4'>
                                <p className='text-sm font-semibold font-Mont text-dark-100 text-left'>{`#${data?.id?.substring(0, 8)}`}</p> 
                            </td>
                        
                            <td className='h-[70px] px-4'>
                                <p className='text-sm font-Mont text-dark-100 text-left'>{data?.user?.full_name || "N/A"}</p>
                            </td>
                            <td className='h-[70px] px-4'>
                                <p className='text-sm font-Mont text-dark-100 text-left'>{data?.user?.email  || "N/A"}</p>
                            </td>
                            <td className='h-[70px] px-4'>
                                <p className='text-sm font-Mont text-dark-100 text-left'>{data?.reference_code}</p>
                            </td>
                            <td className='h-[70px] px-4'>
                                <p className='text-sm font-Mont text-dark-100 text-left'>{`₦${data?.total_amount}`}</p>
                            </td>
                            <td className='h-[70px] px-4'>
                                <p className={`${data?.status === "Success" ? "text-[#10B981]" :  "text-dark-100"} text-sm font-Mont  text-left `}>{data?.status}</p>
                            </td>

                        
                        </tr>
                    )
                }) : ( 
                    <tr className='h-[654px] bg-white border-t border-grey-100'>
                        <td colSpan="8" className="relative">
                            <div className='absolute inset-0 flex items-center justify-center'>
                                <div className='flex flex-col gap-2 items-center'>
                                    <img src={Empty} alt='empty' className='w-[159px] h-[103px]'/>
                                    <p>Oops! Nothing to see here.</p>
                                </div>
                            </div>
                        </td>
                    </tr>
                )}
            </table>
            <div className=' mb-5 bg-[#fff]'>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    className='w-full flex gap-3 font-Mont text-dark-100 font-semibold justify-end py-2 pr-10'
                    pageCount={pageCount}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                />
            </div>
        </>
        }
        
    </div>
  )
}

export default AllTransactions