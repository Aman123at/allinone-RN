import { View } from 'react-native'
import React, { useState } from 'react'
import { HStack, VStack ,Text, Box, Pressable, Center} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FAIcons from 'react-native-vector-icons/FontAwesome5';
import FeatherIcons from 'react-native-vector-icons/Feather';
import IonIcons from 'react-native-vector-icons/Ionicons';
import SimpleIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useDispatch, useSelector } from 'react-redux';
import { getActivePage, setActivePage } from '../redux/slices/commonSlice';
import { getDarkMode } from '../redux/slices/userSlice';
const BottomNavBar = ({nav}) => {
    const [selected, setSelected] = useState(0);
    const activePage = useSelector(getActivePage)
    const dispatch = useDispatch()
    const darkmode = useSelector(getDarkMode)
  return (
    <Box  bgColor={darkmode?'coolGray.800':'white'} width="100%" alignSelf="center" safeAreaBottom zIndex={10} bottom={0} position='absolute' >
       
    <HStack  alignItems="center" safeAreaBottom shadow={6}>
      <Pressable  opacity={activePage === "HOME" ? 1 : 0.5} py="3" flex={1} onPress={() =>{ dispatch(setActivePage("HOME"));nav.navigate("Home")}}>
        <Center>
          <MaterialCommunityIcons mb="1" name={activePage === "HOME" ? 'home-variant' : 'home-variant-outline'} color={darkmode?'white':'black'} size={25} />
          <Text color={darkmode?'white':'black'} fontSize="12">
            Home
          </Text>
        </Center>
      </Pressable>
      <Pressable cursor="pointer" opacity={activePage === "CART" ? 1 : 0.5} py="2" flex={1} onPress={() => { dispatch(setActivePage("CART"));nav.navigate("Cart")}}>
        <Center>
          {activePage === "CART" ? 
          <FAIcons mb="1"  name="shopping-bag"  color={darkmode?'white':'black'} size={25} />
          :<SimpleIcons mb='1' name='handbag' color={darkmode?'white':'black'} size={25} />}
          <Text color={darkmode?'white':'black'} fontSize="12">
            Cart
          </Text>
        </Center>
      </Pressable>
      <Pressable cursor="pointer" opacity={activePage === "ORDERS" ? 1 : 0.6} py="2" flex={1} onPress={() => { dispatch(setActivePage("ORDERS"));nav.navigate("Orders")}}>
        <Center>
          {activePage === "ORDERS" ? 
          <FAIcons mb="1"  name='shopping-cart'  color={darkmode?'white':'black'} size={25} />
          :<FeatherIcons mb="1"  name='shopping-cart'  color={darkmode?'white':'black'} size={25} />}
          <Text color={darkmode?'white':'black'} fontSize="12">
            Orders
          </Text>
        </Center>
      </Pressable>
      <Pressable cursor="pointer" opacity={activePage === "PROFILE" ? 1 : 0.5} py="2" flex={1} onPress={() => { dispatch(setActivePage("PROFILE"));nav.navigate("Profile")}}>
        <Center>
          <IonIcons mb="1" name={activePage === "PROFILE"?'person':'person-outline' }  color={darkmode?'white':'black'} size={25} />
          <Text color={darkmode?'white':'black'} fontSize="12">
            Profile
          </Text>
        </Center>
      </Pressable>
    </HStack>
  </Box>
  )
}

export default BottomNavBar