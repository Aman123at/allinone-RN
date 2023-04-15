import { Dimensions } from 'react-native'
import React from 'react'
import { ArrowBackIcon, Heading, HStack, NativeBaseProvider, VStack ,Text} from 'native-base'
import { useSelector } from 'react-redux'
import { getDarkMode } from '../redux/slices/userSlice'

const Description = ({navigation,route}) => {
    const descdata = route.params
    const darkmode = useSelector(getDarkMode)
   
    const deviceHeight = Dimensions.get('window').height
  return (
   <NativeBaseProvider>
    <VStack height={deviceHeight} bgColor={darkmode ? 'coolGray.800' :'white'} paddingX={1}>
 <HStack alignItems="center" marginTop={6} marginBottom={4} marginX={3} >
 <ArrowBackIcon onPress={()=>navigation.goBack()} color={darkmode ? 'white':'black'} size="lg" />
 <Heading color={darkmode ? 'white':'black'}  marginLeft={3} size="md" >Description</Heading>
 </HStack>
 
<HStack marginX={3} >
    <Text color={darkmode ? 'white':'black'} >{descdata.desc}</Text>
</HStack>

 </VStack>
   </NativeBaseProvider>
  )
}

export default Description