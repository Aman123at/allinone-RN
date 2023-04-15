import { View } from 'react-native'
import React from 'react'
import { ArrowBackIcon, Button, CheckIcon, Heading, HStack, Input, NativeBaseProvider, Select, VStack,Text } from 'native-base'
import { useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useSelector } from 'react-redux'
import { getDarkMode } from '../../redux/slices/userSlice'
const EditProfile = ({navigation}) => {
    const [profileData,setProfileData] = useState({
        country:'',
        gender:''
    })
    const darkmode = useSelector(getDarkMode)
  return (
    <NativeBaseProvider>
       <VStack bgColor={darkmode ? 'coolGray.800' :'white'} paddingX={1}>
        <HStack alignItems="center" marginTop={6} marginBottom={2} marginX={3} >
        <ArrowBackIcon onPress={()=>navigation.goBack()} color={darkmode ? 'white':'black'} size="lg" />
        <Heading color={darkmode ? 'white':'black'}  marginLeft={3} size="md" >Edit Profile</Heading>
        </HStack>

        <VStack height={570}  margin={3} >
        <Input color={darkmode ? 'white':'black'} borderRadius={10} bgColor={ darkmode?"#444444": "gray.100"} borderWidth={0} focusOutlineColor="gray.100"   marginY={3} placeholder="Enter Full Name" />
        <Input color={darkmode ? 'white':'black'} borderRadius={10} bgColor={ darkmode?"#444444": "gray.100"} borderWidth={0} focusOutlineColor="gray.100"   marginY={3} placeholder="Enter User Name" />
        <Input color={darkmode ? 'white':'black'} borderRadius={10} bgColor={ darkmode?"#444444": "gray.100"} borderWidth={0} focusOutlineColor="gray.100"   marginY={3} placeholder="Enter Email"  />
        <Select borderRadius={10} marginY={3} color={darkmode ? 'white':'black'} bgColor={ darkmode?"#444444": "gray.100"} dropdownIcon={<MaterialIcons  name="arrow-drop-down" color={darkmode ? "white" :"black"} size={30} />}
        _selectedItem={{bgColor:'gray.300'}}
        selectedValue={profileData.country} minWidth="200" accessibilityLabel="Choose Country" placeholder="Choose Country"  mt={1} onValueChange={itemValue => setProfileData({...profileData,country:itemValue})}>
          <Select.Item  label="UX Research" value="ux" />
          <Select.Item  label="Web Development" value="web" />
          <Select.Item  label="Cross Platform Development" value="cross" />
          <Select.Item label="UI Designing" value="ui" />
          <Select.Item  label="Backend Development" value="backend" />
        </Select>
        <Select color={darkmode ? 'white':'black'} borderRadius={10} marginY={3} bgColor={ darkmode?"#444444": "gray.100"} dropdownIcon={<MaterialIcons  name="arrow-drop-down" color={darkmode ? "white" :"black"} size={30} />}
        _selectedItem={{bgColor:'gray.300'}}
        selectedValue={profileData.gender} minWidth="200" accessibilityLabel="Choose Gender" placeholder="Choose Gender"  mt={1} onValueChange={itemValue => setProfileData({...profileData,gender:itemValue})}>
          <Select.Item label="Male" value="male" />
          <Select.Item  label="Female" value="female" />
          <Select.Item  label="Other" value="other" />
         
        </Select>
        </VStack>
        <Button shadow={5} marginX={3} marginY={5} bgColor={ darkmode? "gray.200": "black"} borderRadius={100} height={16}   ><Text color={darkmode ? "black":"white"} fontWeight="semibold" >Update</Text></Button>
        </VStack>
    </NativeBaseProvider>
  )
}

export default EditProfile