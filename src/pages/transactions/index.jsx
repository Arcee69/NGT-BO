import { Skeleton } from '@mui/material';
import React, { useState, useEffect } from 'react'

import { api } from '../../services/api';
import { appUrls } from '../../services/urls';
import AllTransactions from './components/AllTransactions';


const Transactions = () => {
    const [loading, setLoading] = useState(false)
    const [allTransactions, setAllTransactions] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [activeTab, setActiveTab] = useState("All")


    
  const fetchTransactions = async () => {
    setLoading(true)
    await api.get(`${appUrls?.FETCH_TRANSACTION_URL}`)
    .then((res) => {
      console.log(res, "transactions")
      setLoading(false);
      setAllTransactions(res?.data?.data?.transactions)
    })
    .catch((err) => {
        setLoading(false)
      console.log(err, "faro")
    })
  }

  useEffect(() => {
    fetchTransactions()
  }, [searchTerm])

  
  const handleText = (e) => setSearchTerm(e.target.value)

  return (
    <div className='p-8'>
    <div className='flex items-center justify-between'>
        <p className='text-[24px] text-[#23272E] font-bold'>Transactions</p>
   
    </div>
    <div className='mt-[33px] '>
        {
            loading ?
            <Skeleton 
                variant="rectangular" 
                width={354} 
                height={197} 
                style={{ backgroundColor: 'rgba(0,0,0, 0.06)', borderRadius: "8px"}} 
            />
            :
            <div>
                <div className='w-[354px] h-[197px] rounded-lg p-4 flex items-center bg-[#fff]'>
                <div className='flex flex-col gap-[29px]'>
                    <div className='flex flex-col gap-1'>
                        <p className='font-Hat font-semibold text-[#23272E] text-[17px]'>Total Transactions</p>
                        <p className='font-Hat text-[#8B909A] text-[13px]'>Last 7 days</p>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <p className='text-[#23272E] font-Hat font-bold text-[31px]'>{allTransactions?.length}</p>
                        {/* <p>Last 7 days</p> */}
                    </div>
                </div>
                </div>
            </div>
        }
    </div>
    <div className='mt-[44px]'>
        <p 
            // onClick={() => handleChangeTab("All")} 
            className={`${activeTab === "All" ? "text-[#8CAD07] border-b border-2" :  "text-[#8B909A] border-0"} text-center cursor-pointer border-x-0 border-t-0 border border-[#8CAD07] w-[57px] h-[38px]`}
        >
            All
        </p>
    </div>
    <hr />
    {activeTab === "All" && 
        <AllTransactions 
            allTransactions={allTransactions} 
            loading={loading} 
            handleText={(e) => handleText(e)}
        />
    }
    
  
</div>
  )
}

export default Transactions