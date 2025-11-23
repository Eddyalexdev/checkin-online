import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';

interface IProps {
  text: string;
}

const Loader = ({ text }: IProps) => {
  const dots = useRef([new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)]).current;

  useEffect(() => {
    const animations = dots.map((anim, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 200), // stagger
          Animated.timing(anim, {
            toValue: 1,
            duration: 350,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 350,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.delay((dots.length - i - 1) * 200),
        ])
      )
    );

    animations.forEach(a => a.start());

    return () => animations.forEach(a => a.stop());
  }, [dots]);

  return (
    <View style={styles.loader}>
      <View style={styles.loaderDots} accessible accessibilityLabel="Cargando">
        {dots.map((anim, i) => {
          const scale = anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 1],
          });
          const opacity = anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 1],
          });

          return (
            <Animated.View
              key={i}
              style={[
                styles.loaderDot,
                {
                  transform: [{ scale }],
                  opacity,
                },
              ]}
            />
          );
        })}
      </View>

      <Text style={styles.loaderText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    marginBottom: 16,
    alignItems: 'center',
    height: 200,
    justifyContent: 'center',
  },
  loaderDots: {
    flexDirection: 'row',
    marginBottom: 16,
    height: 24,
  },
  loaderDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#00ccc0',
    marginHorizontal: 4,
  },
  loaderText: {
    textAlign: 'center',
    color: '#555',
    fontSize: 16,
  },
});

export default Loader;
