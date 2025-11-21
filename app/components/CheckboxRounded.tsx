import { Dispatch, useState, SetStateAction } from 'react';

// Components
import Checkbox from 'expo-checkbox';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { IRequirement } from '@/types';

// Interface Props
interface IProps {
  id: number;
  text: string;
  checked?: boolean;
  requirements?: IRequirement[];
  onToggle?: () => void;
}

// Component
const CheckboxRounded = ({ id, text, checked, onToggle }: IProps) => {
  return (
    <TouchableWithoutFeedback 
      onPress={onToggle} 
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
    >
      <View style={styles.checkbox}>
        <Checkbox 
          onValueChange={onToggle}
          style={styles.roundedCheckbox} 
          value={checked} 
        />
        <Text style={styles.checkboxText}>{ text }</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

// Styles
const styles = StyleSheet.create({
  checkbox: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
  },

  roundedCheckbox: {
    borderRadius: 50,
  },

  checkboxText: { 
    fontSize: 16,
    padding: 0,
    margin: 0,
  }
})

export default CheckboxRounded;

