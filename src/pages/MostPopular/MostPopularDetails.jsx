import { View, Text } from 'react-native'
import React from 'react'
import { ArrowBackIcon, Heading, HStack, NativeBaseProvider, ScrollView, VStack } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories, getFilterBySubCategory, setFilterBySubCategory } from '../../redux/slices/categorySlice'
import { extractAllSubCats } from '../../utils/commonUtils'
import TextRounded from '../../utils/TextRounded'
import { getAllProducts } from '../../redux/slices/productSlice'
import ModernProductList from '../../components/ModernProductList'
import { getDarkMode } from '../../redux/slices/userSlice'

const MostPopularDetails = ({navigation}) => {
    const {status,data} = useSelector(getAllCategories)
    const productData = useSelector(getAllProducts)
    const activeSubCat = useSelector(getFilterBySubCategory)
    const dispatch = useDispatch()
    const handleSelectSubCatFilter=(id,title)=>{
        dispatch(setFilterBySubCategory({name:title,id:id}))
    }
    const darkmode = useSelector(getDarkMode)
  return (
    <NativeBaseProvider>

    <VStack bgColor={darkmode?'coolGray.800':'white'} paddingX={1}>
        <HStack marginTop={6} marginBottom={2} marginX={3} >
        <ArrowBackIcon color={darkmode?"white":'black'} onPress={()=>navigation.goBack()} size="lg" />
        <Heading color={darkmode?"white":'black'} marginLeft={3} size="md" >Most Popular</Heading>
        </HStack>
        <VStack marginY={1} >
        <ScrollView marginX={3} horizontal paddingY={2} showsHorizontalScrollIndicator={false} >
            {status=='finished'  && extractAllSubCats(data.category) && [{name:"All",_id:"905657545412"},...extractAllSubCats(data.category)].map((subcats,index)=>
            <TextRounded handleSelectSubCatFilter={handleSelectSubCatFilter} title={subcats.name} id={subcats._id} activeSubCat={activeSubCat} />
            
            )}
        </ScrollView>
      </VStack>
      <ScrollView height={640} showsVerticalScrollIndicator={false} marginBottom={20} >
        <ModernProductList data={productData.data} nav={navigation}  />
      </ScrollView>
    </VStack>
    </NativeBaseProvider>
  )
}

export default MostPopularDetails