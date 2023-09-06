import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native'
import { useContext, useEffect, useState } from "react"
import { colors } from '../../Resources/colors'
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
import axios from 'axios'
import { AppStore } from '../../Context/AppContext'
import { REACT_APP_BASE_URL } from "../../Config/config"
import mainNavigationRoutes from '../../Routes/NavigationRoutes'

const AccountPreview = ({ navigation, route }) => {

  const [receiptNumber, setReceiptNumber] = useState(() => "")

  const { userId, getTotalDepositAmount, totalDepositedAmount } = useContext(AppStore)
  const { item, money } = route.params

  // const [addedMoney, setAddedMoney] = useState(() => 0)

  const tableData = [
    ['A/c Type', (item?.acc_type == 'D') ? "Daily" : (item?.acc_type == 'R') ? "RD" : (item?.acc_type == 'L') ? "Loan" : ""],
    ['A/c No.', item?.account_number],
    ['Name', item?.customer_name],
    ['Openning date', new Date(item?.opening_date).toLocaleDateString()],
    ['Previous Balance', item?.current_balance],
    ['Deposited Ammount', money],
    ['Total Balance', item?.current_balance + parseFloat(money)],
  ];

  const sendCollectedMoney = async () => {
    const obj = { bank_id: item?.bank_id, branch_code: item?.branch_code, agent_code: userId, account_holder_name: item?.customer_name, transaction_date: new Date().toISOString(), account_type: item?.acc_type, product_code: item?.product_code, account_number: item?.account_number, deposit_amount: parseFloat(money), collection_by: userId }
    console.log("===========", obj)
    await axios.post(`${REACT_APP_BASE_URL}/user/transaction`, obj, {
      headers: {
        Accept: 'application/json'
      }
    }).then(res => {
      console.log("###### Preview: ", res.data)
      alert(`Receipt No is ${res.data.receipt_no}`)
      setReceiptNumber(res.data.receipt_no)
      navigation.navigate(mainNavigationRoutes.home)
    }).catch(err => {
      console.log(err.response.data)
    })
  }

  // useEffect(() => {
  //   getTotalDepositAmount()
  // }, [])


  // const sendFinalCollectedMoney = () => {
  //   getTotalDepositAmount()

  //   console.log("Total Deposited Amount", totalDepositedAmount)
  // }

  return (
    <View>
      <CustomHeader />
      <View
        style={{
          backgroundColor: colors.secondaryBackground,
          height: '100%',
          padding: 10,
        }}>
        <ScrollView>
          <Text style={styles.info}>Preview</Text>
          {/* Table Component */}
          <View style={styles.tableConatiner}>
            <Table
              borderStyle={{ borderWidth: 2, borderColor: colors.primary }}
              style={{ backgroundColor: colors.white }}>
              <Rows data={tableData} textStyle={styles.text} />
            </Table>
          </View>
          {/* Input Field */}
          <View style={styles.buttonContainer}>
            <ButtonComponent
              title={'Back'}
              customStyle={{
                marginTop: 10,
                backgroundColor: colors.primary,
                width: '40%',
              }}
              handleOnpress={() => {
                navigation.goBack();
              }}
            />
            <ButtonComponent
              title={'Save'}
              customStyle={{ marginTop: 10, width: '40%' }}
              handleOnpress={() => {
                sendCollectedMoney()
              }}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default AccountPreview;

const styles = StyleSheet.create({
  text: {
    margin: 6,
    color: colors.black,
    fontWeight: '400',
    fontSize: 18,
  },
  info: {
    color: colors.secondary,
    textAlign: 'center',
    fontSize: 22,
    letterSpacing: 5,
    backgroundColor: colors.white,
    borderRadius: 5,
    marginBottom: 5,
    paddingVertical: 5,
    fontWeight: '600',
  },
  buttonContainer: {
    marginVertical: 10,
    padding: 10,
    paddingTop: -5,
    backgroundColor: colors.whiteT,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tableConatiner: {
    padding: 10,
    backgroundColor: colors.whiteT,
    borderRadius: 5,
  },
});
