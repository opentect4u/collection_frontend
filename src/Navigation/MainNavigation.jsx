import { StyleSheet } from "react-native"
import { useContext } from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"
import mainNavigationRoutes from "../Routes/NavigationRoutes"
import LogInScreen from "../Screens/LogInScreen"
import ForgotPasscode from "../Screens/ForgotPasscode"
import BottomNavigation from "./BottomNavigation"
import { AppStore } from "../Context/AppContext"
import NotificationScreen from "../Screens/Notification/NotificationScreen"
const Stack = createNativeStackNavigator()
const MainNavigation = () => {
  const { isLogin } = useContext(AppStore)
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isLogin ? (
            <>
              <Stack.Screen
                name={mainNavigationRoutes.tab_home}
                component={BottomNavigation}
              />
              <Stack.Screen
                name={mainNavigationRoutes.notificationScreen}
                component={NotificationScreen}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name={mainNavigationRoutes.login}
                component={LogInScreen}
              />
              <Stack.Screen
                name={mainNavigationRoutes.forgotPasscode}
                component={ForgotPasscode}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

export default MainNavigation

const styles = StyleSheet.create({})
