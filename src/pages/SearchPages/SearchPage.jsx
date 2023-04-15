import { Dimensions, View } from 'react-native'
import React from 'react'
import { ArrowBackIcon, Box, Divider, FormControl, Heading, HStack, Input, NativeBaseProvider, Pressable, ScrollView, Text, useDisclose, VStack } from 'native-base'
import Icon from 'react-native-vector-icons/AntDesign';
import { useState } from 'react';
import RecentSearchPage from './RecentSearchPage';
import { useSelector } from 'react-redux';
import { getAllProducts, getSearchFilter, getSearchResultFound, setSearchResultFound } from '../../redux/slices/productSlice';
import ModernProductList from '../../components/ModernProductList';
import SearchActionSheet from '../../components/Search/SearchActionSheet';
import { getDarkMode } from '../../redux/slices/userSlice';
const SearchPage = ({navigation}) => {
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();
    const searchMenuWidth = Dimensions.get('window').width - 60
    const scrollHeight = Dimensions.get('window').height - 60
    const [searchVal,setSearchVal] = useState('')
    const {status,data} = useSelector(getAllProducts)
    
    const searchResultFound = useSelector(getSearchResultFound)
    const darkmode = useSelector(getDarkMode)
    
  return (
    <NativeBaseProvider  >
      <SearchActionSheet onClose={onClose} isOpen={isOpen} />
        <Box bgColor={darkmode?"coolGray.800":"white"}>

    <VStack marginY={5}  marginX={1}>
      {/* search bar starts */}
      <HStack alignItems="center" >
        <ArrowBackIcon color={darkmode?'white':'black'} onPress={()=>navigation.goBack()} size="lg" />
        <HStack width={searchMenuWidth} marginX={3} paddingX={4} bgColor={darkmode?"#20222A":"#e5e5e5"} borderRadius={10} justifyContent="space-between" alignItems="center" >
            <HStack alignItems="center" >
            <Icon name='search1' size={15} color="#a5a5a5" />
           

           
            <Input color={darkmode?'white':'black'} value={searchVal} onChangeText={(text)=>setSearchVal(text)} placeholder='Search' width="150" focusOutlineColor={darkmode?"#20222A": "#e5e5e5"} borderColor={ darkmode?"#20222A": "#e5e5e5"} _focus={{bgColor:darkmode?"#20222A": "#e5e5e5"}}  />
        
            </HStack>
            <Pressable onPress={onOpen}>

            <Icon name='filter' size={20} color={darkmode?'white':"#555"} />
            </Pressable>
           
        </HStack>
      </HStack>
      {/* search bar ends */}

      {/* Recent row start */}
      {searchVal ? 
      <HStack marginY={5} marginX={3}  justifyContent="space-between" alignItems="center" >
      <Heading color={darkmode?'white':'black'} width={300} size="md">Results for "{searchVal}"</Heading>
      <Heading color={darkmode?'white':'black'} size="sm">{searchResultFound} found</Heading>
    </HStack>
      :
       <HStack marginY={5} marginX={3}  justifyContent="space-between" alignItems="center" >
       <Heading color={darkmode?'white':'black'} size="md">Recent</Heading>
       <Heading color={darkmode?'white':'black'} size="sm">Clear all</Heading>
     </HStack>
      }
     
      {/* Recent row end */}
      <Divider />
      {searchVal && status=='finished' ? 
      <ScrollView height={scrollHeight-100} showsVerticalScrollIndicator={false} >

        <ModernProductList searchInput={searchVal} isSearchPage={true} data={data} nav={navigation} />
      </ScrollView>
      
      :
      
      <RecentSearchPage />
      }

    </VStack>
        </Box>
    </NativeBaseProvider>
  )
}

export default SearchPage