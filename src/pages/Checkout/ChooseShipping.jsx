import {  View } from 'react-native'
import React from 'react'
import { ArrowBackIcon,Text, Heading, HStack, NativeBaseProvider, Radio, ScrollView, VStack, Pressable } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import { getDarkMode } from '../../redux/slices/userSlice'
import ShippingOptions from '../../components/Checkout/ShippingOptions'
import { useState } from 'react'
import { getShippingType, setShippingType } from '../../redux/slices/cartSlice'
import { useEffect } from 'react'

const ChooseShipping = ({navigation}) => {
  const dispatch = useDispatch()
    const darkmode = useSelector(getDarkMode)
    const [shippingMode,setShippingMode] = useState(40)
    const shippingType = useSelector(getShippingType)
    useEffect(()=>{
      setShippingMode(shippingType)
    },[])

    const handleApply=()=>{
      dispatch(setShippingType(shippingMode))
      navigation.goBack()
    }
  return (
    <NativeBaseProvider>
        <VStack bgColor={darkmode ? 'coolGray.800' :'gray.100'} paddingX={1}>
     <HStack alignItems="center" marginTop={6} marginBottom={4} marginX={3} >
     <ArrowBackIcon onPress={()=>navigation.goBack()} color={darkmode ? 'white':'black'} size="lg" />
     <Heading color={darkmode ? 'white':'black'}  marginLeft={3} size="md" >Choose Shipping</Heading>
     </HStack>

        <VStack height={585} >

        <Radio.Group  value={shippingMode} onChange={(val)=>setShippingMode(val)} name="myRadioGroup" accessibilityLabel="favorite number">

        <ShippingOptions shippingMode={shippingMode}  setShippingMode={setShippingMode} price={20} title="Economy" icon='cash-check' desc="Estimated Arrival, Dec 20-23" />
        <ShippingOptions shippingMode={shippingMode}  setShippingMode={setShippingMode} price={40} title="Regular" icon='cash' desc="Estimated Arrival, Dec 20-23" />
        <ShippingOptions shippingMode={shippingMode}  setShippingMode={setShippingMode} price={60} title="Cargo" icon='truck' desc="Estimated Arrival, Dec 20-23" />
        <ShippingOptions shippingMode={shippingMode}  setShippingMode={setShippingMode} price={80} title="Express" icon='truck-fast' desc="Estimated Arrival, Dec 20-23" />
        
        </Radio.Group>
        </VStack>
 

        <Pressable onPress={handleApply} >

        <HStack alignItems="center" justifyContent="center" shadow={5} marginX={3} marginY={5} bgColor={ darkmode? "gray.200": "black"} borderRadius={100} height={16}   >
      <Heading color={darkmode ? "black":"white"} size="sm" marginRight={2}  >Apply</Heading>
   
      </HStack>
        </Pressable>
     </VStack>
    </NativeBaseProvider>
  )
}

export default ChooseShipping