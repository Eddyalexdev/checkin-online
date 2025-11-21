import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { Button, CheckboxRounded } from './';
import { AntDesign } from '@expo/vector-icons'
import { useCallback, useEffect, useMemo, useState } from 'react';
import { IRequirement } from '@/types';
import { useScan } from '../hooks';

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
    <View style={styles.card}>
      {
        isLoading ?
          <View style={{ marginBottom: 16, alignItems: 'center', height: 200 }}>
            <ActivityIndicator size="large" color="#00ccc0" />
            <Text style={{ textAlign: 'center', color: '#555', marginBottom: 8, fontSize: 16 }}>
              {statusText}
            </Text>
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
          <Text style={styles.cardTitle}>{ title }</Text>
          <View style={styles.cardCheckboxContainer}>
            {
              requirements?.map((requirement) => (
                <CheckboxRounded 
                  key={requirement.id}
                  id={requirement.id}
                  text={requirement.text}
                  checked={requirement.checked}
                  onToggle={() => toggleRequirement(requirement.id)}
                />
              ))
            }
          </View>
        </>
      }

      <Button 
        text="Escanear" 
        disabled={!allChecked || isLoading} 
        onClick={handleExecuteScan}
      />
    </View>
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
