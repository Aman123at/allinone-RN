import { View } from 'react-native'
import React from 'react'
import { ArrowBackIcon, Button, Heading, HStack, NativeBaseProvider, ScrollView, VStack,Text } from 'native-base'
import AddressRow from '../../components/Profile/AddressRow'
import { useDispatch, useSelector } from 'react-redux'
import { getDarkMode, getLoggedInUser } from '../../redux/slices/userSlice'
import { getSavedAddresses } from '../../redux/slices/cartSlice'
import { useEffect } from 'react'
import { fetchSavedAddresses } from '../../ApiCalls/cartApis'

const Address = ({navigation}) => {
  const darkmode = useSelector(getDarkMode)
  const savedAddresses = useSelector(getSavedAddresses);
  const loggedInUser = useSelector(getLoggedInUser);
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
  return (
    <NativeBaseProvider>
       <VStack bgColor={darkmode ? 'coolGray.800' :'gray.100'}  paddingX={1}>
        <HStack alignItems="center" marginTop={6} marginBottom={2} marginX={3} >
        <ArrowBackIcon onPress={()=>navigation.goBack()} color={darkmode ? 'white':'black'} size="lg" />
        <Heading marginLeft={3} size="md" color={darkmode ? 'white':'black'} >Address</Heading>
        </HStack>

        <ScrollView marginY={3} height={595}  showsVerticalScrollIndicator={false} >
        {savedAddresses.data &&
              savedAddresses.data.address &&
              savedAddresses.data.address.length > 0 &&
              savedAddresses.data.address.map((value, i) => (

        <AddressRow completeAddressDetail={value} />
              ))}
         
        </ScrollView>
        <Button onPress={()=>navigation.navigate("Add New Address")} shadow={5} margin={3}  bgColor={ darkmode? "gray.200": "black"} borderRadius={100} height={16}   ><Text color={darkmode ? "black":"white"} fontWeight="semibold" >Add New Address</Text></Button>

        </VStack>
    </NativeBaseProvider>
  )
}

export default Address