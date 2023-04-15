import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Box, Button, Divider, FavouriteIcon, Flex, Heading, HStack,Pressable,Text, VStack } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import { isProductInCart, truncate } from '../utils/commonUtils';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartItems } from '../redux/slices/cartSlice';
import { useEffect } from 'react';
import { setLoader } from '../redux/slices/commonSlice';
import { fetchAllCartItems, removeItemsFromCart } from '../ApiCalls/cartApis';
import { getDarkMode } from '../redux/slices/userSlice';
const ProductDesc = ({quantity,setQuantity,nav,data,handleAddItemToCart,buttonLoader}) => {
    const cartData = useSelector(getCartItems)
    const dispatch = useDispatch()
    const darkmode = useSelector(getDarkMode)
    const [cartType,setCartType] = useState('add')
    const [size,setSize] = useState('M')
    const [color,setColor] = useState('grey')   // grey  , blue , purple , black , green
    const handleDecreaseQuantity=()=>{
        if(quantity > 1){
            setQuantity(quantity-1)
        }
    }
    const handleIncreaseQuantity=()=>{
        if(quantity < 10){
            setQuantity(quantity+1)
        }
    }

    const handleRemoveItem = async () => {
        let filtered = cartData.data.cart.filter(
          (item) => item.product.name === data.name
        );
        let cartId = filtered[0]._id;
        dispatch(setLoader(true));
        removeItemsFromCart(cartId)
          .then((resp) => {
            if (resp.success) {
              dispatch(setLoader(false));
              dispatch(fetchAllCartItems());
            } else {
              dispatch(setLoader(false));
            //   toast.error(
            //     "Something wrong while removing from cart. Please try again.",
            //     {
            //       position: "top-right",
            //       autoClose: 5000,
            //       hideProgressBar: false,
            //       closeOnClick: true,
            //       pauseOnHover: true,
            //       draggable: true,
            //       progress: undefined,
            //     }
            //   );
            }
          })
          .catch((e) => {
            dispatch(setLoader(false));
            // toast.error(
            //   "Something wrong while removing from cart. Please try again.",
            //   {
            //     position: "top-right",
            //     autoClose: 5000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //   }
            // );
          });
      };

    useEffect(() => {
        if (cartData.status=='finished' && data) {
          let alreadyInCart = isProductInCart(data, cartData.data.cart);
          if (alreadyInCart) {
            setCartType("remove");
          } else {
            setCartType("add");
          }
        }
      }, [cartData.status, data]);
  return (
    <Box bgColor={darkmode? 'coolGray.800' :'white'} >
     <HStack paddingLeft={3} paddingRight={3} paddingBottom={2} paddingTop={4}  justifyContent="space-between" alignItems="center" >

      
      <Heading color={darkmode?'white':'black'} maxWidth={330} size="xl"  >{truncate(data?.name,20)}  </Heading>
      <Icon name="heart-o" size={30} color={darkmode?'white':'black'} />
      {/* <Icon name="heart" size={30} color="#900" /> */}

      
     </HStack>
     <HStack marginLeft={3} marginRight={3}>
     <Icon name="star-half-o" size={20} color={darkmode?'white':'black'} />
     <Text color={darkmode?'white':'black'} onPress={()=>nav.navigate("Reviews",data)}  marginLeft={3} >4.8 (4,797 reviews)</Text>
     </HStack>
     <Divider marginY={4} marginX={2} />
     <VStack marginX={3}>
        <Heading color={darkmode?'white':'black'}  size="md">Description</Heading>
        <Text color={darkmode?'white':'black'} >{truncate(data?.description,100)}</Text>
        <Pressable onPress={()=>nav.navigate("Description",{desc:data?.description})} >

        <Text color={darkmode?'white':'black'}  fontWeight="bold" textDecorationLine="underline" >See full description</Text>
        </Pressable>
        {/* color and size start */}
        <HStack paddingY={2} justifyContent="space-between">
            <VStack>
            <Heading color={darkmode?'white':'black'}  size="sm">Size</Heading>
            <HStack paddingTop={2}>
                <TouchableOpacity onPress={()=>setSize('S')}>

                <Box  width={35} height={35}  borderRadius={100} justifyContent="center" borderWidth={2} borderColor="grey" bgColor={size==='S'? 'black':'white'} >
                    <Text color={size==='S' ? 'white' :"grey"} textAlign="center" fontWeight="bold" >S</Text>
                </Box>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setSize('M')}>

                <Box  width={35} height={35} borderRadius={100} marginLeft={1} justifyContent="center" borderWidth={2} borderColor="grey" bgColor={size==='M'? 'black':'white'}>
                <Text color={size==='M' ? 'white' :"grey"} textAlign="center" fontWeight="bold" >M</Text>
                </Box>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setSize('L')} >

                <Box width={35} height={35}  borderRadius={100} marginLeft={1} justifyContent="center" borderWidth={2} borderColor="grey" bgColor={size==='L'? 'black':'white'}>
                <Text color={size==='L' ? 'white' :"grey"} textAlign="center" fontWeight="bold" >L</Text>
                </Box>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>setSize('XL')}>

                <Box  width={35} height={35}  borderRadius={100} marginLeft={1} justifyContent="center" borderWidth={2} borderColor="grey" bgColor={size==='XL'? 'black':'white'}>
                <Text color={size==='XL' ? 'white' :"grey"} textAlign="center" fontWeight="bold" >XL</Text>
                </Box>
                </TouchableOpacity>

            </HStack>
            </VStack>
            <VStack>
            <Heading color={darkmode?'white':'black'}   size="sm">Color</Heading>
            <HStack paddingTop={2}> 
                <TouchableOpacity onPress={()=>setColor('grey')}> 
                    <Box  width={35} height={35} bgColor="grey" borderRadius={100} justifyContent="center" alignItems="center">
                        {color==='grey' &&
                        
                    <Icon name='check' size={15} color="white" />
                        }
                    </Box>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setColor('blue')}>
                        <Box  width={35} height={35} bgColor="#0000ff" borderRadius={100} marginLeft={1} justifyContent="center" alignItems="center">
                    {color==='blue' &&
                        
                        <Icon name='check' size={15} color="white" />
                            }
                        </Box>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setColor('purple')}> 
                    <Box  width={35} height={35} bgColor="#a020f0" borderRadius={90} marginLeft={1} justifyContent="center" alignItems="center">
                    {color==='purple' &&
                        
                        <Icon name='check' size={15} color="white" />
                            }
                    </Box>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setColor('black')}> 
                    <Box  width={35} height={35} bgColor="black" borderRadius={100} marginLeft={1} justifyContent="center" alignItems="center">
                    {color==='black' &&
                        
                        <Icon name='check' size={15} color="white" />
                            }
                    </Box>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setColor('green')}> 
                    <Box  width={35} height={35} bgColor="#00ff00" borderRadius={90} marginLeft={1} justifyContent="center" alignItems="center">
                    {color==='green' &&
                        
                        <Icon name='check' size={15} color="white" />
                            }
                    </Box>
                </TouchableOpacity>
               
                
               
               
               
            </HStack>
            </VStack>
        </HStack>
         {/* color and size end */}

        <HStack alignItems="center" marginY={3}>
        <Heading color={darkmode?'white':'black'}  size="md">Quantity</Heading>
        <HStack marginLeft={8} borderRadius={100} bgColor={darkmode?"#555555":"#e5e5e5"} justifyContent="space-between" width={100} paddingX={4} paddingY={2}  >
            <Heading color={darkmode?'white':'black'}  onPress={handleDecreaseQuantity}  size="md">-</Heading>
            <Heading color={darkmode?'white':'black'}   size="md">{quantity}</Heading>
            <Heading color={darkmode?'white':'black'}  onPress={handleIncreaseQuantity} size="md">+</Heading>
        </HStack>
        </HStack>
     </VStack>
     <Divider marginY={4} marginX={2} />
     <HStack  marginX={3} justifyContent="space-between" marginBottom={5}>
        <VStack>
        <Text color={darkmode?'white':'black'}  >Total price</Text>
        <Heading color={darkmode?'white':'black'}  size="md">Rs. {data?.price * quantity}</Heading>
        </VStack>
        {cartType=='remove' ?
         <Button
         onPress={handleRemoveItem}
         bgColor={darkmode?'#fafafa':"#000" } width={240} borderRadius={100} paddingX={4} paddingY={4} leftIcon={<Icon name='shopping-bag' size={20} color={darkmode?'black':"white"} />} shadow="8" >
             
             <Text marginLeft={2} fontWeight="bold" color={darkmode?'black':"white"}>Remove from Cart</Text>
         </Button>
        :
        
        <Button
        onPress={handleAddItemToCart}
        bgColor={darkmode?'#fafafa':"#000" } width={240} borderRadius={100} paddingX={4} paddingY={4} leftIcon={<Icon name='shopping-bag' size={20} color={darkmode?'black':"white"} />} shadow="8" >
            
            <Text marginLeft={2} fontWeight="bold" color={darkmode?'black':"white"}>{buttonLoader ? 'Loading..' :'Add to Cart'}</Text>
        </Button>
        }
     </HStack>
    </Box>
  )
}

export default ProductDesc