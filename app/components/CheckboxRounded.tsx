import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface IProps {
  text: string;
  checked?: boolean;
  onToggle?: () => void;
}

const CheckboxRounded = ({ text, checked, onToggle }: IProps) => {
  return (
    <TouchableOpacity 
      onPress={onToggle}
      style={styles.container}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
    >
      <View style={[styles.circle, checked && styles.circleChecked]}>
        {checked && (
          <MaterialIcons name="check" size={14} color="#fff" />
        )}
      </View>

      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },

  circle: {
    width: 20,
    height: 20,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#cccccc",
    alignItems: "center",
    justifyContent: "center",
  },

  circleChecked: {
    backgroundColor: "#00ccc0",
    borderColor: "#00ccc0",
  },

  text: {
    fontSize: 16,
  },
});

export default CheckboxRounded;

