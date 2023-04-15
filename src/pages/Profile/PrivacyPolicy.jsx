import { View, Text } from 'react-native'
import React from 'react'
import { ArrowBackIcon, Heading, HStack, NativeBaseProvider, VStack } from 'native-base'
import { useSelector } from 'react-redux'
import { getDarkMode } from '../../redux/slices/userSlice'

const PrivacyPolicy = ({navigation}) => {
  const darkmode = useSelector(getDarkMode)
  return (
    <NativeBaseProvider>
    <VStack height="100%" bgColor={ darkmode ? 'coolGray.800' : 'white'} paddingX={1}>
     <HStack alignItems="center" marginTop={6} marginBottom={2} marginX={3} >
     <ArrowBackIcon onPress={()=>navigation.goBack()} color={darkmode ? 'white':'black'} size="lg" />
     <Heading color={darkmode ? 'white':'black'} marginLeft={3} size="md" >Privacy Policy</Heading>
     </HStack>
     </VStack>
 </NativeBaseProvider>
  )
}

export default PrivacyPolicy