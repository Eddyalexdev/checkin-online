import { StyleSheet, TextInput, View, Text, DimensionValue } from "react-native"
import { Control, Controller, FieldValues } from 'react-hook-form';
import { Picker } from "@react-native-picker/picker";

// Define Props
interface IProps {
  control: Control<FieldValues, any, FieldValues>;
  name: string;
  placeholder: string;
  rules?: Object,
  isPicker?: boolean;
  options?: { label: string; value: any }[];
  inputWidth?: DimensionValue;
}

// Component
const CustomInput = ({ control, name, placeholder, rules = {}, isPicker = false, options = [], inputWidth = '100%' }: IProps) => {
  const normalizedWidth = 
    typeof inputWidth === "string" && !inputWidth.includes("%")
      ? Number(inputWidth)
      : inputWidth;

  return (
    <Controller 
      control={control}
      name={name}
      rules={rules}
      render={({ field: {value, onChange, onBlur}, fieldState: { error }}) => (
        <>
          <View style={[{ width: normalizedWidth }, styles.container, { borderColor: error ? '#FF6347' : '#ccc' }]}>
            <Text style={styles.placeholder}>{placeholder}</Text>
            {
              isPicker ? 
                <Picker 
                  onBlur={onBlur} 
                  selectedValue={value} 
                  onValueChange={onChange} 
                  style={[styles.input, { height: 60 }]}
                >
                  { options.map(option => <Picker.Item key={option.label} label={option.label} value={option.value} />) }
                </Picker>
                :
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  style={[styles.input, { height: 40 }]}
                  placeholderTextColor="#999"
                />
            }
          </View>
          { error && (<Text style={{ color: '#FF6347', alignSelf: 'stretch'}}>{error.message || 'Error'}</Text>)}
        </>
      )}
    />
  )
}

// Styles
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginVertical: 8,
    backgroundColor: '#FFFFFF',
    borderColor: '#000000',
    position: 'relative',
    maxHeight: 60,
    display: 'flex',
    justifyContent: 'center',
  },
  
  placeholder: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 3,
    fontSize: 11,
    color: '#666',
    top: -10,
    left: 10,
  },
  
  input: {
    fontSize: 14,
    color: '#333',
    padding: 8,
  }
});

export default CustomInput

