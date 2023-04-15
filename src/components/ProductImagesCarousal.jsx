import { Animated, View, StyleSheet, Dimensions, ScrollView } from 'react-native'
import React from 'react'
import { ArrowBackIcon ,Image} from 'native-base'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getDarkMode } from '../redux/slices/userSlice'
const deviceWidth = Dimensions.get('window').width
const FIXED_BAR_WIDTH = 230
const BAR_SPACE = 10

const ProductImagesCarousal = ({nav,imageData}) => {
  
  const [images,setImages] = useState([
    'https://cdn.pixabay.com/photo/2022/11/12/03/34/elon-reeve-musk-7586152__340.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSA7vsNYyJYHwEt7yT6qYpB2MF5RYIy3vnOghBqg13NafD60PmNF3ks8P_AQazLJGhoAE&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVaZdkbdk-jo_IYWma8jy6bHexQjo7wcPwbMab9PDL-Q&s',
  ])
  let numItems = images.length
  let itemWidth = (FIXED_BAR_WIDTH / numItems) - ((numItems - 1) * BAR_SPACE)
  let animVal = new Animated.Value(0)
  let imageArray = []
  let barArray = []
  useEffect(()=>{
    if(imageData && imageData.length>0){
      setImages(imageData.map((item)=>item.secure_url))
    }
    

  },[])
  images.forEach((image, i) => {
    const thisImage = (
      <Image
        key={`image${i}`}
        source={{uri: image}}
        style={{ width: deviceWidth }}
        resizeMode='cover'
        alt='abcd'
      />
    )
    imageArray.push(thisImage)

    const scrollBarVal = animVal.interpolate({
      inputRange: [deviceWidth * (i - 1), deviceWidth * (i + 1)],
      outputRange: [-itemWidth, itemWidth],
      extrapolate: 'clamp',
      
    })
    

    const thisBar = (
      <View
        key={`bar${i}`}
        style={[
          styles.track,
          {
            width: deviceWidth * (i + 1) == animVal ? 200:itemWidth,
            marginLeft: i === 0 ? 0 : BAR_SPACE
           
          },
        ]}
      >
   
        <Animated.View

          style={[
            styles.bar,
            {
              width: itemWidth,
              transform: [
                { translateX: scrollBarVal },
              ],
            },
          ]}
        />
      </View>
    )
    barArray.push(thisBar)


  })

  return (
    <View
        style={styles.container}
        flex={1}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={10}
          pagingEnabled
          
          onScroll={
            Animated.event(
              [{ nativeEvent: { contentOffset: { x: animVal } } }]
            )
           
          }
        >

          {imageArray}

        </ScrollView>
        {images.length>1 &&
        
        <View
          style={styles.barContainer}
        >
          {barArray}
        </View>
        }
        <View style={styles.arrow}>
          <ArrowBackIcon size={25} color="#000" onPress={()=>nav.goBack()} />
        </View>
      </View>
  )
}

export default ProductImagesCarousal


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height:deviceWidth/2
  },
  barContainer: {
    position: 'absolute',
    zIndex: 2,
    bottom: 10,
    flexDirection: 'row',
  },
  arrow: {
    position: 'absolute',
    zIndex: 2,
    top: 25,
    left:20,
    flexDirection: 'row',
    padding:10,
    backgroundColor:'lightgray',
    borderRadius:999
  },
  track: {
    backgroundColor: '#ccc',
    overflow: 'hidden',
    height: 5,
    borderRadius:999
   
  },
  bar: {
    backgroundColor: '#000000',
    height: 5,
    position: 'absolute',
    borderRadius:999
    // left: 0,
    // top: 0,
  },
  
})