import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";
import BackgroundGradient from "@/components/backgroundGradient/BackgroundGradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import {
  Canvas,
  LinearGradient,
  RoundedRect,
  Shadow,
  vec,
} from "@shopify/react-native-skia";
import useApplicationDimensions from "@/hooks/useApplicationDimensions";
import WeatherWidget from "@/components/section/WeatherWidget";
import { ForecastList } from "@/data/ForecastData";

const list = () => {
  const { top } = useSafeAreaInsets();
  const { width } = useApplicationDimensions();
  return (
    <>
      <BackgroundGradient />
      <View style={{ paddingTop: top + 2, flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 16,
            paddingBottom: 8,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Link href="/" asChild>
              <Pressable style={{ flexDirection: "row" }}>
                <Ionicons
                  name="chevron-back-sharp"
                  size={34}
                  color={"rgba(235,235,245,0.6)"}
                />
                <Text style={styles.titleText}>Weather</Text>
              </Pressable>
            </Link>
          </View>
          <Ionicons
            name="ellipsis-horizontal-circle"
            size={34}
            color={"white"}
          />
        </View>
        <View style={{ marginHorizontal: 16, borderRadius: 10, height: 36 }}>
          <Canvas style={{ ...StyleSheet.absoluteFillObject }}>
            <RoundedRect x={0} y={0} width={width - 32} height={36} r={10}>
              <LinearGradient
                start={vec(0, 0)}
                end={vec(width - 32, 36)}
                colors={["rgba(46,51,90,0.26)", "rgba(28,27,51,0.26)"]}
              />
              <Shadow dx={0} dy={4} blur={4} color={"rgba(0,0,0,1)"} inner />
            </RoundedRect>
          </Canvas>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
              paddingHorizontal: 8,
            }}
          >
            <Feather name="search" size={17} color={"rgba(235,235,246,0.6)"} />
            <TextInput
              placeholder="Search for a city or airport"
              placeholderTextColor={"rgba(235,235,246,0.6)"}
              style={styles.searchInput}
            />
          </View>
        </View>
        <ScrollView
          style={{ flex: 1, paddingTop: 20 }}
          contentContainerStyle={{
            alignItems: "center",
            gap: 20,
            paddingBottom: 100,
          }}
        >
          {ForecastList.map((forecast, i) => (
            <WeatherWidget forecast={forecast} key={i} />
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export default list;
const styles = StyleSheet.create({
  titleText: {
    color: "white",
    fontFamily: "SF-Semibold",
    fontSize: 28,
    lineHeight: 34,
  },
  searchInput: {
    color: "rgba(235,235,246,0.5)",
    fontFamily: "SF-Regular",
    fontSize: 17,
    lineHeight: 22,
    paddingLeft: 10,
  },
});
