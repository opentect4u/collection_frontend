import { StyleSheet, View, Image } from "react-native"
import React from "react"
import { COLORS, colors } from "../Resources/colors"

const LogoComponent = () => {
  return (
    <>
      <View
        style={{
          backgroundColor: COLORS.lightScheme.onPrimary,
          borderRadius: 50,
          padding: 10,
        }}>
        <Image
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/512px-Logo_of_Twitter.svg.png?20220821125553",
          }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      {/* <Text style={styles.comapany_name}>
              Hi, User
            </Text> */}
    </>
  )
}

export default LogoComponent

const styles = StyleSheet.create({
  image: {
    height: 80,
    width: 80,
  },
  comapany_name: {
    fontSize: 22,
    letterSpacing: 2,
    color: COLORS.lightScheme.onPrimary,
    fontWeight: "600",
  },
})
