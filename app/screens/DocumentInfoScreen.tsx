import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  AccessibilityInfo,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Easing,
} from "react-native";
import { Button, CustomInput } from "../components";
import { useForm } from "react-hook-form";
import { IForm } from "@/types";
import { useScan } from "../hooks";
import { useRouter } from "expo-router";

const DURATION = 320;

const DocumentInfoScreen = () => {
  const { form: contextForm, setForm } = useScan();
  const router = useRouter();

  const [reduceMotion, setReduceMotion] = useState(false);
  const [visible, setVisible] = useState(true);

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
    if (contextForm) reset(contextForm);
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

    await new Promise(res => setTimeout(res, DURATION + 60));
    router.push('/screens/ViewInformationScreen');
  };

  const inputs = useMemo(() => [
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
  ], []);

  const headerAnim = useRef(new Animated.Value(visible ? 1 : 0)).current;
  const itemsRef = useRef<Animated.Value[]>([]);
  const buttonAnim = useRef(new Animated.Value(visible ? 1 : 0)).current;

  useEffect(() => {
    const total = inputs.length;
    const cur = itemsRef.current;
    if (cur.length < total) {
      for (let i = cur.length; i < total; i++) cur[i] = new Animated.Value(visible ? 1 : 0);
    } else if (cur.length > total) {
      itemsRef.current = cur.slice(0, total);
    }
  }, [inputs.length, visible]);

  const baseDuration = reduceMotion ? 0 : DURATION;
  const stagger = reduceMotion ? 0 : 70;

  useEffect(() => {
    if (visible) {
      const itemIns = itemsRef.current.map((a, i) =>
        Animated.timing(a, {
          toValue: 1,
          duration: baseDuration,
          delay: i * stagger,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        })
      );

      Animated.sequence([
        Animated.timing(headerAnim, {
          toValue: 1,
          duration: baseDuration,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.stagger(stagger, itemIns),
        Animated.timing(buttonAnim, {
          toValue: 1,
          duration: baseDuration,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
      return;
    }

    const itemOuts = itemsRef.current.map((a, i) =>
      Animated.timing(a, {
        toValue: 0,
        duration: baseDuration,
        delay: (itemsRef.current.length - i - 1) * (stagger / 2),
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      })
    );

    Animated.sequence([
      Animated.timing(buttonAnim, {
        toValue: 0,
        duration: baseDuration,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.stagger(stagger / 2, itemOuts.reverse()),
      Animated.timing(headerAnim, {
        toValue: 0,
        duration: baseDuration,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [visible, headerAnim, buttonAnim, baseDuration, stagger]);

  const interpTranslateY = (anim?: Animated.Value, from = 8, to = 0) => {
    const a = anim ?? headerAnim;
    try {
      return a.interpolate({ inputRange: [0, 1], outputRange: [from, to] });
    } catch {
      return to as unknown;
    }
  };

  const headerStyle = {
    opacity: headerAnim,
    transform: [
      {
        translateY: headerAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [-12, 0],
        }),
      },
    ],
  };

  const buttonStyle = {
    opacity: buttonAnim,
    transform: [
      {
        scale: buttonAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.98, 1],
        }),
      },
    ],
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding', android: undefined })}
      style={{ flex: 1 }}
    >
      <View style={styles.form}>
        <Animated.View style={[{ marginBottom: 12 }, headerStyle]}>
          <Text style={styles.formTitle}>Datos de tu documento de identidad</Text>
          <Text style={styles.description}>
            Echále un ojo a todos los campos para verificar que los datos sean correctos.
          </Text>
        </Animated.View>

        <View style={styles.inputContainer}>
          <View style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            <View>
              {inputs.map((it, idx) => {
                const anim = itemsRef.current[idx] ?? new Animated.Value(1);

                return (
                  <Animated.View key={it.name} style={[{ marginBottom: 12, opacity: anim }]}>
                    <CustomInput
                      name={it.name as any}
                      placeholder={it.placeholder}
                      control={control}
                      isPicker={it.isPicker}
                      options={it.options}
                      hasWarning={it.hasWarning}
                      rules={it.rules}
                    />
                  </Animated.View>
                );
              })}
            </View>

            <Animated.View style={[styles.buttonWrapper, buttonStyle]}>
              <Button text="Continuar" onClick={handleSubmit(onSubmit)} />
            </Animated.View>
          </View>
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
