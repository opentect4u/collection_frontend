import { StyleSheet, Text, ToastAndroid, View } from 'react-native'
import { useState } from 'react'
import MpinComponent from '../../Components/MpinComponent'
import ButtonComponent from '../../Components/ButtonComponent'
import CustomHeader from '../../Components/CustomHeader'
import { colors } from '../../Resources/colors'

const ChangePin = () => {
  const [passCode, changePasscode] = useState(() => '')
  const [newPassCode, setNewPassCode] = useState(() => '')
  const [confirmNewPasscode, setConfirmNewPasscode] = useState(() => '')

  const handleChangePassword = () => {
    if (newPassCode !== confirmNewPasscode) {
      ToastAndroid.showWithGravityAndOffset(
        'Confirm Password must be as New Passowrd.',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
        25,
        50,
      )
    } else {
      ToastAndroid.showWithGravityAndOffset(
        'Password Changed Successfully.',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
        25,
        50,
      )
    }
  }


  return (
    <>
      <View style={{ flex: 1 }}>
        <CustomHeader />
        <View
          style={{
            flex: 4,
            padding: 10,
            backgroundColor: colors.whiteT,
            margin: 20,
            borderRadius: 10,
          }}>

          <View>
            <View style={styles.headerText}>
            <Text style={styles.title}>CHANGE YOUR M-PIN</Text>
            </View>
            <View style={styles.pinContainer}>
              <Text style={{ color: colors.tertiary }}>Old Pin</Text>
              <MpinComponent value={passCode} handleChange={changePasscode} />
            </View>
            <View style={styles.pinContainer}>
              <Text style={{ color: colors.tertiary }}>New Pin</Text>
              <MpinComponent value={newPassCode} handleChange={setNewPassCode} />
            </View>
            <View style={styles.pinContainer}>
              <Text style={{ color: colors.tertiary }}>Confirm Pin</Text>
              <MpinComponent value={confirmNewPasscode} handleChange={setConfirmNewPasscode} />
            </View>
            <ButtonComponent title={"CHANGE NOW"} customStyle={{ margin: 10, }} handleOnpress={handleChangePassword} />
          </View>

        </View>


      </View>
    </>
  )
}

export default ChangePin

const styles = StyleSheet.create({
  headerText: {
    backgroundColor: colors.secondaryBackground,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20
  },
  pinContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    color: "dodgerblue",
    fontSize: 20,
    fontWeight: '900',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
})
