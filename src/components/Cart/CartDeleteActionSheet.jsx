import { Dimensions, View } from 'react-native'
import React from 'react'
import { Actionsheet, Divider, Heading, HStack, VStack,Text, Pressable } from 'native-base'

import { useDispatch, useSelector } from 'react-redux'
import { setLoader } from '../../redux/slices/commonSlice'
import { fetchAllCartItems, removeItemsFromCart } from '../../ApiCalls/cartApis'
import { getDarkMode } from '../../redux/slices/userSlice'
import CartDeleteRow from './CartDeleteRow'

const CartDeleteActionSheet = ({isOpen,onClose,id,product,quantity}) => {
    const devicewidth = Dimensions.get('window').width
    const dispatch = useDispatch()
    const darkmode = useSelector(getDarkMode)
    const handleRemoveFromCart = async (id) => {
        onClose()
        dispatch(setLoader(true));
        removeItemsFromCart(id)
          .then((resp) => {
            if (resp.success) {
              dispatch(setLoader(false));
              dispatch(fetchAllCartItems());
            } else {
              dispatch(setLoader(false));
            //   toast.error(
            //     "Something wrong while removing from cart. Please try again.",
            //     {
            //       position: "top-right",
            //       autoClose: 5000,
            //       hideProgressBar: false,
            //       closeOnClick: true,
            //       pauseOnHover: true,
            //       draggable: true,
            //       progress: undefined,
            //     }
            //   );
            }
          })
          .catch((e) => {
            dispatch(setLoader(false));
            // toast.error(
            //   "Something wrong while removing from cart. Please try again.",
            //   {
            //     position: "top-right",
            //     autoClose: 5000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //   }
            // );
          });
      };
      
  return (
    <Actionsheet  isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content bgColor={darkmode?'#555555':"white"} >
        <VStack  width={devicewidth}  bgColor={darkmode?'#555555':"white"}>
            <Heading color={darkmode?'white':'black'} marginY={3} size="lg" textAlign="center" >Remove From Cart?</Heading>
            <Divider />
            <CartDeleteRow id={id} product={product} quantity={quantity} isDeleteOpen={true} />
            
           
            
           
           
            <Divider marginY={5} />
            <HStack marginBottom={5}  justifyContent="space-between" marginX={5} >
                <Pressable onPress={onClose} >

                <HStack borderRadius={100} width={170} padding={5} bgColor={darkmode?"#222222":"gray.200"} justifyContent="center" >
                    <Text color={darkmode?'white':'black'} fontWeight="semibold" fontSize={16}  >Cancel</Text>
                </HStack>
                </Pressable>
                <Pressable onPress={()=>handleRemoveFromCart(id)}  >

                <HStack shadow={3}  borderRadius={100} width={170} padding={5} bgColor={darkmode?"gray.200":"black"} justifyContent="center">
                    <Text color={darkmode?'black':'white'} fontWeight="semibold"  fontSize={16} >Yes, Remove</Text>
                </HStack>
                </Pressable>
                
            </HStack>

        </VStack>
        </Actionsheet.Content>
    </Actionsheet>
  )
}

export default CartDeleteActionSheet