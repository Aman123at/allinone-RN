import { TouchableOpacity } from 'react-native'
import React from 'react'
import { HStack,Text } from 'native-base'
import {  useSelector } from 'react-redux'

import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome'
import { getDarkMode } from '../redux/slices/userSlice'
const TextRounded = ({title,id,handleSelectSubCatFilter,activeSubCat,type,isSearchPage,isReviewPage}) => {
  const darkmode = useSelector(getDarkMode)
  // const dispatch = useDispatch()

  return (
    <>
    {darkmode ? 
     <TouchableOpacity key={`${id}--${title}`} onPress={()=>handleSelectSubCatFilter( (type=='cat' || type=='rate' || type=='sort') ? type: id,title)}>
     {(isSearchPage || isReviewPage) ?
     <>
     {type == 'rate' ? 
     <HStack paddingX={5} alignItems='center' paddingY={2}  borderWidth={2} bgColor={activeSubCat===title ? '#35386f' :'coolGray.800' } borderColor='#35386f' borderRadius={100} marginX={1} >
       <FontAwesome5Icon name='star' size={15} color='white'  />
     <Text marginLeft={2} color='white' fontWeight="medium" >{title}</Text>
   </HStack>
     :<HStack paddingX={5} paddingY={2}  borderWidth={2} bgColor={activeSubCat===title ? '#35386f' :'coolGray.800' } borderColor="#35386f" borderRadius={100} marginX={1} >
      <Text color='white' fontWeight="medium" >{title}</Text>
    </HStack>}
      
     </>
     :
     
   <HStack paddingX={5} paddingY={2}  borderWidth={2} bgColor={activeSubCat.id===id.toString() ? '#35386f' :'coolGray.800'} borderColor='#35386f' borderRadius={100} marginX={1} >
     <Text color='white' fontWeight="medium" >{title}</Text>
   </HStack>
     }
   </TouchableOpacity>
    :


    <TouchableOpacity key={`${id}--${title}`} onPress={()=>handleSelectSubCatFilter( (type=='cat' || type=='rate' || type=='sort') ? type: id,title)}>
      {(isSearchPage || isReviewPage) ?
      <>
      {type == 'rate' ? 
      <HStack paddingX={5} alignItems='center' paddingY={2}  borderWidth={2} bgColor={activeSubCat===title ? 'black' :'white' } borderColor="black" borderRadius={100} marginX={1} >
        <FontAwesome5Icon name='star' size={15} color={activeSubCat===title ? 'white' :'black'}  />
      <Text marginLeft={2} color={activeSubCat===title ? 'white':'black'} fontWeight="medium" >{title}</Text>
    </HStack>
      :<HStack paddingX={5} paddingY={2}  borderWidth={2} bgColor={activeSubCat===title ? 'black' :'white' } borderColor="black" borderRadius={100} marginX={1} >
       <Text color={activeSubCat===title ? 'white':'black'} fontWeight="medium" >{title}</Text>
     </HStack>}
       
      </>
      :
      
    <HStack paddingX={5} paddingY={2}  borderWidth={2} bgColor={activeSubCat.id===id.toString() ? 'black' :'white' } borderColor="black" borderRadius={100} marginX={1} >
      <Text color={activeSubCat.id===id.toString() ? 'white':'black'} fontWeight="medium" >{title}</Text>
    </HStack>
      }
    </TouchableOpacity>
    }
    </>
  )
}

export default TextRounded