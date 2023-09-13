import {
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Image,
  ToastAndroid
} from 'react-native';
import { useState, useEffect, useContext } from 'react'
import { colors } from '../Resources/colors'
import InputComponent from '../Components/InputComponent'
import { Strings } from '../Resources/Strings'
import ButtonComponent from '../Components/ButtonComponent'
import mainNavigationRoutes from '../Routes/NavigationRoutes'
import { AppStore } from '../Context/AppContext'
import SmoothPinCodeInput from 'react-native-smooth-pincode-input'
import HeaderImage from "../Resources/Images/logo_cut.png"

const LogInScreen = ({ navigation }) => {
  const { isLogin, login, userId, agentName, getUserId, deviceId, setDeviceId, passcode, setPasscode, next, setNext } = useContext(AppStore)

  useEffect(() => {
    console.log(passcode)
  }, [passcode])

  const handlePressOnFirstScreen = () => {
    if (userId) {
      setNext(true)
    } else {
      setNext(false)
      ToastAndroid.showWithGravityAndOffset(
        'We encountered some error on server.',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
        25,
        50,
      )
    }
  }

  useEffect(() => {
    getUserId()
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: colors.whiteT }}>
      <View style={styles.logoContainer}>
        <Image
          source={HeaderImage}
          style={styles.image}
          resizeMode="contain"
        />
        <View>
          {/* Wellcome gretting */}
          <Text style={styles.grettingText}>Welcome to {'Data Bank'}</Text>
          {/* manual text */}
          <Text style={styles.manual}>Login with your pin</Text>
        </View>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.logINcontainer}>
          {/* Title */}
          <Text style={styles.title}>LOGIN</Text>

          {!next && (
            <View>
              {/* DeviceId */}
              {!userId && (
                <InputComponent
                  // handleChange={() => { }}
                  value={deviceId ? deviceId : 'Fetching ID...'}
                  placeholder={Strings.loginPlaceHolder}
                  label={'Device ID'}
                  readOnly={true}
                />
              )}
              {/* Agent ID */}
              <InputComponent
                // handleChange={handlePressOnFirstScreen}
                value={userId ? userId : "Fetching ID..."}
                placeholder={`${userId}`}
                label={'Agent ID'}
                readOnly={true}
              />
              {/* <InputComponent
                // handleChange={handlePressOnFirstScreen}
                value={agentName ? agentName : "Fetching Username..."}
                placeholder={`${agentName}`}
                label={'Agent Name'}
                readOnly={true}
              /> */}

              <View style={styles.buttonContainer}>
                <ButtonComponent
                  title={'Next'}
                  handleOnpress={() => handlePressOnFirstScreen()}
                  customStyle={{ width: "80%" }}
                />
              </View>
            </View>
          )}

          {next && (
            <View>
              {/* Passcode */}
              <View style={{ padding: 10, alignItems: 'center' }}>
                <SmoothPinCodeInput
                  autoFocus={true}
                  placeholder="?"
                  mask={
                    <View
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 25,
                        backgroundColor: colors.primary,
                      }}></View>
                  }
                  maskDelay={1000}
                  password={true}
                  cellStyle={{
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: colors.secondary,
                  }}
                  cellStyleFocused={null}
                  value={passcode}
                  onTextChange={code => setPasscode(code)}
                  onBackspace={() => {
                    console.warn('hello')
                  }}
                />
              </View>

              {/* Forgot Pin */}
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(mainNavigationRoutes.forgotPasscode)
                }>
                <Text style={styles.resetText}>Forgot Pin?</Text>
              </TouchableOpacity>
              <View style={styles.buttonContainer}>
                <ButtonComponent
                  title={'Back'}
                  handleOnpress={() => {
                    setNext(!next)
                  }}
                  customStyle={{
                    marginTop: 10,
                    backgroundColor: colors.danger,
                    width: '40%',
                  }}
                />
                <ButtonComponent
                  title={'Submit'}
                  handleOnpress={() => {
                    login()
                    console.log(isLogin)
                  }}
                  customStyle={{ marginTop: 10, width: '40%' }}
                />
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default LogInScreen;

const styles = StyleSheet.create({
  logoContainer: {
    flex: 2,
    backgroundColor: colors.secondaryBackground,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  grettingText: {
    fontSize: 18,
    color: colors.secondary,
    letterSpacing: 1,
    fontWeight: '900',
  },
  manual: {
    fontSize: 14,
    color: colors.primary,
    letterSpacing: 1,
    fontWeight: '900',
    alignSelf: 'center',
  },

  mainContainer: {
    flex: 4,
  },
  logINcontainer: {
    width: '100%',
    backgroundColor: colors.whiteT,

    padding: PixelRatio.roundToNearestPixel(10),
    borderRadius: PixelRatio.roundToNearestPixel(10),
    shadowColor: colors.secondary,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
    position: 'absolute',
    bottom: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '900',
    color: colors.white,
    // alignSelf: 'center',
    letterSpacing: 4,
    backgroundColor: colors.primary,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderTopLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  buttonContainer: {
    width: "100px",
    marginVertical: 5,
    padding: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  resetText: {
    textAlign: 'center',
    color: colors.primary,
    fontSize: 16,
    alignSelf: 'flex-end',
    paddingHorizontal: 6,
    letterSpacing: 1,
    marginTop: 10,
    fontWeight: '700',
  },
  image: {
    width: 80,
    height: 50,
  },
});
