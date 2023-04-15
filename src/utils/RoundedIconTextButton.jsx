
import React from 'react'
import { VStack,Text, HStack } from 'native-base'

const RoundedIconTextButton = ({MainIcon,text,width,height,padding,paddingleft,paddingright,paddingbottom,paddingtop,backgroundColor,marginleft,marginright,marginbottom,margintop,margin,textcolor}) => {
  return (
    <VStack alignItems="center" >
        <HStack  bgColor={backgroundColor ? backgroundColor :'#e1e1e1'} width={width ? width :16} height={height ? height :16} borderRadius={100} justifyItems="center" alignItems="center" justifyContent="center" >

        {MainIcon} 
        </HStack>
      <Text marginTop={2} color={textcolor ? textcolor:'black'} fontWeight="semibold" >{text}</Text>
    </VStack>
  )
}

export default RoundedIconTextButton