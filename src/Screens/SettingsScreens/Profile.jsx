import { Image, StyleSheet, Text, View } from 'react-native'
import { useContext } from "react"
import { colors } from '../../Resources/colors'
import CustomHeader from '../../Components/CustomHeader'
import { Table, Rows } from 'react-native-table-component'
import { icon } from '../../Resources/Icons'
import { AppStore } from '../../Context/AppContext'
const Profile = () => {

  const { userId, agentName, agentEmail, agentPhoneNumber, maximumAmount } = useContext(AppStore)

  const tableData = [
    ['Agent Code', userId],
    ['Agent Name', agentName],
    ['Email', agentEmail],
    ['Mobile No.', agentPhoneNumber],
    ['Maximum Limit (₹)', maximumAmount],
  ];
  return (
    <View style={{ backgroundColor: colors.white }}>
      <CustomHeader />
      <View style={styles.logoContainer}>
        <View style={{ width: '100%', alignSelf: 'center' }}>
          {/* Wellcome gretting */}
          <Image
            source={{
              uri: 'https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651_640.png',
            }}
            style={styles.image}
          />
        </View>
      </View>

      <View
        style={{
          backgroundColor: colors.white,
          height: '100%',
          padding: 20,
        }}>
        <Table style={{ backgroundColor: colors.white }}>
          <Rows data={tableData} textStyle={styles.text} />
        </Table>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  text: {
    color: colors.black,
    fontWeight: '400',
    borderBottomColor: colors.primary,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  logoContainer: {
    backgroundColor: colors.secondaryBackground,
    borderBottomLeftRadius: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 150,
  },

  image: {
    height: 100,
    width: 100,
    backgroundColor: colors.light_sea_green,
    borderRadius: 50,
    alignSelf: 'center',
  },
});
