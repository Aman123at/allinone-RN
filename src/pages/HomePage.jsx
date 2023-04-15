import { Dimensions, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../redux/slices/productSlice'
import { fetchProducts } from '../ApiCalls/productApis'
import { extendTheme, NativeBaseProvider,  ScrollView, VStack} from "native-base";
import AppBar from '../components/AppBar'
import { getAllCategories } from '../redux/slices/categorySlice'
import { getAllCategory } from '../ApiCalls/categoryApis'

import SearchBar from '../components/SearchBar'
import CategoriesList from '../components/CategoriesList'
import MostPopular from '../components/MostPopular'

import ModernProductList from '../components/ModernProductList'
import { useState } from 'react'
import BottomNavBar from '../components/BottomNavBar'
import { findComponentHeight } from '../utils/commonUtils'
import { getLoaderState, setLoader } from '../redux/slices/commonSlice'
import Loader from '../utils/Loader'
import { getDarkMode } from '../redux/slices/userSlice'

const HomePage = (props) => {
  const darkmode = useSelector(getDarkMode)
 
  
    const {status,data} = useSelector(getAllProducts)
    const loading = useSelector(getLoaderState)
    const allCategories = useSelector(getAllCategories)
    const dispatch = useDispatch()
    
   
    useEffect(() => {
        if (status === "idle") {
          dispatch(setLoader(true));
          dispatch(fetchProducts());
        } else if (status === "error") {
          dispatch(setLoader(false));
       
        } else if (status === "finished") {
          dispatch(setLoader(false));
        }
      }, [status]);
    useEffect(() => {
        if (allCategories.status === "idle") {
          dispatch(setLoader(true));
          dispatch(getAllCategory());
        } else if (allCategories.status === "error") {
          dispatch(setLoader(false));
        
        } else if (allCategories.status === "finished") {
          dispatch(setLoader(false));
        }
      }, [allCategories.status]);


    
    
      
     
  return (
    
      
      <NativeBaseProvider   >
        {loading ? 
       <Loader />
       :
        <VStack height="100%" bgColor={darkmode?'coolGray.800':'white'}   display="flex" flexDirection="column" >

        <AppBar  nav={props.navigation} />
        <SearchBar nav={props.navigation} />

        <ScrollView height={544} showsVerticalScrollIndicator={false} marginBottom={20}  position='relative' >

        <CategoriesList nav={props.navigation} />
        <MostPopular nav={props.navigation}  />
        <ModernProductList data={data} nav={props.navigation}  />
       
        </ScrollView>
        <BottomNavBar nav={props.navigation}  />
        </VStack>
        }

       
      </NativeBaseProvider>
   
  )
}

export default HomePage