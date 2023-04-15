import { View, Text } from 'react-native'
import React from 'react'
import { ArrowBackIcon, Button, Heading, HStack, NativeBaseProvider, VStack } from 'native-base'
import { useSelector } from 'react-redux'
import { getDarkMode } from '../../redux/slices/userSlice'

const InvoicePage = ({navigation}) => {
    const darkmode = useSelector(getDarkMode)
  return (
    <NativeBaseProvider>
          <VStack bgColor={darkmode ? 'coolGray.800' :'gray.100'} paddingX={1}>
     <HStack alignItems="center" marginTop={6} marginBottom={4} marginX={3} >
     <ArrowBackIcon onPress={()=>navigation.goBack()} color={darkmode ? 'white':'black'} size="lg" />
     <Heading color={darkmode ? 'white':'black'}  marginLeft={3} size="md" >Download Invoice</Heading>
     </HStack>
        <HStack justifyContent="center" alignItems="center" >
            <Button margin={3} padding={3} onPress={()=>navigation.navigate("Cart")} >Download</Button>
        </HStack>
      </VStack>
    </NativeBaseProvider>
  )
}

export default InvoicePage