import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../Resources/colors'
import mainNavigationRoutes from '../Routes/NavigationRoutes'

const SearchCard = ({ item, index, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(mainNavigationRoutes.accountDetails, { item: item })}
      style={styles.container} key={index}>
      <View>
        <Text style={styles.text}>
          Customer Name : {item?.customer_name}
        </Text>
        <Text style={styles.text}>
          Account No : {item?.account_number}
        </Text>
        <Text style={styles.text}>
          Account Type : {(item?.acc_type == 'D') ? "Daily" : (item?.acc_type == 'R') ? "RD" : (item?.acc_type == 'L') ? "Loan" : ""}
        </Text>

      </View>
      <Image
        source={{
          uri: "https://static.wikia.nocookie.net/artemisfowl/images/8/89/Portrait_Placeholder.png/revision/latest/thumbnail/width/360/height/450?cb=20190630050130"

        }}
        style={styles.image}
      />
    </TouchableOpacity>
  )
}

export default SearchCard

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    marginVertical: 10
  },
  text: {
    color: colors.whiteT,
    padding: 2,
    fontWeight: '500',
    fontSize: 14
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 100
  }
})