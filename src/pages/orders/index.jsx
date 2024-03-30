import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import { LineChart, CartesianGrid, XAxis, YAxis, Legend, Line, Tooltip, ResponsiveContainer } from 'recharts';
import AllOrders from './components/AllOrders';
import Pending from './components/Pending';
import Completed from './components/Completed';
import Cancelled from './components/Cancelled';

const Orders = () => {
  const [activeTab, setActiveTab] = useState("All")

    const handleChangeTab = (tab) => {
        setActiveTab(tab)
    }

  const data = [
    {
      "name": "Page A",
      "uv": 4000,
      "pv": 2400,
      "amt": 2400
    },
    {
      "name": "Page B",
      "uv": 3000,
      "pv": 1398,
      "amt": 2210
    },
    {
      "name": "Page C",
      "uv": 2000,
      "pv": 9800,
      "amt": 2290
    },
  ]


  return (
    <div className='p-8'>
      <div className='flex items-center justify-between'>
        <p className='text-[24px] text-[#23272E] font-bold'>Order Management</p>
        <div className='bg-[#8CAD07] flex items-center justify-between w-[159px] h-[38px] p-2 rounded'>
          <p className='text-[#fff] font-Mont font-medium'>Create Order</p>
          <FaPlus className='w-4 h-4 text-[#fff]' />
        </div>
      </div>
      <div className='mt-[33px] flex items-center gap-[17px]'>
        <div>
          <div className='w-[354px] h-[197px] rounded-lg p-4 flex items-center bg-[#fff]'>
            <div className='flex flex-col gap-[29px]'>
                <div className='flex flex-col gap-1'>
                    <p className='font-Hat font-semibold text-[#23272E] text-[17px]'>Total Orders</p>
                    <p className='font-Hat text-[#8B909A] text-[13px]'>Last 7 days</p>
                </div>
                <div className='flex flex-col gap-1'>
                    <p className='text-[#23272E] font-Hat font-bold text-[31px]'>20</p>
                    <p>Last 7 days</p>
                </div>
            </div>
            <ResponsiveContainer>
                <LineChart width={150} height={50} data={data}
                    margin={{ top: 5, right: 10, left: 30, bottom: 5 }}
                >
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    {/* <XAxis dataKey="name" /> */}
                    {/* <YAxis /> */}
                    <Tooltip />
                    {/* <Legend /> */}
                    <Line type="monotone" dataKey="pv" stroke="#D02626" />

                </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <div className='w-[354px] h-[197px] rounded-lg p-4 flex items-center bg-[#fff]'>
              <div className='flex flex-col gap-[29px]'>
                  <div className='flex flex-col gap-1'>
                      <p className='font-Hat font-semibold text-[#23272E] text-[17px]'>Pending Orders</p>
                      <p className='font-Hat text-[#8B909A] text-[13px]'>Last 7 days</p>
                  </div>
                  <div className='flex flex-col gap-1'>
                      <p className='text-[#23272E] font-Hat font-bold text-[31px]'>20</p>
                      <p>Last 7 days</p>
                  </div>
              </div>
              <ResponsiveContainer>
                  <LineChart width={150} height={50} data={data}
                      margin={{ top: 5, right: 10, left: 30, bottom: 5 }}
                  >
                      {/* <CartesianGrid strokeDasharray="3 3" /> */}
                      {/* <XAxis dataKey="name" /> */}
                      {/* <YAxis /> */}
                      <Tooltip />
                      {/* <Legend /> */}
                      <Line type="monotone" dataKey="pv" stroke="#D02626" />

                  </LineChart>
              </ResponsiveContainer>
          </div>
        </div>

        <div>
          <div className='w-[354px] h-[197px] rounded-lg p-4 flex items-center bg-[#fff]'>
              <div className='flex flex-col gap-[29px]'>
                  <div className='flex flex-col gap-1'>
                      <p className='font-Hat font-semibold text-[#23272E] text-[17px]'>Completed Orders</p>
                      <p className='font-Hat text-[#8B909A] text-[13px]'>Last 7 days</p>
                  </div>
                  <div className='flex flex-col gap-1'>
                      <p className='text-[#23272E] font-Hat font-bold text-[31px]'>20</p>
                      <p>Last 7 days</p>
                  </div>
              </div>
              <ResponsiveContainer>
                  <LineChart width={150} height={50} data={data}
                      margin={{ top: 5, right: 10, left: 30, bottom: 5 }}
                  >
                      {/* <CartesianGrid strokeDasharray="3 3" /> */}
                      {/* <XAxis dataKey="name" /> */}
                      {/* <YAxis /> */}
                      <Tooltip />
                      {/* <Legend /> */}
                      <Line type="monotone" dataKey="pv" stroke="#D02626" />

                  </LineChart>
              </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className='flex items-center gap-4 mt-[44px]'>
        <p 
          onClick={() => handleChangeTab("All")} 
          className={`${activeTab === "All" ? "text-[#8CAD07] border-b border-2" :  "text-[#8B909A] border-0"} text-center cursor-pointer border-x-0 border-t-0 border border-[#8CAD07] w-[57px] h-[38px]`}
        >
            All
        </p>
        <p 
          onClick={() => handleChangeTab("Pending")} 
          className={`${activeTab === "Pending" ? "text-[#8CAD07] border-b border-2" :  "text-[#8B909A] border-0"} text-center cursor-pointer border-x-0 border-t-0 border border-[#8CAD07] w-[70px] h-[38px]`}
        >
          Pending
        </p>
        <p 
          onClick={() => handleChangeTab("Completed")} 
          className={`${activeTab === "Completed" ? "text-[#8CAD07] border-b border-2" :  "text-[#8B909A] border-0"} text-center cursor-pointer border-x-0 border-t-0 border border-[#8CAD07] w-[78px] h-[38px]`}
        >
          Completed
        </p>
        <p 
          onClick={() => handleChangeTab("Cancelled")} 
          className={`${activeTab === "Cancelled" ? "text-[#8CAD07] border-b border-2" :  "text-[#8B909A] border-0"} text-center cursor-pointer border-x-0 border-t-0 border border-[#8CAD07] w-[99px] h-[38px]`}
        >
          Cancelled
        </p>
      </div>
      <hr />

      {activeTab === "All" && <AllOrders />}
      {activeTab === "Pending" && <Pending />}
      {activeTab === "Completed" && <Completed />}
      {activeTab === "Cancelled" && <Cancelled />}

    </div>
  )
}

export default Orders