import { StyleSheet, Text, View } from "react-native"
import { Button, CustomInput } from "../components";
import { useForm } from "react-hook-form";
import { useScan } from "../hooks";
import { useEffect } from "react";
import { IForm } from "@/types";
import { useRouter } from "expo-router";
 
const PersonalInfoScreen = () => {
  const { form: contextForm } = useScan();
  const router = useRouter();

  const { control, handleSubmit, formState: { errors }, reset } = useForm<IForm>({
    defaultValues: contextForm ?? {
      name: '',
      firstLastName: '',
      secondLastName: '',
      gender: '',
      birthDate: {
        day: '1',
        month: '1',
        year: '2000',
      },
    },
  });

  const handleSendForm = (data: IForm) => {
    console.log('Personal Info Form Data:', data);
    router.push('/screens/DocumentInfoScreen');
  }

  useEffect(() => {
    if(contextForm) {
      reset(contextForm);
    }
  }, [contextForm, reset])

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
          rules={{ 
            required: 'El nombre es obligatorio', 
            minLength: { value: 2, message: 'Debe tener al menos 2 caracteres' },
            maxLength: { value: 50, message: 'No puede exceder los 50 caracteres' }
          }}
        />
        <CustomInput 
          name="firstLastName" 
          placeholder="Primer Apellido"
          control={control}
          rules={{ 
            required: 'El apellido es obligatorio', 
            minLength: { value: 2, message: 'Debe tener al menos 2 caracteres' },
            maxLength: { value: 50, message: 'No puede exceder los 50 caracteres' }
          }}
        />
        <CustomInput 
          name="secondLastName"
          placeholder="Segundo Apellido"
          control={control}
          rules={{ 
            required: 'El apellido es obligatorio', 
            minLength: { value: 2, message: 'Debe tener al menos 2 caracteres' },
            maxLength: { value: 50, message: 'No puede exceder los 50 caracteres' }
          }}
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
          rules={{ 
            required: 'El género es obligatorio' 
          }}
        />

        <Text style={styles.subtitle}>Fecha de nacimiento</Text>

        <View style={styles.dateContainer}>
          <CustomInput 
            name="birthDate.day"
            placeholder="Dia"
            control={control}
            isPicker
            options={Array.from({ length: 31 }, (_, i) => ({ label: `${i + 1}`, value: `${i + 1}` }))}
            inputWidth={"31%"}
          />

          <CustomInput 
            name="birthDate.month"
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
            name="birthDate.year"
            placeholder="Año"
            control={control}
            isPicker
            options={Array.from({ length: 221 }, (_, i) => {
              const year = 1900 + i;
              return { label: `${year}`, value: `${year}` };
            })}
            inputWidth={"35%"}
            rules={{ 
              validate: (value: any) => value >= 1900 || 'El año debe ser válido'
            }}
          />
        </View>
        
        <Button
          text="Continuar"
          onClick={handleSubmit(handleSendForm)}
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
    paddingHorizontal: 20,
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
  },

  datePicker: {
    flex: 1,
    marginHorizontal: 5,
  }
})

export default PersonalInfoScreen

