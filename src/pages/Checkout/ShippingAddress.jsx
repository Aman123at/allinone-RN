import { View, Text } from 'react-native'
import React from 'react'
import { ArrowBackIcon, Heading, HStack, NativeBaseProvider, Pressable, Radio, ScrollView, VStack } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import { getDarkMode, getLoggedInUser } from '../../redux/slices/userSlice'
import AddressRow from '../../components/Profile/AddressRow'
import { useEffect } from 'react'
import { fetchSavedAddresses, makeThisADefaultAddress } from '../../ApiCalls/cartApis'
import { getSavedAddresses } from '../../redux/slices/cartSlice'
import { useState } from 'react'
import SlideAlert from '../../utils/SlideAlert'
import { setLoader } from '../../redux/slices/commonSlice'

const ShippingAddress = ({navigation}) => {
    const darkmode = useSelector(getDarkMode)
    const loggedInUser = useSelector(getLoggedInUser);
    const savedAddresses = useSelector(getSavedAddresses);
   const [defaultAddressId,setDefaultAddressId] = useState('')
   const [btnLoader,setBtnLoader] = useState(false)
    const dispatch = useDispatch()
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
    useEffect(()=>{
      if(savedAddresses.status=='finished' && savedAddresses.data ){
        if(savedAddresses.data.address){
          let filtered = savedAddresses.data.address.filter((item)=>item.isDefaultAddress==true)
          if(filtered && filtered.length){
            setDefaultAddressId((filtered[0]._id).toString())
          }
        }
      }
    },[savedAddresses.status])
    const [showAlert,setShowAlert] = useState(false)
    const [error,setError] = useState('')
    const handleChangeDefaultAddress=()=>{
      
     setBtnLoader(true)
        makeThisADefaultAddress(defaultAddressId)
        .then((res)=>{
          setBtnLoader(false)
          if( loggedInUser.data && loggedInUser.data.user && loggedInUser.data.user._id){
            
            let loggedIndata = loggedInUser.data;
  
            let loggedUserId = loggedIndata.user ? loggedIndata.user._id : "";
            if (loggedUserId !== "") {
              dispatch(fetchSavedAddresses(loggedUserId));
            }
           
        }
          setTimeout(() => {
                    
            navigation.goBack()
        }, 500);
        })
        .catch((error)=>{
       
          setBtnLoader(false)
          setShowAlert(true)
          setError("Unable to make this a default address.")
        })
    }
  return (
    <NativeBaseProvider>
      <SlideAlert isOpenTop={showAlert} title={error} type='error' setIsOpenTop={setShowAlert}  />
        <VStack bgColor={darkmode ? 'coolGray.800' :'gray.100'} paddingX={1}>
     <HStack alignItems="center" marginTop={6} marginBottom={4} marginX={3} >
     <ArrowBackIcon onPress={()=>navigation.goBack()} color={darkmode ? 'white':'black'} size="lg" />
     <Heading color={darkmode ? 'white':'black'}  marginLeft={3} size="md" >Shipping Address</Heading>
     </HStack>

        <ScrollView height={588} showsVerticalScrollIndicator={false} >
        <Radio.Group 
         value={defaultAddressId} 
         onChange={(val)=>setDefaultAddressId(val)} 
         name="myRadioGroup_2" accessibilityLabel="favorite address">

          {savedAddresses.data &&
              savedAddresses.data.address &&
              savedAddresses.data.address.length > 0 &&
              savedAddresses.data.address.map((value, i) => (

        <AddressRow isShppingAddress={true} completeAddressDetail={value} />
              ))}
        </Radio.Group>
       
        
        <Pressable onPress={()=>navigation.navigate("Add New Address")} >

        <HStack alignItems="center" justifyContent="center" shadow={5} marginX={3} marginY={5} bgColor={ darkmode? "#555555": "gray.200"} borderRadius={100} height={16}   >
      <Heading color={darkmode ? "white":"black"} size="sm" marginRight={2}  >Add New Address</Heading>
   
      </HStack>
        </Pressable>
        </ScrollView>
 
         <Pressable onPress={handleChangeDefaultAddress} >

        <HStack alignItems="center" justifyContent="center" shadow={5} marginX={3} marginY={5} bgColor={ darkmode? "gray.200": "black"} borderRadius={100} height={16}   >
          {btnLoader ?
          <Heading size="sm" >Loading...</Heading>
          :
          
      <Heading color={darkmode ? "black":"white"} size="sm" marginRight={2}  >Apply</Heading>
          }
   
      </HStack>
         </Pressable>

     </VStack>
    </NativeBaseProvider>
  )
}

export default ShippingAddress