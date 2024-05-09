import {Dimensions, View} from 'react-native';
import React from 'react';
import {HStack, VStack, Text} from 'native-base';
import ModernProductCard from './ModernProductCard';
import {useState} from 'react';
import {
  getAllProducts,
  getSearchFilter,
  setSearchResultFound,
} from '../redux/slices/productSlice';
import {useDispatch, useSelector} from 'react-redux';
import {
  prepareSearchDataWithSortAndFilters,
  splitArray,
} from '../utils/commonUtils';
import {getFilterBySubCategory} from '../redux/slices/categorySlice';
import {useEffect} from 'react';
import NotFound from '../pages/NotFoundPage/NotFound';
import { IModernProductListProps, IProduct } from '../interfaces/productInterfaces';

const ModernProductList = ({data, nav, isSearchPage, searchInput}:IModernProductListProps) => {
  const dispatch = useDispatch();
  const activeSubCat = useSelector(getFilterBySubCategory);
  const devicewidth = Dimensions.get('window').width - 6;
  const searchFilter = useSelector(getSearchFilter);
  const getProductsAfterFilter = (productList:IProduct[], type:string):IProduct[] => {
    if (type == 'All') {
      return productList;
    } else {
      return productList.filter((item:IProduct) => item.subCategory == type);
    }
  };
  

  useEffect(() => {
    if (data && data.products && searchInput) {
      let myfoundlength = prepareSearchDataWithSortAndFilters(
        searchFilter,
        data.products,
        searchInput,
        data.products,
      ).length
        ? prepareSearchDataWithSortAndFilters(
            searchFilter,
            data.products,
            searchInput,
            data.products,
          ).length
        : 0;
      dispatch(setSearchResultFound(myfoundlength));
    }
  }, [searchInput]);
  return (
    <HStack maxWidth={devicewidth} marginY={3} flexWrap="wrap" marginX={1}>
      {data &&
      data.products &&
      (isSearchPage
        ? prepareSearchDataWithSortAndFilters(
            searchFilter,
            data.products,
            searchInput,
            data.products,
          ).length
        : getProductsAfterFilter(data.products, activeSubCat.name).length) ? (
        (isSearchPage
          ? prepareSearchDataWithSortAndFilters(
              searchFilter,
              data.products,
              searchInput,
              data.products,
            )
          : getProductsAfterFilter(data.products, activeSubCat.name)
        ).map((element, index) => (
          <HStack
            key={index}
            marginY={1}
            alignItems="center"
            justifyContent="space-between">
            <ModernProductCard
              product={element}
              nav={nav}
              pImage={element.images[0]}
              price={element.price}
              title={element.name}
              id={element._id}
            />
          </HStack>
        ))
      ) : (
        <NotFound
          title="Not Found"
          desc={
            isSearchPage
              ? 'Sorry, the keywork you entered cannot be found, Please check again or search with another keyword.'
              : ''
          }
        />
      )}
    </HStack>
  );
};

export default ModernProductList;

// {(data && data.products) && splitArray(activeSubCat.name!="All" ? data.products.filter((item)=>item.subCategory === activeSubCat.name) : data.products,2).length ? splitArray(activeSubCat.name!="All" ? data.products.filter((item)=>item.subCategory === activeSubCat.name) : data.products,2).map((element,index) =>
// (  <HStack key={index} marginY={1} alignItems="center" justifyContent="space-between" >
//        {element && element.length && element.map((item,i)=>

//    <ModernProductCard product={item} nav={nav} pImage={item.images[0]} price={item.price}  title={item.name} id={item._id} />
//        )}
//    {/* <ModernProductCard title={"B"} /> */}
//  </HStack>)
// ):
// <Text color="black" >Not found</Text>
// }
