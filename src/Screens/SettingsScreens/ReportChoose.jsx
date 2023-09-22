import {
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { icon } from "../../Resources/Icons"
import { COLORS, colors } from "../../Resources/colors"
import CustomHeader from "../../Components/CustomHeader"
import mainNavigationRoutes from "../../Routes/NavigationRoutes"

export default function ReportChoose({ navigation }) {
  return (
    <>
      <CustomHeader />
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(mainNavigationRoutes.reportDayScreen)
          }
          style={styles.cardContainer}>
          {/* Icon */}
          {icon.profile(COLORS.lightScheme.primary, 45)}

          {/* label */}
          <Text style={styles.label}> Day Scroll Report </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(mainNavigationRoutes.reportTypeScreen)
          }
          style={styles.cardContainer}>
          {/* Icon */}
          {icon.password(COLORS.lightScheme.primary, 45)}

          {/* label */}
          <Text style={styles.label}> A/c Type Wise Report </Text>
        </TouchableOpacity>
        <View
          style={{
            ...styles.cardContainer,
            backgroundColor: COLORS.lightScheme.background,
            elevation: 0,
          }}>
          {/* Blank Card */}
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    justifyContent: "space-evenly",
    backgroundColor: COLORS.lightScheme.background,
    height: "100%",
  },
  cardContainer: {
    backgroundColor: COLORS.lightScheme.onPrimary,
    alignItems: "center",
    width: "45%",
    height: 150, //
    padding: 10,
    margin: 5,
    borderRadius: 10,
    justifyContent: "center",
    elevation: 10,
  },
  label: {
    color: COLORS.lightScheme.primary,
    padding: 10,
    textAlign: "center",
    fontSize: PixelRatio.roundToNearestPixel(18),
  },
})

// import {
//     PixelRatio,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View,
//   } from 'react-native';
//   import {icon} from '../../Resources/Icons';
//   import {colors} from '../../Resources/colors';
//   import CustomHeader from '../../Components/CustomHeader';
//   import mainNavigationRoutes from '../../Routes/NavigationRoutes';

//   const SettingScreen = ({navigation}) => {
//     return (
//       <>
//         <CustomHeader />
//         <View style={styles.container}>
//           <TouchableOpacity
//             onPress={() =>
//               navigation.navigate(mainNavigationRoutes.profileScreen)
//             }
//             style={styles.cardContainer}>
//             {/* Icon */}
//             {icon.profile(colors.light_sea_green, 45)}

//             {/* label */}
//             <Text style={styles.label}> Profile </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={() =>
//               navigation.navigate(mainNavigationRoutes.changePinScreen)
//             }
//             style={styles.cardContainer}>
//             {/* Icon */}
//             {icon.password(colors.light_sea_green, 45)}

//             {/* label */}
//             <Text style={styles.label}> Change Pin </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={() => navigation.navigate(mainNavigationRoutes.reportScreen)}
//             style={styles.cardContainer}>
//             {/* Icon */}
//             {icon.report(colors.light_sea_green, 45)}

//             {/* label */}
//             <Text style={styles.label}> Reports </Text>
//           </TouchableOpacity>
//           <View
//             style={{
//               ...styles.cardContainer,
//               backgroundColor: colors.secondaryBackground,
//               elevation: 0,
//             }}>
//             {/* Blank Card */}
//           </View>
//         </View>
//       </>
//     );
//   };

//   export default SettingScreen;

//   const styles = StyleSheet.create({
//     container: {
//       flexDirection: 'row',
//       flexWrap: 'wrap',
//       padding: 10,
//       justifyContent: 'space-evenly',
//       backgroundColor: colors.secondaryBackground,
//       height: '100%',
//     },
//     cardContainer: {
//       backgroundColor: colors.white,
//       alignItems: 'center',
//       width: '45%',
//       height: 150, //
//       padding: 10,
//       margin: 5,
//       borderRadius: 10,
//       justifyContent: 'center',
//       elevation: 10,
//     },
//     label: {
//       color: colors.primary,
//       padding: 10,
//       fontSize: PixelRatio.roundToNearestPixel(18),
//     },
//   });
