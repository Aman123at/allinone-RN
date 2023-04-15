import { Dimensions } from 'react-native'
import React, { useState } from 'react'
import {  Text, Heading, VStack, Input, Button, HStack, NativeBaseProvider, Divider, Image, Pressable, Fab } from "native-base";
import { useDispatch, useSelector } from 'react-redux';
import validator from "validator";
import { fetchUser, login } from '../ApiCalls/userApis';
import { getDarkMode, setDarkMode } from '../redux/slices/userSlice';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterailCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import IonIcons from 'react-native-vector-icons/Ionicons'
import SlideAlert from '../utils/SlideAlert';

interface IMode {
  email:boolean,
  pass:boolean
}
interface ILogin {
  email:string,
  password:string
}
const SignIn:React.FC = (props:any) => {
  const dispatch = useDispatch()
  const darkmode:boolean = useSelector(getDarkMode)
  const [showPassword,setShowPassword] = useState<boolean>(false)
  const [showAlert,setShowAlert] = useState<boolean>(false)
  const [error,setError] = useState<string>('')

  const [buttonLoader,setButtonLoader] = useState<boolean>(false)
  
  const [iconDark,setIconDark] = useState<IMode>({
    email:false,
    pass:false
  })
  const [loginData,setLoginData] = useState<ILogin>({
    email:'',
    password:''
  })

  const deviceWidth: number = Dimensions.get('window').width

  const handleSignIn :VoidFunction =()=>{
    
    
      setButtonLoader(true)
      if (!loginData.email || !loginData.password) {
        setError('Email and Password is required.')
        setShowAlert(true)
       
        setButtonLoader(false)
        
        
      } else if (!validator.isEmail(loginData.email)) {
        setError('Email  is incorrect.')
        setShowAlert(true)
        
        setButtonLoader(false)
        
        
  
     
      } else {
        login(loginData)
          .then((resp) => {
            if (resp.success) {
         
              setLoginData({
                email:'',
                password:''
              })
              dispatch(fetchUser());
              setButtonLoader(false)
  
              props.navigation.navigate('Home')
            }
          })
          .catch((e) => {
           
            setError('Please try again.')
            setShowAlert(true)
           
            setButtonLoader(false)
           
          });
      
    };
  }
  return (
    <NativeBaseProvider>
      <SlideAlert isOpenTop={showAlert} title={error} type='error' setIsOpenTop={setShowAlert} />
      <Fab placement='top-right' onPress={()=>dispatch(setDarkMode(!darkmode))} renderInPortal={false} shadow={2} size="sm" bgColor={ darkmode ? "#393939" :  "gray.200"} icon={<IonIcons color={ darkmode ? 'white' : "black"}  name={darkmode ? "sunny":"moon"} size={20} />} />
      <VStack  height="100%" bgColor={ darkmode ? "coolGray.800" : "white"} >

           <VStack marginTop={20}  marginX={3} >
            <Heading color={darkmode ? 'white':'black'} size="3xl" fontWeight="semibold" >Login to your Account</Heading>
            <VStack marginTop={8} marginX={1} >

            <Input
            value={loginData.email}
            onChangeText={(text)=>setLoginData({...loginData,email:text})}
            bgColor={darkmode ? "#303030" : "#fafafa"} marginY={3}  onBlur={()=>setIconDark({...iconDark,email:false})} onFocus={()=>setIconDark({...iconDark,email:true})} borderWidth={0} borderRadius={10}
             InputLeftElement={<MaterialIcons  name="email" size={25}  color={(iconDark.email || loginData.email.length>0 ) ? (darkmode ? "white" :"#212121") :"#b8b8b8"} />}
              placeholder="Email" placeholderTextColor="#b8b8b8" color={darkmode ? 'white' :'black'}  />

            <Input
            value={loginData.password}
            onChangeText={(text)=>setLoginData({...loginData,password:text})}
            type={ showPassword ? 'text' : 'password'}  bgColor={darkmode ? "#303030" : "#fafafa"} marginY={3}  onBlur={()=>setIconDark({...iconDark,pass:false})} onFocus={()=>setIconDark({...iconDark,pass:true})} borderWidth={0} borderRadius={10} 
            InputLeftElement={<MaterialIcons name="lock" size={25} color={(iconDark.pass || loginData.password.length>0  ) ? (darkmode ? "white" :"#212121") :"#b8b8b8"}  />}
            InputRightElement={<IonIcons  name={showPassword ? "eye" :"eye-off"} size={25}  color={(iconDark.pass || loginData.password.length>0  ) ? (darkmode ? "white" :"#212121") :"#b8b8b8"} onPress={()=>setShowPassword(!showPassword)} />} 
            placeholder="Password" placeholderTextColor="#b8b8b8" color={darkmode ? 'white' :'black'}  />

              <Button onPress={handleSignIn} borderRadius={100} backgroundColor={ darkmode ?"#393939": "black"} color="white" fontWeight="bold"  marginY={4} height={16}   >

                <Text color="white" fontWeight="bold" >{buttonLoader ? 'Signing In...' :'Sign In'}</Text>
              </Button>

              <Heading  size="sm" marginBottom={5} marginTop={2} color={darkmode ? 'white':'black'}  textAlign="center" >Forgot the password?</Heading>




              <Divider position="relative" marginY={4} />
              <HStack paddingX={1}   bgColor={darkmode ? "coolGray.800":"white"} position="absolute"  bottom={40} right={deviceWidth/3} >

              <Text   color={darkmode ? 'white':'#616161'} textAlign="center"    >or continue with</Text>
              </HStack>
              <HStack justifyContent="space-evenly" marginY={4} >
                <HStack borderRadius={20} paddingY={3} paddingX={5} borderWidth={1} borderColor="gray.200" justifyContent="center" alignItems="center"   >
                  <MaterialIcons name='facebook' color={ darkmode ? "white" :  "#1088e3"} size={35}  />
                </HStack>
                <HStack borderRadius={20} paddingY={3} paddingX={5} borderWidth={1} borderColor="gray.200" justifyContent="center" alignItems="center"   >
                 {darkmode ?
                 
                 <MaterailCommunityIcons name='google' color="white"  size={35}  />
                 :
                  <Image width={35} height={35} source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-1ZKliw7PHB3VlLmH4oLlQVx4N0-SzLpTf3kYa8s&s'}}  alt='Google' />
                 }
                </HStack>
                <HStack borderRadius={20} paddingY={3} paddingX={5} borderWidth={1} borderColor="gray.200" justifyContent="center" alignItems="center"   >
                  <MaterailCommunityIcons name='apple' color={darkmode ? "white" :"black"}  size={35}  />
                </HStack>
              </HStack>

              <HStack marginY={5} justifyContent="center" > 
              <Text color="gray.400" >Don't have an account?</Text>
              <Pressable onPress={()=>props.navigation.navigate("SignUp")} >

              <Text color={darkmode ? 'white':'black'} marginLeft={1} fontWeight="semibold" >Sign up</Text>
              </Pressable>
               </HStack>
            </VStack>
           </VStack>
      </VStack>
    </NativeBaseProvider>
  )
}

export default SignIn




