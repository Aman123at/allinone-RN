import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Heading, HStack, Image, Text, VStack } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import { truncate } from '../utils/commonUtils';
import { useSelector } from 'react-redux';
import { getDarkMode } from '../redux/slices/userSlice';
import {IModernProductCardProps} from '../interfaces/productInterfaces';
const ModernProductCard = ({pImage,title, price,id,nav,product}:IModernProductCardProps) => {
  const darkmode:boolean = useSelector(getDarkMode)
  return (
    <VStack key={id} margin={3}>
        <TouchableOpacity onPress={()=>nav.navigate("Product",product)} >

        <Image width={160} height={160} padding={2} borderRadius={20} source={{uri:pImage.secure_url}} alt='abcd'  />
      <Heading color={darkmode?"white":"black"} size="md" marginTop={2} marginBottom={1}  >{truncate(title,14)}</Heading>
        </TouchableOpacity>
      <HStack  alignItems="center" >
            <Icon name='star-half-o' size={20} color={darkmode?"white":"black"} />
            <Text color={darkmode?"white":"black"} marginLeft={2} >4.5   |</Text>
            <HStack marginLeft={3} padding={2} bgColor={darkmode? '#444444' :"#e5e5e5"} borderRadius={10} justifyContent="center" >

            <Text color={darkmode?"white":"black"} fontSize="xs" fontWeight="bold"   >8,374 sold</Text>
            </HStack>

            
      </HStack>
      <Heading color={darkmode?"white":"black"} marginY={1} size="md" >Rs. {price}</Heading>
    </VStack>
  )
}

export default ModernProductCard