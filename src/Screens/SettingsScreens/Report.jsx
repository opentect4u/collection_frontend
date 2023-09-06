import { useContext, useEffect, useState } from 'react'
import { Button, PixelRatio, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { AppStore } from '../../Context/AppContext'
import CustomHeader from '../../Components/CustomHeader'
import { colors } from '../../Resources/colors'
import {
  Table,
  Rows,
  Row
} from 'react-native-table-component'
// import { Dropdown } from 'react-native-element-dropdown'

// const data = [
//   { label: 'Day Wise', value: 'D' },
//   { label: 'Type Wise', value: 'T' },
// ]

const Report = () => {

  const { userId, agentName, bankName, branchName, totalCollection } = useContext(AppStore)

  const [currentDateTime, setCurrentDateTime] = useState(new Date())

  // const [date, setDate] = useState(() => new Date())
  const [isStartingDatePickerVisible, setIsStartingDatePickerVisible] = useState(() => false)
  const [isEndingDatePickerVisible, setIsEndingDatePickerVisible] = useState(() => false)

  const showStartingDatePicker = () => {
    setIsStartingDatePickerVisible(true)
  }

  const hideStartingDatePicker = () => {
    setIsStartingDatePickerVisible(false)
  }

  const handleConfirmPickedDate = date => {
    console.warn("PICKED DATE >>>>>>>>>>>", date)
    hideStartingDatePicker()
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // const [mydateFrom, setDateFrom] = useState(new Date())
  // const [displaymodeFrom, setModeFrom] = useState('date')

  // const changeSelectedDateFrom = (event, selectedDate) => {
  //   const currentDate = selectedDate || mydateFrom;
  //   setDateFrom(currentDate)
  // }






  // const tableData = [
  //   ['Sl No.', bankName],
  //   ['Branch', branchName],
  //   ['Agent Code', userId],
  //   ['Agent Name', agentName],
  //   ['Date', currentDateTime.toLocaleDateString()],
  //   ['Time', currentDateTime.toLocaleTimeString()],
  //   ['Total Collection', totalCollection.toFixed(2)],
  // ]

  const tableHead = ['Sl No.', 'Date', 'A/c Type', 'A/c No.', 'Name', 'Amount']
  const tableData = [
    ['1', '12-9-2023', 'D', '11001', 'Soumyadeep', '500'],
    ['1', '12-9-2023', 'D', '11001', 'Soumyadeep', '500'],
    ['1', '12-9-2023', 'D', '11001', 'Soumyadeep', '500'],
    ['1', '12-9-2023', 'D', '11001', 'Soumyadeep', '500'],
    ['1', '12-9-2023', 'D', '11001', 'Soumyadeep', '500'],
  ]

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity onPress={() => showStartingDatePicker()} style={{ width: "50%", height: 50, borderWidth: .5, borderRadius: 20, alignSelf: "center", justifyContent: "center", alignItems: "center" }}>
          <Text>Select Starting Date</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: "50%", height: 50, borderWidth: .5, borderRadius: 20, alignSelf: "center", justifyContent: "center", alignItems: "center" }}>
          <Text>Select Ending Date</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isStartingDatePickerVisible}
          mode="date"
          onConfirm={handleConfirmPickedDate}
          onCancel={hideStartingDatePicker}
        />
      </View>

      <View style={{
        flex: 4,
        padding: 10,
        backgroundColor: colors.whiteT,
        margin: 20,
        borderRadius: 10,
      }}>
        <ScrollView>
          <Text style={styles.todayCollection}>Reports</Text>
          <Table
            borderStyle={{ borderWidth: 2, borderColor: colors.primary, borderRadius: 10 }}
            style={{ backgroundColor: colors.white }}>
            <Row data={tableHead} textStyle={styles.head} />
            <Rows data={tableData} textStyle={styles.text} />
          </Table>
        </ScrollView>
      </View>
    </View>
  )
}

export default Report

const styles = StyleSheet.create({
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