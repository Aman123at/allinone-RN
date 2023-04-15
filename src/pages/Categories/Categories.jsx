import { View, Text } from 'react-native'
import React from 'react'
import { ArrowBackIcon, Heading, HStack, NativeBaseProvider, VStack,Pressable } from 'native-base'
import { useSelector } from 'react-redux'
import { getDarkMode } from '../../redux/slices/userSlice'
import RoundedIconTextButton from '../../utils/RoundedIconTextButton'
import Icon from 'react-native-vector-icons/FontAwesome5';
import FAIcons from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Categories = ({navigation}) => {
    const darkmode = useSelector(getDarkMode)
  return (
    <NativeBaseProvider>
        <VStack bgColor={darkmode ? "coolGray.800" : 'white'} height="100%" paddingX={1}>
            <HStack alignItems="center" marginTop={6} marginBottom={2} marginX={3} >
            <ArrowBackIcon color={darkmode ? 'white':'black'} onPress={()=>navigation.goBack()} size="lg" />
            <Heading color={darkmode ? 'white':'black'}  marginLeft={3} size="md" >Categories</Heading>
            </HStack>
        <VStack margin={4} >
        <HStack justifyContent="space-between"  marginTop={2}  >
            <Pressable onPress={()=>navigation.navigate("ProdInCat",{cat:"Clothes"})} >

          <RoundedIconTextButton backgroundColor={darkmode?'#35383f':'#e1e1e1'} textcolor={darkmode?'white':'black'} text="Clothes" MainIcon={<Icon name='tshirt' size={20} color={darkmode?'white':'black'} />} />
            </Pressable>
          <RoundedIconTextButton backgroundColor={darkmode?'#35383f':'#e1e1e1'} textcolor={darkmode?'white':'black'} text="Shoes" MainIcon={<MaterialIcons name='shoe-sneaker' size={30} color={darkmode?'white':'black'} />} />
          <RoundedIconTextButton backgroundColor={darkmode?'#35383f':'#e1e1e1'} textcolor={darkmode?'white':'black'} text="Bags" MainIcon={<Icon name='shopping-bag' size={20} color={darkmode?'white':'black'} />} />
          <RoundedIconTextButton backgroundColor={darkmode?'#35383f':'#e1e1e1'} textcolor={darkmode?'white':'black'} text="Electronics" MainIcon={<Icon name='laptop' size={20} color={darkmode?'white':'black'} />} />
        </HStack>
        <HStack justifyContent="space-between"  marginTop={4}  >
          <RoundedIconTextButton backgroundColor={darkmode?'#35383f':'#e1e1e1'} textcolor={darkmode?'white':'black'} text="Watch" MainIcon={<MaterialIcons name='watch' size={30} color={darkmode?'white':'black'} />} />
          <RoundedIconTextButton backgroundColor={darkmode?'#35383f':'#e1e1e1'} textcolor={darkmode?'white':'black'} text="Jewelry" MainIcon={<FAIcons name='diamond' size={25} color={darkmode?'white':'black'} />} />
          <RoundedIconTextButton backgroundColor={darkmode?'#35383f':'#e1e1e1'} textcolor={darkmode?'white':'black'} text="Kitchen" MainIcon={<MaterialIcons name='spoon-sugar' size={30} color={darkmode?'white':'black'} />} />
          <RoundedIconTextButton backgroundColor={darkmode?'#35383f':'#e1e1e1'} textcolor={darkmode?'white':'black'} text="Toys" MainIcon={<Icon name='puzzle-piece' size={20} color={darkmode?'white':'black'} />} />
        </HStack>
      
      </VStack>
        </VStack>
    </NativeBaseProvider>
  )
}

export default Categories