import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { colors } from '../Resources/colors'
import { icon } from '../Resources/Icons'
import { useNavigation } from '@react-navigation/native'
import mainNavigationRoutes from '../Routes/NavigationRoutes'
import { AppStore } from '../Context/AppContext'
import HeaderIcon from "../Resources/Images/logo_cut.png"

const CustomHeader = () => {
  const [isImageLoad, setIsImageLoad] = useState(true);

  const { isLogin, setIsLogin, logout } = useContext(AppStore)

  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Text> </Text>
      {isImageLoad && (
        <Image
          source={HeaderIcon}
          style={styles.image}
          resizeMode="contain"
          onError={err => setIsImageLoad(false)}
        />
      )}
      {!isImageLoad && <Text style={{ color: colors.black }}>Data Bank</Text>}
      <Pressable
        onPress={() => {
          logout()
          console.log(isLogin)
          navigation.navigate(mainNavigationRoutes.login)
        }}>
        {icon.logout(colors.secondary)}
      </Pressable>
    </View>
  );
};

export default CustomHeader

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 20 },
    shadowOpacity: 1.5,
    shadowRadius: 2,
    elevation: 21,
  },
  image: {
    height: 50,
    width: 50,
    marginLeft: 30
  },
})
