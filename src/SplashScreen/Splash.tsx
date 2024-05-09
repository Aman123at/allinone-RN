import React, {useRef, useEffect} from 'react';
import {StyleSheet, Animated, Easing} from 'react-native';
export default function Splash() {
  const backgroundFade = useRef(new Animated.Value(0)).current;
  const logoFade = useRef(new Animated.Value(0)).current;
  const textFade = useRef(new Animated.Value(0)).current;
  const logoOneMovement:any = useRef(new Animated.Value(0)).current;
  const logoAllMovement:any = useRef(new Animated.Value(-250)).current;
  const logoInMovement:any = useRef(new Animated.Value(250)).current;
  const insideMovement:any = useRef(new Animated.Value(250)).current;
  const sloganText:any = useRef(new Animated.Value(250)).current;
  useEffect(() => {
    Animated.timing(backgroundFade, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
    Animated.timing(logoFade, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(logoOneMovement, {
        toValue: -200,

        duration: 1000,
        easing: Easing.inOut(Easing.exp),
        useNativeDriver: true,
      }).start();
      Animated.timing(textFade, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 1000);
    setTimeout(() => {
      Animated.timing(sloganText, {
        toValue: 0,
        //    toValue: 0,
        duration: 1000,
        easing: Easing.inOut(Easing.exp),
        useNativeDriver: true,
      }).start();
    }, 1200);
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'orange',
    },
    logoAll: {
      color: 'white',
      fontSize: 48,
      fontWeight: 'bold',

      transform: [{translateX: logoAllMovement}],
    },
    logoIn: {
      color: 'white',
      fontSize: 48,
      fontWeight: 'bold',

      transform: [{translateX: logoInMovement}],
    },
    logoOne: {
      color: 'white',
      fontSize: 48,
      fontWeight: 'bold',
      borderRadius: 999,
      transform: [{translateY: logoOneMovement}],
    },
    slogan: {
      color: 'white',
      fontSize: 32,
      fontWeight: 'bold',

      transform: [{translateY: sloganText}],
    },

    insideText: {
      width: 200,
      height: 200,
      backgroundColor: 'red',
      transform: [{translateY: insideMovement}],
    },
  });
  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: backgroundFade,
        },
      ]}>
      <Animated.Image
        source={require('./AllInOne.png')}
        style={[
          styles.logoOne,
          {
            opacity: logoFade,
          },
        ]}
      />

      <Animated.Text
        style={[
          styles.slogan,
          {
            opacity: textFade,
          },
        ]}>
        All Things at one place
      </Animated.Text>
    </Animated.View>
  );
}
