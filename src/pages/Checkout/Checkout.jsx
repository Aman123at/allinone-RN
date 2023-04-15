import { View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDarkMode, getLoggedInUser } from '../../redux/slices/userSlice'
import { ArrowBackIcon, Text,Button, Heading, HStack, NativeBaseProvider, ScrollView, VStack, Divider, Pressable } from 'native-base'
import AddressRow from '../../components/Profile/AddressRow'
import { clearCart, getCartItems, getSavedAddresses, getShippingType, setInvoiceDetails } from '../../redux/slices/cartSlice'
import CartItemRow from '../../components/Cart/CartItemRow'
import NotFound from '../NotFoundPage/NotFound'
import OctIcons from 'react-native-vector-icons/Octicons'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { clearUsersCart, fetchSavedAddresses, getRazorpayKey, getRazorpayOrder } from '../../ApiCalls/cartApis'
import { useEffect } from 'react'
import RazorpayCheckout from 'react-native-razorpay';
import { useState } from 'react'
import { createOrder } from '../../ApiCalls/orderApis'
import SlideAlert from '../../utils/SlideAlert'

const Checkout = ({navigation}) => {
    const darkmode = useSelector(getDarkMode)
    const [rezorpaykey, setRazorpaykey] = useState("");
    const { status, data } = useSelector(getCartItems);
    const loggedInUser = useSelector(getLoggedInUser);
    const savedAddresses = useSelector(getSavedAddresses);
    const shippingType = useSelector(getShippingType)
    const dispatch = useDispatch()
    const [defaultAdd,setDefaultAdd] = useState([])
    useEffect(()=>{
      if(savedAddresses.status == 'finished'){
        if(savedAddresses.data && savedAddresses.data.address && savedAddresses.data.address.length>0 ){
          let filtered =  savedAddresses.data.address.filter((item)=>item.isDefaultAddress==true)
          
          setDefaultAdd(filtered)
        }
      }
     
    },[savedAddresses.status])
    useEffect(() => {
      getRazorpayKey()
        .then((res) => {
          if (res.razorpaykey) {
            setRazorpaykey(res.razorpaykey);
          }
        })
        
    }, []);
    useEffect(() => {
      if (
        savedAddresses.status === "idle" &&
        loggedInUser.status === "finished"
      ) {
        let loggedIndata = loggedInUser.data;
  
        let loggedUserId = loggedIndata.user ? loggedIndata.user._id : "";
        if (loggedUserId !== "") {
          dispatch(fetchSavedAddresses(loggedUserId));
        }
      }
    }, [savedAddresses.status, loggedInUser.status]);

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

    const extractInvoiceFromCart=(cartData)=>{
      let toret = []
      cartData.map((item)=>{
        let obj = {}
        obj["productName"] = item.product.name
        obj["productId"] = item.product.prodId
        obj["productPrice"] = item.product.price
        obj["quantity"] = item.quantity

        toret.push(obj)
      })

      return toret

  }

  const handleCreateInvoice=()=>{
    // create invoice
    let myInvoice = extractInvoiceFromCart(data.cart)
    dispatch(setInvoiceDetails({
      products:myInvoice,
      shippingCharge:shippingType

    }))
  }
  

    const handleCreateOrder=(razorpay_order_id,razorpay_payment_id)=>{
      // create order
      let payload = {
        products: extractInvoiceFromCart(data.cart),
        order_id:razorpay_order_id,
        payment_id:razorpay_payment_id
      }
      createOrder(payload)
      .then((response)=>{
        let loggedIndata = loggedInUser.data;
  
        
        let loggedUserId = loggedIndata.user ? loggedIndata.user._id : "";
        if(response.success){
          handleCreateInvoice()
          setTimeout(() => {
            clearUsersCart(loggedUserId)
            .then((res)=>{
              dispatch(clearCart())
            })
            
            navigation.navigate("Invoice")
            
          }, 200);
        }
      })
      
    }
  const [showAlert,setShowAlert] = useState(false)
  const [error,setError] = useState('')
    const handlePayment=async()=>{
      let shippingCharge = shippingType
      let neworder = await getRazorpayOrder((getOverallPrice()+shippingCharge)*100)
      let options = {
       
        image: 'https://i.imgur.com/3g7nmJC.jpg',
        currency: 'INR',
        key: rezorpaykey,
        amount: neworder && neworder.order? neworder.amount :`${getOverallPrice()+shippingCharge}`,
        name: "All In One Org",
        description: "Test Transaction",
        order_id: neworder && neworder.order ? neworder.order.id : Math.random()*234345,//Replace this with an order_id created using Orders API.
        prefill: {
          name: `${ defaultAdd.length>0 ? defaultAdd[0].firstName+' '+defaultAdd[0].lastName :'random-people' }`,
          email: `${defaultAdd.length>0 ? defaultAdd[0].email : 'random-email'}`,
          contact: `${ defaultAdd.length>0 ? defaultAdd[0].phone :'random-phone' }`,
        },
       
        theme: {
          color: "#3399cc",
        },
      }
      RazorpayCheckout.open(options).then((res) => {
        // handle success
        
          handleCreateOrder(res.razorpay_order_id,res.razorpay_payment_id)
      }).catch((error) => {
        // handle failure
        setError('Payment failed! Please try again.')
        
      });
    }
  return (
    <NativeBaseProvider>
   <SlideAlert isOpenTop={showAlert} title={error} type='error' setIsOpenTop={setShowAlert} />
    <VStack bgColor={darkmode ? 'coolGray.800' :'gray.100'} paddingX={1}>
     <HStack alignItems="center" marginTop={6} marginBottom={4} marginX={3} >
     <ArrowBackIcon onPress={()=>navigation.goBack()} color={darkmode ? 'white':'black'} size="lg" />
     <Heading color={darkmode ? 'white':'black'}  marginLeft={3} size="md" >Checkout</Heading>
     </HStack>
     <Divider opacity={0.6} />
     <Heading marginY={4} marginX={3} size="md" color={darkmode ? 'white' :'black'} >Shipping Address</Heading>
     <Pressable onPress={()=>navigation.navigate("Shipping Address")} >
      {savedAddresses.data && savedAddresses.data.address && savedAddresses.data.address.length>0 &&
      savedAddresses.data.address.filter((item)=>item.isDefaultAddress==true).length>0 ?
      savedAddresses.data.address.filter((item)=>item.isDefaultAddress==true).map((val)=>
      
      <AddressRow isCheckoutPage={true} completeAddressDetail={val} />
      )
      
      :<NotFound />}
     </Pressable>
     <Divider opacity={0.6} />
     <Heading marginY={4} marginX={3} size="md" color={darkmode ? 'white' :'black'} >Order List</Heading>


     <ScrollView height={375}  marginY={1} marginX={5} showsVerticalScrollIndicator={false} >
          {data.cart && data.cart.length>0 ? data.cart.map((item)=>
          
        <CartItemRow isCheckoutPage={true} id={item._id} quantity={item.quantity} product={item.product} />
          ):
          (<NotFound title="Not Found" desc="No items in cart. Continue shopping to add items in cart."  />)
          }

        <Divider opacity={0.6} />
        <Heading marginY={4}  size="md" color={darkmode ? 'white' :'black'} >Choose Shipping</Heading>
        <Pressable padding={2} borderRadius={15} bgColor={darkmode ? '#555555' :"white"} onPress={()=>navigation.navigate("Choose Shipping")} >

          <HStack  marginY={3} alignItems="center" justifyContent="space-between"  >
            <HStack alignItems="center" >
              <FontAwesome5Icon name='truck-moving' size={20} color={darkmode?"white":'black'} />
              <Text color={darkmode?"white":'black'} marginLeft={3} fontSize={15} fontWeight="semibold" >Choose Shipping Type</Text>
            </HStack>
            <FontAwesome5Icon name='angle-right'  size={20} color={darkmode?"white":'black'} />
          </HStack>
        </Pressable>
        
        </ScrollView>

   
   <Pressable onPress={handlePayment} >

     <HStack alignItems="center" justifyContent="center" shadow={5} marginX={3} marginY={5} bgColor={ darkmode? "gray.200": "black"} borderRadius={100} height={16}   >
      <Text color={darkmode ? "black":"white"} marginRight={2} fontWeight="semibold" >Continue to Payment</Text>
      <OctIcons size={15} name='arrow-right' color={darkmode?'black':'white'} />
      </HStack>
   </Pressable>
     </VStack>
 </NativeBaseProvider>
  )
}

export default Checkout