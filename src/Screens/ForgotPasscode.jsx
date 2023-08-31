import { StyleSheet, Text, View, PixelRatio, Image } from 'react-native'
import { useState, useEffect } from 'react'
import { colors } from '../Resources/colors'
import InputComponent from '../Components/InputComponent'
import { Strings } from '../Resources/Strings'
import DeviceInfo from 'react-native-device-info'
import ButtonComponent from '../Components/ButtonComponent'

const ForgotPasscode = ({ navigation }) => {
    const [deviceId, setDeviceID] = useState()
    const [passcode, changePasscode] = useState('')
    const [showPassWord, setShowPassword] = useState(false)

    function handleChangeShowPassWord() {
        setShowPassword(!showPassWord)
    }

    useEffect(() => {
        const uniqueId = DeviceInfo.getUniqueIdSync()
        setDeviceID(uniqueId)
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor }} >
        <View style={styles.logoContainer}>
            <Image
                source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/512px-Logo_of_Twitter.svg.png?20220821125553" }}
                style={styles.image}
                resizeMode='contain'
            />
            <View>
                {/* Wellcome gretting */}
                <Text style={styles.grettingText}>
                    WellCome To {"Demo"}
                </Text>
                {/* manual text */}
                <Text style={styles.manual}>
                    
                </Text>
            </View>
        </View>
            <View style={styles.mainContainer}>
                <View style={styles.logINcontainer} >
                    {/* Title */}
                    {
                        !showPassWord && <Text style={styles.title}>
                            Click on the Below Button To Generate new  Passcode
                        </Text>}
                    {
                        showPassWord && <Text style={styles.title}>
                            Your new Pin has been successfully generated and sent to your registered email address. Please check your inbox for the email containing your new passcode. If you do not receive the email within a few minutes, please check your spam or junk folder. Thank you for using our services
                        </Text>}

                    <View style={styles.buttonContainer}>
                        {!showPassWord && <ButtonComponent title={"Generate"} handleOnpress={() => handleChangeShowPassWord()} />}
                        {showPassWord && <ButtonComponent title={"Go Back"} handleOnpress={() => navigation.goBack()} />}
                    </View>




                </View>
            </View>

        </View>
    )
}

export default ForgotPasscode

const styles = StyleSheet.create({
    logoContainer: {
        flex: 2,
        backgroundColor: colors.secondaryBackground,
        borderBottomLeftRadius: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    grettingText: {
        fontSize: 18,
        color:colors.secondary,
        letterSpacing:1,
        fontWeight:'900'
    },
    manual:{
        fontSize: 14,
        color:colors.primary,
        letterSpacing:1,
        fontWeight:'900',
        alignSelf:'center'
    },
    mainContainer: {
        flex: 4,
    },
    logINcontainer: {
        backgroundColor: colors.white,
        margin: PixelRatio.roundToNearestPixel(10),
        padding: PixelRatio.roundToNearestPixel(10),
        borderRadius: PixelRatio.roundToNearestPixel(10),
        elevation: 20,
        shadowColor: 'rgba(0, 0, 0, 0.65)',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 3,


    },
    title: {
        textAlign: 'left',
        fontSize: 20,
        fontWeight: "900",
        color: colors.black,
        alignSelf: 'center',

        letterSpacing: 2,
        paddingHorizontal: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-around'
    },
  
})