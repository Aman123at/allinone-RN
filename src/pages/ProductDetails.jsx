
import React from 'react'
import {  NativeBaseProvider } from 'native-base'

import ProductImagesCarousal from '../components/ProductImagesCarousal'
import ProductDesc from '../components/ProductDesc'
import { addCartItem, fetchAllCartItems } from '../ApiCalls/cartApis'
import { useDispatch } from 'react-redux'
import { useState } from 'react'


const ProductDetails = ({route,navigation}) => {
   
    const productData = route.params
    
    const dispatch = useDispatch()
    const [quantity,setQuantity] = useState(1)
    const [buttonLoader,setButtonLoader] = useState(false)
    
    const handleAddItemToCart=()=>{
      
        setButtonLoader(true);
        let payloadData = {
          quantity,
          product: {
            name: productData.name,
            prodId:productData._id,
            category: productData.category,
            subCategory: productData.subCategory,
            price: productData.price,
            images: productData.images,
          },
        };
        addCartItem(payloadData)
          .then((result) => {
            
            if (result.success) {
              dispatch(fetchAllCartItems());
              // toast.success("Added To Cart.", {
              //   position: "top-right",
              //   autoClose: 5000,
              //   hideProgressBar: false,
              //   closeOnClick: true,
              //   pauseOnHover: true,
              //   draggable: true,
              //   progress: undefined,
              // });
            } else {
              // toast.error("Error while adding to Cart.", {
              //   position: "top-right",
              //   autoClose: 5000,
              //   hideProgressBar: false,
              //   closeOnClick: true,
              //   pauseOnHover: true,
              //   draggable: true,
              //   progress: undefined,
              // });
            }
            setButtonLoader(false);
          })
          .catch((e) => {
            setButtonLoader(false);
            // toast.error("Error while adding to Cart.", {
            //   position: "top-right",
            //   autoClose: 5000,
            //   hideProgressBar: false,
            //   closeOnClick: true,
            //   pauseOnHover: true,
            //   draggable: true,
            //   progress: undefined,
            // });
          });
      
    }
   
   
  return (
    <NativeBaseProvider >
      
      <ProductImagesCarousal nav={navigation} imageData={productData.images}  />
      <ProductDesc buttonLoader={buttonLoader} setButtonLoader={setButtonLoader} handleAddItemToCart={handleAddItemToCart} quantity={quantity} setQuantity={setQuantity} nav={navigation} data={productData} />

    </NativeBaseProvider>
  )
}

export default ProductDetails