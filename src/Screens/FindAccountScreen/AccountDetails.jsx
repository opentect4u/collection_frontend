import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Modal,
  Alert,
  Pressable,
  ToastAndroid,
} from 'react-native';
import { useContext, useState, useEffect } from 'react'
import { COLORS, colors } from '../../Resources/colors'
import CustomHeader from '../../Components/CustomHeader'
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from 'react-native-table-component'
import InputComponent from '../../Components/InputComponent'
import ButtonComponent from '../../Components/ButtonComponent'
import mainNavigationRoutes from '../../Routes/NavigationRoutes'
import { AppStore } from '../../Context/AppContext';
const AccountDetails = ({ navigation, route }) => {
  const [collectionMoney, setCollectionMoney] = useState(() => 0)
  const { modifiedAt, todayDateFromServer, holidayLock, getFlagsRequest, collectionFlag, endFlag } = useContext(AppStore)

  const { item } = route.params;

  const tableData = [
    ['Account Type', (item?.acc_type == 'D') ? "Daily" : (item?.acc_type == 'R') ? "RD" : (item?.acc_type == 'L') ? "Loan" : ""],
    ['Account No.', item?.account_number],
    ['Name', item?.customer_name],
    ['Openning date', new Date(item?.opening_date).toLocaleDateString()],
    ['Current Balance', item?.current_balance],
  ]

  useEffect(() => {
    getFlagsRequest()
  }, [])

  const handlePreviewData = () => {

    if (!collectionMoney || collectionMoney == 0) {
      ToastAndroid.showWithGravityAndOffset(
        'Please Add Some Ammount',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
        25,
        50,
      );
      return;
    }
    // setCollectionMoney(0)
    navigation.navigate(mainNavigationRoutes.accountPreview, {
      item: item,
      money: collectionMoney,
    })
  }

  const checkHolidayLock = () => {
    let currentDate = new Date(todayDateFromServer.toISOString().slice(0, 10))
    console.log("CURRRRR DATEE", currentDate)
    let modifiedAtDate = new Date(modifiedAt.toISOString().slice(0, 10))
    console.log("MODDDD DATE", modifiedAtDate)
    let newModifiedDate = new Date()

    // let afterAddingHolidayLockDays = modifiedAtDate.getDate() + 1
    newModifiedDate.setDate(modifiedAtDate.getDate() + holidayLock)
    console.log(holidayLock)

    return newModifiedDate > currentDate
  }

  console.log(checkHolidayLock())



  const checkIsCollectionEnded = () => {
    if (collectionFlag == "Y" && endFlag == "N") return false
    else if (collectionFlag == "N" && endFlag == "Y") return true
  }

  return (
    <View>
      <CustomHeader />
      <View
        style={{
          backgroundColor: COLORS.lightScheme.background,
          height: '100%',
          padding: 10,
        }}>
        <ScrollView keyboardShouldPersistTaps={'handled'}>
          <Text style={styles.info}>Account Info</Text>
          {/* Table Component */}
          <View style={styles.tableConatiner}>
            <Table
              borderStyle={{ borderWidth: 2, borderColor: COLORS.lightScheme.onTertiaryContainer }}
              style={{ backgroundColor: COLORS.lightScheme.onPrimary }}>
              <Rows data={tableData} textStyle={styles.text} />
            </Table>
          </View>
          {/* Input Field */}
          <View style={styles.inputContainer}>
            <InputComponent
              keyboardType={'numeric'}
              placeholder={'Enter Valid Amount'}
              label={'Collection Ammount'}
              value={collectionMoney}
              handleChange={setCollectionMoney}
            />
            <View style={styles.buttonContainer}>
              <ButtonComponent
                title={'Back'}
                customStyle={{
                  marginTop: 10,
                  backgroundColor: COLORS.lightScheme.error,
                  width: '30%',
                }}
                handleOnpress={() => {
                  setCollectionMoney(0)
                  navigation.goBack()
                }}
              />


              {
                (checkHolidayLock() || checkIsCollectionEnded()) ? (
                  <ButtonComponent
                    title={'Preview / Save'}
                    customStyle={{ marginTop: 10, width: '60%' }}
                    handleOnpress={handlePreviewData}
                  />

                ) : (
                  <ButtonComponent
                    title={'Preview / Save'}
                    customStyle={{ marginTop: 10, width: '60%' }}
                    handleOnpress={handlePreviewData}
                    disabled={true}
                  />
                )
              }

              {/* <ButtonComponent
              title={'Preview / Save'}
              customStyle={{ marginTop: 10, width: '60%' }}
              handleOnpress={handlePreviewData}
            /> */}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default AccountDetails;

const styles = StyleSheet.create({
  text: {
    margin: 6,
    color: COLORS.lightScheme.onBackground,
    fontWeight: '400',
    fontSize: 18,
  },
  info: {
    color: COLORS.lightScheme.primary,
    textAlign: 'center',
    fontSize: 22,
    letterSpacing: 5,
    backgroundColor: COLORS.darkScheme.onSecondaryContainer,
    borderRadius: 5,
    marginBottom: 5,
    paddingVertical: 5,
    fontWeight: '600',
  },
  inputContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: COLORS.lightScheme.secondaryContainer,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  tableConatiner: {
    padding: 10,
    backgroundColor: COLORS.lightScheme.onPrimary,
    borderRadius: 5,
  },
});
