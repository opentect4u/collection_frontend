import { StyleSheet, Text, View } from "react-native"
import React from "react"
import SmoothPinCodeInput from "react-native-smooth-pincode-input"
import { COLORS, colors } from "../Resources/colors"

const MpinComponent = ({ value, handleChange }) => {
  return (
    <View style={{ padding: 10, alignItems: "center" }}>
      <SmoothPinCodeInput
        placeholder="?"
        mask={
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 25,
              backgroundColor: COLORS.lightScheme.primary,
            }}></View>
        }
        maskDelay={1000}
        password={true}
        cellStyle={{
          borderWidth: 1,
          borderRadius: 5,
          borderColor: COLORS.lightScheme.secondary,
        }}
        cellStyleFocused={null}
        value={value}
        onTextChange={code => handleChange(code)}
        onBackspace={() => {
          console.warn("hello")
        }}
      />
    </View>
  )
}

export default MpinComponent

const styles = StyleSheet.create({})
