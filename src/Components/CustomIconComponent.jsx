import { View, Image } from "react-native"
import React from "react"
import { COLORS, colors } from "../Resources/colors"

const CustomIconComponent = (source, focus) => {
  return (
    <View>
      <Image
        source={source}
        resizeMode="contain"
        style={{
          width: 25,
          backgroundColor: focus ? COLORS.lightScheme.onTertiaryContainer : "",
        }}
      />
    </View>
  )
}

export default CustomIconComponent
