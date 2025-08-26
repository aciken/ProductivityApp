import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StatusBar, StyleSheet, Animated, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useGlobalContext } from '../context/GlobalProvider';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

export default function TimerScreen() {
  const router = useRouter();
  const { 
    isWorkSessionActive, 
    workSessionSettings, 
    endWorkSession,
    timer 
  } = useGlobalContext();

  const glowOpacity = useRef(new Animated.Value(0.7)).current;

  // Pulsing glow animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowOpacity, {
          toValue: 1,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(glowOpacity, {
          toValue: 0.7,
          duration: 2500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);
  
  useEffect(() => {
    if (!isWorkSessionActive) {
      router.back();
    }
  }, [isWorkSessionActive]);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleEndSession = () => {
    endWorkSession();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="chevron-down" size={36} color="#A0A0A0" />
      </TouchableOpacity>
      
      <Animated.View style={[styles.icebergContainer, { opacity: glowOpacity }]}>
        <LinearGradient
            colors={['rgba(0, 122, 255, 0.3)', 'rgba(12, 12, 12, 0)']}
            style={styles.icebergGradient}
        />
        <Image
          source={require('../../assets/iceberg.png')}
          style={styles.icebergImage}
          resizeMode="contain"
        />
      </Animated.View>

      <View style={styles.timerContainer}>
        <Text style={styles.goalText}>{workSessionSettings.goal || 'Focus Session'}</Text>
        <Text style={styles.timerText}>{formatTime(timer)}</Text>
      </View>
      
      <TouchableOpacity onPress={handleEndSession} style={styles.endButton}>
        <BlurView
            tint="dark"
            intensity={50}
            style={styles.endButtonBlur}
        >
            <LinearGradient
                colors={['rgba(255, 95, 95, 0.6)', 'rgba(217, 50, 50, 0.4)']}
                style={StyleSheet.absoluteFillObject}
            />
            <Ionicons name="stop" size={24} color="white" style={{ marginRight: 12 }} />
            <Text style={styles.endButtonText}>End Session</Text>
        </BlurView>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    backButton: {
        position: 'absolute',
        top: 60,
        alignSelf: 'center',
    },
    icebergContainer: {
        width: 300,
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: '15%',
    },
    icebergGradient: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        borderRadius: 150,
    },
    icebergImage: {
        width: '80%',
        height: '80%',
    },
    timerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '60%',
    },
    goalText: {
        color: '#A0A0A0',
        fontSize: 22,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 16,
    },
    timerText: {
        color: 'white',
        fontSize: 72,
        fontWeight: 'bold',
        letterSpacing: 2,
    },
    endButton: {
        height: 60,
        width: '80%',
        shadowColor: '#FF5F5F',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 15,
        position: 'absolute',
        bottom: 80,
    },
    endButtonBlur: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 30,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    endButtonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
