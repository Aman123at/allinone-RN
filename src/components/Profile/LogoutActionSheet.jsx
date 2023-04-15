import { View,Dimensions } from 'react-native'
import React from 'react'
import { Actionsheet, Divider, Heading, HStack, VStack,Text, Pressable } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import { setLoader } from '../../redux/slices/commonSlice'
import {logout} from '../../ApiCalls/userApis'
import {changeDefaultAddress, deleteAddressById, fetchSavedAddresses} from '../../ApiCalls/cartApis'
import { getDarkMode, getLoggedInUser } from '../../redux/slices/userSlice'
import { getOpenModalForInAddress, setOpenModalForInAddress } from '../../redux/slices/cartSlice'

const LogoutActionSheet = ({isOpen,onClose,nav,addressId}) => {
  const darkmode = useSelector(getDarkMode)
  const modalFor = useSelector(getOpenModalForInAddress)
  const loggedInUser = useSelector(getLoggedInUser);
    const devicewidth = Dimensions.get('window').width
    const dispatch = useDispatch()
    const handleLogout = async () => {
        onClose()
        dispatch(setLoader(true));
        
        logout()
          .then((resp) => {
            if (resp.success) {
              dispatch(setLoader(false));
              nav.navigate("SignIn")
            } else {
              dispatch(setLoader(false));
            
            }
          })
          .catch((e) => {
            dispatch(setLoader(false));
            
          });
      };
    const handleDeleteAddress = async () => {
      dispatch(setOpenModalForInAddress(''))
        onClose()
        
        dispatch(setLoader(true));
        
        deleteAddressById(addressId)
          .then((resp) => {
            if (resp.success) {
              dispatch(setLoader(false));
              let loggedIndata = loggedInUser.data;

              let loggedUserId = loggedIndata.user ? loggedIndata.user._id : "";
              if (loggedUserId !== "") {
                dispatch(fetchSavedAddresses(loggedUserId));
              }
            } else {
              dispatch(setLoader(false));
            
            }
          })
          .catch((e) => {
            dispatch(setLoader(false));
            
          });
      };
    const handleChangeDefaultAddress = async () => {
      dispatch(setOpenModalForInAddress(''))
        onClose()
        
        dispatch(setLoader(true));
        
        changeDefaultAddress(addressId)
          .then((resp) => {
            if (resp.success) {
              dispatch(setLoader(false));
              let loggedIndata = loggedInUser.data;

              let loggedUserId = loggedIndata.user ? loggedIndata.user._id : "";
              if (loggedUserId !== "") {
                dispatch(fetchSavedAddresses(loggedUserId));
              }
            } else {
              dispatch(setLoader(false));
            
            }
          })
          .catch((e) => {
            dispatch(setLoader(false));
            
          });
      };
  return (
    <Actionsheet  isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content bgColor={darkmode?'#555555':"white"} >
        <VStack  width={devicewidth}  bgColor={darkmode?'#555555':"white"}>
            <Heading marginY={4} size="lg" textAlign="center" color="red.500"  >{modalFor=='del' ? 'Delete' : modalFor=='edit' ? 'Make default' :'Logout'}</Heading>
            <Divider />
            <Heading marginY={5} size="md" textAlign="center"  color={darkmode?'white':'black'} >{modalFor=='del'?'Are you sure want to delete this address?': modalFor=='edit' ? 'Are you sure want to make this default?':  'Are you sure want to log out?'}</Heading>
           
            
           
            
           
           
           
            <HStack marginBottom={5}  justifyContent="space-between" marginX={5} >
                <Pressable onPress={()=>{dispatch(setOpenModalForInAddress(''));onClose()}} >

                <HStack borderRadius={100} width={170} padding={5} bgColor={darkmode?"#222222":"gray.200"} justifyContent="center" >
                    <Text fontWeight="semibold" color={darkmode?'white':'black'} fontSize={16}  >Cancel</Text>
                </HStack>
                </Pressable>
                {(modalFor=='del' || modalFor=='edit')  ? 
                <Pressable onPress={()=>{
                  if(modalFor=='del'){

                    handleDeleteAddress()
                  }
                  if(modalFor=='edit'){
                    handleChangeDefaultAddress()
                  }
                  }}  >

                <HStack shadow={3}  borderRadius={100} width={170} padding={5} bgColor={darkmode?"gray.200":"black"} justifyContent="center">
                    <Text fontWeight="semibold" color={darkmode?'black':'white'}  fontSize={16} >Yes</Text>
                </HStack>
                </Pressable>
                :
                
                <Pressable onPress={handleLogout}  >

                <HStack shadow={3}  borderRadius={100} width={170} padding={5} bgColor={darkmode?"gray.200":"black"} justifyContent="center">
                    <Text fontWeight="semibold" color={darkmode?'black':'white'}  fontSize={16} >Yes, Logout</Text>
                </HStack>
                </Pressable>
                }
                
            </HStack>

        </VStack>
        </Actionsheet.Content>
    </Actionsheet>
  )
}

export default LogoutActionSheet