import { MotiView } from 'moti'
import {View, Text, StyleSheet} from 'react-native'

// Interface for props
interface IProps {
  text: string;
}

// Component
const Loader = ({ text }: IProps) => {
  return (
    <MotiView 
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: 'timing', duration: 500 }}
      style={styles.loader} 
    >
      <View style={styles.loaderDots}>
        {[0, 1, 2].map((i) => (
          <MotiView
            key={i}
            from={{ scale: 0.5, opacity: 0.5 }}
            animate={{ scale: [0.5, 1, 0.5], opacity: [0.5, 1, 0.5] }}
            transition={{
              type: 'timing',
              duration: 1000,
              delay: i * 200,
              loop: true,
            }}
            style={styles.loaderDot}
          />
        ))}
      </View>

      <Text style={{ textAlign: 'center', color: '#555', fontSize: 16 }}>
        { text }
      </Text>
    </MotiView>
  )
}

// Styles
const styles = StyleSheet.create({
  loader: {
    marginBottom: 16,
    alignItems: 'center',
    height: 200,
    justifyContent: 'center',
  },
  loaderDots: {
    flexDirection: 'row',
    marginBottom: 16,
    height: 24,
  },
  loaderDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#00ccc0',
    marginHorizontal: 4,
  },
  loaderText: {
    textAlign: 'center',
    color: '#555',
    fontSize: 16,
  },
});

export default Loader
