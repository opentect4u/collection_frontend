import { StyleSheet, Text, View, TextInput, PixelRatio, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, colors } from '../Resources/colors'
import hide from '../Resources/Images/Icons/hide.png'

const InputComponent = ({ handleChange, value, placeholder, label, readOnly = false, textHide = false, handlePasswordShow, keyboardType="default", autoFocus = true }) => {
    return (
        <View>
            {label && <Text style={styles.label}>
                {label}
            </Text>}
            <TextInput
                style={styles.input}
                onChangeText={handleChange}
                value={value}
                placeholder={placeholder}
                placeholderTextColor={COLORS.lightScheme.secondary}
                readOnly={readOnly}
                keyboardType={keyboardType}
                secureTextEntry={textHide}
                autoFocus={autoFocus}
            />
            {handlePasswordShow && <TouchableOpacity style={styles.imageContainer} onPress={handlePasswordShow}>
                {textHide ? <Image source={hide} style={styles.image} /> : <Image source={hide} style={styles.image} />}
            </TouchableOpacity>}
        </View>
    )
}

export default InputComponent

const styles = StyleSheet.create({
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: COLORS.lightScheme.primary,
        borderRadius: PixelRatio.roundToNearestPixel(20),
        paddingHorizontal: 10,
        paddingVertical: 15,
        color: COLORS.lightScheme.onSurface,
        fontSize: 22,
        fontWeight: "bold"
    },
    label: {
        marginTop:5,
        paddingHorizontal: PixelRatio.roundToNearestPixel(5),
        paddingBottom: PixelRatio.roundToNearestPixel(5),
        fontSize: PixelRatio.roundToNearestPixel(16),
        color: COLORS.lightScheme.primary,
        fontWeight: '600',
        letterSpacing:2
    },
    imageContainer: {
        position: 'absolute',
        bottom: PixelRatio.roundToNearestPixel(15),
        right: PixelRatio.roundToNearestPixel(10)
    },
    image: {
        height: 20,
        width: 20,
    }
})