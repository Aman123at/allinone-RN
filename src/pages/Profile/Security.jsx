import { View } from 'react-native'
import React from 'react'
import { ArrowBackIcon, Text,Heading, HStack, NativeBaseProvider, VStack, Switch, Pressable, Button } from 'native-base'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { useSelector } from 'react-redux'
import { getDarkMode } from '../../redux/slices/userSlice'
const Security = ({navigation}) => {
  const darkmode = useSelector(getDarkMode)
  return (
    <NativeBaseProvider>
       <VStack height="100%" bgColor={ darkmode ? 'coolGray.800' : 'white'} paddingX={1}>
        <HStack alignItems="center"  marginTop={6} marginBottom={2} marginX={3} >
        <ArrowBackIcon onPress={()=>navigation.goBack()} color={darkmode ? 'white':'black'} size="lg" />
        <Heading color={darkmode ? 'white':'black'} marginLeft={3} size="md" >Security</Heading>
        </HStack>

        <Pressable>

<HStack marginX={3} marginY={5} alignItems="center" justifyContent="space-between"   >
  <HStack alignItems="center" >

    <Text color={darkmode ? 'white':'black'} fontSize={15} fontWeight="semibold" >Biometric ID</Text>
  </HStack>

  

  <Switch  size="md" />
  
</HStack>
</Pressable>


            <Pressable  >  

                <HStack marginX={3} marginY={5} alignItems="center" justifyContent="space-between"   >
                  <HStack alignItems="center" >
                    
                    <Text color={darkmode ? 'white':'black'} fontSize={15} fontWeight="semibold" >Google Authenticator</Text>
                  </HStack>
                  <FontAwesome5Icon name='angle-right'  size={20} color={darkmode ? 'white':'black'}/>
                </HStack>
            </Pressable>



        <Button  margin={3}  bgColor={ darkmode ? "#444444": "gray.200"} borderRadius={100} height={16}   ><Text color={darkmode ? 'white':'black'} fontWeight="semibold" >Change Password</Text></Button>

        </VStack>
    </NativeBaseProvider>
  )
}

export default Security