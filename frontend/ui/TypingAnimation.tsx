import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import useTheme from "../theming/UseTheme";

export const TypingAnimation: React.FC = () => {
  const anim = useRef(new Animated.Value(0)).current;
  const anim2 = useRef(new Animated.Value(0)).current;
  const anim3 = useRef(new Animated.Value(0)).current;
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      gap: 4,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.textContrast,
    },
  });

  const animation = (val: Animated.Value) =>
    Animated.loop(
      Animated.sequence([
        Animated.timing(val, {
          toValue: 1,
          easing: Easing.inOut(Easing.sin),
          duration: 450,
          useNativeDriver: true,
        }),
        Animated.timing(val, {
          toValue: 0,
          easing: Easing.inOut(Easing.sin),
          duration: 450,
          useNativeDriver: true,
        }),
      ]),
    );

  const staggerAnimation = Animated.stagger(150, [
    animation(anim),
    animation(anim2),
    animation(anim3),
  ]);

  useEffect(() => {
    staggerAnimation.start();

    return () => staggerAnimation.stop();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.dot, { opacity: anim }]} />
      <Animated.View style={[styles.dot, { opacity: anim2 }]} />
      <Animated.View style={[styles.dot, { opacity: anim3 }]} />
    </View>
  );
};
