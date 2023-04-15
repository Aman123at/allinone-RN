import { View } from 'react-native'
import React from 'react'
import { HStack, VStack,Text, CloseIcon ,ScrollView} from 'native-base'
import RecentSearchRow from '../../components/Search/RecentSearchRow'

const RecentSearchPage = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} margin={3} >
        {[1,2,3,4,5,6,7,,9,10,11,12,13,14,15,16,17,18,19,20].map((item)=>
        
            <RecentSearchRow data={item} />
        )}
    </ScrollView>
  )
}

export default RecentSearchPage