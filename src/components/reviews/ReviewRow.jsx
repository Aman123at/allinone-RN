import { View } from 'react-native'
import React from 'react'
import { HStack, VStack,Text, Avatar, Heading } from 'native-base'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome'
import { useSelector } from 'react-redux'
import { getDarkMode } from '../../redux/slices/userSlice'
const ReviewRow = ({nav,data}) => {
  const darkmode = useSelector(getDarkMode)
  return (
    <VStack marginY={3} >
      <HStack alignItems="center" justifyContent="space-between" >
        <HStack alignItems="center" >

      <Avatar size="md"  bg="green.500" source={{
            uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        }}>
        AJ
       </Avatar>
       <Heading color={darkmode ? 'white':'black'} size="sm" marginLeft={2} > All In One </Heading>
        </HStack>

        <HStack paddingX={4} alignItems='center' paddingY={1}  borderWidth={2} bgColor={darkmode? 'coolGray.800' :'white' } borderColor={darkmode?"white":"black"} borderRadius={100} marginX={1} >
        <FontAwesome5Icon name='star' size={15} color={darkmode ? 'white':'black'}  />
      <Text color={darkmode ? 'white':'black'} marginLeft={2}  fontWeight="medium" >{data}</Text>
    </HStack>

      </HStack>

     <Text color={darkmode ? 'white':'black'} marginY={2}  >This will be going my review comment for every product i have bought from this online store.</Text>

    <HStack marginY={1} alignItems="center" >
        <FontAwesome5Icon name={(data==2 ||data==3)?'heart':'heart-o'} size={20} color={darkmode ? 'white':'black'}  />
        <Text color={darkmode ? 'white':'black'} marginLeft={2} >729</Text>
        <Text marginLeft={8} fontSize={12} color={darkmode?"gray.200":"gray.500"} >6 days ago</Text>

    </HStack>
    </VStack>
  )
}

export default ReviewRow