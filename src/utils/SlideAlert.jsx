import React from 'react'
import { Alert, Box, CheckIcon, HStack, Pressable, Slide,Text } from 'native-base'

const SlideAlert = ({isOpenTop,setIsOpenTop,title,type}) => {
  return (
    <Slide duration={50} in={isOpenTop} placement="top">
      <Pressable onPress={()=>setIsOpenTop(!isOpenTop)} >

       <Box  w="100%" position="absolute" p="2" borderRadius="xs" bg={ type=='error' ? 'red.300' : "emerald.100"} alignItems="center" justifyContent="center" _dark={{
          bg: "emerald.200"
        }} safeArea>
            <HStack space={2} alignItems="center" >
              {type == 'error' ? 

              <Alert.Icon color='red.800'  />
            :  
          <CheckIcon size="4" color="emerald.600" mt="1" _dark={{
          color: "emerald.700"
        }} />
          }
              <Text color={ type=='error' ? 'red.800' : "emerald.600"} textAlign="center" _dark={{
              color: "emerald.700"
            }} fontWeight="medium">
                {title}
              </Text>
            </HStack>
          </Box>
      </Pressable>
      </Slide>
  )
}

export default SlideAlert