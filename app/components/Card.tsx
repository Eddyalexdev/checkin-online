import { View, StyleSheet, Text, AccessibilityInfo } from 'react-native';
import { Button, CheckboxRounded } from './';
import { AntDesign } from '@expo/vector-icons'
import { useCallback, useEffect, useMemo, useState } from 'react';
import { IRequirement } from '@/types';
import { useScan } from '../hooks';
import { AnimatePresence, MotiView } from 'moti';
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

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion);
  }, []);

  useEffect(() => {
    setRequirements(data.map(r => ({ ...r, checked: !!r.checked })));
  }, [data]);

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

  const baseTransition: any = { type: 'timing', duration: reduceMotion ? 0 : 420 };

  return (
    <MotiView
      from={{ opacity: 0, translateY: 100 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: 120 }}
      transition={baseTransition}
      style={styles.card}
    >
      <AnimatePresence>
        {isLoading ? (
          <MotiView
            key="loader"
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -20 }}
            transition={{ ...baseTransition, duration: reduceMotion ? 0 : 340 }}
            style={{ marginBottom: 16, alignItems: 'center', height: 200, justifyContent: 'center' }}
          >
            <Loader text={statusText} />
          </MotiView>
        ) : (
          <MotiView
            key="content"
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -10 }}
            transition={{ ...baseTransition, duration: reduceMotion ? 0 : 360 }}
          >
            <AntDesign
              name="scan"
              size={34}
              color="#000000"
              style={{ alignSelf: 'center', marginBottom: 16 }}
            />

            <MotiView
              from={{ opacity: 0, translateX: -40 }}
              animate={{ opacity: 1, translateX: 0 }}
              exit={{ opacity: 0, translateX: -40 }}
              transition={{ ...baseTransition, delay: 60 }}
            >
              <Text style={styles.cardTitle}>{title}</Text>
            </MotiView>

            <View style={styles.cardCheckboxContainer}>
              {requirements?.map((requirement, index) => (
                <MotiView
                  key={requirement.id}
                  from={{ opacity: 0, translateX: -30 }}
                  animate={{ opacity: 1, translateX: 0 }}
                  exit={{ opacity: 0, translateX: -30 }}
                  transition={{
                    ...baseTransition,
                    duration: reduceMotion ? 0 : 360,
                    delay: reduceMotion ? 0 : index * 70,
                  }}
                >
                  <CheckboxRounded
                    text={requirement.text}
                    checked={requirement.checked}
                    onToggle={() => toggleRequirement(requirement.id)}
                  />
                </MotiView>
              ))}
            </View>
          </MotiView>
        )}
      </AnimatePresence>

      {/* Scan Button */}
      <MotiView
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ ...baseTransition, delay: 300 }}
      >
        <Button
          text="Escanear"
          disabled={!allChecked || isLoading}
          onClick={handleExecuteScan}
        />
      </MotiView>
    </MotiView>
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
    paddingHorizontal: 44,
    width: '100%',
    zIndex: 2,
  },

  cardTitle: {
    color: '#000000',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    paddingHorizontal: 20,
  },

  cardCheckboxContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
    marginBottom: 25,
  }
});

export default Card;
