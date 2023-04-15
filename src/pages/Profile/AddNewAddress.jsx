import { View, StyleSheet } from 'react-native'
import React from 'react'
import { ArrowBackIcon,Text, Button, Heading, HStack, Input, NativeBaseProvider, Select, VStack, ScrollView, Checkbox, Pressable, useDisclose } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import { getDarkMode, getLoggedInUser } from '../../redux/slices/userSlice'
import { useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import validator from 'validator'
import SlideAlert from '../../utils/SlideAlert'
import { setLoader } from '../../redux/slices/commonSlice'
import { fetchCountries } from '../../ApiCalls/userApis'
import { useEffect } from 'react'
import { addNewAddress, fetchSavedAddresses } from '../../ApiCalls/cartApis'
import { getSavedAddresses } from '../../redux/slices/cartSlice'
const AddNewAddress = ({navigation}) => {
    const dispatch = useDispatch()
    const [countries,setCountries] = useState([])
    const [buttonLoader,setButtonLoader] = useState(false)
    const {status,data} = useSelector(getLoggedInUser)
    const savedAddresses = useSelector(getSavedAddresses)
  
    const grabCountryName = (lists) => {
        let toret = lists.map((val) => val.name);
        return toret;
      };
    useEffect(() => {
        dispatch(setLoader(true));
        fetchCountries()
          .then((res) => {
           
            if (res.error === false && res.data && res.data.length > 0) {
              
              let allCountries = grabCountryName(res.data);
              
              setCountries(allCountries);
            }
            dispatch(setLoader(false));
          })
          .catch((e) => {
          
            dispatch(setLoader(false));
          });
      }, []);
    const darkmode = useSelector(getDarkMode)
    const [profileData,setProfileData] = useState({
        country:'',
        gender:''
    })
    const [error,setError] = useState('')
    const [addressDetails, setAddressDetails] = useState({
        
        firstName: "",
        lastName: "",
        address: "",
        landmark: "",
        city: "",
        country: "",
        state: "",
        pinCode: "",
        phone: "",
        type:'home',
        otherValue:'',
        markDefault:false
      });

      const [showAlert,setShowAlert] = useState(false)

      const isThisAFirstAddress = ()=>{
        let returnvalue = false
        if(savedAddresses.status=='finished'){
            if(savedAddresses.data){
                if(savedAddresses.data.address.length == 0){
                    returnvalue = true
                }
            }
        }
        return returnvalue
      }

      const handleAddAddress=()=>{
        if(!addressDetails.firstName){
            setError('First Name is Required')
            setShowAlert(true)
        }
        else if(!addressDetails.lastName){
            setError('Last Name is Required')
            setShowAlert(true)
        }
        else if(!addressDetails.landmark){
            setError('Landmark is Required')
            setShowAlert(true)
        }
        else if(!addressDetails.address){
            setError('Full address is Required')
            setShowAlert(true)
        }
        else if(!addressDetails.city){
            setError('City is Required')
            setShowAlert(true)
        }
        else if(!addressDetails.state){
            setError('State is Required')
            setShowAlert(true)
        }
        else if(!addressDetails.country){
            setError('Country is Required')
            setShowAlert(true)
        }
        else if(!addressDetails.phone){
            setError('Phone number is Required')
            setShowAlert(true)
        }
        else if(!addressDetails.pinCode){
            setError('Postal code is Required')
            setShowAlert(true)
        }
        else if(addressDetails.type=='other' && !addressDetails.otherValue ){
            setError('Address type is Required')
            setShowAlert(true)
        }
        else{
            setError(false)
            // call add api
            setLoader(true)
            let payload = {
                firstName: addressDetails.firstName,
                lastName: addressDetails.lastName,
                address: addressDetails.address,
                landmark: addressDetails.landmark,
                city: addressDetails.city,
                country: addressDetails.country,
                state: addressDetails.state,
                postalCode: addressDetails.pinCode,
                phone: addressDetails.phone,
                type: addressDetails.type,
                otherTypeVal: addressDetails.otherValue,
                isDefaultAddress: isThisAFirstAddress() ? true: addressDetails.markDefault,
              };
               
              addNewAddress(payload)
              .then((res) => {
                dispatch(setLoader(false));
                if( data && data.user && data.user._id){

                    dispatch(fetchSavedAddresses( data.user._id));
                }
                    setAddressDetails({
        
                        firstName: "",
                        lastName: "",
                        address: "",
                        landmark: "",
                        city: "",
                        country: "",
                        state: "",
                        pinCode: "",
                        phone: "",
                        type:'home',
                        otherValue:'',
                        markDefault:false
                      })
                
                  setTimeout(() => {
                    
                      navigation.goBack()
                  }, 1000);
              })
              .catch((e) => {
               
                dispatch(setLoader(false));
                setShowAlert(true)
                setError("Unable to add new address.")
              });
        }
      }
  return (
    <NativeBaseProvider>
        <SlideAlert isOpenTop={showAlert} title={error} type='error' setIsOpenTop={setShowAlert}  />
    <VStack bgColor={darkmode ? 'coolGray.800' :'white'} paddingX={1}>
 <HStack alignItems="center" marginTop={6} marginBottom={4} marginX={3} >
 <ArrowBackIcon onPress={()=>navigation.goBack()} color={darkmode ? 'white':'black'} size="lg" />
 <Heading color={darkmode ? 'white':'black'}  marginLeft={3} size="md" >Add New Address</Heading>
 </HStack>
 <ScrollView height={570} showsVerticalScrollIndicator={false}  margin={3} >
        <Input 
        value={addressDetails.firstName}
        onChangeText={(text)=>setAddressDetails({...addressDetails,firstName:text})}
        color={darkmode ? 'white':'black'} borderRadius={10} bgColor={ darkmode?"#444444": "gray.100"} borderWidth={0} focusOutlineColor="gray.100"   marginY={3} placeholder="Enter First Name *" />
        <Input
        value={addressDetails.lastName}
        onChangeText={(text)=>setAddressDetails({...addressDetails,lastName:text})}
        color={darkmode ? 'white':'black'} borderRadius={10} bgColor={ darkmode?"#444444": "gray.100"} borderWidth={0} focusOutlineColor="gray.100"   marginY={3} placeholder="Enter Last Name *" />
        <Input
        value={addressDetails.landmark}
        onChangeText={(text)=>setAddressDetails({...addressDetails,landmark:text})}
        color={darkmode ? 'white':'black'} borderRadius={10} bgColor={ darkmode?"#444444": "gray.100"} borderWidth={0} focusOutlineColor="gray.100"   marginY={3} placeholder="Enter Landmark *" />
        <Input 
        value={addressDetails.address}
        onChangeText={(text)=>setAddressDetails({...addressDetails,address:text})}
        color={darkmode ? 'white':'black'} borderRadius={10} bgColor={ darkmode?"#444444": "gray.100"} borderWidth={0} focusOutlineColor="gray.100"   marginY={3} placeholder="Enter Address *" />
        <Input
        value={addressDetails.city}
        onChangeText={(text)=>setAddressDetails({...addressDetails,city:text})}
        color={darkmode ? 'white':'black'} borderRadius={10} bgColor={ darkmode?"#444444": "gray.100"} borderWidth={0} focusOutlineColor="gray.100"   marginY={3} placeholder="Enter City *" />
        <Input
        value={addressDetails.state}
        onChangeText={(text)=>setAddressDetails({...addressDetails,state:text})}
        color={darkmode ? 'white':'black'} borderRadius={10} bgColor={ darkmode?"#444444": "gray.100"} borderWidth={0} focusOutlineColor="gray.100"   marginY={3} placeholder="Enter State *" />
        <Select borderRadius={10} marginY={3} color={darkmode ? 'white':'black'} bgColor={ darkmode?"#444444": "gray.100"} dropdownIcon={<MaterialIcons  name="arrow-drop-down" color={darkmode ? "white" :"black"} size={30} />}
        _selectedItem={{bgColor:'gray.300'}}
        selectedValue={addressDetails.country} minWidth="200" accessibilityLabel="Choose Country" placeholder="Choose Country *"  mt={1} onValueChange={itemValue => setAddressDetails({...addressDetails,country:itemValue})}>
            {countries &&
                    countries.length > 0 &&
                    countries.map((val) => 
                    
          <Select.Item key={val}  label={val} value={val} />
                    )}
          
          
        </Select>
        <Input
        value={addressDetails.phone}
        onChangeText={(text)=>setAddressDetails({...addressDetails,phone:text})}
        color={darkmode ? 'white':'black'} borderRadius={10} bgColor={ darkmode?"#444444": "gray.100"} borderWidth={0} focusOutlineColor="gray.100"   marginY={3} placeholder="Enter Phone *"  />
        <Input
        value={addressDetails.pinCode}
        onChangeText={(text)=>setAddressDetails({...addressDetails,pinCode:text})}
        color={darkmode ? 'white':'black'} borderRadius={10} bgColor={ darkmode?"#444444": "gray.100"} borderWidth={0} focusOutlineColor="gray.100"   marginY={3} placeholder="Enter Postal Code *"  />

        <HStack alignItems="center" justifyContent="space-around" >
            <Pressable onPress={()=>setAddressDetails({...addressDetails,type:'home'})} >

            <HStack padding={3}  justifyContent="space-between" alignItems="center"  borderWidth={2} bgColor={darkmode ? (addressDetails.type==='home' ? '#35386f' :'coolGray.800'):(addressDetails.type==='home' ? 'black' :'white')} borderColor='#35386f' borderRadius={100} margin={2} >
                <MaterialIcons name='home' size={25} color={darkmode ? 'white' :(addressDetails.type==='home' ? 'white' :'black')}  />
                <Heading size="sm" marginX={2} color={darkmode ? 'white' :(addressDetails.type==='home' ? 'white' :'black')} >Home</Heading>
            </HStack>
            </Pressable>
            <Pressable onPress={()=>setAddressDetails({...addressDetails,type:'work'})}>

            <HStack padding={3} justifyContent="space-between" alignItems="center" borderWidth={2} bgColor={darkmode ? (addressDetails.type==='work' ? '#35386f' :'coolGray.800') :(addressDetails.type==='work' ? 'black' :'white')} borderColor='#35386f' borderRadius={100} margin={2} >
                <MaterialCommunityIcons name='office-building' size={25} color={darkmode ? 'white' :(addressDetails.type==='work' ? 'white' :'black')}   />
                <Heading size="sm" marginX={2} color={darkmode ? 'white' :(addressDetails.type==='work' ? 'white' :'black')}  >Work</Heading>
            </HStack>
            </Pressable>
            <Pressable onPress={()=>setAddressDetails({...addressDetails,type:'other'})}>

            <HStack padding={3} justifyContent="space-between" alignItems="center" borderWidth={2} bgColor={darkmode ? (addressDetails.type==='other' ? '#35386f' :'coolGray.800') :(addressDetails.type==='other' ? 'black' :'white')} borderColor='#35386f' borderRadius={100} margin={2} >
                <MaterialIcons name='location-pin' size={25} color={darkmode ? 'white' :(addressDetails.type==='other' ? 'white' :'black')}   />
                <Heading size="sm" marginX={2} color={darkmode ? 'white' :(addressDetails.type==='other' ? 'white' :'black')}  >Others</Heading>
            </HStack>
            </Pressable>
        </HStack>
        <Pressable onPress={()=>setAddressDetails({...addressDetails,type:'fnf'})}>

            <HStack padding={3} width={200}  alignItems="center" borderWidth={2} bgColor={darkmode ? (addressDetails.type==='fnf' ? '#35386f' :'coolGray.800') :(addressDetails.type==='fnf' ? 'black' :'white')} borderColor='#35386f' borderRadius={100} margin={2} >
                <MaterialIcons name='people' size={25} color={darkmode ? 'white' :(addressDetails.type==='fnf' ? 'white' :'black')}   />
                <Heading size="sm" marginX={2} color={darkmode ? 'white' :(addressDetails.type==='fnf' ? 'white' :'black')}  >Friends and Family</Heading>
            </HStack>
        </Pressable>
            {addressDetails.type == 'other' &&
            
            <Input
        value={addressDetails.otherValue}
        onChangeText={(text)=>setAddressDetails({...addressDetails,otherValue:text})}
        color={darkmode ? 'white':'black'} borderRadius={10} bgColor={ darkmode?"#444444": "gray.100"} borderWidth={0} focusOutlineColor="gray.100"   marginY={3} placeholder="Enter Address Type *"  />
            }


        <Checkbox onChange={()=>setAddressDetails({...addressDetails,markDefault:!addressDetails.markDefault})} color={darkmode ? 'white' :'black'}  marginLeft={1} marginY={2} value="test" >
            <Text color={darkmode ? 'white' :'black'} >

        Mark this as the default address
            </Text>
      </Checkbox>
       
       
        </ScrollView>
        <Button onPress={handleAddAddress}  shadow={5} marginX={3} marginY={5} bgColor={ darkmode? "gray.200": "black"} borderRadius={100} height={16}   ><Text color={darkmode ? "black":"white"} fontWeight="semibold" >Add</Text></Button>
 </VStack>

 </NativeBaseProvider>
  )
}

export default AddNewAddress

