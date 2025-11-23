import { StyleSheet, Text, View, AccessibilityInfo, KeyboardAvoidingView, Platform } from "react-native";
import { Button, CustomInput } from "../components";
import { useForm } from "react-hook-form";
import { IForm } from "@/types";
import { useScan } from "../hooks";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { MotiView, AnimatePresence } from "moti";

const DocumentInfoScreen = () => {
  const { form: contextForm, setForm } = useScan();
  const router = useRouter();

  const [reduceMotion, setReduceMotion] = useState(false);
  const [visible, setVisible] = useState(true); // controla exit animation

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion);
  }, []);

  const { control, handleSubmit, formState: { errors }, reset } = useForm<IForm>({
    defaultValues: contextForm ?? {
      nationality: 'Bolivia',
      typeOfDocument: '',
      idNumber: '',
      supportNumber: '',
    }
  });

  useEffect(() => {
    if (contextForm) {
      reset(contextForm);
    }
  }, [contextForm, reset]);

  const onSubmit = async (data: IForm) => {
    setVisible(false);

    setForm({
      ...contextForm, 
      nationality: data.nationality,
      typeOfDocument: data.typeOfDocument,
      idNumber: data.idNumber,
      supportNumber: data.supportNumber,
    });

    if (reduceMotion) {
      router.push('/screens/ViewInformationScreen');
      return;
    }

    await new Promise(res => setTimeout(res, 420));
    router.push('/screens/ViewInformationScreen');
  };

  const inputs = [
    {
      name: 'nationality',
      placeholder: 'Nacionalidad',
      isPicker: true,
      options: [
        { label: 'Bolivia', value: 'Bolivia' },
        { label: 'España', value: 'España' },
        { label: 'Brasil', value: 'Brasil' },
      ],
    },
    {
      name: 'typeOfDocument',
      placeholder: 'Tipo de documento',
      isPicker: true,
      options: [
        { label: 'DNI', value: 'DNI' },
        { label: 'Pasaporte', value: 'Pasaporte' },
        { label: 'Carnet de conducir', value: 'Carnet de conducir' },
        { label: 'NIE', value: 'NIE' },
      ],
    },
    {
      name: 'idNumber',
      placeholder: 'Número documento de Identidad',
      rules: {
        required: 'El número de documento es obligatorio',
      }
    },
    {
      name: 'supportNumber',
      placeholder: 'Número de soporte',
      hasWarning: true,
    },
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding', android: undefined })}
      style={{ flex: 1 }}
    >
      <View style={styles.form}>
        <AnimatePresence>
          {visible && (
            <MotiView
              from={{ opacity: 0, translateY: -12 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: -12 }}
              transition={{ type: 'timing', duration: reduceMotion ? 0 : 320 }}
              style={{ marginBottom: 12 }}
            >
              <Text style={styles.formTitle}>Datos de tu documento de identidad</Text>
              <Text style={styles.description}>
                Echále un ojo a todos los campos para verificar que los datos sean correctos.
              </Text>
            </MotiView>
          )}
        </AnimatePresence>

        <View style={styles.inputContainer}>
          <AnimatePresence>
            {visible && (
              <MotiView
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'timing', duration: reduceMotion ? 0 : 300 }}
                style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}
              >
                <View>
                  {inputs.map((it, idx) => (
                    <MotiView
                      key={it.name}
                      from={{ opacity: 0, translateY: 8 }}
                      animate={{ opacity: 1, translateY: 0 }}
                      exit={{ opacity: 0, translateY: 8 }}
                      transition={{
                        type: 'timing',
                        duration: reduceMotion ? 0 : 360,
                        delay: reduceMotion ? 0 : idx * 70,
                      }}
                      style={{ marginBottom: 12 }}
                    >
                      <CustomInput
                        name={it.name as any}
                        placeholder={it.placeholder}
                        control={control}
                        isPicker={it.isPicker}
                        options={it.options}
                        hasWarning={it.hasWarning}
                        rules={it.rules}
                      />
                    </MotiView>
                  ))}
                </View>

                <MotiView
                  from={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ type: 'timing', duration: reduceMotion ? 0 : 280, delay: reduceMotion ? 0 : 60 }}
                  style={styles.buttonWrapper}
                >
                  <Button text="Continuar" onClick={handleSubmit(onSubmit)} />
                </MotiView>
              </MotiView>
            )}
          </AnimatePresence>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 40,
  },

  formTitle: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },

  inputContainer: {
    marginTop: 20,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },

  buttonWrapper: {
    marginTop: 12,
    marginBottom: 20,
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
    marginTop: 6,
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
  },
});

export default DocumentInfoScreen;
