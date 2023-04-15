import { View, Text } from 'react-native'
import React from 'react'
import { ArrowBackIcon, Heading, HStack, NativeBaseProvider, ScrollView, VStack } from 'native-base'
import { ratingList } from '../../utils/constants'
import { useState } from 'react'
import TextRounded from '../../utils/TextRounded'
import ReviewRow from '../../components/reviews/ReviewRow'
import { useSelector } from 'react-redux'
import { getDarkMode } from '../../redux/slices/userSlice'

const ReviewDetails = ({navigation,route}) => {
    const darkmode = useSelector(getDarkMode)
    const [reviewFilter,setReviewFilter] = useState({name:"All",_id:"1111"})
    const handleSelectSubCatFilter=(type,title)=>{
        switch (title) {
            case "5":
                setReviewFilter({name:"5",_id:"2222"})
                break;
            case "4":
                setReviewFilter({name:"4",_id:"3333"})
                break;
            case "3":
                setReviewFilter({name:"3",_id:"4444"})
                break;
            case "2":
                setReviewFilter({name:"2",_id:"5555"})
                break;
            case "1":
                setReviewFilter({name:"1",_id:"6666"})
                break;
            case "0":
                setReviewFilter({name:"0",_id:"7777"})
                break;
        
            default:
                setReviewFilter({name:"All",_id:"1111"})
                break;
        }
    }
  return (
    <NativeBaseProvider>
        <VStack bgColor={darkmode ? "coolGray.800" : 'white'} paddingX={1}>
        <HStack marginTop={6} marginBottom={2} marginX={3} >
        <ArrowBackIcon color={darkmode ? 'white':'black'} onPress={()=>navigation.goBack()} size="lg" />
        <Heading color={darkmode ? 'white':'black'}  marginLeft={3} size="md" >4.8 (4376 reviews)</Heading>
        </HStack>
        <VStack marginY={1} >
        <ScrollView marginX={3} horizontal paddingY={2} showsHorizontalScrollIndicator={false} >
            {ratingList.map((rateItem,index)=>
            <TextRounded isReviewPage={true} type="rate" handleSelectSubCatFilter={handleSelectSubCatFilter} title={rateItem.name} id={rateItem._id} activeSubCat={reviewFilter.name} />
            
            )}
        </ScrollView>
      </VStack>

      <ScrollView marginX={3} height={640} showsVerticalScrollIndicator={false} marginBottom={20} >
        {[1,2,3,4,5,6,7,8,9,10].map((item)=>
        
        <ReviewRow nav={navigation} data={item}  />
        )}
       
      </ScrollView>
        </VStack>
    
    </NativeBaseProvider>
  )
}

export default ReviewDetails