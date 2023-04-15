import { TouchableOpacity } from 'react-native'
import React from 'react'
import {  Center,  ArrowBackIcon, HStack } from 'native-base'


const BlankHeader = ({nav}) => {
  
  return (
    <>
    <HStack px={3} py={2} backgroundColor="orange.300">

        <Center>

        <TouchableOpacity onPress={() => nav.goBack()} >

      <ArrowBackIcon color="white" size={6} />
        </TouchableOpacity>
        </Center>
       

       

       
      
 
    </HStack>
    </>
  )
}

export default BlankHeader