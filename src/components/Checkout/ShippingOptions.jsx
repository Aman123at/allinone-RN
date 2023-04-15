import { View } from 'react-native'
import React from 'react'
import { Heading, HStack  ,Radio,Text, VStack} from 'native-base'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSelector } from 'react-redux'
import { getDarkMode } from '../../redux/slices/userSlice'

const ShippingOptions = ({title,icon,price,desc}) => {
    const darkmode = useSelector(getDarkMode)
  return (
    <HStack key={price} margin={3} width="93%" bgColor={ darkmode? '#444444' : "white"} padding={3}  borderRadius={15} justifyContent="space-between" alignItems="center"  >
    <HStack alignItems="center" >
        <HStack justifyContent="center" alignItems="center" width={12} height={12} borderRadius={100} bgColor={darkmode ? 'white' :"black"} >
            <MaterialIcons name={icon} size={20} color={darkmode ? 'black':'white'}  />
        </HStack>
        <VStack marginLeft={3} >
            <HStack alignItems="center" > 

                <Heading color={darkmode ? 'white':'black'}  size="sm" >{title}</Heading>
                
            </HStack>
            <Text color={darkmode ? 'white':'black'}  fontSize="sm" >{desc}</Text>
        </VStack>
    </HStack>

    <HStack alignItems="center" >
        <Heading color={darkmode ? 'white':'black'} size="sm" marginRight={1}  > Rs.{price} </Heading>

    <Radio value={price}   />
    </HStack>
</HStack>
  )
}

export default ShippingOptions