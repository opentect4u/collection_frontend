import { useContext, useState } from 'react'
import { PixelRatio, ScrollView, StyleSheet, Text, TouchableOpacity, View, ToastAndroid, Modal } from 'react-native'
// import DateTimePickerModal from "react-native-modal-datetime-picker"
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
import DropdownComponent from '../../Components/DropdownComponent'
// import DateRangePicker from '../../Components/DateRangePicker'
// import Calandar from "react-native-calendars/src/calendar"
// import Calendar from "react-native-calendar-range-picker"
import CalendarPicker from 'react-native-calendar-picker'
import { Dropdown } from 'react-native-element-dropdown'

const ReportType = () => {

  const { userId, bankId, branchCode } = useContext(AppStore)

  // const [startingDate, setStartingDate] = useState(() => "From Date") // date in yyyy-mm-dd
  // const [endingDate, setEndingDate] = useState(() => "To Date") // date in yyyy-mm-dd

  // const [isStartingDatePickerVisible, setIsStartingDatePickerVisible] = useState(() => false)
  // const [isEndingDatePickerVisible, setIsEndingDatePickerVisible] = useState(() => false)

  const [typeWiseReportArray, setTypeWiseReportArray] = useState(() => [])
  const [accountType, setAccountType] = useState(() => "")

  const [showModal, setShowModal] = useState(() => false)
  const [selectedStartDate, setSelectedStartDate] = useState(() => new Date())
  const [selectedEndDate, setSelectedEndDate] = useState(() => new Date())

  const [focusDrop, setFocusDrop] = useState(() => false)

  const [totalAmount, setTotalAmount] = useState(() => 0)

  const startDate = selectedStartDate ? selectedStartDate.toISOString().slice(0, 10) : "";
  const endDate = selectedEndDate ? selectedEndDate.toISOString().slice(0, 10) : "";

  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setSelectedEndDate(date)
      setShowModal(false)
    } else {
      setSelectedStartDate(date)
      setSelectedEndDate(null)
    }
  }

  const renderLabel = () => {
    if (accountType || focusDrop) {
      return (
        <Text style={[styles.label, focusDrop && { color: 'blue' }]}>
          Select type
        </Text>
      )
    }
    return null
  }

  // const showStartingDatePicker = () => {
  //   setIsStartingDatePickerVisible(true)
  // }

  // const showEndingDatePicker = () => {
  //   setIsEndingDatePickerVisible(true)
  // }

  // const hideStartingDatePicker = () => {
  //   setIsStartingDatePickerVisible(false)
  // }

  // const hideEndingDatePicker = () => {
  //   setIsEndingDatePickerVisible(false)
  // }

  // const handleConfirmPickedFromDate = date => {
  //   console.warn("PICKED DATE >>>>>>>>>>>", date)
  //   const modifiedFromDate = new Date(date).toISOString().slice(0, 10)
  //   setStartingDate(modifiedFromDate)
  //   hideStartingDatePicker()
  // }

  // const handleConfirmPickedToDate = date => {
  //   console.warn("PICKED DATE >>>>>>>>>>>", date)
  //   const modifiedToDate = new Date(date).toISOString().slice(0, 10)
  //   setEndingDate(modifiedToDate)
  //   hideEndingDatePicker()
  // }

  const data = [
    { label: 'Daily', value: 'D' },
    { label: 'Loan', value: 'L' },
  ]


  const tableHead = ['Sl No.', 'Date', 'A/c No.', 'Name', 'Amount']
  let tableData = typeWiseReportArray

  const getReportsTypeScroll = async () => {
    const obj = {
      bank_id: bankId,
      branch_code: branchCode,
      agent_code: userId,
      from_date: startDate,
      to_date: endDate,
      account_type: accountType
    }
    let totalDepositedAmount = 0
    await axios.post(`${REACT_APP_BASE_URL}/user/type_wise_report`, obj, {
      headers: {
        Accept: 'application/json'
      }
    }).then(res => {
      (res.data.success.msg).forEach((item, i) => {
        let rowArr = [i + 1, item.date, item.account_number, item.account_holder_name, item.deposit_amount]
        totalDepositedAmount += item.deposit_amount
        console.log("ITEMMM TABLEEE=====", rowArr)
        tableData.push(...[rowArr])
      })

      setTotalAmount(totalDepositedAmount)
      console.log("++++++ TABLE DATA ++++++++", tableData)
      setTypeWiseReportArray(tableData)


      if (tableData.length === 0) {
        ToastAndroid.showWithGravityAndOffset(
          'NO DATA AVAILABLE',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
          25,
          50,
        )
      }

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
    tableData = []
    getReportsTypeScroll()
  }



  console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<", tableData)

  console.log("###################", accountType)
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
        <Text style={styles.todayCollection}>Type Wise Report</Text>
        <View style={styles.dateWrapper}>
          {/* <TouchableOpacity onPress={() => showStartingDatePicker()} style={styles.dateButton}>
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
          /> */}
          <TouchableOpacity onPress={() => setShowModal(true)} style={styles.dateButton}>
            <Text style={{color: "white"}}>Show Calendar</Text>
          </TouchableOpacity>
          <Modal visible={showModal} animationType='fade'>
            <View style={{
              flex: 1,
              backgroundColor: '#FFFFFF',
              margin: 20
            }}>
              <CalendarPicker
                startFromMonday={true}
                allowRangeSelection={true}
                todayBackgroundColor="tomato"
                selectedDayColor="dodgerblue"
                selectedDayTextColor="#FFFFFF"
                onDateChange={onDateChange}
              />
            </View>
          </Modal>
        </View>
        <View>
          <View>
            <Text style={{ fontSize: 20, fontWeight: 500 }}>From Date: {startDate}</Text>
            <Text style={{ fontSize: 20, fontWeight: 500 }}>To Date: {endDate}</Text>
          </View>
          {/* <DropdownComponent
            data={data}
            onFocus={() => setFocusDrop(true)}
            onBlur={() => setFocusDrop(false)}
            onChangeDrop={(value) => {
              setAccountType(value)
              setFocusDrop(false)
            }}>
            Select Type
          </DropdownComponent> */}

          <View style={styles.dropdownContainer}>
            {renderLabel()}
            <Dropdown
              style={[styles.dropdown, focusDrop && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!focusDrop ? 'Select type' : '...'}
              searchPlaceholder="Search..."
              value={accountType}
              onFocus={() => setFocusDrop(true)}
              onBlur={() => setFocusDrop(false)}
              onChange={item => {
                setAccountType(item.value)
                setFocusDrop(false)
              }}
            // renderLeftIcon={() => (
            //   <AntDesign
            //     style={styles.icon}
            //     color={isFocus ? 'blue' : 'black'}
            //     name="Safety"
            //     size={20}
            //   />
            // )}
            />
          </View>


          <TouchableOpacity onPress={() => handleSubmit()} style={styles.dateButton}>
            <Text style={styles.submitBtnTxt}>SUBMIT [{accountType}]</Text>
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
        <Text>Total Amount: {totalAmount}</Text>
      </View>
    </View>
  )
}

export default ReportType

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
    backgroundColor: "dodgerblue",
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
  dropdownContainer: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  submitBtnTxt: {
    color: "white"
  }
})