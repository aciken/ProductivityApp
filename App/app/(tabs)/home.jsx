import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, StatusBar, ScrollView, Image, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { useGlobalContext } from '../context/GlobalProvider';
import SchedulePresetCard from '../../components/ScheduleCard'; // Renamed for clarity

export default function HomeScreen() {
  const router = useRouter();
  const { 
      isWorkSessionActive, 
      workSessionSettings, 
      endWorkSession,
      timer,
      totalWorkTime
  } = useGlobalContext();

  const [phoneUsageTime, setPhoneUsageTime] = useState(5400); // Mock data: 1h 30m

  const workGoal = 4 * 3600; // 4 hours in seconds
  const clearIcebergOpacity = useRef(new Animated.Value(0.1)).current;
  const glowOpacity = useRef(new Animated.Value(0.7)).current;
  
  useEffect(() => {
    const targetOpacity = Math.min(0.1 + (totalWorkTime / workGoal) * 0.9, 1);
    Animated.timing(clearIcebergOpacity, {
        toValue: targetOpacity,
        duration: 1000,
        useNativeDriver: true,
    }).start();
  }, [totalWorkTime]);

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

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const formatWorkTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const handleStartWork = () => {
    router.push('/modal/startWork');
  };

  const handleBreak = () => {
    endWorkSession();
  };

  const schedulePresetsData = [
      { id: '1', title: '🎯 Get it done', duration: '20m', image: require('../../assets/ForestImage.png') },
      { id: '2', title: '👨‍💻 Work Sprint', duration: '25m', image: require('../../assets/CarImage.png') },
      { id: '3', title: '🌙 Night Owl', duration: '45m', image: require('../../assets/MountainImage.png') },
  ];

  const famousSchedulesData = [
      { id: '1', title: '🎨 Da Vinci', duration: 'Polyphasic', image: require('../../assets/davinciImage2.png') },
      { id: '2', title: '⚡ B. Franklin', duration: 'Early Riser', image: require('../../assets/benImage.png') },
      { id: '3', title: '🚀 Elon Musk', duration: 'Time blocking', image: require('../../assets/elonImage.png') },
      { id: '4', title: '🇺🇸 Donald Trump', duration: '4-5 hour sleep', image: require('../../assets/trumpImage.png') },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0D1B2A' /* Match the top of the gradient */ }}>
      <LinearGradient
          colors={['#0D1B2A', '#121212']}
          style={StyleSheet.absoluteFill}
      />
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={{ 
        paddingHorizontal: 20, 
        paddingTop: 16, 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Text style={{ color: '#FFFFFF', fontSize: 32, fontWeight: 'bold' }}>Deeper</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../../assets/dropOfWater.png')} style={{ width: 24, height: 24 }} />
          <Text style={{ color: 'white', marginLeft: 4, marginRight: 12, fontWeight: 'bold' }}>1</Text>
          <TouchableOpacity style={{ backgroundColor: '#fff', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, marginRight: 12 }}>
            <Text style={{ color: 'black', fontWeight: 'bold' }}>⚡ Get PRO</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Work Time Section */}
        <View style={{ padding: 20, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => console.log("Iceberg pressed!")} activeOpacity={0.8}>
            <Animated.View style={{ 
              width: 220, 
              height: 220, 
              marginTop: 12, 
              alignItems: 'center', 
              justifyContent: 'center',
              opacity: glowOpacity
            }}>
              <LinearGradient
                colors={['rgba(0, 122, 255, 0.4)', 'rgba(12, 12, 12, 0)']}
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  borderRadius: 110,
                }}
              />
              <View style={{
                width: 220,
                height: 220,
                shadowColor: '#00aaff',
                shadowOffset: { width: 0, height: 0 },
                shadowRadius: 15,
                shadowOpacity: 1,
                borderWidth: 1,
                borderColor: '#60a5fa',
                borderRadius: 110,
              }}>
                <Image
                  source={require('../../assets/iceberg2.png')}
                  style={{ width: '100%', height: '100%', position: 'absolute' }}
                  resizeMode="contain"
                />
                <Animated.Image
                  source={require('../../assets/iceberg2.png')}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    position: 'absolute',
                    opacity: clearIcebergOpacity 
                  }}
                  resizeMode="contain"
                />
              </View>
            </Animated.View>
          </TouchableOpacity>
            
            {/* Stats Section */}
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '100%',
                marginTop: 24,
            }}>
                <TouchableOpacity style={{ alignItems: 'center', flex: 1 }} onPress={() => router.push('/timeFocused')}>
                    <Ionicons name="leaf-outline" size={24} color="#00aaff" />
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 8 }}>
                        {formatWorkTime(totalWorkTime)}
                    </Text>
                    <Text style={{ color: '#A0A0A0', fontSize: 14, marginTop: 4 }}>
                        Time Focused
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: 'center', flex: 1 }} onPress={() => router.push('/screenTime')}>
                    <Ionicons name="phone-portrait-outline" size={24} color="#A0A0A0" />
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 8 }}>
                        {formatWorkTime(phoneUsageTime)}
                    </Text>
                    <Text style={{ color: '#A0A0A0', fontSize: 14, marginTop: 4 }}>
                        Screen Time
                    </Text>
                </TouchableOpacity>
            </View>
        </View>

        {/* Focus Timer Section */}
        <View style={{ marginTop: 20 }}>
            <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                paddingHorizontal: 20,
            }}>
                <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>Focus Timer</Text>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="add" size={24} color="#A0A0A0" />
                    <Text style={{ color: '#A0A0A0', fontSize: 18, marginLeft: 4 }}>New</Text>
                </TouchableOpacity>
            </View>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 20, paddingLeft: 20 }}
            >
                {schedulePresetsData.map(item => <SchedulePresetCard key={item.id} item={item} onPress={() => {}} />)}
            </ScrollView>
        </View>

        {/* Famous Schedules Section */}
        <View style={{ marginTop: 30 }}>
            <View style={{ paddingHorizontal: 20 }}>
                <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>Famous Schedules</Text>
            </View>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 20, paddingLeft: 20 }}
            >
                {famousSchedulesData.map(item => <SchedulePresetCard key={item.id} item={item} onPress={() => {}} />)}
            </ScrollView>
        </View>
      </ScrollView>

      {/* --- NEW Work Session Banner --- */}
      <View style={styles.bannerContainer}>
        <Image 
            source={require('../../assets/underButton.png')} 
            style={styles.underlayImage}
        />
        <BlurView tint="dark" intensity={60} style={styles.bannerBlur}>
          {isWorkSessionActive ? (
            // --- Active Timer View ---
            <TouchableOpacity 
                onPress={() => router.push('/modal/timer')} 
                style={styles.bannerContentContainer}
            >
              <View>
                <Text style={styles.bannerTitle}>{workSessionSettings.goal || 'Focus Session'}</Text>
                <Text style={styles.bannerSubtitle}>{formatTime(timer)}</Text>
              </View>
              <TouchableOpacity onPress={handleBreak} style={styles.bannerActionButton}>
                <Ionicons name="stop" size={24} color="white" />
              </TouchableOpacity>
            </TouchableOpacity>
          ) : (
            // --- Start Work View ---
            <TouchableOpacity onPress={handleStartWork} style={styles.bannerContentContainer}>
              <View>
                <Text style={styles.bannerTitle}>Start Focus Session</Text>
                <Text style={styles.bannerSubtitle}>Tap anywhere to begin</Text>
              </View>
              {/* This is a non-touchable view for visual purposes, as the parent is the button */}
              <View style={styles.bannerActionButton}>
                <Ionicons name="play" size={24} color="white" />
              </View>
            </TouchableOpacity>
          )}
        </BlurView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    bannerContainer: {
        position: 'absolute',
        bottom: 20,
        left: '5%',
        right: '5%',
        width: '90%',
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 15,
        overflow: 'hidden', // Crucial for clipping the child image
    },
    underlayImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    bannerBlur: {
        width: '100%',
        height: '100%',
    },
    bannerContentContainer: {
        flex: 1, // Ensure it fills the BlurView
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 24,
        paddingRight: 12,
        paddingVertical: 12,
    },
    bannerTitle: {
        color: 'white',
        fontSize: 17,
        fontWeight: '600',
    },
    bannerSubtitle: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 14,
        marginTop: 4,
    },
    bannerActionButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
    },
}); 