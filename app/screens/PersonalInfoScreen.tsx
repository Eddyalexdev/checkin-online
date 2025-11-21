import { StyleSheet, Text, View, TextInput } from "react-native"
import { Picker } from "@react-native-picker/picker";
import { Button, CustomInput } from "../components";
import { useForm } from "react-hook-form";
 
const PersonalInfoScreen = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  return (
    <View style={styles.form}>
      {/* Title and description */}
      <Text style={styles.formTitle}>Datos personales</Text>
      <Text style={styles.description}>Echále un ojo a todos los campos para verificar que los datos sean correctos.</Text>

      {/* Formulary */}
      <View style={styles.inputContainer}>
        <CustomInput 
          name="name" 
          placeholder="Nombre" 
          control={control}
          rules={{ required: 'El nombre es obligatorio' }}
        />
        <CustomInput 
          name="firstLastName" 
          placeholder="Primer Apellido"
          control={control}
          rules={{ required: 'El nombre es obligatorio' }}
        />
        <CustomInput 
          name="secondLastName"
          placeholder="Segundo Apellido"
          control={control}
          rules={{ required: 'El nombre es obligatorio' }}
        />

        <CustomInput 
          name="gender"
          placeholder="Género"
          control={control}
          isPicker
          options={[
            { label: 'Género', value: '' },
            { label: 'Masculino', value: 'male' },
            { label: 'Femenino', value: 'female' },
          ]}
        />

        <Text style={styles.subtitle}>Fecha de nacimiento</Text>

        <View style={styles.dateContainer}>
          <CustomInput 
            name="day"
            placeholder="Dia"
            control={control}
            isPicker
            options={Array.from({ length: 31 }, (_, i) => ({ label: `${i + 1}`, value: `${i + 1}` }))}
            inputWidth={"31%"}
          />

          <CustomInput 
            name="month"
            placeholder="Mes"
            control={control}
            isPicker
            options={[
              { label: '01', value: '1' },
              { label: '02', value: '2' },
              { label: '03', value: '3' },
              { label: '04', value: '4' },
              { label: '05', value: '5' },
              { label: '06', value: '6' },
              { label: '07', value: '7' },
              { label: '08', value: '8' },
              { label: '09', value: '9' },
              { label: '10', value: '10' },
              { label: '11', value: '11' },
              { label: '12', value: '12' },
            ]}
            inputWidth={"31%"}
          />

          <CustomInput 
            name="year"
            placeholder="Año"
            control={control}
            isPicker
            options={Array.from({ length: 25 }, (_, i) => {
              const year = 2000 + i;
              return { label: `${year}`, value: `${year}` };
            })}
            inputWidth={"38%"}
          />
        </View>
        
        <Button
          text="Continuar"
          onClick={() => console.log('Continuar clicked')}
        ></Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: '#FFFFFF',
    height: '100%',
    width: '100%',
    paddingTop: 20,
    paddingHorizontal: 40,
  },

  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  inputContainer: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    padding: 10,
    fontSize: 16,
  },

  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  description: {
    paddingHorizontal: 15,
    textAlign: 'center',
  },

  dateContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },

  datePicker: {
    flex: 1,
    marginHorizontal: 5,
  }
})

export default PersonalInfoScreen

