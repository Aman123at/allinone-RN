import React from 'react'
import { Avatar,  Heading, HStack,  VStack } from 'native-base'
import {  useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome';
import { getDarkMode, getLoggedInUser } from '../redux/slices/userSlice'

const AppBar = ({page}) => {
  
  const darkmode = useSelector(getDarkMode)
  const loggedInUser = useSelector(getLoggedInUser)
  
 
  return (
   
    <VStack  >

    <HStack marginX={3} marginTop={3} marginBottom={1} justifyContent="space-between" alignItems="center" >
      <HStack alignItems="center" >
      {loggedInUser.data && loggedInUser.data.user && loggedInUser.data.user.gender ? 
      <Avatar   bg="green.500" source={(page=='Cart' || page=='Orders' || page=='Profile') ? require('../components/AllInOne.png') :{
        uri: loggedInUser.data.user.gender == 'male'? "https://w7.pngwing.com/pngs/174/20/png-transparent-moslem-fasting-islam-man-handsome-ramadan-ramadan-fasting-moslem-pray-outline-icon.png" : "https://static.vecteezy.com/system/resources/previews/006/195/212/original/woman-or-girl-symbol-line-icon-stroke-graphics-pictogram-for-web-design-quality-outline-symbol-concept-premium-mono-linear-beautiful-simple-concise-logo-vector.jpg"
    }}>
    AJ
   </Avatar> 
      :
      
       <Avatar   bg="green.500" source={(page=='Cart' || page=='Orders' || page=='Profile') ? require('../components/AllInOne.png') :{
            uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        }}>
        AJ
       </Avatar> 
      }
    
       <Heading color={darkmode?'white':'black'} size={(page=='Cart' || page=='Orders' || page=='Profile') ? "md" :"lg"} marginLeft={2} > { page=='Cart' ? 'My Cart' : page=='Orders' ? 'My Orders': page=='Profile' ? 'Profile':  'All In One'} </Heading>
      </HStack>
        {!(page=='Cart' || page=='Orders' || page=='Profile') && 
      <Icon name="bell-o" size={25} color={darkmode?'white':'black'} />
        }
    </HStack>
    </VStack>
  )
}

export default AppBar