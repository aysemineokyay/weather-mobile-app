import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import BottomSheet, { BottomSheetModal } from "@gorhom/bottom-sheet";
import ForecastSheetBackground from "./ForecastSheetBackground";
import useApplicationDimensions from "@/hooks/useApplicationDimensions";
import ForecastControl from "./elements/ForecastControl";
import Seperator from "./elements/Seperator";
import ForecastCapsule from "../forecast/ForecastCapsule";
import { hourly, weekly } from "@/data/ForecastData";
import ForecastScroll from "../forecast/ForecastScroll";
import { ForecastType } from "@/models/Weather";
import AirQualityWidget from "../widgets/AirQualityWidget";
import UvIndexWidget from "../widgets/UvIndexWidget";
import WindWidget from "../widgets/WindWidget";
import RainFallWidget from "../widgets/RainFallWidget";
import VisibilityWidget from "../widgets/VisibilityWidget";
import PressureWidget from "../widgets/PressureWidget";
import FeelsLikeWidget from "../widgets/FeelsLikeWidget";
import HumidityWidget from "../widgets/HumidityWidget";
import SunriseWidget from "../widgets/SunriseWidget";
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useForecastSheetPosition } from "../context/ForecastSheetContext";
import { useWeatherData } from "../context/WeatherDataContext";

const ForecastSheet = () => {
  const snapPoints = ["38.5%", "83%"];
  const { width, height } = useApplicationDimensions();
  const {
    weatherData: { hourlyForecast, weeklyForecast },
  } = useWeatherData();
  const smallWidgetSize = width / 2 - 20;
  const firstSnapPoint = height * (parseFloat(snapPoints[0]) / 100);
  const secondSnapPoint = height * (parseFloat(snapPoints[1]) / 100);
  const minY = height - secondSnapPoint;
  const maxY = height - firstSnapPoint;
  const cornerRadius = 44;
  const capsuleRadius = 30;
  const capsuleHeight = height * 0.17;
  const capsuleWidth = width * 0.15;
  const [selectedForecastType, setSelectedForecastType] =
    useState<ForecastType>(ForecastType.Hourly);
  const currentPosition = useSharedValue(0);
  const animatedPosition = useForecastSheetPosition();
  const translateXHourly = useSharedValue(0);
  const translateXWeekly = useSharedValue(width);
  const animatedHourlyStyles = useAnimatedStyle(() => {
    return { transform: [{ translateX: translateXHourly.value }] };
  });
  const animatedWeeklyStyles = useAnimatedStyle(() => {
    return { transform: [{ translateX: translateXWeekly.value }] };
  });
  useEffect(() => {
    if (selectedForecastType === ForecastType.Weekly) {
      translateXHourly.value = withTiming(-width);
      translateXWeekly.value = withTiming(-width);
    } else {
      translateXHourly.value = withTiming(0);
      translateXWeekly.value = withTiming(width);
    }
  }, [selectedForecastType]);
  const normalizePosition = (position: number) => {
    "worklet";
    return ((position - maxY) / (maxY - minY)) * -1;
  };
  useAnimatedReaction(
    () => {
      return currentPosition.value;
    },
    (cv) => {
      animatedPosition.value = normalizePosition(cv);
    }
  );
  return (
    <BottomSheet
      snapPoints={snapPoints}
      animatedPosition={currentPosition}
      animateOnMount={false}
      handleIndicatorStyle={{
        width: 48,
        height: 5,
        backgroundColor: "rgba(0,0,0,0.3)",
      }}
      backgroundComponent={() => (
        <ForecastSheetBackground
          width={width}
          height={firstSnapPoint}
          cornerRadius={cornerRadius}
        />
      )}
    >
      <>
        <ForecastControl onPress={(type) => setSelectedForecastType(type)} />
        <Seperator width={width} height={3} />
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          <View style={{ flexDirection: "row" }}>
            <Animated.View style={[animatedHourlyStyles]}>
              <ForecastScroll
                capsuleWidth={capsuleWidth}
                capsuleHeight={capsuleHeight}
                capsuleRadius={capsuleRadius}
                forecasts={hourlyForecast}
              />
            </Animated.View>
            <Animated.View style={[animatedWeeklyStyles]}>
              <ForecastScroll
                capsuleWidth={capsuleWidth}
                capsuleHeight={capsuleHeight}
                capsuleRadius={capsuleRadius}
                forecasts={weeklyForecast}
              />
            </Animated.View>
          </View>

          <View style={{ flex: 1, paddingTop: 30, paddingBottom: 50 }}>
            <AirQualityWidget width={width - 30} height={150} />
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                padding: 15,
                gap: 10,
              }}
            >
              <UvIndexWidget width={smallWidgetSize} height={smallWidgetSize} />
              <WindWidget width={smallWidgetSize} height={smallWidgetSize} />
              <RainFallWidget
                width={smallWidgetSize}
                height={smallWidgetSize}
              />
              <VisibilityWidget
                width={smallWidgetSize}
                height={smallWidgetSize}
              />
              <PressureWidget
                width={smallWidgetSize}
                height={smallWidgetSize}
              />
              <FeelsLikeWidget
                width={smallWidgetSize}
                height={smallWidgetSize}
              />
              <HumidityWidget
                width={smallWidgetSize}
                height={smallWidgetSize}
              />
              <SunriseWidget width={smallWidgetSize} height={smallWidgetSize} />
            </View>
          </View>
        </ScrollView>
      </>
    </BottomSheet>
  );
};

export default ForecastSheet;

const styles = StyleSheet.create({});
