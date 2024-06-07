import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ArcComponent from "./elements/ArcComponent";
import useApplicationDimensions from "@/hooks/useApplicationDimensions";
import TabbarItems from "./elements/TabbarItems";
import { BlurView } from "expo-blur";
import { useForecastSheetPosition } from "../context/ForecastSheetContext";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { transform } from "@babel/core";
import { translate } from "@shopify/react-native-skia";

const WeatherTabBar = () => {
  const TabbarHeight = 88;
  const { width, height } = useApplicationDimensions();
  const animatedPosition = useForecastSheetPosition();
  const animatedViewStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            animatedPosition.value,
            [0, 1],
            [0, TabbarHeight + 20]
          ),
        },
      ],
    };
  });
  return (
    <Animated.View
      style={[
        { ...StyleSheet.absoluteFillObject, top: height - TabbarHeight },
        animatedViewStyles,
      ]}
    >
      <BlurView
        style={{
          height: TabbarHeight,
          ...StyleSheet.absoluteFillObject,
        }}
        intensity={50}
        tint="dark"
      >
        <ArcComponent height={TabbarHeight} width={width} />
        <TabbarItems />
      </BlurView>
    </Animated.View>
  );
};

export default WeatherTabBar;
