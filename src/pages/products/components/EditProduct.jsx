import React, { useEffect, useState } from 'react'
import { CgSpinner } from "react-icons/cg"
import { Formik, Form } from 'formik'
import * as Yup from "yup"
import { toast } from 'react-toastify'

import Upload from "../../../assets/png/upload.png"
import CloseIcon from "../../../assets/svg/closeIcon.svg"
import { api } from '../../../services/api'
import { appUrls } from '../../../services/urls'
import axios from 'axios'

const EditProduct = ({editData, setEditProductLoading, handleClose, editProductLoading }) => {
    const [productsCategory, setProductsCategory] = useState([])
    const [pic, setPic] = useState(null)
    const [picB, setPicB] = useState(null)
    const [picC, setPicC] = useState(null)

    console.log(editData, "zama")

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

    const formValidationSchema = Yup.object().shape({
        productName: Yup.string().required(),
        description: Yup.string().required(),
        price: Yup.number().required(),
        category: Yup.string().required()
    })

    const getProductCategory = async () => {
        try {
            const res = await api.get(appUrls?.GET_PRODUCTS_CATEGORY_URL);
            setProductsCategory(res?.data?.data?.categories);
        } catch (err) {
            console.error(err, "Error fetching product categories");
        }
    };

    useEffect(() => {
        getProductCategory()
    }, [])


    const submitForm = async (values, action) => {
        setEditProductLoading(true)

        let formData = new FormData();
        let formDataB = new FormData();
        let formDataC = new FormData();
    
        formData.append("product_id", editData?.id);
        formDataB.append("product_id", editData?.id);
        formDataC.append("product_id", editData?.id);

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
            toast(`${res?.data?.message}`, { 
                position: "top-right",
                autoClose: 3500,
                closeOnClick: true,
            });
            handleClose();
      
        } catch (err) {
            toast(`${err?.data?.message}`, { 
                position: "top-right",
                autoClose: 3500,
                closeOnClick: true,
            });
        }

        const data = {
            product_id: editData?.id,
            name: values?.productName || editData?.name,
            category_id: values?.category || editData?.category_id,
            unit_price: values?.price || editData?.unit_price,
            description: values?.description || editData?.description
        }
        api.post(appUrls?.PRODUCTS_URL + "/update", data)
        .then((res) => {
            console.log(res, "john")
            setEditProductLoading(false)
            toast(`${res?.data?.message}`, {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
            })
            action.resetForm()
            handleClose()
        })
        .catch((err) => {
            console.log(err, "vitamin")
            setEditProductLoading(false)
            toast(`${err?.data?.message}`, {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
            })
            handleClose()
        })
    }

  return (
    <div className='bg-[#fff] w-[600px] h-[500px] flex flex-col gap-4 overflow-y-scroll  mt-[50px] rounded-lg p-4'>
        <div className='flex items-center justify-between'>
            <p className='font-medium font-Hat text-[#3F434A]  text-[24px] text-[#000]'>Product Information</p>
            <button className="flex justify-center items-center" onClick={handleClose}> 
                <img src={CloseIcon} alt='close' />
            </button>
        </div>
        <div className='mt-[15px]'>
            <Formik
                initialValues={{
                    productName: "",
                    description: "",
                    price: "",
                    category: "",
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
                <Form onSubmit={handleSubmit} className="flex ">
                    <div className="flex flex-col gap-[27px]">
                        
                        <div className='w-[540px] flex flex-col gap-2'>
                            <label htmlFor='Product Name' className='font-Hat text-[#8A9099]'>Product Name</label>
                            <input 
                                name="productName"
                                placeholder={`${editData?.name}`}
                                type='text'
                                value={values?.productName}
                                onChange={handleChange}
                                className='w-[540px] h-[44px] outline-none border rounded-lg border-[#8F8F8F] p-2.5'
                            />
                            {errors.productName && touched.productName ? (
                            <div className="text-RED-_100 text-xs">
                                {errors.productName}
                            </div>
                            ) : null}
                        </div>

                        <div className='w-full flex flex-col gap-2'>
                            <label htmlFor='Description' className='font-Hat text-[#8A9099]'>Description</label>
                            <textarea 
                                name="description"
                                placeholder={`${editData?.description}`}
                                type='text'
                                value={values?.description}
                                onChange={handleChange}
                                className='w-full h-[200px]  outline-none border rounded-lg border-[#8F8F8F] p-2.5'
                            ></textarea>
                            {errors.description && touched.description ? (
                            <div className="text-RED-_100 text-xs">
                                {errors.description}
                            </div>
                            ) : null}
                        </div>

                        <div className='w-[540px] flex flex-col gap-2'>
                            <label htmlFor='Price' className='font-Hat text-[#8A9099]'>Price</label>
                            <input 
                                name="price"
                                placeholder={`${editData?.unit_price}`}
                                value={values?.price}
                                type='number'
                                onChange={handleChange}
                                className='w-[540px] h-[44px] outline-none border rounded-lg border-[#8F8F8F] p-2.5'
                            />
                            {errors.price && touched.price ? (
                            <div className="text-RED-_100 text-xs">
                                {errors.price}
                            </div>
                            ) : null}
                        </div>

                        <div className='w-[540px] flex flex-col gap-2'>
                            <label htmlFor='Category' className='font-Hat text-[#8A9099]'>Category</label>
                            <select
                                name='category'
                                onChange={handleChange}
                                value={values?.category}
                                className='w-[540px] h-[44px] outline-none border rounded-lg border-[#8F8F8F] p-2.5'
                            >
                                {productsCategory?.map((item,) => (
                                    <option 
                                        value={item?.id} 
                                        key={item?.id}
                                    >
                                        {item?.name}
                                    </option>
                                ))}
                            </select>
                            {errors.category && touched.category ? (
                            <div className="text-RED-_100 text-xs">
                                {errors.category}
                            </div>
                            ) : null}
                        </div>


                        <div className="w-full flex flex-col gap-[24px]">
                            <p className='text-center text-2xl font-semibold font-Kumbh'>Add Product Images</p>
                            <div className='flex overflow-x-hidden w-full flex-wrap items-center gap-3'>
                                <div className='flex flex-col bg-transparent rounded-lg items-center w-full border-dashed border-[#D0D5DD] border px-6 py-[28px]  gap-[16px]'>
                                    <div className='p-[9px] w-full cursor-pointer flex justify-center gap-[16px] '>
                                        {  
                                            pic?.name ?
                                            // <div className='flex flex-col gap-1'>
                                            //     <img alt="upload" width={"200px"} height={"100px"} className='' src={URL.createObjectURL(pic) } />
                                            // </div>  
                                                <div className='flex flex-col gap-1'>
                                                    <div className='flex items-center justify-between'>
                                                        <p className='text-[15px] font-hanken text-[#858585]'>{pic?.name}</p>
                                                        <p className='text-[#000] text-[11px]'>Completed</p>
                                                    </div>
                                                    <div className='w-[266px] h-[5px] bg-[#51E38B] rounded-lg'></div>
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

                                <div className='flex flex-col bg-transparent rounded-lg items-center w-full border-dashed border-[#D0D5DD] border px-6 py-[28px]  gap-[16px]'>
                                    <div className='p-[9px] w-full cursor-pointer flex justify-center gap-[16px] '>
                                        {  
                                            picB?.name ? 
                                                <div className='flex flex-col gap-1'>
                                                    <div className='flex items-center justify-between'>
                                                        <p className='text-[15px] font-hanken text-[#858585]'>{picB?.name}</p>
                                                        <p className='text-[#000] text-[11px]'>Completed</p>
                                                    </div>
                                                    <div className='w-[266px] h-[5px] bg-[#51E38B] rounded-lg'></div>
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
                                
                                <div className='flex flex-col bg-transparent rounded-lg items-center w-full border-dashed border-[#D0D5DD] border px-6 py-[28px]  gap-[16px]'>
                                    <div className='p-[9px] w-full cursor-pointer flex justify-center gap-[16px] '>
                                        {  
                                            picC?.name ? 
                                                <div className='flex flex-col gap-1'>
                                                    <div className='flex items-center justify-between'>
                                                        <p className='text-[15px] font-hanken text-[#858585]'>{picC?.name}</p>
                                                        <p className='text-[#000] text-[11px]'>Completed</p>
                                                    </div>
                                                    <div className='w-[266px] h-[5px] bg-[#51E38B] rounded-lg'></div>
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
                            </div>
                    
                        </div>

                    
                        <div className='mt-[26px] flex items-center gap-3'>
                            <button
                                className="w-[228px] font-inter flex items-center justify-center h-[46px] bg-[#50724D] text-lg rounded text-center"
                                type="submit"
                                disabled={editProductLoading}
                            >
                                <p className='text-[#fff] text-sm font-semibold'>{editProductLoading ? <CgSpinner className=" animate-spin text-xl " /> : 'Save Product'}</p>
                                
                            </button>
                            <button
                                className="w-[132px] font-Hat flex items-center justify-center h-[46px] bg-[#E5E5E5] text-lg rounded text-center"
                                type="button"
                                onClick={() => handleClose()}
                            >
                                <p className='text-[#595F69] text-lg font-medium'>Cancel</p>
                                
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

export default EditProduct