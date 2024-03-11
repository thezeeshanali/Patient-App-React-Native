import { useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();
import AppProvider from "./app/Context/AppProvider";
import { LogBox, View } from "react-native";
LogBox.ignoreAllLogs();
export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto: require("./assets/fonts/Poppins-Regular.ttf"),
    Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <NavigationContainer>
        <AppProvider />
      </NavigationContainer>
    </View>
  );
}
