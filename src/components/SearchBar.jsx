import {  View } from 'react-native'
import React from 'react'
import { HStack,Pressable,Text } from 'native-base'
import Icon from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';
import { getDarkMode } from '../redux/slices/userSlice';
const SearchBar = ({nav}) => {
  const darkmode = useSelector(getDarkMode)
  return (
    
      <Pressable onPress={()=>nav.navigate("Search")}  >
    <HStack   marginX={3} marginY={2} padding={4} bgColor={darkmode?"#20222a":"#e5e5e5"} borderRadius={10} justifyContent="space-between" alignItems="center" >
      <HStack alignItems="center" >
      <Icon name='search1' size={15} color="#a5a5a5" />
      <Text fontWeight="thin" marginLeft={2} color="#a9a9a9" >Search</Text>
      </HStack>
      <Icon name='filter' size={20} color={darkmode?'white':"#555"} />
    </HStack>
    </Pressable> 
  )
}

export default SearchBar