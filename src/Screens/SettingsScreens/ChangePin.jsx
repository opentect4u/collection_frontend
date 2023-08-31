import { StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import MpinComponent from '../../Components/MpinComponent'
import ButtonComponent from '../../Components/ButtonComponent'
import CustomHeader from '../../Components/CustomHeader'
import { colors } from '../../Resources/colors'

const ChangePin = () => {
  const [passCode, changePasscode] = useState()
  const [newPassCode, setNewPassCode] = useState()
  const [confirmNewPasscode, setConfirmNewPasscode] = useState()
  return (
    <View>
      <CustomHeader />
      <Text style={styles.title}>CHANGE YOUR M-PIN</Text>
      <View style={styles.pinContainer}>
        <Text style={{color: colors.tertiary}} android={{textColor: colors.tertiary}}>Old Pin</Text>
        <MpinComponent value={passCode} handleChange={changePasscode} />
      </View>
      <View style={styles.pinContainer}>
        <Text style={{color: colors.tertiary}}>New Pin Pin</Text>
        <MpinComponent value={newPassCode} handleChange={setNewPassCode} />
      </View>
      <View style={styles.pinContainer}>
        <Text style={{color: colors.tertiary}}>Confirm Pin</Text>
        <MpinComponent value={confirmNewPasscode} handleChange={setConfirmNewPasscode} />
      </View>
      <ButtonComponent title={"CHANGE NOW"} customStyle={{ margin: 10, }} />
    </View>
  )
}

export default ChangePin

const styles = StyleSheet.create({
  pinContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    color: colors.tertiary,
    fontSize: 20,
    fontWeight: '900',
    textDecorationLine: 'underline',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
})