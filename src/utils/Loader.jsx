
import React from 'react'
import { Heading, HStack, Spinner, VStack } from 'native-base'
import { useSelector } from 'react-redux'
import { getDarkMode } from '../redux/slices/userSlice'

const Loader = () => {
  const darkmode = useSelector(getDarkMode)
  return (
    <VStack bgColor={darkmode ? 'coolGray.800' :'white'} width="100%" height="100%" justifyContent="center">
    <HStack space={2}  justifyContent="center">
<Spinner accessibilityLabel="Loading posts" />
<Heading color="primary.500" fontSize="lg">
 Loading
</Heading>
</HStack>
 </VStack>
  )
}

export default Loader