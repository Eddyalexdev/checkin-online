import { StyleSheet, Text, View } from "react-native"
import { Button, CustomInput } from "../components";
import { useForm } from "react-hook-form";
import { IForm } from "@/types";
import { useScan } from "../hooks";
import { useEffect } from "react";
import { useRouter } from "expo-router";

const DocumentInfoScreen = () => {
  const { form: contextForm } = useScan();
  const router = useRouter();

  const { control, handleSubmit, formState: { errors }, reset } = useForm<IForm>({
    defaultValues: contextForm ?? {
      nationality: 'Bolivia',
      typeOfDocument: '',
      idNumber: '',
      supportNumber: '',
    }
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
      <Text style={styles.formTitle}>Datos de tu documento de identidad</Text>
      <Text style={styles.description}>Echále un ojo a todos los campos para verificar que los datos sean correctos.</Text>

      {/* Formulary */}
      <View style={styles.inputContainer}>
        <CustomInput 
          name="nationality"
          placeholder="Nacionalidad"
          control={control}
          isPicker
          options={[
            { label: 'Bolivia', value: 'Bolivia' },
            { label: 'España', value: 'España' },
            { label: 'Brasil', value: 'Brasil' },
          ]}
        />

        <CustomInput 
          name="typeOfDocument"
          placeholder="Tipo de documento"
          control={control}
          isPicker
          options={[
            { label: 'DNI', value: 'DNI' },
            { label: 'Pasaporte', value: 'Pasaporte' },
            { label: 'Carnet de conducir', value: 'Carnet de conducir' },
            { label: 'NIE', value: 'NIE' },
          ]}
        />

        <CustomInput 
          name="idNumber"
          placeholder="Número documento de Identidad"
          control={control}
        />

        <CustomInput 
          name="supportNumber"
          placeholder="Número de soporte"
          control={control}
          hasWarning
        />
        
        <Button
          text="Continuar"
          onClick={() => handleSubmit(handleSendForm)}
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

export default DocumentInfoScreen
