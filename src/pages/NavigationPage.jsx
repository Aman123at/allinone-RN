
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfilePage from './Profile/ProfilePage';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedInUser } from '../redux/slices/userSlice';
import { fetchUser } from '../ApiCalls/userApis';
import ProductDetails from './ProductDetails';
import HomePage from './HomePage';
import CartPage from './Cart/CartPage';
import OrdersPage from './Orders/OrdersPage';
import SearchPage from './SearchPages/SearchPage';
import MostPopularDetails from './MostPopular/MostPopularDetails';
import ReviewDetails from './Reviews/ReviewDetails';
import EditProfile from './Profile/EditProfile';
import Address from './Profile/Address';
import Security from './Profile/Security';
import PrivacyPolicy from './Profile/PrivacyPolicy';
import HelpCenter from './Profile/HelpCenter';
import Checkout from './Checkout/Checkout';
import ChooseShipping from './Checkout/ChooseShipping';
import ShippingAddress from './Checkout/ShippingAddress';
import AddNewAddress from './Profile/AddNewAddress';
import Description from './Description';
import Loader from '../utils/Loader';
import { NativeBaseProvider } from 'native-base';
import InvoicePage from './Checkout/InvoicePage';
import Categories from './Categories/Categories';
import ProductsInCategory from './Categories/ProductsInCategory';

const NavigationPage = () => {
    
    const Stack = createNativeStackNavigator();
    const loggedInUser = useSelector(getLoggedInUser)
    
    const dispatch = useDispatch()
    useEffect(() => {
        if (loggedInUser.status === "idle") {
          dispatch(fetchUser());
       
        } else if (loggedInUser.status === "error") {
       
        } else if (loggedInUser.status === "finished") {
       
        }
      }, [loggedInUser.status]);
  return (loggedInUser.status==="finished"||loggedInUser.status==="error") ? (
      

<NavigationContainer>

<Stack.Navigator initialRouteName={loggedInUser.status==="finished" ? "Home":"SignIn"}>
        <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
        <Stack.Screen name="Cart" component={CartPage} options={{ headerShown: false }} />
        <Stack.Screen name="Orders" component={OrdersPage} options={{ headerShown: false }} />
        <Stack.Screen name="Checkout" component={Checkout} options={{ headerShown: false }} />
        <Stack.Screen name="Product" component={ProductDetails} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfilePage} options={{ headerShown: false }} />
        <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="Search" component={SearchPage} options={{ headerShown: false }} />
        <Stack.Screen name="MostPopular" component={MostPopularDetails} options={{ headerShown: false }} />
        <Stack.Screen name="Reviews" component={ReviewDetails} options={{ headerShown: false }} />
        <Stack.Screen name="Edit Profile" component={EditProfile} options={{ headerShown: false }} />
        <Stack.Screen name="Address" component={Address} options={{ headerShown: false }} />
        <Stack.Screen name="Security" component={Security} options={{ headerShown: false }} />
        <Stack.Screen name="Privacy Policy" component={PrivacyPolicy} options={{ headerShown: false }} />
        <Stack.Screen name="Help Center" component={HelpCenter} options={{ headerShown: false }} />
        <Stack.Screen name="Choose Shipping" component={ChooseShipping} options={{ headerShown: false }} />
        <Stack.Screen name="Shipping Address" component={ShippingAddress} options={{ headerShown: false }} />
        <Stack.Screen name="Add New Address" component={AddNewAddress} options={{ headerShown: false }} />
        <Stack.Screen name="Description" component={Description} options={{ headerShown: false }} />
        <Stack.Screen name="Invoice" component={InvoicePage} options={{ headerShown: false }} />
        <Stack.Screen name="Categories" component={Categories} options={{ headerShown: false }} />
        <Stack.Screen name="ProdInCat" component={ProductsInCategory} options={{ headerShown: false }} />
</Stack.Navigator>
</NavigationContainer>

  ):(<NativeBaseProvider>
    <Loader />
</NativeBaseProvider>)
}

export default NavigationPage