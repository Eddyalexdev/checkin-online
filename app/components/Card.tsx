import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { Button, CheckboxRounded } from './';
import { AntDesign } from '@expo/vector-icons'
import { useCallback, useEffect, useMemo, useState } from 'react';
import { IRequirement } from '@/types';
import { useScan } from '../hooks';
import { MotiView } from 'moti';

// Props interface
interface IProps {
  title: string;
  data: IRequirement[];
  handleScan?: () => void;
}

// Component
const Card = ({ title, data, handleScan }: IProps) => {
  const [requirements, setRequirements] = useState<IRequirement[]>([]);
  const { takePicture, isLoading, statusText } = useScan();

  // Functions
  const handleExecuteScan = async () => {
    const { status } = await takePicture();

    if(!status) return;
    
    handleScan && handleScan();
  }

  // Update requirements state when data prop changes
  useEffect(()=> {
    setRequirements(data.map(r => ({ ...r, checked: !!r.checked })));
  }, [data])

  const toggleRequirement = useCallback((id: number) => {
    setRequirements(prev =>
      prev.map(r => (r.id === id ? { ...r, checked: !r.checked } : r))
    );
  }, []);

  const allChecked = useMemo(
    () => requirements.length > 0 && requirements.every(r => !!r.checked),
    [requirements]
  );


  return (
    <MotiView 
      from={{ opacity: 0, translateY: 100 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 500 }}
      style={styles.card}
    >
      {
        isLoading ?
          <View style={{ marginBottom: 16, alignItems: 'center', height: 200, justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row', marginBottom: 16, height: 24 }}>
              {[0, 1, 2].map((i) => (
                <MotiView
                  key={i}
                  from={{ scale: 0.5, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: 'timing',
                    duration: 500,
                    delay: i * 200,
                    loop: true,
                    repeatReverse: true,
                  }}
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: '#00ccc0',
                    marginHorizontal: 4,
                  }}
                />
              ))}
            </View>

            <MotiView
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: 'timing', duration: 1000, loop: true, repeatReverse: true }}
            >
              <Text style={{ textAlign: 'center', color: '#555', fontSize: 16 }}>
                {statusText}
              </Text>
            </MotiView>
          </View>
          :
          <AntDesign
            name="scan"
            size={34}
            color="#000000"
            style={{ alignSelf: 'center', marginBottom: 16 }}
          />
      }


      {/* List of requeirements with checkboxes */}
      {
        !isLoading &&
          <>
            <MotiView
              from={{ opacity: 0, translateX: -50 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ type: 'timing', duration: 500, delay: 100 }}
            >
              <Text style={styles.cardTitle}>{ title }</Text>
            </MotiView>
            <View style={styles.cardCheckboxContainer}>
              {
                requirements?.map((requirement, index) => (
                  <MotiView
                    key={requirement.id}
                    from={{ opacity: 0, translateX: -50 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    transition={{ type: 'timing', duration: 500, delay: index * 100 }}
                  >
                    <CheckboxRounded 
                      id={requirement.id}
                      text={requirement.text}
                      checked={requirement.checked}
                      onToggle={() => toggleRequirement(requirement.id)}
                    />
                  </MotiView>
                ))
              }
            </View>
          </>
      }

      <MotiView
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500, delay: 300 }}
      >
        <Button 
          text="Escanear" 
          disabled={!allChecked || isLoading} 
          onClick={handleExecuteScan}
        />
      </MotiView>
    </MotiView>
  )
}

// Styles
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

export default Card
