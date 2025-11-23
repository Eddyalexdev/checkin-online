import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import { useScan } from "../hooks";
import { IForm } from "@/types";
import { useFocusEffect, useRouter } from "expo-router";

const DURATION = 350;

const PersonalInfoScreen = () => {
  const { form: contextForm, setForm } = useScan();
  const router = useRouter();
  const [reduceMotion, setReduceMotion] = useState(false);
  const [visible, setVisible] = useState(true);

  function safeInterpolate(anim: Animated.Value | undefined, from = 0, to = 1) {
    if (!anim) return to;
    const anyAnim = anim as any;
    if (typeof anyAnim.interpolate === 'function') {
      return anyAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [from, to],
      });
    }
    return to;
  }

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion);
  }, []);

  useFocusEffect(useCallback(() => setVisible(true), []));

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

  const inputs = useMemo(() => [
    { name: 'name', placeholder: 'Nombre', rules: { required: 'El nombre es requerido' } },
    { name: 'firstLastName', placeholder: 'Primer Apellido', rules: { required: 'El primer apellido es requerido' } },
    { name: 'secondLastName', placeholder: 'Segundo Apellido' },
  ], []);

  const headerAnim = useRef(new Animated.Value(0)).current;
  const itemsAnimRef = useRef<Animated.Value[]>([]);
  const buttonAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const totalItems = inputs.length + 1 + 1;
    const cur = itemsAnimRef.current;
    if (cur.length < totalItems) {
      for (let i = cur.length; i < totalItems; i++) cur[i] = new Animated.Value(0);
    } else if (cur.length > totalItems) {
      itemsAnimRef.current = cur.slice(0, totalItems);
    }
  }, [inputs.length]);

  const baseDuration = reduceMotion ? 0 : DURATION;
  const itemStagger = reduceMotion ? 0 : 70;

  useEffect(() => {
    if (visible) {
      const itemIns = itemsAnimRef.current.map((a, i) =>
        Animated.timing(a, {
          toValue: 1,
          duration: baseDuration,
          delay: i * itemStagger,
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
        Animated.stagger(itemStagger, itemIns),
        Animated.timing(buttonAnim, {
          toValue: 1,
          duration: baseDuration,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
      return;
    }

    const itemOuts = itemsAnimRef.current.map((a, i) =>
      Animated.timing(a, {
        toValue: 0,
        duration: baseDuration,
        delay: (itemsAnimRef.current.length - i - 1) * (itemStagger / 2),
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
      Animated.stagger(itemStagger / 2, itemOuts.reverse()),
      Animated.timing(headerAnim, {
        toValue: 0,
        duration: baseDuration,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [visible, headerAnim, buttonAnim, baseDuration, itemStagger]);

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

    await new Promise(res => setTimeout(res, baseDuration + 60));
    router.push('/screens/DocumentInfoScreen');
  };

  const inputsRendered = (
    <>
      {inputs.map((it, idx) => {
        const anim = itemsAnimRef.current[idx] ?? new Animated.Value(1);
        const style = {
          opacity: anim,
          transform: [
            {
              translateY: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [8, 0],
              }),
            },
          ],
        };
        return (
          <Animated.View key={it.name} style={[{ marginBottom: 12 }, style]}>
            <CustomInput name={it.name as any} placeholder={it.placeholder} control={control} rules={it.rules} />
          </Animated.View>
        );
      })}

      <Animated.View
        style={[
          { marginBottom: 12 },
          {
            opacity: itemsAnimRef.current[inputs.length] ?? 1,
            transform: [
              {
                translateY: safeInterpolate(itemsAnimRef.current[inputs.length], 8, 0),
              },
            ],
          },
        ]}
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
      </Animated.View>

      <Text style={styles.subtitle}>Fecha de nacimiento</Text>

      <Animated.View
        style={{
          opacity: itemsAnimRef.current[inputs.length + 1] ?? 1,
          transform: [
            {
              translateY: safeInterpolate(itemsAnimRef.current[inputs.length + 1], 8, 0),
            },
          ],
        }}
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
      </Animated.View>
    </>
  );

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
          outputRange: [0.96, 1],
        }),
      },
    ],
  };

  return (
    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })} style={{ flex: 1 }}>
      <View style={styles.form}>
        <Animated.View style={[{ marginBottom: 8 }, headerStyle]}>
          <Text style={styles.formTitle}>Datos personales</Text>
          <Text style={styles.description}>
            Echále un ojo a todos los campos para verificar que los datos sean correctos.
          </Text>
        </Animated.View>

        <View style={styles.formContainer}>
          <View style={{ flex: 1, width: '100%' }}>
            {inputsRendered}
          </View>

          <Animated.View style={[styles.buttonContainer, buttonStyle]}>
            <Button text="Continuar" onClick={handleSubmit(onSubmit)} />
          </Animated.View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 20,
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

