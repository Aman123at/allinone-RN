import { View } from 'react-native'
import React from 'react'
import { CloseIcon, HStack,Text } from 'native-base'
import { useSelector } from 'react-redux'
import { getDarkMode } from '../../redux/slices/userSlice'

const RecentSearchRow = ({data}) => {
  const darkmode = useSelector(getDarkMode)
  return (
    <HStack alignItems="center" justifyContent="space-between" marginY={3} >
        <Text fontSize={18} color={darkmode ? 'white':"grey.200"} >Recent Search {data}</Text>
        <HStack borderWidth={1} borderColor={darkmode?'white':"grey"} padding={1} borderRadius={7} >

        <CloseIcon color={darkmode?'white':"grey"} size={2} />
        </HStack>
      </HStack>
  )
}

export default RecentSearchRow