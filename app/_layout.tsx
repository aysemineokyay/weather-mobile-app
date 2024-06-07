import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useCallback, useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import {
  WeatherDataProvider,
  useWeatherData,
} from "@/components/context/WeatherDataContext";
import { evenEmitter } from "@/utils/EventEmitter";
import { fetchWeatherData, getLocationData } from "@/services/LocationService";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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
      <WeatherDataProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="list" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="light" />
        </GestureHandlerRootView>
      </WeatherDataProvider>
    </SafeAreaProvider>
  );
}
