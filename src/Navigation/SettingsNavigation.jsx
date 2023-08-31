import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import mainNavigationRoutes from '../Routes/NavigationRoutes'
import SettingScreen from '../Screens/SettingsScreens/SettingScreen'
import Profile from '../Screens/SettingsScreens/Profile'
import ChangePin from '../Screens/SettingsScreens/ChangePin'
import EndWork from '../Screens/SettingsScreens/EndWork'
import Report from '../Screens/SettingsScreens/Report'
import NotificationScreen from '../Screens/Notification/NotificationScreen'

const Stack = createNativeStackNavigator();

const SettingsNavigation = () => {
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name={mainNavigationRoutes.settingScreen}
          component={SettingScreen}
        />
        <Stack.Screen
          name={mainNavigationRoutes.profileScreen}
          component={Profile}
        />

        <Stack.Screen
          name={mainNavigationRoutes.changePinScreen}
          component={ChangePin}
        />

        <Stack.Screen
          name={mainNavigationRoutes.endWorkScreen}
          component={EndWork}
        />

        <Stack.Screen
          name={mainNavigationRoutes.reportScreen}
          component={Report}
        />

        <Stack.Screen
          name={mainNavigationRoutes.notificationScreen}
          component={NotificationScreen}
        />
      </Stack.Navigator>
    </>
  );
};

export default SettingsNavigation;

const styles = StyleSheet.create({});
