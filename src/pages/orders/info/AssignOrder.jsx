import React, { useEffect, useState } from 'react'
import Info from "../../../assets/svg/info.svg"
import { CgSpinner } from 'react-icons/cg'
import { api } from '../../../services/api';
import { appUrls } from '../../../services/urls';
import { toast } from 'react-toastify';

const AssignOrder = ({ handleClose, state }) => {
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState("")
    const [users, setUsers] = useState([])
    const [allRetailUsers, setAllRetailUsers] = useState([])
    

    const [retailerClicked, setRetailerClicked] = useState(false);
    const [errorJobRole, setErrorJobRole] = useState(false);
    const [allRetailers, setAllRetailers] = useState([]);
    const [searchRetailer, setSearchRetailer] = useState("");


    console.log(state, "slim")


    const getAllCustomers = async () => {
        await api.get(appUrls?.GET_CUSTOMER_URL)
        .then((res) => {
            setLoading(false);
            console.log(res, "zambia")
            setUsers(res?.data?.data?.user)
        })
        .catch((err) => {
            setLoading(false);
            console.log(err, "Calcio")
        })
    }

    useEffect(() => {
        getAllCustomers()
    }, [])

    const getRetailUsers = () => {
        const retailUsers = []
        for (let i = 0; i < users?.length; i++) {
            console.log(users[i])
            if(users[i]?.type === "retailer") {
                retailUsers.push(users[i])
            }
        }
        return retailUsers
    }


    useEffect(() => {
        const retailUsers = getRetailUsers();
        setAllRetailUsers(retailUsers)
    }, [users])

    console.log(allRetailUsers, "allRetailUsers");


    const handleSelectRetailer = (role) => {
        setSearchRetailer(role);
        setRetailerClicked(false)
        setErrorJobRole("");
      };

      function searchRetailers(searchTerm) {
        const lowerCaseSearchTerm = searchTerm?.toLowerCase();
    
        const matchingRetailers = allRetailUsers?.filter(item =>
            item?.full_name?.toLowerCase().includes(lowerCaseSearchTerm?.toLowerCase())
        );
    
        console.log(matchingRetailers, "sos");
    
        setAllRetailers(matchingRetailers);
        
      }
    console.log(searchRetailer, "pama am")





    const assignedOrder = async () => {
        const data = {
            order_id: state?.id,
            assigned_to: searchRetailer?.id
        }
        await api.post(appUrls?.ASSIGN_ORDER_URL, data)
        .then((res) => {
            console.log(res, "dambo")
            setLoading(false)
            toast(`${res?.data?.message}`, {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
            })
            handleClose()
        })
        .catch((err) => {
            console.log(err, "err")
            setLoading(false)
            toast("Error", {
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
            <p className='font-Mont font-bold text-[32px] '>Assign order ⏳</p>
            <p className='font-Mont text-base text-center'>
                Are you sure you want to Assign this order as to <span className='text-lg font-semibold'>{`${searchRetailer?.full_name}?`}</span> 
            </p>

            <div className='flex flex-col gap-1 w-full'>

                <input
                    name="search"
                    placeholder="Retailer Name"
                    type="text"
                    value={searchRetailer?.full_name}
                    onChange={(e) => {
                    const inputText = e.target.value;
                    setSearchRetailer(inputText);
                    searchRetailers(inputText);
                    if (searchRetailer) {
                        setRetailerClicked(false);
                    }
                
                    }}
                    className="outline-none w-full text-left rounded-lg bg-[#fff] border  border-[#BABABA] p-3 h-[48px] border-solid " //lg:w-[563px] 
                />
                {allRetailers.length > 0 ? <div
                    style={{ marginTop: "1%" }}
                    className={`${
                        searchRetailer === "" ||
                        (searchRetailer === ""
                                    ? "hidden"
                                    : retailerClicked && searchRetailer !== "")
                        ? "hidden"
                        : "w-full lg:w-[360px] p-2.5 h-[100px] bg-[#F9FAFB] z-50 overflow-y-scroll absolute p-2 top-[auto] translate-y-[76%] "
                    }`}
                    >
                {allRetailers?.map((role, index) => {
                    return (
                    <p
                        key={index}
                        onClick={() => {
                        handleSelectRetailer(role);
                        setRetailerClicked(true)
                        }}
                        className="cursor-pointer my-[14px] mx-[26px] "
                    >
                        {role.full_name}
                    </p>
                    );
                })}
                </div>: ''}
                {errorJobRole && (
                <p style={{ color: "red", fontSize: "14px" }}>{errorJobRole}</p>
                )}
                
            </div>

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
                    className='w-[180px] h-[48px] bg-[#50724D] text-center flex items-center justify-center rounded'
                    onClick={() => assignedOrder()}
                >
                    <p className='text-[#fff] font-Dm font-medium text-base'>{loading ? <CgSpinner className='animate-spin text-lg'/> : " Yes, Assign it"}</p>
                </button>
            </div>
        </div>
    </div>
  )
}

export default AssignOrder