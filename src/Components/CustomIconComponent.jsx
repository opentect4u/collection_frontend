import { View, Image } from 'react-native'
import React from 'react'
import { colors } from '../Resources/colors'

const CustomIconComponent = (source, focus) => {
  return (
    <View>
      <Image
        source={source}
        resizeMode="contain"
        style={{ width: 25, backgroundColor: focus ? colors.light_sea_green : "" }}
      />
    </View>
  )
}

export default CustomIconComponent
