import { View, Text } from 'react-native'
import React from 'react'
import { getDarkMode } from '../../redux/slices/userSlice'
import { useSelector } from 'react-redux'
import { ArrowBackIcon, Heading, HStack, NativeBaseProvider, VStack } from 'native-base'

const ProductsInCategory = ({navigation,route}) => {
    const darkmode = useSelector(getDarkMode)
    const categoryTitle = route.params
  return (
    <NativeBaseProvider>
    <VStack bgColor={darkmode ? "coolGray.800" : 'white'} height="100%" paddingX={1}>
        <HStack alignItems="center" marginTop={6} marginBottom={2} marginX={3} >
        <ArrowBackIcon color={darkmode ? 'white':'black'} onPress={()=>navigation.goBack()} size="lg" />
        <Heading color={darkmode ? 'white':'black'}  marginLeft={3} size="md" >{categoryTitle.cat}</Heading>
        </HStack>
   
    </VStack>
</NativeBaseProvider>
  )
}

export default ProductsInCategory