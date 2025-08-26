import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, StyleSheet, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useGlobalContext } from '../context/GlobalProvider';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

export default function StartWorkModal() {
  const router = useRouter();
  const { startWorkSession } = useGlobalContext();
  const [goal, setGoal] = useState('');
  const [duration, setDuration] = useState(50 * 60); // Default to 50 mins in seconds
  const [blockNotifications, setBlockNotifications] = useState(true);

  const durationOptions = [
      { label: '25 min', value: 25 * 60 },
      { label: '50 min', value: 50 * 60 },
      { label: '90 min', value: 90 * 60 },
  ];

  const handleStartSession = () => {
    startWorkSession({ duration, goal, blockNotifications });
    router.back();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
        <Ionicons name="close-circle" size={32} color="#A0A0A0" />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>New Focus Session</Text>
      <Text style={styles.headerSubtitle}>Configure your session to begin your deep work.</Text>
      
      {/* Session Goal */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>WHAT IS YOUR GOAL?</Text>
        <View style={styles.inputContainer}>
            <Ionicons name="flash-outline" size={24} color="#00aaff" style={{ marginRight: 12 }} />
            <TextInput
                style={styles.textInput}
                placeholder="e.g., Finish chapter 3 of my book"
                placeholderTextColor="#666"
                value={goal}
                onChangeText={setGoal}
            />
        </View>
      </View>

      {/* Session Duration */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>SESSION DURATION</Text>
        <View style={styles.durationOptionsContainer}>
            {durationOptions.map((option) => (
                <TouchableOpacity 
                    key={option.label}
                    style={styles.durationButton}
                    onPress={() => setDuration(option.value)}
                >
                    <BlurView
                        tint="dark"
                        intensity={50}
                        style={{
                            ...StyleSheet.absoluteFillObject,
                            borderRadius: 10,
                            overflow: 'hidden',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        {duration === option.value && (
                            <LinearGradient
                                colors={['rgba(0, 170, 255, 0.6)', 'rgba(0, 80, 255, 0.4)']}
                                style={StyleSheet.absoluteFillObject}
                            />
                        )}
                        <Text style={[styles.durationButtonText, duration === option.value && styles.durationButtonTextSelected]}>
                            {option.label}
                        </Text>
                    </BlurView>
                </TouchableOpacity>
            ))}
        </View>
      </View>

      {/* Settings */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>SETTINGS</Text>
        <View style={styles.settingRow}>
            <Ionicons name="notifications-off-outline" size={24} color="#A0A0A0" style={{ marginRight: 12 }} />
            <Text style={styles.settingText}>Block Notifications</Text>
            <Switch
                trackColor={{ false: '#333', true: '#00aaff' }}
                thumbColor={blockNotifications ? '#fff' : '#888'}
                onValueChange={() => setBlockNotifications(prev => !prev)}
                value={blockNotifications}
            />
        </View>
      </View>


      <TouchableOpacity 
          onPress={handleStartSession} 
          style={styles.startButton}
      >
        <BlurView
            tint="dark"
            intensity={30}
            style={styles.startButtonBlur}
        >
            <LinearGradient
                colors={['rgba(0, 170, 255, 0.8)', 'rgba(0, 80, 255, 0.6)']}
                style={StyleSheet.absoluteFillObject}
            />
            <Ionicons name="play" size={22} color="white" style={{ marginRight: 10 }}/>
            <Text style={styles.startButtonText}>
              Start Session
            </Text>
        </BlurView>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 20,
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 60,
        right: 20,
        zIndex: 1,
    },
    headerTitle: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 100,
        marginBottom: 8,
    },
    headerSubtitle: {
        color: '#A0A0A0',
        fontSize: 16,
        marginBottom: 40,
        textAlign: 'center'
    },
    sectionContainer: {
        width: '100%',
        marginBottom: 30,
    },
    sectionTitle: {
        color: '#A0A0A0',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 12,
        marginLeft: 4
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1E1E1E',
        borderRadius: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: '#333',
    },
    textInput: {
        flex: 1,
        color: 'white',
        fontSize: 16,
    },
    durationOptionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    durationButton: {
        height: 50,
        width: '32%',
    },
    durationButtonSelected: {},
    durationButtonText: {
        color: '#A0A0A0',
        fontSize: 16,
        fontWeight: '600',
    },
    durationButtonTextSelected: {
        color: 'white',
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1E1E1E',
        borderRadius: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: '#333',
    },
    settingText: {
        flex: 1,
        color: 'white',
        fontSize: 16,
    },
    startButton: {
        height: 55,
        width: '80%',
        shadowColor: '#00aaff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.7,
        shadowRadius: 15,
        position: 'absolute',
        bottom: 50,
    },
    startButtonBlur: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 30,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    startButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
