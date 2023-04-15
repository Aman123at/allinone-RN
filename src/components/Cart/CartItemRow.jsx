import { View } from 'react-native'
import React from 'react'
import { Heading, HStack, Image, VStack,Text, useDisclose } from 'native-base'
import OctIcons from 'react-native-vector-icons/Octicons'
import { truncate } from '../../utils/commonUtils'
import CartDeleteActionSheet from './CartDeleteActionSheet'
import { useSelector } from 'react-redux'
import { getDarkMode } from '../../redux/slices/userSlice'
const CartItemRow = ({id,product,quantity,isDeleteOpen,isCheckoutPage}) => {
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();
  const darkmode = useSelector(getDarkMode)
  return (
    <VStack>
    <CartDeleteActionSheet id={id} product={product} quantity={quantity}  isOpen={isOpen} onClose={onClose} />
    <HStack width={355} shadow={ isDeleteOpen ?  5:0} key={id?id:Math.random()*12345} marginY={isDeleteOpen?5:3} padding={5} marginX={isDeleteOpen ? 4 :0}  bgColor={darkmode ? "#444444" :"white" }borderRadius={25}  >
      
      <Image width={110} height={110} borderRadius={20} 
      source={{uri:product.images[0].secure_url}} alt="ELON" />
      <VStack marginLeft={3} >
        <HStack justifyContent="space-between"  marginTop={1} alignItems="center" >
            <Heading color={darkmode ? "white" :"black"} size="md" marginRight={1} >{truncate(product.name,15)}</Heading>
            {isDeleteOpen   ? <></> : isCheckoutPage ? <></>:
            
            <OctIcons color={darkmode ? "white" :"black"} name='trash' onPress={onOpen} size={20} />
            }
        </HStack>
        <HStack marginY={3}  alignItems="center" >
            <HStack bgColor="gray.900" width={5} height={5} borderRadius={100} >

            </HStack>
            
            <Text color={darkmode ? "white" :"black"} marginLeft={2} >Color  |  Size = M</Text>
        </HStack>
        <HStack alignItems="center" justifyContent="space-between"  >
            <Text color={darkmode ? "white" :"black"} fontWeight="bold" marginRight={1}  fontSize={20} >Rs. {product.price}</Text>

            {isCheckoutPage ?
             <HStack bgColor={darkmode ? "coolGray.600" :"gray.200" } marginLeft={2} borderRadius={20}  >
             <HStack paddingY={2} paddingX={4} ><Text color={darkmode ? "white" :"black"} fontWeight="bold" fontSize={17} >{quantity}</Text></HStack>
         </HStack>
            :
            
            <HStack bgColor={darkmode ? "coolGray.600" :"gray.200" } marginLeft={2} borderRadius={20}  >
                <HStack   padding={2} paddingLeft={4} ><Text color={darkmode ? "white" :"black"} fontWeight="bold" fontSize={17}  >-</Text></HStack>
                <HStack padding={2} ><Text color={darkmode ? "white" :"black"} fontWeight="bold" fontSize={17} >{quantity}</Text></HStack>
                <HStack  padding={2} paddingRight={4}><Text color={darkmode ? "white" :"black"} fontWeight="bold" fontSize={17} >+</Text></HStack>
            </HStack>
            }
        </HStack>
      </VStack>
    </HStack>
    </VStack>
  )
}

export default CartItemRow