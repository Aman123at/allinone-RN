import { View, Text, Dimensions, Animated } from 'react-native'
import React from 'react'
import AppBar from '../../components/AppBar'
import { Box, Center, HStack, NativeBaseProvider, Pressable, useColorModeValue, VStack } from 'native-base'
import BottomNavBar from '../../components/BottomNavBar'
import { useDispatch, useSelector } from 'react-redux'
import { getDarkMode } from '../../redux/slices/userSlice'
import { TabView, SceneMap } from 'react-native-tab-view';
import CompletedOrders from './CompletedOrders'
import OngoingOrders from './OngoingOrders'
import { getOrdersFromState } from '../../redux/slices/cartSlice'
import { getAllOrders } from '../../ApiCalls/orderApis'
import { setLoader } from '../../redux/slices/commonSlice'
import { useEffect } from 'react'
import Loader from '../../utils/Loader'
import { useState } from 'react'


const initialLayout = {
  width: Dimensions.get('window').width,
  height:Dimensions.get('window').height
};
const renderScene = SceneMap({
  first: OngoingOrders,
  second: CompletedOrders,
  
});
const OrdersPage = ({navigation}) => {
  const darkmode = useSelector(getDarkMode)
  const allOrders = useSelector(getOrdersFromState)
  const [waitLoader,setWaitLoader] = useState(false)
  
  const dispatch = useDispatch()
  useEffect(()=>{
    if (allOrders.status === "idle") {
      dispatch(setLoader(true));
      setWaitLoader(true)
      dispatch(getAllOrders());
    }
    if (allOrders.status === "error") {
      dispatch(setLoader(false));
      setWaitLoader(false)
     
    }
    if (allOrders.status === "finished") {
      dispatch(setLoader(false));
      setWaitLoader(false)
    }
  },[allOrders.status])
 
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([{
    key: 'first',
    title: 'Ongoing'
  }, {
    key: 'second',
    title: 'Completed'
  }]);

  const renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return <Box flexDirection="row">
      
        {props.navigationState.routes.map((route, i) => {
        const opacity = props.position.interpolate({
          inputRange,
          outputRange: inputRange.map(inputIndex => inputIndex === i ? 1 : 0.5)
        });
        const color = darkmode ? (index === i ? 'white' : '#888888') : (index === i ? 'black' : 'coolGray.400');
        const fontWeight = index == i ? "bold":"normal";
        const borderColor = darkmode ? (index === i ? useColorModeValue('coolGray.200', 'gray.400') : 'black') :(index === i ? 'black' : useColorModeValue('coolGray.200', 'gray.400'));
        return <Box borderBottomWidth="3" borderColor={borderColor} flex={1} alignItems="center" p="3" cursor="pointer">
              <Pressable onPress={() => {
            
            setIndex(i);
          }}>
                <Animated.Text style={{
              color,
              fontWeight
            }}>{route.title}</Animated.Text>
              </Pressable>
            </Box>;
      })}
      </Box>;
  };
  return (
    <NativeBaseProvider>
        <VStack bgColor={darkmode?'coolGray.800':'gray.100'} >
          <HStack  >
            <AppBar nav={navigation} page="Orders"   />
          </HStack>
          {waitLoader ?
          
          <HStack width={initialLayout.width} height={initialLayout.height} >

            <Loader />
          </HStack>
          :
          
          <HStack marginX={4} marginY={2} >
          
        <TabView navigationState={{
            index,
            routes
          }} renderScene={renderScene} renderTabBar={renderTabBar} onIndexChange={setIndex} initialLayout={initialLayout} style={{
            height:Dimensions.get('window').height
          }} />
        
          </HStack>
          }

        </VStack>
        <BottomNavBar nav={navigation}  />
      </NativeBaseProvider>
  )
}

export default OrdersPage