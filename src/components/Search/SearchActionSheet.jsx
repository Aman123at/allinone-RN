import { Dimensions } from 'react-native'
import React from 'react'
import { Actionsheet,Divider,Heading,HStack,Pressable,ScrollView,Slider,Text, useDisclose, VStack } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories } from '../../redux/slices/categorySlice'
import { extractAllSubCats } from '../../utils/commonUtils'
import TextRounded from '../../utils/TextRounded'
import FAIcons from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react'
import { getSearchFilter, resetSearchFilter, setSearchFilter } from '../../redux/slices/productSlice'
import { ratingList, sortList } from '../../utils/constants'
import { useEffect } from 'react'
import { getDarkMode } from '../../redux/slices/userSlice'
const SearchActionSheet = ({isOpen,onClose}) => {
    const darkmode = useSelector(getDarkMode)
    const dispatch = useDispatch()
        const devicewidth = Dimensions.get('window').width
        const {status,data} = useSelector(getAllCategories)
        
        const searchFilter = useSelector(getSearchFilter)
        const [localSearchFilter,setLocalSearchFilter] = useState(searchFilter)
     
        const handleSetSearchFilter=(type,title)=>{
            
                if(type==='cat'){
                    setLocalSearchFilter({...localSearchFilter,category:title})
                 
                }
                if(type==='sort'){
                    setLocalSearchFilter({...localSearchFilter,sortBy:title})
                    
                }
                if(type==='rate'){
                    setLocalSearchFilter({...localSearchFilter,rating:title})
                    
                }
        }
       

   useEffect(()=>{
        setLocalSearchFilter(searchFilter)
        
   },[onClose])

   const handleApplyFilter=()=>{
    dispatch(setSearchFilter(localSearchFilter))
    onClose()
   }
   const handleResetFilter=()=>{
    dispatch(resetSearchFilter())
    onClose()
   }
        
  return (
    <Actionsheet  isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content  bgColor={darkmode?'#444444':"white"} >
         
          
        <VStack  width={devicewidth} >
            <Heading color={darkmode?'white':'black'} marginY={3} size="lg" textAlign="center" >Sort & Filter</Heading>
            <Divider />
            <Heading color={darkmode?'white':'black'} margin={5} size="md"  >Categories</Heading>
            <ScrollView marginX={3} horizontal showsHorizontalScrollIndicator={false} >
                {status=='finished'  && extractAllSubCats(data.category) && [{name:"All",_id:"905657545412"},...extractAllSubCats(data.category)].map((subcats,index)=>
                <TextRounded isSearchPage={true} type="cat" handleSelectSubCatFilter={handleSetSearchFilter} title={subcats.name} id={subcats._id} activeSubCat={localSearchFilter.category} />
                )}
            </ScrollView>
            <HStack margin={5} justifyContent="space-between" alignItems="center" >

                <Heading color={darkmode?'white':'black'} size="md">Price Range</Heading>
                <Heading color={darkmode?'white':'black'} size="sm">Rs. 0 - {localSearchFilter.priceRange}</Heading>
            </HStack>
            <Slider 
            onChange={v => {
                setLocalSearchFilter({...localSearchFilter,priceRange:(Math.floor(v))*10000});
              }} 
            marginX={5} defaultValue={localSearchFilter.priceRange/10000} size="sm" colorScheme="green"  maxW="350">
                <Slider.Track bg="green.100">
                <Slider.FilledTrack bg="green.600" />
                </Slider.Track>
                <Slider.Thumb borderWidth="0" bg="transparent">
                <FAIcons name="dollar" color={darkmode? 'white':"green.600"} size={15} />
                </Slider.Thumb>
            </Slider>
            <Heading color={darkmode?'white':'black'} margin={5} size="md" >Sort by</Heading>
            <ScrollView marginX={3} horizontal showsHorizontalScrollIndicator={false} >
                {status=='finished'  && sortList.map((item,index)=>
                <TextRounded isSearchPage={true} type="sort" handleSelectSubCatFilter={handleSetSearchFilter} title={item.name} id={item._id} activeSubCat={localSearchFilter.sortBy} />
                )}
            </ScrollView>
            <Heading color={darkmode?'white':'black'} margin={5} size="md" >Rating</Heading>
            <ScrollView marginX={3} horizontal showsHorizontalScrollIndicator={false} >
                {status=='finished'  && ratingList.map((item,index)=>
                <TextRounded isSearchPage={true} type="rate" handleSelectSubCatFilter={handleSetSearchFilter} title={item.name} id={item._id} activeSubCat={localSearchFilter.rating} />
                )}
            </ScrollView>
            <Divider marginY={5} />
            <HStack marginBottom={5}  justifyContent="space-between" marginX={5} >
                <Pressable onPress={handleResetFilter} >
 
                <HStack borderRadius={100} width={170} padding={5} bgColor={darkmode?"#222222":"gray.200"} justifyContent="center" >
                    <Text color={darkmode?'white':'black'} fontWeight="semibold" fontSize={16}  >Reset</Text>
                </HStack>
                </Pressable>
                <Pressable onPress={handleApplyFilter}>

                <HStack shadow={3}  borderRadius={100} width={170} padding={5} bgColor={darkmode?"gray.200":"black"} justifyContent="center">
                    <Text fontWeight="semibold" color={darkmode ? 'black':"white" }fontSize={16} >Apply</Text>
                </HStack>
                </Pressable>
                
            </HStack>

        </VStack>
        </Actionsheet.Content>
      </Actionsheet>
  )
}

export default SearchActionSheet