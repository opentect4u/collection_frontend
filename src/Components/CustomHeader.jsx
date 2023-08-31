import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { colors } from '../Resources/colors'
import { icon } from '../Resources/Icons'
import { useNavigation } from '@react-navigation/native'
import mainNavigationRoutes from '../Routes/NavigationRoutes'
import { AppStore } from '../Context/AppContext'

const CustomHeader = () => {
  const [isImageLoad, setIsImageLoad] = useState(true);

  const { isLogin, setIsLogin, logout } = useContext(AppStore)

  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Text> </Text>
      {isImageLoad && (
        <Image
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/512px-Logo_of_Twitter.svg.png?20220821125553',
          }}
          style={styles.image}
          resizeMode="contain"
          onError={err => setIsImageLoad(false)}
        />
      )}
      {!isImageLoad && <Text style={{ color: colors.black }}>Bank Name</Text>}
      <Pressable
        onPress={() => {
          logout()
          console.log(isLogin)
          navigation.navigate(mainNavigationRoutes.login)
        }}>
        {icon.logout(colors.light_sea_green)}
      </Pressable>
    </View>
  );
};

export default CustomHeader

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    height: 60,
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
  },
})
