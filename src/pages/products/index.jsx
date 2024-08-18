import { Skeleton } from '@mui/material';
import React, { useState, useEffect } from 'react'
import { FaPlus } from "react-icons/fa6";

import { api } from '../../services/api';
import { appUrls } from '../../services/urls';
import AllProducts from './components/AllProducts';
import ModalPop from '../../components/modalPop';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import DeleteProduct from './components/DeleteProduct';



const Products = () => {
    const [loading, setLoading] = useState(false);
    const [addImageLoading, setAddImageLoading] = useState(false)
    const [addProductloading, setAddProductLoading] = useState(false)
    const [editProductLoading, setEditProductLoading] = useState(false)
    const [deleteProductLoading, setDeleteProductLoading] = useState(false)
    const [allProducts, setAllProducts] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [activeTab, setActiveTab] = useState("All")
    const [openAddProduct, setOpenAddProduct] = useState(false)
    const [openEditProduct, setOpenEditProduct] = useState(false)
    const [openDeleteProduct, setOpenDeleteProduct] = useState(false)
    const [editData, setEditData] = useState([]) 
    const [deleteData, setDeleteData] = useState([]) 
   

    const search = searchTerm ?  `/search/${searchTerm}` : ""; 

    const getAllProducts = async () => {
        setLoading(true)
        await api.get(`${appUrls?.PRODUCTS_URL}${search}`)
        .then((res) => {
          console.log(res, "asap")
          setLoading(false)
          setAllProducts(res?.data?.data?.products)
        })
        .catch((err) => {
          setLoading(false)
          console.log(err, "faro")
        })
      };
    
      console.log(allProducts, "allProducts")
    
      useEffect(() => {
        getAllProducts()
      }, [searchTerm, addProductloading, editProductLoading, deleteProductLoading, addImageLoading])

      const handleText = (e) => setSearchTerm(e.target.value)

  return (
    <div className='p-8'>
        <div className='flex items-center justify-between'>
            <p className='text-[24px] text-[#23272E] font-bold'>Product Management</p>
            <div className='bg-[#8CAD07] cursor-pointer flex items-center justify-between w-[169px] h-[38px] p-2 rounded' onClick={() => setOpenAddProduct(true)}>
                <p className='text-[#fff] font-Mont font-medium'>Add New Products</p>
            </div>
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
                            <p className='font-Hat font-semibold text-[#23272E] text-[17px]'>Total Products</p>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p className='text-[#23272E] font-Hat font-bold text-[31px]'>{allProducts?.length}</p>
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
            <AllProducts 
                allProducts={allProducts} 
                loading={loading} 
                handleText={(e) => handleText(e)}
                setEditData={setEditData}
                setDeleteData={setDeleteData}
                setOpenEditProduct={setOpenEditProduct}
                setOpenDeleteProduct={setOpenDeleteProduct}
                addImageLoading={addImageLoading}
                setAddImageLoading={setAddImageLoading}
            />
        }
        <ModalPop isOpen={openAddProduct}>
            <AddProduct 
                handleClose={() => setOpenAddProduct(false)} 
                setAddProductLoading={() => setAddProductLoading()}
                addProductloading={addProductloading}
            />
        </ModalPop>

        <ModalPop isOpen={openAddProduct}>
            <AddProduct 
                handleClose={() => setOpenAddProduct(false)} 
                setAddProductLoading={() => setAddProductLoading()}
                addProductloading={addProductloading}
            />
        </ModalPop>
      
        <ModalPop isOpen={openEditProduct}>
            <EditProduct 
                handleClose={() => setOpenEditProduct(false)} 
                setEditProductLoading={setEditProductLoading}
                editProductLoading={editProductLoading}
                editData={editData}
            />
        </ModalPop>

        <ModalPop isOpen={openDeleteProduct}>
            <DeleteProduct 
                handleClose={() => setOpenDeleteProduct(false)} 
                setDeleteProductLoading={setDeleteProductLoading}
                deleteProductLoading={deleteProductLoading}
                deleteData={deleteData}
            />
        </ModalPop>
    </div>
  )
}

export default Products