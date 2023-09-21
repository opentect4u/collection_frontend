import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PixelRatio,
} from "react-native"
import React from "react"
// import LinearGradient from 'react-native-linear-gradient';
import { COLORS, colors } from "../Resources/colors"

const ButtonComponent = ({
  title,
  disabled = false,
  handleOnpress,
  customStyle,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={handleOnpress}
      style={[
        {
          backgroundColor: disabled
            ? COLORS.darkScheme.secondary
            : COLORS.lightScheme.onPrimaryContainer,
        },
        { ...styles.container, ...customStyle },
      ]}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

export default ButtonComponent

const styles = StyleSheet.create({
  container: {
    borderRadius: PixelRatio.roundToNearestPixel(10),
    padding: 10,
    elevation: 10,
    // backgroundColor: colors.secondary
  },
  text: {
    color: COLORS.lightScheme.onError,
    fontSize: PixelRatio.roundToNearestPixel(18),
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: 1,
  },
})
