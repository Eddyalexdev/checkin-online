import { Link } from "expo-router"
import { Text, View } from "react-native"

const HomeScreen = () => {
  return (
    <View>
      <Link href="/screens/FrontScanScreen">Go to Front</Link>
      <Link href="/screens/PersonalInfoScreen">Go to Form</Link>
    </View>
  )
}

export default HomeScreen
