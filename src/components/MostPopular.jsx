
import React from 'react'
import { Heading, HStack, VStack, ScrollView, Pressable } from 'native-base'
import TextRounded from '../utils/TextRounded'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories, getFilterBySubCategory, setFilterBySubCategory } from '../redux/slices/categorySlice'
import { extractAllSubCats } from '../utils/commonUtils'
import { getDarkMode } from '../redux/slices/userSlice'

const MostPopular = ({nav}) => {
    const {status,data} = useSelector(getAllCategories)
    
    const activeSubCat = useSelector(getFilterBySubCategory)
    const dispatch = useDispatch()
    const handleSelectSubCatFilter=(id,title)=>{
        dispatch(setFilterBySubCategory({name:title,id:id}))
    }
    const darkmode = useSelector(getDarkMode)
  return (
    <VStack marginX={3} marginTop={4} >
      <HStack alignItems="center" justifyContent="space-between" >
      <Heading color={darkmode?'white':'black'} fontWeight="bold"  size="md" >Most Popular</Heading>
      <Pressable onPress={()=>nav.navigate("MostPopular")} >

      <Heading color={darkmode?'white':'black'} size="sm" >See all</Heading>
      </Pressable>
      </HStack>

      <VStack marginTop={3} >
        <ScrollView horizontal showsHorizontalScrollIndicator={false} >
            
            {/* {['All','Clothes','Shoes','Bags','Electronics','Watch','Jewelry','Kitchen','Toys'].map((cats,index)=>
            <TextRounded active={index==2} title={cats} index={index} />
            )} */}
           

            {status=='finished'  && extractAllSubCats(data.category) && [{name:"All",_id:"905657545412"},...extractAllSubCats(data.category)].map((subcats,index)=>
            <TextRounded handleSelectSubCatFilter={handleSelectSubCatFilter} title={subcats.name} id={subcats._id} activeSubCat={activeSubCat} />
            
            )}
        </ScrollView>
      </VStack>
    </VStack>
  )
}

export default MostPopular