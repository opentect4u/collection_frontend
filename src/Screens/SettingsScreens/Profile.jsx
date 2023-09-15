import { Image, StyleSheet, Text, View } from 'react-native'
import { useContext } from "react"
import { COLORS, colors } from '../../Resources/colors'
import CustomHeader from '../../Components/CustomHeader'
import { Table, Rows } from 'react-native-table-component'
import { icon } from '../../Resources/Icons'
import { AppStore } from '../../Context/AppContext'
const Profile = () => {

  const { userId, agentName, agentEmail, agentPhoneNumber, maximumAmount } = useContext(AppStore)

  const tableData = [
    ['Agent Code', userId],
    // ['Agent Name', agentName],
    ['Email', agentEmail],
    ['Mobile No.', agentPhoneNumber],
    ['Maximum Limit (₹)', maximumAmount],
  ];
  return (
    <View style={{ backgroundColor: COLORS.lightScheme.background }}>
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

      <View style={styles.nameContainer}>
        <Text style={styles.containerText}>{`Welcome back! ${agentName}`}</Text>
      </View>

      <View
        style={{
          backgroundColor: COLORS.lightScheme.background,
          height: '100%',
          padding: 20,
        }}>
        <Table style={{ backgroundColor: COLORS.lightScheme.onTertiary }}>
          <Rows data={tableData} textStyle={styles.text} />
        </Table>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  nameContainer: {
    margin: 20,
    padding: 10,
    backgroundColor: "teal",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30
  },
  containerText: {
    fontSize: 25,
    color: COLORS.lightScheme.onPrimary
  },
  text: {
    color: COLORS.lightScheme.onBackground,
    fontWeight: '600',
    borderBottomColor: COLORS.lightScheme.secondary,
    borderBottomWidth: 1,
    paddingVertical: 10,
    fontSize: 14
  },
  logoContainer: {
    backgroundColor: COLORS.darkScheme.onBackground,
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
    backgroundColor: COLORS.lightScheme.onTertiaryContainer,
    borderRadius: 50,
    alignSelf: 'center',
  },
});
