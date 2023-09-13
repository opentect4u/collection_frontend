import { StyleSheet, Text, View, PixelRatio, ScrollView, RefreshControl } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { useState, useEffect, useContext, useCallback } from 'react'

import {
  Table,
  Rows,
} from 'react-native-table-component'
import { colors } from '../../Resources/colors'
import CustomHeader from '../../Components/CustomHeader'
import { AppStore } from '../../Context/AppContext'
// import { useIsFocused } from '@react-navigation/native';
const Home = ({ navigation }) => {

  const { userId, agentName, bankName, branchName, totalCollection, getTotalDepositAmount, login } = useContext(AppStore)

  const [currentDateTime, setCurrentDateTime] = useState(new Date())

  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  let tableData = [
    ['Bank', bankName],
    ['Branch', branchName],
    ['Agent Code', userId],
    ['Agent Name', agentName],
    ['Date', currentDateTime.toLocaleDateString()],
    ['Time', currentDateTime.toLocaleTimeString()],
    ['Total Collection', totalCollection.toFixed(2)],
  ]

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    getTotalDepositAmount()
    setTimeout(() => {
      setRefreshing(false)
      login()
    }, 2000)
  }, [])

  // useFocusEffect(() => {
  //   setRefreshing(true)
  //   getTotalDepositAmount()
  //   setTimeout(() => {
  //     setRefreshing(false)
  //     login()
  //   }, 2000)
  // }, [])

  // const isFocused = useIsFocused()
  // useEffect(() => {
  //   if (isFocused) {
  //     // getTotalDe123positAmount()
  //     onRefresh()
  //   }
  // }, [navigation.isFocused()])

  // useEffect(() => {
  //   const focusEvent = navigation.addListener('focus', () => {
  //     onRefresh()
  //   })
  //   // Return the function to unsubscribe from the event so it gets removed on unmount
  //   return () => focusEvent
  // }, [navigation])

  useFocusEffect(

    useCallback(() => {

      // alert('Screen was focused')
      setRefreshing(true)
      getTotalDepositAmount()
      setTimeout(() => {
        setRefreshing(false)
        login()
      }, 2000)

      return () => {
        // alert('Screen was unfocused')
        // // Useful for cleanup functions
      }
    }, [])
  )


  return (
    <>
      <View style={{ flex: 1 }}>
        <CustomHeader />

        <View style={styles.logoContainer}>
          <View style={{ width: '100%' }}>
            {/* Welcome gretting */}
            <Text style={styles.grettingText}>Welcome To {"Data Bank"}</Text>
            {/* manual text */}
            <Text style={styles.manual}>Hello, {agentName}</Text>
          </View>
        </View>


        <View
          style={{
            flex: 4,
            padding: 10,
            backgroundColor: colors.whiteT,
            margin: 20,
            borderRadius: 10,
          }}>
          <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
            <Text style={styles.todayCollection}>Agent Information</Text>
            <Table
              borderStyle={{ borderWidth: 2, borderColor: colors.primary, borderRadius: 10 }}
              style={{ backgroundColor: colors.white }}>
              <Rows data={tableData} textStyle={styles.text} />
            </Table>
          </ScrollView>
        </View>


      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: {
    margin: 6,
    color: colors.black,
    fontWeight: '400',
    fontSize: 18,
  },
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
    fontSize: 20,
    color: colors.secondary,
    letterSpacing: 1,
    fontWeight: '900',
    alignSelf: 'center',
  },
  manual: {
    fontSize: 16,
    color: colors.primary,
    letterSpacing: 1,
    fontWeight: '900',
    alignSelf: 'center',
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
