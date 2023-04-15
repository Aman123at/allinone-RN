import { Animated, View, StyleSheet, Image, Dimensions, ScrollView } from 'react-native'
import React from 'react'
const deviceWidth = Dimensions.get('window').width
const FIXED_BAR_WIDTH = 280
const BAR_SPACE = 10
const images = [
  'https://cdn.pixabay.com/photo/2022/11/12/03/34/elon-reeve-musk-7586152__340.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSA7vsNYyJYHwEt7yT6qYpB2MF5RYIy3vnOghBqg13NafD60PmNF3ks8P_AQazLJGhoAE&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVaZdkbdk-jo_IYWma8jy6bHexQjo7wcPwbMab9PDL-Q&s',
]
const ProductImagesCarousal = () => {
  let numItems = images.length
  let itemWidth = (FIXED_BAR_WIDTH / numItems) - ((numItems - 1) * BAR_SPACE)
  let animVal = new Animated.Value(0)
  let imageArray = []
  let barArray = []
  images.forEach((image, i) => {
    const thisImage = (
      <Image
        key={`image${i}`}
        source={{uri: image}}
        style={{ width: deviceWidth }}
        alt={i}
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
            width: itemWidth,
            marginLeft: i === 0 ? 0 : BAR_SPACE,
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
        <View
          style={styles.barContainer}
        >
          {barArray}
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
  },
  barContainer: {
    position: 'absolute',
    zIndex: 2,
    top: 40,
    flexDirection: 'row',
  },
  track: {
    backgroundColor: '#ccc',
    overflow: 'hidden',
    height: 2,
  },
  bar: {
    backgroundColor: '#5294d6',
    height: 2,
    position: 'absolute',
    left: 0,
    top: 0,
  },
})