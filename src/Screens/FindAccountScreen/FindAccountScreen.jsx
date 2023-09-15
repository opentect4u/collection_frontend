import { AppState, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useContext, useEffect, useState } from 'react'
import CustomHeader from '../../Components/CustomHeader'
import { COLORS, colors } from '../../Resources/colors'
import InputComponent from '../../Components/InputComponent'
import SearchCard from '../../Components/SearchCard'
import axios from 'axios'
import { REACT_APP_BASE_URL } from '../../Config/config'
import { AppStore } from '../../Context/AppContext'

const FindAccountScreen = ({ navigation }) => {

  const [searchValue, changeSearchValue] = useState(() => '')
  const [userBankDetails, setUserBankDetails] = useState(() => [])

  const { userId, bankId, branchCode } = useContext(AppStore)

  function handleAccountSearch() {
    if (!searchValue) {
      return;
    }
    fetchBankDetails()
  }

  useEffect(() => {
    handleAccountSearch()
    console.log(userBankDetails)
  }, [searchValue])

  const fetchBankDetails = async () => {
    const obj = { bank_id: bankId, branch_code: branchCode, agent_code: userId, account_number: searchValue }
    console.log(bankId, branchCode, userId, searchValue)
    console.log(userBankDetails)

    await axios.post(`${REACT_APP_BASE_URL}/user/search_account`, obj, {
      headers: {
        Accept: 'application/json',
      }
    }).then(res => {
      console.log("bank details", res.data.success.msg)
      setUserBankDetails(res.data.success.msg)
    }).catch(err => {
      console.log(err)
    })
  }


  return (
    <View>
      <CustomHeader />
      <View style={styles.container}>
        {/* Account Cards */}

        <ScrollView style={{ maxHeight: "70%" }} keyboardShouldPersistTaps='handled'>
          {userBankDetails &&
            userBankDetails?.map((props, index) => {
              console.log("========================", props)
              return <SearchCard item={props} index={index} navigation={navigation} />
            }
            )}
        </ScrollView>
        {/* Search Component */}
        <View style={styles.searchContainer}>
          <InputComponent
            label={'Account No. / Name'}
            placeholder={'Enter Account No. / Name'}
            value={searchValue}
            handleChange={changeSearchValue}
          />
        </View>
      </View>
    </View>
  );
};

export default FindAccountScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightScheme.backgroundk,
    height: '100%',
    padding: 10,
  },
  searchContainer: {
    position: 'absolute',
    bottom: 130,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: COLORS.lightScheme.tertiaryContainer,
    padding: 10,
    borderRadius: 10,
  },
});
