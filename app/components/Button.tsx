import { Pressable, Text, StyleSheet, TouchableOpacity } from "react-native"
interface IProps {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({ text, disabled = false, onClick }: IProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={disabled}
      onPress={() => {
        if (disabled === true) return;
        onClick && onClick();
      }}
    >
      <Pressable
        onPress={() => {
          if (disabled === true) return;
          onClick && onClick();
        }}
        style={[
          styles.button,
          disabled && styles.buttonDisabled,
        ]}
        disabled={disabled}
      >
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#00ccc0',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Button

