import { View } from 'react-native'
import React from 'react'
import { HStack, VStack,Text, Heading, Pressable } from 'native-base'
import RoundedIconTextButton from '../utils/RoundedIconTextButton'
import Icon from 'react-native-vector-icons/FontAwesome5';
import FAIcons from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { getDarkMode } from '../redux/slices/userSlice';
const CategoriesList = ({nav}) => {
  const darkmode = useSelector(getDarkMode)
  return (
    <VStack marginX={3} marginY={3} >
      <HStack alignItems="center" justifyContent="space-between" >
      <Heading color={darkmode?'white':'black'} fontWeight="bold"  size="md" >Categories</Heading>
      <Pressable onPress={()=>nav.navigate("Categories")} >

      <Heading color={darkmode?'white':'black'} size="sm" >See all</Heading>
      </Pressable>
      </HStack>
      <VStack marginY={2} >
        <HStack justifyContent="space-between"  marginTop={2}  >
        <Pressable onPress={()=>nav.navigate("ProdInCat",{cat:"Clothes"})} >

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
  )
}

export default CategoriesList