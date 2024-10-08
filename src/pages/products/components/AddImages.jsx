import React, { useState } from 'react'
import { CgSpinner } from 'react-icons/cg';
import { Form, Formik} from "formik"
import { toast } from 'react-toastify';
import axios from 'axios';

import Upload from "../../../assets/png/upload.png"
import { api } from '../../../services/api';
import { appUrls } from '../../../services/urls';
import CloseIcon from "../../../assets/svg/closeIcon.svg"


const AddImages = ({ handleClose, productData, addImageLoading, setAddImageLoading }) => {
    const [pic, setPic] = useState(null)
    const [picB, setPicB] = useState(null)
    const [picC, setPicC] = useState(null)

    console.log(productData, "Hurt")

    const token = localStorage.getItem("token")
    

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        console.log(selectedFile, "selectedFile")
        setPic(selectedFile)
    };

    const handleFileChangeB = (event) => {
        const selectedFile = event.target.files[0];
        setPicB(selectedFile)
    };

    const handleFileChangeC = (event) => {
        const selectedFile = event.target.files[0];
        setPicC(selectedFile)
    };

    
    const submitForm = async (values, action) => {
        setAddImageLoading(true)
    let formData = new FormData();
    let formDataB = new FormData();
    let formDataC = new FormData();

    formData.append("product_id", productData?.id);
    formDataB.append("product_id", productData?.id);
    formDataC.append("product_id", productData?.id);

    
    if (pic) {
        formData.append("image", pic);
    }

    if (picB) {
        formDataB.append("image", picB);
    }

    if (picC) {
        formDataC.append("image", picC);
    }


    try {
        const res = await axios.post("https://ngt.smhptech.com/api/product/upload-image-1", formData, {
            headers : {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        });
        const resB = await axios.post("https://ngt.smhptech.com/api/product/upload-image-2", formDataB, {
            headers : {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        });
        const resC = await axios.post("https://ngt.smhptech.com/api/product/upload-image-3", formDataC, {
            headers : {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        });
        console.log(res, "pop");
        setAddImageLoading(false)
        toast(`${res?.data?.message}`, { 
            position: "top-right",
            autoClose: 3500,
            closeOnClick: true,
        });
        handleClose();
    } catch (err) {
        console.error(err, "err");
        setAddImageLoading(false)
        handleClose();
        // toast(`${err?.data?.message}`, { 
        //     position: "top-right",
        //     autoClose: 3500,
        //     closeOnClick: true,
        // });
    }
};

  return (
    <div className='w-[600px] h-[500px] overflow-y-scroll mt-[20px] rounded-lg bg-[#fff] flex flex-col pt-[40px] '>
        <div className='flex w-full'>
            <Formik
                initialValues={{
                    title: "",
                    description: ""
                }}
                    // validationSchema={formValidationSchema}
                    onSubmit={(values, action) => {
                    window.scrollTo(0, 0);
                    console.log(values, "market")
                
                    submitForm(values, action);
                }}
            >
            {({
                handleSubmit,
                handleChange,
                dirty,
                isValid,
                setFieldValue,
                errors,
                touched,
                // setFieldTouched,
                values,
            }) => (
                <Form onSubmit={handleSubmit} className="w-full flex flex-col ">
                    <div className="w-full flex flex-col gap-[24px]">
                        <p className='text-center text-2xl font-semibold font-Kumbh'>Add Product Images</p>
                    
                        <div className='flex flex-col mx-auto  bg-transparent rounded-lg items-center w-[400px] border-dashed border-[#D0D5DD] border px-6 py-[28px]  gap-[16px]'>
                            <div className='p-[9px] w-[300px] cursor-pointer flex justify-center gap-[16px] '>
                                {  
                                    pic?.name ? 
                                        <div className='flex flex-col gap-1 relative'>
                                            <img alt="upload" width={"200px"} height={"100px"} className='' src={URL.createObjectURL(pic)} />
                                            <button className="flex items-center absolute -top-5 -right-3" onClick={() => setPic(null)}> 
                                                <img src={CloseIcon} alt='close' />
                                            </button>
                                        </div>
                                        :
                                        <div className='flex flex-col items-center gap-[16px]'>
                                            <img src={Upload} alt='upload' className='w-[56px] h-[56px' />
                                            <div className='flex flex-col'>
                                                <p className='text-sm font-semibold font-inter text-[#8CAD07]'>
                                                    Click to upload image <span className='text-[#475367]'>or drag and drop</span>
                                                </p>
                                                <p className='text-xs text-center font-medium text-[#98A2B3]'>SVG, PNG or JPG </p>
                                            </div>
                                            <div className='flex gap-1.5 items-center'>
                                                <div className='bg-[#F0F2F5] w-[100px] h-[1px]'></div> 
                                                <p className='text-xs font-inter font-semibold text-[#98A2B3]'>OR</p>
                                                <div className='bg-[#F0F2F5] w-[100px] h-[1px]'></div> 
                                            </div>
                                            <label htmlFor="fileInput" className='cursor-pointer px-[22px] flex justify-center items-center h-[39px] rounded-[5px] bg-[#8CAD07] text-[#FFF] text-sm font-inter font-semibold'>
                                                Browse Files
                                                <input
                                                    type="file"
                                                    id="fileInput"
                                                    style={{ display: 'none' }}
                                                    onChange={handleFileChange}
                                                />
                                            </label>
                                        </div>
                                }
                                
                            </div>
                        </div>

                        <div className='flex flex-col mx-auto  bg-transparent rounded-lg items-center w-[400px] border-dashed border-[#D0D5DD] border px-6 py-[28px]  gap-[16px]'>
                            <div className='p-[9px] w-[300px] cursor-pointer flex justify-center gap-[16px] '>
                                {  
                                    picB?.name ? 
                                        <div className='flex flex-col gap-1 relative'>
                                            <img alt="upload" width={"200px"} height={"100px"} className='' src={URL.createObjectURL(picB)} />
                                            <button className="flex items-center absolute -top-5 -right-3" onClick={() => setPicB(null)}> 
                                                <img src={CloseIcon} alt='close' />
                                            </button>
                                        </div> 
                                        :
                                        <div className='flex flex-col items-center gap-[16px]'>
                                            <img src={Upload} alt='upload' className='w-[56px] h-[56px' />
                                            <div className='flex flex-col'>
                                                <p className='text-sm font-semibold font-inter text-[#8CAD07]'>
                                                    Click to upload image <span className='text-[#475367]'>or drag and drop</span>
                                                </p>
                                                <p className='text-xs text-center font-medium text-[#98A2B3]'>SVG, PNG or JPG </p>
                                            </div>
                                            <div className='flex gap-1.5 items-center'>
                                                <div className='bg-[#F0F2F5] w-[100px] h-[1px]'></div> 
                                                <p className='text-xs font-inter font-semibold text-[#98A2B3]'>OR</p>
                                                <div className='bg-[#F0F2F5] w-[100px] h-[1px]'></div> 
                                            </div>
                                            <label htmlFor="fileInput" className='cursor-pointer px-[22px] flex justify-center items-center h-[39px] rounded-[5px] bg-[#8CAD07] text-[#FFF] text-sm font-inter font-semibold'>
                                                Browse Files
                                                <input
                                                    type="file"
                                                    id="fileInput"
                                                    style={{ display: 'none' }}
                                                    onChange={handleFileChangeB}
                                                />
                                            </label>
                                        </div>
                                }
                                
                            </div>
                        </div>
                        
                        <div className='flex flex-col mx-auto  bg-transparent rounded-lg items-center w-[400px] border-dashed border-[#D0D5DD] border px-6 py-[28px]  gap-[16px]'>
                            <div className='p-[9px] w-[300px] cursor-pointer flex justify-center gap-[16px] '>
                                {  
                                    picC?.name ? 
                                        <div className='flex flex-col gap-1 relative'>
                                            <img alt="upload" width={"200px"} height={"100px"} className='' src={URL.createObjectURL(picC)} />
                                            <button className="flex items-center absolute -top-5 -right-3" onClick={() => setPicC(null)}> 
                                                <img src={CloseIcon} alt='close' />
                                            </button>
                                        </div> 
                                        :
                                        <div className='flex flex-col items-center gap-[16px]'>
                                            <img src={Upload} alt='upload' className='w-[56px] h-[56px' />
                                            <div className='flex flex-col'>
                                                <p className='text-sm font-semibold font-inter text-[#8CAD07]'>
                                                    Click to upload image <span className='text-[#475367]'>or drag and drop</span>
                                                </p>
                                                <p className='text-xs text-center font-medium text-[#98A2B3]'>SVG, PNG or JPG </p>
                                            </div>
                                            <div className='flex gap-1.5 items-center'>
                                                <div className='bg-[#F0F2F5] w-[100px] h-[1px]'></div> 
                                                <p className='text-xs font-inter font-semibold text-[#98A2B3]'>OR</p>
                                                <div className='bg-[#F0F2F5] w-[100px] h-[1px]'></div> 
                                            </div>
                                            <label htmlFor="fileInput" className='cursor-pointer px-[22px] flex justify-center items-center h-[39px] rounded-[5px] bg-[#8CAD07] text-[#FFF] text-sm font-inter font-semibold'>
                                                Browse Files
                                                <input
                                                    type="file"
                                                    id="fileInput"
                                                    style={{ display: 'none' }}
                                                    onChange={handleFileChangeC}
                                                />
                                            </label>
                                        </div>
                                }
                                
                            </div>
                        </div>
                    
                        <div className='flex items-center mb-5 justify-center gap-5 items-center mx-8'>
                            <button
                                className='w-[220px] border rounded-lg border-[#8CAD07] bg-[#fff] flex items-center justify-center  h-[49px]'
                                type='button'
                                onClick={handleClose}
                            >
                                <p className='font-merri font-bold text-base text-[#8CAD07]'>Cancel</p>
                            </button>
                            <button
                                className="w-[220px]  flex items-center  rounded-lg justify-center  h-[49px] bg-[#8CAD07] text-base  text-center"
                                type="submit"
                            >
                                <p className='text-[#fff] text-base  font-merri text-center  font-medium'>{addImageLoading ? <CgSpinner className=" animate-spin text-lg  " /> : 'Upload'}</p>
                            </button>

                        </div>
                    </div>

                </Form>
                )}
            </Formik>
    </div>

    </div>
  )
}

export default AddImages