import { View, StyleSheet, Text, AccessibilityInfo, Animated, Easing } from 'react-native';
import { Button, CheckboxRounded } from './';
import { AntDesign } from '@expo/vector-icons'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { IRequirement } from '@/types';
import { useScan } from '../hooks';
import Loader from './Loader';

interface IProps {
  title: string;
  data: IRequirement[];
  handleScan?: () => void;
}

const Card = ({ title, data, handleScan }: IProps) => {
  const [requirements, setRequirements] = useState<IRequirement[]>([]);
  const { takePicture, isLoading, statusText } = useScan();
  const [reduceMotion, setReduceMotion] = useState(false);

  const containerAnim = useRef(new Animated.Value(0)).current; // 0 -> hidden, 1 -> shown
  const loaderAnim = useRef(new Animated.Value(0)).current; // 0 -> content, 1 -> loader
  const buttonAnim = useRef(new Animated.Value(0)).current; // 0 -> hidden, 1 -> shown
  const itemAnimsRef = useRef<Animated.Value[]>([]);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion);
  }, []);

  useEffect(() => {
    setRequirements(data.map(r => ({ ...r, checked: !!r.checked })));
  }, [data]);

  useEffect(() => {
    const len = requirements.length;
    const current = itemAnimsRef.current;
    if (current.length < len) {
      for (let i = current.length; i < len; i++) {
        current[i] = new Animated.Value(0); // start hidden
      }
    } else if (current.length > len) {
      itemAnimsRef.current = current.slice(0, len);
    }
  }, [requirements]);

  const baseDuration = reduceMotion ? 0 : 420;
  const itemStagger = reduceMotion ? 0 : 70;
  const titleAnim = itemAnimsRef.current[0] ?? containerAnim;


  useEffect(() => {
    const sequence: Animated.CompositeAnimation[] = [];

    sequence.push(
      Animated.timing(containerAnim, {
        toValue: 1,
        duration: baseDuration,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      })
    );

    const itemIns: Animated.CompositeAnimation[] = itemAnimsRef.current.map((anim, i) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: baseDuration,
        delay: i * itemStagger,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      })
    );

    if (itemIns.length) {
      sequence.push(Animated.stagger(itemStagger, itemIns));
    }

    sequence.push(
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration: baseDuration,
        delay: 60,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      })
    );

    Animated.sequence(sequence).start();
  }, [requirements.length, reduceMotion]);

  useEffect(() => {
    Animated.timing(loaderAnim, {
      toValue: isLoading ? 1 : 0,
      duration: reduceMotion ? 0 : 340,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [isLoading, loaderAnim, reduceMotion]);

  const handleExecuteScan = async () => {
    const { status } = await takePicture();
    if (!status) return;
    handleScan && handleScan();
  }

  const toggleRequirement = useCallback((id: number) => {
    setRequirements(prev =>
      prev.map(r => (r.id === id ? { ...r, checked: !r.checked } : r))
    );
  }, []);

  const allChecked = useMemo(
    () => requirements.length > 0 && requirements.every(r => !!r.checked),
    [requirements]
  );

  const containerStyle = {
    opacity: containerAnim,
    transform: [
      {
        translateY: containerAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [100, 0],
        }),
      },
    ],
  };

  const loaderStyle = {
    opacity: loaderAnim,
    transform: [
      {
        translateY: loaderAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -10],
        }),
      },
    ],
  };

  const contentOpacity = loaderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const contentTranslateY = loaderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 10],
  });

  const buttonStyle = {
    opacity: buttonAnim,
    transform: [
      {
        translateY: buttonAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0],
        }),
      },
    ],
  };

  return (
    <Animated.View style={[styles.card, containerStyle]}>
      <Animated.View
        style={[
          {
            marginBottom: 16,
            alignItems: 'center',
            justifyContent: 'center',
          },
          loaderStyle,
        ]}
        pointerEvents={isLoading ? 'auto' : 'none'}
      >
        {isLoading && <Loader text={statusText} />}
      </Animated.View>

      <Animated.View
        style={{
          opacity: contentOpacity,
          transform: [{ translateY: contentTranslateY }],
        }}
        pointerEvents={isLoading ? 'none' : 'auto'}
      >
        <AntDesign
          name="scan"
          size={34}
          color="#000000"
          style={{ alignSelf: 'center', marginBottom: 16 }}
        />

        <Animated.View
          style={{
            opacity: titleAnim,
            transform: [
              {
                translateX: titleAnim.interpolate
                  ? titleAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-40, 0],
                    })
                  : 0,
              },
            ],
          }}
        >
          <Text style={styles.cardTitle}>{title}</Text>
        </Animated.View>

        <View style={styles.cardCheckboxContainer}>
          {requirements?.map((requirement, index) => {
            const anim = itemAnimsRef.current[index] ?? new Animated.Value(1);
            const itemStyle = {
              opacity: anim,
              transform: [
                {
                  translateX: anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-30, 0],
                  }),
                },
              ],
            };

            return (
              <Animated.View key={requirement.id} style={itemStyle}>
                <CheckboxRounded
                  text={requirement.text}
                  checked={requirement.checked}
                  onToggle={() => toggleRequirement(requirement.id)}
                />
              </Animated.View>
            );
          })}
        </View>
      </Animated.View>

      <Animated.View style={buttonStyle}>
        <Button
          text="Escanear"
          disabled={!allChecked || isLoading}
          onClick={handleExecuteScan}
        />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    bottom: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 380,
    position: 'absolute',
    paddingTop: 32,
    paddingHorizontal: 28,
    width: '100%',
    zIndex: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 6,
  },

  cardTitle: {
    color: '#000000',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 18,
    textAlign: 'center',
    paddingHorizontal: 20,
  },

  cardCheckboxContainer: {
    flexDirection: 'column',
    gap: 15,
    marginBottom: 18,
  }
});

export default Card;
