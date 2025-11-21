import { StyleSheet, View } from "react-native"
import { Card, Scanner } from "../components";

import data from '../../data/requirements.json';
import { useRouter } from "expo-router";

const BackScanScreen = () => {
  const router = useRouter();

  const handleScan = () => {
    router.push({ pathname: '/screens/PersonalInfoScreen' });
  }

  return (
    <View style={styles.view}>
      <View style={styles.container}>
        <Scanner />

        <Card
          title="Escanea la parte trasera" 
          data={data.back}
          handleScan={handleScan}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  
  container: {
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    overflow: 'hidden',
    height: '100%',
    width: '100%',
  },

  buttonContainer: {
    position: 'absolute',
    bottom: 64,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: '100%',
    paddingHorizontal: 64,
  },
});

export default BackScanScreen
