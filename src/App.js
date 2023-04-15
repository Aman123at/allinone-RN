import React, { useEffect, useState} from 'react';

import Splash from './SplashScreen/Splash';


import { Provider } from 'react-redux';
import { store } from './redux/store';


import NavigationPage from './pages/NavigationPage';



export default function App() {
 
 
   
   const [showSplash,setShowSplash] = useState(true)
   
  setTimeout(() => {
    setShowSplash(false)
  }, 2500);
  
   return showSplash ? <Splash /> : (
      <Provider store={store} >

    
    <NavigationPage />
      </Provider>
   );




 


}