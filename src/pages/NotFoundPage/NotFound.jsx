import { View, Dimensions } from 'react-native'
import React from 'react'
import { Heading, Image, VStack,Text } from 'native-base'
import { useSelector } from 'react-redux'
import { getDarkMode } from '../../redux/slices/userSlice'


const NotFound = ({title,desc}) => {
  const deviceWidth = Dimensions.get('window').width
  const darkmode = useSelector(getDarkMode)
 
  return (
    <VStack marginX={4} marginY={5}  >
      {darkmode ? <Image source={require('./no-orders-dark.png')} width={deviceWidth} marginY={2} alt='abcdef'  /> :
      
        <Image source={require('./no-orders-light.png')} width={deviceWidth} marginY={2} alt='abcdef' />
      }
        <Heading size="md" color={darkmode ? 'white' :'black'} marginBottom={2} textAlign="center" >{title}</Heading>
        <Text textAlign="center" color={darkmode ? "white" :"black"} >{desc}</Text>
    </VStack>
  )
}

export default NotFound