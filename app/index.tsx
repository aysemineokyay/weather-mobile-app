import HomeBackground from "@/components/homeBackground/HomeBackground";
import WeatherInfo from "@/components/section/WeatherInfo";
import WeatherTabBar from "@/components/tabbar/WeatherTabBar";
import { currentWeather } from "@/data/CurrentWeather";
import ForecastSheet from "@/components/sheet/ForecastSheet";
import { ForecastSheetProvider } from "@/components/context/ForecastSheetContext";
import { useEffect } from "react";
import { evenEmitter } from "@/utils/EventEmitter";
import { fetchWeatherData, getLocationData } from "@/services/LocationService";
import { useWeatherData } from "@/components/context/WeatherDataContext";

export default function Index() {
  const { setWeatherData } = useWeatherData();
  const handleLocationEvent = async () => {
    const locationData = await getLocationData();
    if (locationData) {
      const { latitude, longitude } = locationData;
      const weatherData = await fetchWeatherData(latitude, longitude);
      setWeatherData(weatherData);
    }
  };
  useEffect(() => {
    const listener = evenEmitter.addListener("locationEvent", async () => {
      await handleLocationEvent();
    });
    return () => {
      listener.remove();
    };
  }, []);

  return (
    <ForecastSheetProvider>
      <HomeBackground />
      <WeatherInfo />
      <ForecastSheet />
      <WeatherTabBar />
    </ForecastSheetProvider>
  );
}
