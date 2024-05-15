import HomeBackground from "@/components/homeBackground/HomeBackground";
import WeatherInfo from "@/components/section/WeatherInfo";
import WeatherTabBar from "@/components/tabbar/WeatherTabBar";
import { currentWeather } from "@/data/CurrentWeather";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useCallback } from "react";
SplashScreen.preventAutoHideAsync();

export default function Index() {
  const [fontsLoaded] = useFonts({
    "SF-Thin": require("../assets/fonts/SF-Pro-Display-Thin.otf"),
    "SF-Regular": require("../assets/fonts/SF-Pro-Display-Regular.otf"),
    "SF-Semibold": require("../assets/fonts/SF-Pro-Display-Semibold.otf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) return null;
  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <HomeBackground />
      <WeatherInfo weather={currentWeather} />
      <WeatherTabBar />
      <StatusBar style={"light"} />
    </SafeAreaProvider>
  );
}
