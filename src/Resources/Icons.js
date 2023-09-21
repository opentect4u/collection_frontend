import Entypo from "react-native-vector-icons/Entypo"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import IconIcons from "react-native-vector-icons/Ionicons"
import AntDesign from "react-native-vector-icons/AntDesign"
import { colors } from "./colors"
const HomeFill = (color, size) => (
  <Entypo name="home" size={size} color={color} />
)
const Find = (color, size) => (
  <MaterialCommunityIcons name="account-search" color={color} size={size} />
)
const notifications = (color = colors.white, size = 25) => (
  <IconIcons name="notifications" color={color} size={size} />
)

const logout = (color = colors.black, size = 25) => (
  <MaterialCommunityIcons name="logout" color={color} size={size} />
)

const settings = (color = colors.white, size = 25) => (
  <IconIcons name="settings" color={color} size={size} />
)
const end = (color = colors.white, size = 25) => (
  <MaterialIcons name="mobile-friendly" color={color} size={size} />
)

const profile = (color = colors.black, size = 25) => (
  <AntDesign name={"profile"} color={color} size={size} />
)

const password = (color = colors.black, size = 25) => (
  <MaterialIcons name="password" color={color} size={size} />
)

const report = (color = colors.black, size = 25) => (
  <MaterialIcons name="report" color={color} size={size} />
)

export const icon = {
  HomeFill,
  Find,
  notifications,
  logout,
  settings,
  end,
  profile,
  password,
  report,
}
