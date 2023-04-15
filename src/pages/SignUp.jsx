import { Dimensions } from 'react-native'
import React from 'react'
import {  Heading, VStack,  Input, Button,  NativeBaseProvider, HStack, Text, Divider, Image, Pressable, Radio,  Fab } from "native-base";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import validator from "validator";
import { registerUser } from '../ApiCalls/userApis';
import { getDarkMode, setDarkMode } from '../redux/slices/userSlice';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterailCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import IonIcons from 'react-native-vector-icons/Ionicons'
import SlideAlert from '../utils/SlideAlert';
const SignUp = (props) => {
  const dispatch = useDispatch();
  const darkmode = useSelector(getDarkMode)
  const [showAlert,setShowAlert] = useState(false)
  const [error,setError] = useState('')
  const [showPassword,setShowPassword] = useState(false)
  const [showCnfPassword,setShowCnfPassword] = useState(false)
  const [buttonLoader,setButtonLoader] = useState(false)
  const [iconDark,setIconDark] = useState({
    name:false,
    email:false,
    pass:false,
    cnfpass:false
  })
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    cnfPassword: "",
    gender:'male'
  });

  


  const deviceWidth = Dimensions.get('window').width
  const handleSignUp = async () => {
   
    setButtonLoader(true)
    if (
      !userDetails.name ||
      !userDetails.email ||
      !userDetails.password ||
      !userDetails.cnfPassword
    ) {
      
      setButtonLoader(false)
      setError('All Fields are required.')
        setShowAlert(true)
     
    } else if (userDetails.password !== userDetails.cnfPassword) {
    
      setButtonLoader(false)
      setError('Password and Confirm Password not matches.')
        setShowAlert(true)
      

    } else if (!validator.isEmail(userDetails.email)) {
     
      setButtonLoader(false)
      setError('Email is not in correct format.')
        setShowAlert(true)
      

    } else {
      registerUser(userDetails)
        .then((resp) => {
          if (resp.success) {
            
            setButtonLoader(false)
      

            props.navigation.navigate('SignIn');
          }
        })
        .catch((e) => {
         
          setButtonLoader(false)
          setError('Please try again.')
        setShowAlert(true)
     

         
        });
    }
  };
  return (
    <NativeBaseProvider>
      <Fab placement='top-right' onPress={()=>dispatch(setDarkMode(!darkmode))} renderInPortal={false} shadow={2} size="sm" bgColor={ darkmode ? "#393939" :  "gray.200"} icon={<IonIcons color={ darkmode ? 'white' : "black"}  name={darkmode ? "sunny":"moon"} size={20} />} />
      <SlideAlert isOpenTop={showAlert} title={error} type='error' setIsOpenTop={setShowAlert} />
    <VStack height="100%" bgColor={ darkmode ? "coolGray.800" : "white"} >

         <VStack marginTop={5}  marginX={3} >
          <Heading color={darkmode ? 'white':'black'} size="3xl" fontWeight="semibold" >Create your Account</Heading>
          <VStack marginTop={4} marginX={1} >

          <Input
           value={userDetails.name}
           onChangeText={(text)=>setUserDetails({...userDetails,name:text})}
           bgColor={darkmode ? "#303030" : "#fafafa"} marginY={3}  onBlur={()=>setIconDark({...iconDark,name:false})} onFocus={()=>setIconDark({...iconDark,name:true})} borderWidth={0} borderRadius={10}
           InputLeftElement={<MaterialIcons  name="person" size={25}  color={(iconDark.name || userDetails.email.length>0 ) ? (darkmode ? "white" :"#212121") :"#b8b8b8"} />}
            placeholder="Name" placeholderTextColor="#b8b8b8" color={darkmode ? 'white' :'black'} />

          <Input
          value={userDetails.email}
          onChangeText={(text)=>setUserDetails({...userDetails,email:text})}
          bgColor={darkmode ? "#303030" : "#fafafa"} marginY={3}  onBlur={()=>setIconDark({...iconDark,email:false})} onFocus={()=>setIconDark({...iconDark,email:true})} borderWidth={0} borderRadius={10}
           InputLeftElement={<MaterialIcons  name="email" size={25}  color={(iconDark.email || userDetails.email.length>0 ) ? (darkmode ? "white" :"#212121") :"#b8b8b8"} />}
            placeholder="Email" placeholderTextColor="#b8b8b8" color={darkmode ? 'white' :'black'} />

          <Input
          value={userDetails.password}
          onChangeText={(text)=>setUserDetails({...userDetails,password:text})}
          type={ showPassword ? 'text' : 'password'}  bgColor={darkmode ? "#303030" : "#fafafa"} marginY={3}  onBlur={()=>setIconDark({...iconDark,pass:false})} onFocus={()=>setIconDark({...iconDark,pass:true})} borderWidth={0} borderRadius={10} 
          InputLeftElement={<MaterialIcons name="lock" size={25} color={(iconDark.pass || userDetails.password.length>0  ) ? (darkmode ? "white" :"#212121") :"#b8b8b8"}  />}
          InputRightElement={<IonIcons  name={showPassword ? "eye" :"eye-off"} size={25}  color={(iconDark.pass || userDetails.password.length>0  ) ? (darkmode ? "white" :"#212121") :"#b8b8b8"} onPress={()=>setShowPassword(!showPassword)} />} 
          placeholder="Password" placeholderTextColor="#b8b8b8" color={darkmode ? 'white' :'black'} />

          <Input
          value={userDetails.cnfPassword}
          onChangeText={(text)=>setUserDetails({...userDetails,cnfPassword:text})}
          type={ showCnfPassword ? 'text' : 'password'}  bgColor={darkmode ? "#303030" : "#fafafa"} marginY={3}  onBlur={()=>setIconDark({...iconDark,cnfpass:false})} onFocus={()=>setIconDark({...iconDark,cnfpass:true})} borderWidth={0} borderRadius={10} 
          InputLeftElement={<MaterialIcons name="lock" size={25} color={(iconDark.cnfpass || userDetails.cnfPassword.length>0  ) ? (darkmode ? "white" :"#212121") :"#b8b8b8"}  />}
          InputRightElement={<IonIcons  name={showCnfPassword ? "eye" :"eye-off"} size={25}  color={(iconDark.cnfpass || userDetails.cnfPassword.length>0  ) ? (darkmode ? "white" :"#212121") :"#b8b8b8"} onPress={()=>setShowCnfPassword(!showCnfPassword)} />} 
          placeholder="Confirm Password" placeholderTextColor="#b8b8b8" color={darkmode ? 'white' :'black'} />

          <HStack marginY={2} alignItems="center" >
            <Heading color={darkmode ? 'white' :'black'} size="sm" >Gender :</Heading>
            <Radio.Group   value={userDetails.gender} onChange={(text)=>setUserDetails({...userDetails,gender:text})}  name="example" accessibilityLabel="pick gender"  >
              <HStack marginLeft={2} justifyContent="space-between" alignItems="center"  >

                <Radio value="male" colorScheme="blue" size="sm" ml={1}>
                  <Text color={darkmode ? 'white' :'black'} >Male</Text>
                </Radio>
                <Radio value="female" colorScheme="blue" size="sm" ml={3}>
                <Text color={darkmode ? 'white' :'black'} >Female</Text>
                </Radio>
              </HStack>
     
       
            </Radio.Group>
          </HStack>

            <Button onPress={handleSignUp} borderRadius={100} backgroundColor="black" color="white"  fontWeight="bold"  marginY={4} height={16}   >
              <Text color="white" fontWeight="bold" >{buttonLoader ? 'Crating Account...' :'Sign Up'}</Text>
            </Button>

      




            <Divider position="relative" marginY={4} />
            <HStack paddingX={1}   bgColor="white" position="absolute"  bottom={40} right={deviceWidth/3} >

            <Text  color="#616161" textAlign="center"    >or continue with</Text>
            </HStack>
            <HStack justifyContent="space-evenly" marginY={5} >
              <HStack borderRadius={20} paddingY={3} paddingX={5} borderWidth={1} borderColor="gray.200" justifyContent="center" alignItems="center"   >
                <MaterialIcons name='facebook' color="#1088e3" size={35}  />
              </HStack>
              <HStack borderRadius={20} paddingY={3} paddingX={5} borderWidth={1} borderColor="gray.200" justifyContent="center" alignItems="center"   >
               
                <Image width={35} height={35} source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-1ZKliw7PHB3VlLmH4oLlQVx4N0-SzLpTf3kYa8s&s'}}  alt='Google' />
              </HStack>
              <HStack borderRadius={20} paddingY={3} paddingX={5} borderWidth={1} borderColor="gray.200" justifyContent="center" alignItems="center"   >
                <MaterailCommunityIcons name='apple' color="black"  size={35}  />
              </HStack>
            </HStack>

            <HStack marginY={4} justifyContent="center" > 
            <Text color="gray.400" >Already have an account?</Text>
            <Pressable onPress={()=>props.navigation.navigate("SignIn")} >
            <Text marginLeft={1} fontWeight="semibold" >Sign In</Text>
            </Pressable>
             </HStack>
          </VStack>
         </VStack>
    </VStack>
  </NativeBaseProvider>
  )
}

export default SignUp
