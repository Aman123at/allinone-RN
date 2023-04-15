import { View } from 'react-native'
import React from 'react'
import { Heading, HStack, Image, VStack,Text, useDisclose } from 'native-base'
import OctIcons from 'react-native-vector-icons/Octicons'
import { useDispatch, useSelector } from 'react-redux'
import { getDarkMode } from '../../redux/slices/userSlice'
import { truncate } from '../../utils/commonUtils'
import { getOrdersFromState } from '../../redux/slices/cartSlice'
import { useEffect } from 'react'
import { setLoader } from '../../redux/slices/commonSlice'
import { getAllOrders } from '../../ApiCalls/orderApis'
import { getAllProducts } from '../../redux/slices/productSlice'
const OrderRow = ({id,product,isDeleteOpen,isCompleted}) => {
    const darkmode = useSelector(getDarkMode)
    const allProducts = useSelector(getAllProducts)

    const dispatch = useDispatch()
    useEffect(() => {
      if (allProducts.status === "idle") {
        dispatch(fetchProducts());
        dispatch(setLoader(true));
      } else if (allProducts.status === "error") {
        dispatch(setLoader(false));
       
      } else if (allProducts.status === "finished") {
        dispatch(setLoader(false));
      }
    }, [allProducts.status]);
    const getImageUrlFromProductId=(productId)=>{
      let allProdData = allProducts.data
      let productfound = allProdData.products.filter((val)=>val._id===productId)
      if(productfound){
        return productfound[0].images[0].secure_url
      }
      else{
        return " "
      }
    }
   
  return (
    <HStack width={355} shadow={ isDeleteOpen ?  5:0} key={id?id:Math.random()*12345} marginY={isDeleteOpen?5:3} padding={5} marginX={isDeleteOpen ? 4 :0}  bgColor={darkmode ? "#444444" :"white" }borderRadius={25}  >
      
    <Image width={110} height={110} borderRadius={20} 
    source={{uri:product && product.productId ? getImageUrlFromProductId(product.productId) :"data:image/jpeg;base64,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"}} alt="ELON" />
    <VStack marginLeft={3} >
      <HStack justifyContent="space-between"  marginTop={1} alignItems="center" >
          {/* <Heading color={darkmode ? "white" :"black"} size="md" marginRight={1} >{truncate(product.name,15)}</Heading> */}
          <Heading color={darkmode ? "white" :"black"} size="md" marginRight={1} >{product && product.productName ?truncate(product?.productName,17):''}</Heading>
         
      </HStack>
      <HStack marginY={3}  alignItems="center" >
          <HStack bgColor="gray.900" width={5} height={5} borderRadius={100} >

          </HStack>
          
          <Text color={darkmode ? "white" :"black"} marginLeft={2} >Color  |  Size = M</Text>
      </HStack>
      <HStack alignItems="center" justifyContent="space-between"  >
          <Text color={darkmode ? "white" :"black"} fontWeight="bold" marginRight={1}  fontSize={20} >Rs. {product?.productPrice}</Text>

         
           <HStack bgColor={darkmode ? "#666666" :"coolGray.800" } marginLeft={2} borderRadius={20}  >
           <HStack paddingY={1} paddingX={2} ><Text color="white" fontWeight="semibold" fontSize={15} >{isCompleted ? 'Leave Review' :'Track Order'}</Text></HStack>
       </HStack>
          
          
          
          
      </HStack>
    </VStack>
  </HStack>
  )
}

export default OrderRow