import { View } from 'react-native'
import React from 'react'
import { Heading, HStack  ,Pressable,Radio,Text, useDisclose, VStack} from 'native-base'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import IonIcons from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'
import { getDarkMode } from '../../redux/slices/userSlice'
import LogoutActionSheet from './LogoutActionSheet'
import { useState } from 'react'
import { setOpenModalForInAddress } from '../../redux/slices/cartSlice'
const AddressRow = ({isCheckoutPage,completeAddressDetail,isShppingAddress}) => {
    const darkmode = useSelector(getDarkMode)
    const {isOpen,onClose,onOpen} = useDisclose()
    const [modalFor,setModalFor] = useState('')
    const dispatch = useDispatch()
  return (
    <VStack>

      <LogoutActionSheet onClose={onClose} isOpen={isOpen}  addressId={completeAddressDetail._id} />
    <HStack margin={3} width={360}  bgColor={ darkmode? '#444444' : "white"} padding={3}  borderRadius={15} justifyContent="space-between" alignItems="center"  >
        <HStack alignItems="center" >
            <HStack justifyContent="center" alignItems="center" width={10} height={10} borderWidth={5} borderColor={darkmode ? '#777777' :"gray.300" } borderRadius={100} bgColor={darkmode ? 'white' :"black"} >
                <IonIcons name='location' size={20} color={darkmode ? 'black':'white'}  />
            </HStack>
            <VStack marginLeft={3} >
                <HStack alignItems="center" > 

                    <Heading color={darkmode ? 'white':'black'}  size="sm" >{completeAddressDetail.type == 'work'? 'Work' : completeAddressDetail.type=='fnf'?'Friends and Family': completeAddressDetail.type=='other'?completeAddressDetail.type: 'Home'}</Heading>
                    {completeAddressDetail && completeAddressDetail.isDefaultAddress && !isCheckoutPage &&
                    
                    <HStack marginX={2} paddingX={2} borderRadius={8}  bgColor={darkmode ? "#555555" : "gray.100"} paddingY={1}>

                    <Text  fontSize={10} color={darkmode ? 'white' :"gray.600"} >Default</Text>
                    </HStack>
                    }
                </HStack>
                <Text color={darkmode ? 'white':'black'}  fontSize="sm" >{completeAddressDetail.address}</Text>
            </VStack>
        </HStack>
         {isShppingAddress ? 
         
         <Radio value={completeAddressDetail._id}   />
         :
         <HStack alignItems="center">
          {completeAddressDetail && completeAddressDetail.isDefaultAddress==false &&
          <Pressable onPress={()=>{dispatch(setOpenModalForInAddress('edit'));onOpen()}} >

          <HStack>

           <FontAwesome5Icon name='pen'  size={15 } color={darkmode ? 'white' :"black"} /> 
          </HStack>
          </Pressable>
          }
          {completeAddressDetail && completeAddressDetail.isDefaultAddress==false &&
          
          <HStack marginLeft={4}  >
            <Pressable onPress={()=>{dispatch(setOpenModalForInAddress('del'));onOpen()}} >

           <FontAwesome5Icon  name='trash'  size={15 } color="red" /> 
            </Pressable>
          </HStack>
          }
          </HStack>
         }
    </HStack>
    </VStack>
  )
}

export default AddressRow