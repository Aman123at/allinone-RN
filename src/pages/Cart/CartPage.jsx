import { View, Dimensions } from 'react-native'
import React from 'react'

import { Heading, Text,HStack, NativeBaseProvider, ScrollView, useDisclose, VStack, Pressable } from 'native-base'
import AppBar from '../../components/AppBar'
import BottomNavBar from '../../components/BottomNavBar'
import CartItemRow from '../../components/Cart/CartItemRow'
import CartDeleteActionSheet from '../../components/Cart/CartDeleteActionSheet'
import { useDispatch, useSelector } from 'react-redux'
import { getCartItems } from '../../redux/slices/cartSlice'
import { useEffect } from 'react'
import { fetchAllCartItems } from '../../ApiCalls/cartApis'
import { setLoader } from '../../redux/slices/commonSlice'
import NotFound from '../NotFoundPage/NotFound'
import OctIcons from 'react-native-vector-icons/Octicons'
import { getDarkMode } from '../../redux/slices/userSlice'
import { useState } from 'react'
import Loader from '../../utils/Loader'
const CartPage = ({navigation}) => {
  const initialLayout = {
    width: Dimensions.get('window').width,
    height:Dimensions.get('window').height
  };
  const devicewidth = Dimensions.get('window').width
  const dispatch = useDispatch()
  const { status, data } = useSelector(getCartItems);
  const [waitLoader,setWaitLoader] = useState(false)
  const darkmode = useSelector(getDarkMode)
  useEffect(() => {
    if (status === "idle") {
      dispatch(setLoader(true));
      setWaitLoader(true)
      dispatch(fetchAllCartItems());
    }
    if (status === "error") {
      dispatch(setLoader(false));
      setWaitLoader(false)
      // toast.error(
      //   "Something Gone Wrong While Fetching Cart Items, Please reload the page.",
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
    }
    if (status === "finished") {
      dispatch(setLoader(false));
      setWaitLoader(false)
    }
  }, [status]);

  const getOverallPrice = () => {
    let totalPrice = 0;
    if (data && data.cart && data.cart.length > 0) {
      data.cart.map((item) => {
        let itemPrice = item.quantity * item.product.price;
        totalPrice += itemPrice;
      });
    }
    return totalPrice;
  };
  
  return (
    <NativeBaseProvider>
      
      <VStack height="100%" bgColor={darkmode?'coolGray.800':'gray.100'} >

        <VStack  >
          <HStack  >
            <AppBar nav={navigation} page="Cart"   />
          </HStack>
        </VStack>
        {waitLoader ?
          
          <HStack width={initialLayout.width} height={initialLayout.height} >

            <Loader />
          </HStack>
          :
          
        <ScrollView height={515}  marginY={1} marginX={5} showsVerticalScrollIndicator={false} >
          {data.cart && data.cart.length>0 ? data.cart.map((item)=>
          
        <CartItemRow id={item._id} quantity={item.quantity} product={item.product} />
          ):
          (<NotFound title="Not Found" desc="No items in cart. Continue shopping to add items in cart."  />)
          }
        
        </ScrollView>
          }

        {data.cart && data.cart.length >0 &&
        
        <HStack width={devicewidth} alignItems="center"  paddingX={5} paddingTop={5} paddingBottom={20} bgColor={darkmode?"coolGray.800":"white"} justifyContent="space-between"  >
          <VStack>
            <Text color={darkmode?'white':'black'}>Total price</Text>
            <Heading color={darkmode?'white':'black'} marginTop={1}  size="lg" >Rs. {getOverallPrice()}</Heading>
          </VStack>
          <Pressable onPress={()=>navigation.navigate("Checkout")} >

          <HStack shadow={5} bgColor={darkmode ? '#fafafa' :"black"} borderRadius={100} paddingX={12} paddingY={5} alignItems="center" justifyContent="center"  marginLeft={3} >
            <Heading  size="sm" color={darkmode?'black':'white'} marginRight={2}>Checkout</Heading>
            
              
              <OctIcons size={15} name='arrow-right' color={darkmode?'black':'white'} />
           
          </HStack>
          </Pressable>
        </HStack>
        }
      </VStack>
        <BottomNavBar nav={navigation}  />
      </NativeBaseProvider>
  )
}

export default CartPage