import { StyleSheet, Text, View, AccessibilityInfo, KeyboardAvoidingView, Platform } from "react-native"
import { Button, CustomInput } from "../components";
import { useForm } from "react-hook-form";
import { useScan } from "../hooks";
import { useCallback, useEffect, useState } from "react";
import { IForm } from "@/types";
import { useFocusEffect, useRouter } from "expo-router";
import { MotiView, AnimatePresence } from "moti";

const PersonalInfoScreen = () => {
  const { form: contextForm, setForm } = useScan();
  const router = useRouter();
  const [reduceMotion, setReduceMotion] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion);
  }, []);

  useFocusEffect(
    useCallback(() => setVisible(true), [])
  )

  const { control, handleSubmit, formState: { errors }, reset } = useForm<IForm>({
    defaultValues: contextForm ?? {
      name: '',
      firstLastName: '',
      secondLastName: '',
      gender: '',
      birthDate: { day: '1', month: '1', year: '2000' },
    },
  });

  useEffect(() => {
    if (contextForm) reset(contextForm);
  }, [contextForm, reset]);

  const onSubmit = async (data: IForm) => {
    setVisible(false);

    setForm({
      ...contextForm, 
      name: data.name,
      firstLastName: data.firstLastName,
      secondLastName: data.secondLastName,
      gender: data.gender,
      birthDate: data.birthDate,
    });

    if (reduceMotion) {
      router.push('/screens/DocumentInfoScreen');
      return;
    }
    await new Promise(res => setTimeout(res, 420));
    router.push('/screens/DocumentInfoScreen');
  }

  const inputs = [
    { name: 'name', placeholder: 'Nombre', rules: { required: 'El nombre es requerido' } },
    { name: 'firstLastName', placeholder: 'Primer Apellido', rules: { required: 'El primer apellido es requerido' } },
    { name: 'secondLastName', placeholder: 'Segundo Apellido' },
  ];

  return (
    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })} style={{ flex: 1 }}>
      <View style={styles.form}>
        {visible && (
          <MotiView
            from={{ opacity: 0, translateY: -12 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: reduceMotion ? 0 : 350 }}
            style={{ marginBottom: 8 }}
          >
            <Text style={styles.formTitle}>Datos personales</Text>
            <Text style={styles.description}>
              Echále un ojo a todos los campos para verificar que los datos sean correctos.
            </Text>
          </MotiView>
        )}

        <View style={styles.formContainer}>
          {visible && (
            <MotiView
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: 'timing', duration: reduceMotion ? 0 : 300 }}
              style={{ flex: 1, width: '100%' }}
            >
              {/* Staggered inputs */}
              {inputs.map((it, idx) => (
                <MotiView
                  key={it.name}
                  from={{ opacity: 0, translateY: 8 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{
                    type: 'timing',
                    duration: reduceMotion ? 0 : 360,
                    delay: reduceMotion ? 0 : idx * 70
                  }}
                  style={{ marginBottom: 12 }}
                >
                  <CustomInput name={it.name as any} placeholder={it.placeholder} control={control} rules={it.rules} />
                </MotiView>
              ))}

              {/* gender */}
              <MotiView
                from={{ opacity: 0, translateY: 8 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'timing', duration: reduceMotion ? 0 : 360, delay: reduceMotion ? 0 : inputs.length * 70 }}
                style={{ marginBottom: 12 }}
              >
                <CustomInput 
                  name="gender" 
                  placeholder="Género" 
                  control={control} 
                  isPicker 
                  options={[
                    { label: 'Género', value: '' },
                    { label: 'Masculino', value: 'Masculino' },
                    { label: 'Femenino', value: 'Femenino' },
                  ]} 
                  rules={{ required: 'El genero es obligatorio' }}
                  />
              </MotiView>

              <Text style={styles.subtitle}>Fecha de nacimiento</Text>
              <MotiView
                from={{ opacity: 0, translateY: 8 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'timing', duration: reduceMotion ? 0 : 360, delay: reduceMotion ? 0 : (inputs.length + 1) * 70 }}
              >
                <View style={styles.dateContainer}>
                  <CustomInput 
                    name="birthDate.day" 
                    placeholder="Día" 
                    control={control} 
                    isPicker
                    inputWidth="31%"
                    options={Array.from({ length: 31 }, (_, i) => ({
                      label: `${i + 1}`,
                      value: `${i + 1}`,
                    }))}
                  />

                  <CustomInput 
                    name="birthDate.month" 
                    placeholder="Mes" 
                    control={control} 
                    isPicker
                    inputWidth="31%"
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
                  />

                  <CustomInput 
                    name="birthDate.year" 
                    placeholder="Año" 
                    control={control} 
                    isPicker
                    inputWidth="35%"
                    options={Array.from({ length: 120 }, (_, i) => {
                      const year = new Date().getFullYear() - i;
                      return { label: `${year}`, value: `${year}` };
                    })}
                  />
                </View>
              </MotiView>
            </MotiView>
          )}

          {visible && (
            <MotiView
              from={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'timing', duration: reduceMotion ? 0 : 280, delay: reduceMotion ? 0 : 60 }}
              style={styles.buttonContainer}
            >
              <Button text="Continuar" onClick={handleSubmit(onSubmit)} />
            </MotiView>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  buttonContainer: {
    marginBottom: 20,
  },
});

export default PersonalInfoScreen;

