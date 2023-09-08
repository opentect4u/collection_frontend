// import { View, Text, StyleSheet } from 'react-native'
// import CalendarPicker from 'react-native-calendar-picker'
// import { useState } from "react"

// const DateRangePicker = () => {

//     const [selectedStartDate, setSelectedStartDate] = useState(() => null)
//     const [selectedEndDate, setSelectedEndDate] = useState(() => null)

//     const onDateChange = (date, type) => {
//         if (type === "END_DATE") {
//             setSelectedEndDate(date)
//         } else {
//             setSelectedStartDate(date)
//             setSelectedEndDate(null)
//         }
//     }

//     const minDate = new Date(); // Today
//     const maxDate = new Date(2017, 6, 3);
//     const startDate = selectedStartDate ? selectedStartDate.toString() : '';
//     const endDate = selectedEndDate ? selectedEndDate.toString() : '';

//     return (
//         <View style={styles.container}>
//             <CalendarPicker
//                 startFromMonday={true}
//                 allowRangeSelection={true}
//                 minDate={minDate}
//                 maxDate={maxDate}
//                 todayBackgroundColor="#f2e6ff"
//                 selectedDayColor="#7300e6"
//                 selectedDayTextColor="#FFFFFF"
//                 onDateChange={onDateChange}
//             />

//             <View>
//                 <Text>SELECTED START DATE:{startDate}</Text>
//                 <Text>SELECTED END DATE:{endDate}</Text>
//             </View>
//         </View>
//     )
// }


// export default DateRangePicker
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#FFFFFF',
//         marginTop: 100,
//     },
// })