import {  View } from 'react-native'
import React from 'react'
import { ArrowBackIcon, Avatar, Divider, extendTheme, Heading, HStack, NativeBaseProvider,Pressable,Switch,Text, useColorMode, useColorModeValue, useDisclose, VStack } from 'native-base'
import BottomNavBar from '../../components/BottomNavBar'
import AppBar from '../../components/AppBar'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import IonIcons from 'react-native-vector-icons/Ionicons';
import LogoutActionSheet from '../../components/Profile/LogoutActionSheet'
import { useDispatch, useSelector } from 'react-redux'
import { getDarkMode, getLoggedInUser, setDarkMode } from '../../redux/slices/userSlice'
import { useEffect } from 'react'
import { useState } from 'react'
import { changeMode } from '../../ApiCalls/userApis'
const ProfilePage = ({navigation}) => {
 
    const {onOpen,isOpen,onClose} = useDisclose()
    const dispatch = useDispatch()
    const darkmode = useSelector(getDarkMode)
    const loggedInUser = useSelector(getLoggedInUser)
   
    

   
  
  return (
    <NativeBaseProvider >
      <LogoutActionSheet  isOpen={isOpen} onClose={onClose} nav={navigation} />
        <VStack height="100%" bgColor={darkmode?"coolGray.800":"white"}   >
          <HStack  >
            <AppBar nav={navigation} page="Profile" />
          </HStack>
          <VStack marginY={2} justifyContent='center'  >
            
            {loggedInUser.data && loggedInUser.data.user && loggedInUser.data.user.gender ? 
      <Avatar alignSelf="center" size="xl"  bg="green.500" source={{
        uri: loggedInUser.data.user.gender == 'male'? "https://w7.pngwing.com/pngs/174/20/png-transparent-moslem-fasting-islam-man-handsome-ramadan-ramadan-fasting-moslem-pray-outline-icon.png" : "https://static.vecteezy.com/system/resources/previews/006/195/212/original/woman-or-girl-symbol-line-icon-stroke-graphics-pictogram-for-web-design-quality-outline-symbol-concept-premium-mono-linear-beautiful-simple-concise-logo-vector.jpg"
    }}>
    AJ
    <Avatar.Badge alignItems="center" justifyContent="center" borderWidth={0} children={<FontAwesome5Icon name='pen'  size={13} color="white" />} borderRadius={8}  bg="black" />
   </Avatar> 
      :
      
       <Avatar bg="purple.600" alignSelf="center" size="xl" source={{
        uri: "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80"
      }}>
          RB
          <Avatar.Badge alignItems="center" justifyContent="center" borderWidth={0} children={<FontAwesome5Icon name='pen'  size={13} color="white" />} borderRadius={8}  bg="black" />
        </Avatar> 
      }
          {/* <Avatar bg="purple.600" alignSelf="center" size="xl" source={{
        uri: "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80"
      }}>
          RB
          <Avatar.Badge alignItems="center" justifyContent="center" borderWidth={0} children={<FontAwesome5Icon name='pen'  size={13} color="white" />} borderRadius={8}  bg="black" />
        </Avatar> */}
        <Heading color={darkmode?"white":'black'}  textAlign="center" marginY={1} size="lg" >{loggedInUser.data?.user?.name}</Heading>
        <Text color={darkmode?"white":'black'} textAlign="center" marginBottom={2} >{loggedInUser.data?.user?.email}</Text>

          </VStack>

          <Divider width={350} marginX={5} />
          <VStack marginX={5} marginY={1} height={438}  >



            <Pressable onPress={()=>navigation.navigate("Edit Profile")} >
            <HStack  marginY={3} alignItems="center" justifyContent="space-between"   >
              <HStack alignItems="center" >
                <IonIcons name='person-outline' size={20} color={darkmode?"white":'black'} />
                <Text color={darkmode?"white":'black'} marginLeft={3} fontSize={15} fontWeight="semibold" >Edit Profile</Text>
              </HStack>
              <FontAwesome5Icon name='angle-right'  size={20} color={darkmode?"white":'black'} />
            </HStack>
            </Pressable>

            <Pressable onPress={()=>navigation.navigate("Address")}>
            <HStack marginY={3} alignItems="center" justifyContent="space-between"   >
              <HStack alignItems="center" >
                <IonIcons name='location-outline' size={20} color={darkmode?"white":'black'} />
                <Text color={darkmode?"white":'black'} marginLeft={3} fontSize={15} fontWeight="semibold" >Address</Text>
              </HStack>
              <FontAwesome5Icon name='angle-right'  size={20} color={darkmode?"white":'black'} />
            </HStack>
            </Pressable>

            
            <Pressable onPress={()=>navigation.navigate("Security")} >  

            <HStack marginY={3} alignItems="center" justifyContent="space-between"   >
              <HStack alignItems="center" >
                <IonIcons name='shield-checkmark-outline' size={20} color={darkmode?"white":'black'} />
                <Text color={darkmode?"white":'black'} marginLeft={3} fontSize={15} fontWeight="semibold" >Security</Text>
              </HStack>
              <FontAwesome5Icon name='angle-right'  size={20} color={darkmode?"white":'black'} />
            </HStack>
            </Pressable>


            <Pressable>

            <HStack marginY={3} alignItems="center" justifyContent="space-between"   >
              <HStack alignItems="center" >
                <IonIcons name='eye-outline' size={20} color={darkmode?"white":'black'} />
                <Text color={darkmode?"white":'black'} marginLeft={3} fontSize={15} fontWeight="semibold" >Dark Mode</Text>
              </HStack>
            
              

              <Switch isChecked={darkmode} onChange={()=>{
                
                if(darkmode){
                  dispatch(setDarkMode(false))
                  changeMode(false)
                 
                }else{
                  dispatch(setDarkMode(true))
                  changeMode(true)
                  
                }
              }}  size="md" />
              
            </HStack>
            </Pressable>


            <Pressable onPress={()=>navigation.navigate("Privacy Policy")} >

            <HStack marginY={3} alignItems="center" justifyContent="space-between"   >
              <HStack alignItems="center" >
                <IonIcons name='lock-closed-outline' size={20} color={darkmode?"white":'black'} />
                <Text color={darkmode?"white":'black'} marginLeft={3} fontSize={15} fontWeight="semibold" >Privacy Policy</Text>
              </HStack>
              <FontAwesome5Icon name='angle-right'  size={20} color={darkmode?"white":'black'} />
            </HStack>
            </Pressable>


            <Pressable onPress={()=>navigation.navigate("Help Center")} >

            <HStack marginY={3} alignItems="center" justifyContent="space-between"   >
              <HStack alignItems="center" >
                <IonIcons name='information-circle-outline' size={20} color={darkmode?"white":'black'} />
                <Text color={darkmode?"white":'black'} marginLeft={3} fontSize={15} fontWeight="semibold" >Help Center</Text>
              </HStack>
              <FontAwesome5Icon name='angle-right'  size={20} color={darkmode?"white":'black'} />
            </HStack>
            </Pressable>


            <Pressable onPress={onOpen} >

            <HStack marginY={3} alignItems="center" justifyContent="space-between"   >
              <HStack alignItems="center" >
                <IonIcons name='exit-outline' size={20} color="red" />
                <Text marginLeft={3} fontSize={15} color="red.400" fontWeight="semibold" >Logout</Text>
              </HStack>
              {/* <FontAwesome5Icon name='angle-right'  size={20} color="black" /> */}
            </HStack>
            </Pressable>


          </VStack>
        </VStack>
        
        <BottomNavBar nav={navigation} />
      </NativeBaseProvider>
  )
}

export default ProfilePage