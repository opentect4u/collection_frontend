import { useContext, useEffect, useState } from 'react'
import { Button, PixelRatio, ScrollView, StyleSheet, Text, TouchableOpacity, View, ToastAndroid } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { AppStore } from '../../Context/AppContext'
import CustomHeader from '../../Components/CustomHeader'
import { colors } from '../../Resources/colors'
import {
  Table,
  Rows,
  Row
} from 'react-native-table-component'
import axios from 'axios'
import { REACT_APP_BASE_URL } from '../../Config/config'
// import { Dropdown } from 'react-native-element-dropdown'

// const data = [
//   { label: 'Day Wise', value: 'D' },
//   { label: 'Type Wise', value: 'T' },
// ]

const ReportDay = () => {

  const { userId, bankId, branchCode } = useContext(AppStore)

  const [startingDate, setStartingDate] = useState(() => "From Date") // date in yyyy-mm-dd
  const [endingDate, setEndingDate] = useState(() => "To Date") // date in yyyy-mm-dd

  const [isStartingDatePickerVisible, setIsStartingDatePickerVisible] = useState(() => false)
  const [isEndingDatePickerVisible, setIsEndingDatePickerVisible] = useState(() => false)

  const [serialNo, setSerialNo] = useState(() => 0)
  const [dayScrollReportArray, setDayScrollReportArray] = useState(() => [])

  const [refreshing, setRefreshing] = useState(false)

  const showStartingDatePicker = () => {
    setIsStartingDatePickerVisible(true)
  }

  const showEndingDatePicker = () => {
    setIsEndingDatePickerVisible(true)
  }

  const hideStartingDatePicker = () => {
    setIsStartingDatePickerVisible(false)
  }

  const hideEndingDatePicker = () => {
    setIsEndingDatePickerVisible(false)
  }

  const handleConfirmPickedFromDate = date => {
    console.warn("PICKED DATE >>>>>>>>>>>", date)
    const modifiedFromDate = new Date(date).toISOString().slice(0, 10)
    setStartingDate(modifiedFromDate)
    hideStartingDatePicker()
  }

  const handleConfirmPickedToDate = date => {
    console.warn("PICKED DATE >>>>>>>>>>>", date)
    const modifiedToDate = new Date(date).toISOString().slice(0, 10)
    setEndingDate(modifiedToDate)
    hideEndingDatePicker()
  }


  const tableHead = ['Sl No.', 'Date', 'A/c Type', 'A/c No.', 'Name', 'Amount']
  let tableData = dayScrollReportArray

  const getReportsDayScroll = async () => {
    const obj = {
      bank_id: bankId,
      branch_code: branchCode,
      agent_code: userId,
      from_date: startingDate,
      to_date: endingDate
    }
    await axios.post(`${REACT_APP_BASE_URL}/user/day_scroll_report`, obj, {
      headers: {
        Accept: 'application/json'
      }
    }).then(res => {
      (res.data.success.msg).forEach((item, i) => {
        let rowArr = [i + 1, item.date, item.account_type, item.account_number, item.account_holder_name, item.deposit_amount]
        console.log("ITEMMM TABLEEE=====", rowArr)
        tableData.push(...[rowArr])
      })

      console.log("++++++ TABLE DATA ++++++++", tableData)
      setDayScrollReportArray(tableData)

    }).catch(err => {
      ToastAndroid.showWithGravityAndOffset(
        'Error occurred in the server',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
        25,
        50,
      )
      console.log(err.response.data)
    })
  }

  const handleSubmit = () => {
    tableData=[];
    getReportsDayScroll()
    
  }


  console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<",tableData)
  return (
    <View style={{ flex: 1 }}>
      <CustomHeader />
      <View style={{
        flex: 4,
        padding: 10,
        backgroundColor: colors.whiteT,
        margin: 20,
        borderRadius: 10,
      }}>
        <Text style={styles.todayCollection}>Day Scroll Report</Text>
        <View style={styles.dateWrapper}>
          <TouchableOpacity onPress={() => showStartingDatePicker()} style={styles.dateButton}>
            <Text>{startingDate}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => showEndingDatePicker()} style={styles.dateButton}>
            <Text>{endingDate}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isStartingDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmPickedFromDate}
            onCancel={hideStartingDatePicker}
          />
          <DateTimePickerModal
            isVisible={isEndingDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmPickedToDate}
            onCancel={hideEndingDatePicker}
          />
        </View>
        <View>
          <TouchableOpacity onPress={() => handleSubmit()} style={styles.dateButton}>
            <Text>SUBMIT</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {tableData && <Table
            borderStyle={{ borderWidth: 2, borderColor: colors.primary, borderRadius: 10 }}
            style={{ backgroundColor: colors.white }}>
            <Row data={tableHead} textStyle={styles.head} />
            <Rows data={tableData} textStyle={styles.text} />
          </Table>}
        </ScrollView>
      </View>
    </View>
  )
}

export default ReportDay

const styles = StyleSheet.create({
  dateWrapper: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    margin: 20
  },
  dateButton: {
    width: "40%",
    height: 40,
    borderWidth: 2,
    borderColor: colors.grey,
    backgroundColor: colors.light_green,
    margin: 15,
    borderRadius: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    margin: 6,
    color: colors.black,
    fontWeight: '400',
    fontSize: 10,
  },
  head: {
    margin: 6,
    color: colors.black,
    fontWeight: '900',
    fontSize: 10,
  },
  todayCollection: {
    backgroundColor: colors.secondary,
    color: colors.whiteT,
    fontWeight: '600',
    textAlign: 'center',
    fontSize: PixelRatio.roundToNearestPixel(22),
    padding: PixelRatio.roundToNearestPixel(5),
    marginBottom: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
})