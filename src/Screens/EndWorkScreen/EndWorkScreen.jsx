import { StyleSheet, Text, View, ScrollView, ToastAndroid } from 'react-native'
import { useCallback, useContext, useState } from 'react'
import CustomHeader from '../../Components/CustomHeader'
import { COLORS, colors } from '../../Resources/colors'
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from 'react-native-table-component'
import ButtonComponent from '../../Components/ButtonComponent'
import MpinComponent from '../../Components/MpinComponent'
import { AppStore } from '../../Context/AppContext'
import axios from 'axios'
import { REACT_APP_BASE_URL } from "../../Config/config"
import { StackActions, useFocusEffect } from '@react-navigation/native'

const EndWorkScreen = ({ navigation }) => {
  const [isButtonEnabled, setIsButtonEnabled] = useState(() => false)
  const [endScreenPassword, setEndScreenPassword] = useState(() => "")
  const { userId, agentName, passcode, deviceId, bankId, branchCode, totalCollection, receiptNumber, maximumAmount } = useContext(AppStore)


  const tableData = [
    ['Agent Code', userId],
    ['Agent Name', agentName],
    ['Branch Code', branchCode],
    ['Max Collection', maximumAmount],
    ['Today Collection', totalCollection],
    ['Remaing Collection', maximumAmount - totalCollection],
  ]



  const endCollection = async () => {
    const obj = { user_id: userId, password: passcode, device_id: deviceId, bank_id: bankId, branch_code: branchCode, agent_code: userId, coll_flag: "Y" }
    console.log("XXX===========DDDDD", obj)
    await axios.post(`${REACT_APP_BASE_URL}/user/end_collection`, obj, {
      headers: {
        Accept: 'application/json',
      }
    }).then(res => {
      // console.log("###### Preview: ", res.data)
      alert("Your work has been submitted.")
      ToastAndroid.showWithGravityAndOffset(
        "Your work has been submitted.",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
        25,
        50,
      )
      setIsButtonEnabled(!isButtonEnabled)
    }).catch(err => {
      console.log("############", err.response.data)
      ToastAndroid.showWithGravityAndOffset(
        "You can not resubmit your data.",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
        25,
        50,
      )
    })
  }

  const handleEndWorkButton = () => {
    try {
      if (endScreenPassword === passcode) {
        endCollection()
        // setIsButtonEnabled(true)
        setEndScreenPassword("")
      } else {
        alert('Invalid Password')
      }
    } catch (error) {
      console.log(error)
      setEndScreenPassword("")
    }
  }


  // {
  //   <View style={styles.logoContainer}>
  //       <View style={{ width: '100%' }}>
  //         {/* Wellcome gretting */}
  //         <Text style={styles.grettingText}>Welcome To {'Data Bank'}</Text>
  //         {/* manual text */}
  //         <Text style={styles.manual}>Hello,{agentName}</Text>
  //       </View>
  //     </View>
  // } after CustomerHeader


  const popAction = StackActions.popToTop()

  useFocusEffect(
    useCallback(() => {
      // alert('Screen was focused')
      navigation.dispatch(popAction)

      return () => {
        // alert('Screen was unfocused')
        // // Useful for cleanup functions
      }
    }, [])
  )


  return (
    <View style={{ flex: 1 }}>
      <CustomHeader />

      <View >
        <View
          style={{
            padding: 10,
            backgroundColor: COLORS.lightScheme.onPrimary,
            margin: 20,
            borderRadius: 10,
            justifyContent: 'center',
            alignContent: "center"
          }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <Text style={styles.todayCollection}>Today's Collections</Text>
            <Table
              borderStyle={{ borderWidth: 1, borderColor: COLORS.lightScheme.tertiary }}
              style={{ backgroundColor: COLORS.lightScheme.onPrimary }}>
              <Rows data={tableData} textStyle={styles.text} />
            </Table>
            <MpinComponent value={endScreenPassword} handleChange={setEndScreenPassword} />
            <ButtonComponent title={"End Work"} customStyle={{ marginTop: 10 }} handleOnpress={handleEndWorkButton} disabled={isButtonEnabled} />
          </ScrollView>
        </View>

      </View>
    </View>
  );
};

export default EndWorkScreen;

const styles = StyleSheet.create({
  // logoContainer: {
  //   flex: 2,
  //   backgroundColor: COLORS.darkScheme.onSurface,
  //   borderBottomLeftRadius: 50,
  //   borderBottomRightRadius: 50,
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   paddingHorizontal: 20,
  // },
  // grettingText: {
  //   fontSize: 20,
  //   color: COLORS.lightScheme.primary,
  //   letterSpacing: 1,
  //   fontWeight: '900',
  //   alignSelf: 'center',
  // },
  // manual: {
  //   fontSize: 16,
  //   color: COLORS.darkScheme.surface,
  //   letterSpacing: 1,
  //   fontWeight: '900',
  //   alignSelf: 'center',
  // },
  text: {
    margin: 6,
    color: COLORS.lightScheme.onPrimaryContainer,
    fontWeight: '400',
    fontSize: 18,
    letterSpacing: 1
  },
  todayCollection: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 20
  }
});
