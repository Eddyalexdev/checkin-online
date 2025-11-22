import { StyleSheet, TextInput, View, Text, DimensionValue } from "react-native"
import { Control, Controller, Path } from 'react-hook-form';
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from "@expo/vector-icons";

// Define Props
interface IProps {
  control: Control<any>;
  name: Path<any>;
  placeholder: string;
  rules?: Object,
  isPicker?: boolean;
  options?: { label: string; value: any }[];
  inputWidth?: DimensionValue;
  hasWarning?: boolean;
}

// Component
const CustomInput = ({ control, name, placeholder, rules = {}, isPicker = false, options = [], inputWidth = '100%', hasWarning = false }: IProps) => {
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
        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: normalizedWidth }}>
          <View style={[{ width: '100%' }, styles.container, { borderColor: error ? '#FF6347' : '#ccc' }]}>
            <Text style={styles.placeholder}>{placeholder}</Text>
            {
              isPicker ? 
                <View style={styles.pickerContainer}>
                  {
                    name === 'nationality' &&
                    <>
                      <Picker 
                        onBlur={onBlur} 
                        selectedValue={value} 
                        onValueChange={onChange} 
                        style={[styles.input, { width: 85 }]} 
                      >
                        <Picker.Item label="🇧🇴" value="Bolivia" />
                        <Picker.Item label="🇪🇸" value="España" />
                        <Picker.Item label="🇧🇷" value="Brasil" />
                      </Picker>
                      <View style={{ width: 1, height: '80%', backgroundColor: '#ccc', marginHorizontal: 10 }}></View>
                    </>
                  }
                  <Picker 
                    onBlur={onBlur} 
                    selectedValue={value} 
                    onValueChange={onChange} 
                    style={[styles.input, { height: 60, width: name !== 'nationality' ? '100%' : '62%', fontSize: 10 }]}
                    itemStyle={{ fontSize: 10 }}
                  >
                    { options.map(option => <Picker.Item style={{fontSize: 12}} key={option.label} label={option.label} value={option.value} />) }
                  </Picker>
                </View>
                :
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    style={[styles.input, { height: 40, width: '100%' }]}
                    placeholderTextColor="#999"
                  />
                  { 
                    hasWarning &&
                    <MaterialIcons name="info-outline" size={20} />
                  }
                </View>
            }
          </View>
          {error?.message && <Text style={{ color: '#FF6347', alignSelf: 'stretch', fontSize: 10 }}>{error.message}</Text>}
        </View>
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
    marginTop: 8,
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
    fontSize: 12,
    color: '#333',
    padding: 8,
  },

  pickerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  }
});

export default CustomInput

