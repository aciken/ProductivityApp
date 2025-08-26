import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, StatusBar, ScrollView, Image, TouchableOpacity, ImageBackground, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { useGlobalContext } from '../context/GlobalProvider';

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
  const clearIcebergOpacity = useRef(new Animated.Value(0.1)).current; // Start with 10% opacity
  const glowOpacity = useRef(new Animated.Value(0.7)).current;
  
  // Animate the cross-fade based on work time
  useEffect(() => {
    const targetOpacity = Math.min(0.1 + (totalWorkTime / workGoal) * 0.9, 1);
    Animated.timing(clearIcebergOpacity, {
        toValue: targetOpacity,
        duration: 1000,
        useNativeDriver: true,
    }).start();
  }, [totalWorkTime]);

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

  const focusCards = [
    {
      title: 'Laser Focus',
      description: 'Your daily focus hour from 2-3pm, Weekdays',
      image: require('../../assets/GraphitImage.png'), 
      icon: 'flashlight'
    },
    {
      title: 'Rise & Shine',
      description: 'Wake up without distraction 6-9am Daily',
      image: require('../../assets/ForestImage.png'),
      icon: 'sunny'
    },
  ];

  const relaxCards = [
    {
      title: 'Clarity Mode',
      image: require('../../assets/MountainImage.png'),
    },
    {
      title: 'Deep Sleep',
      image: require('../../assets/CarImage.png'),
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
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
          <Ionicons name="flame" size={24} color="#FFD700" />
          <Text style={{ color: 'white', marginLeft: 4, marginRight: 12, fontWeight: 'bold' }}>1</Text>
          <TouchableOpacity style={{ backgroundColor: '#fff', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, marginRight: 12 }}>
            <Text style={{ color: 'black', fontWeight: 'bold' }}>⚡ Get PRO</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Work Time Section */}
        <View style={{ padding: 20, alignItems: 'center' }}>
            <Text style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 'bold', marginVertical: 8 }}>Time Focused</Text>
            
            <Animated.View style={{ 
              width: 250, 
              height: 250, 
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
                  borderRadius: 125,
                  borderWidth: 2,
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                }}
              />
              <View style={{
                width: 250,
                height: 250,
                shadowColor: '#00aaff',
                shadowOffset: { width: 0, height: 0 },
                shadowRadius: 15,
                shadowOpacity: 1,
              }}>
                {/* Blurred Iceberg in the background */}
                <Image
                  source={require('../../assets/iceberg2.png')}
                  style={{ width: '100%', height: '100%', position: 'absolute' }}
                  resizeMode="contain"
                />
                {/* The clear iceberg that fades in on top */}
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
            
            {/* Stats Section */}
                  <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '100%',
                marginTop: 24,
            }}>
                <View style={{ alignItems: 'center' }}>
                    <Ionicons name="leaf-outline" size={24} color="#00aaff" />
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 8 }}>
                        {formatWorkTime(totalWorkTime)}
                    </Text>
                    <Text style={{ color: '#A0A0A0', fontSize: 14, marginTop: 4 }}>
                        Time Focused
                    </Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Ionicons name="phone-portrait-outline" size={24} color="#A0A0A0" />
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 8 }}>
                        {formatWorkTime(phoneUsageTime)}
                    </Text>
                    <Text style={{ color: '#A0A0A0', fontSize: 14, marginTop: 4 }}>
                        Screen Time
                </Text>
                </View>
                </View>
                
            <Text style={{ color: '#A0A0A0', fontSize: 16, textAlign: 'center', marginTop: 24 }}>
              As you focus, the iceberg is revealed.
            </Text>
                </View>

        {/* Get More Done Section */}
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <Text style={{ color: '#FFFFFF', fontSize: 22, fontWeight: 'bold' }}>Get More Done</Text>
          <Text style={{ color: '#A0A0A0', fontSize: 16, marginBottom: 16 }}>Maximize your productivity while staying sane.</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {focusCards.map((card, index) => (
              <TouchableOpacity key={index} style={{ marginRight: 16 }}>
                <ImageBackground source={card.image} style={{ width: 180, height: 220, borderRadius: 20, overflow: 'hidden', justifyContent: 'space-between', padding: 16 }} imageStyle={{ borderRadius: 20 }}>
                  <View style={{ backgroundColor: 'rgba(0,0,0,0.3)', padding: 8, borderRadius: 12, alignSelf: 'flex-start' }}>
                    <Ionicons name={card.icon} size={24} color="white" />
                  </View>
                  <View>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{card.title}</Text>
                    <Text style={{ color: 'white', fontSize: 14 }}>{card.description}</Text>
                </View>
                </ImageBackground>
                <TouchableOpacity style={{ position: 'absolute', bottom: 16, right: 16, backgroundColor: 'rgba(255,255,255,0.8)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 }}>
                   <Text style={{ color: 'black', fontWeight: 'bold' }}>+ Add</Text>
                </TouchableOpacity>
            </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        {/* Sleep, Relax and Reset Section */}
        <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
          <Text style={{ color: '#FFFFFF', fontSize: 22, fontWeight: 'bold' }}>Sleep, Relax and Reset</Text>
          <Text style={{ color: '#A0A0A0', fontSize: 16, marginBottom: 16 }}>Sleep better, rise refreshed.</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {relaxCards.map((card, index) => (
              <TouchableOpacity key={index} style={{ marginRight: 16 }}>
                <ImageBackground source={card.image} style={{ width: 180, height: 120, borderRadius: 20, overflow: 'hidden', justifyContent: 'flex-end', padding: 16 }} imageStyle={{ borderRadius: 20 }}>
                   <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{card.title}</Text>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Clarity Mode Banner */}
      <BlurView tint="dark" intensity={50} style={{
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        borderRadius: 16,
        overflow: 'hidden', // to make sure the blur respects the border radius
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        shadowColor: '#0077FF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.7,
        shadowRadius: 20,
        elevation: 15
      }}>
        <LinearGradient
            colors={['rgba(0, 80, 255, 0.4)', 'rgba(0, 20, 100, 0.6)']}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        />
        <View style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 16,
            backgroundColor: 'transparent'
        }}>
            {isWorkSessionActive ? (
              <>
                <TouchableOpacity onPress={() => router.push('/modal/timer')} style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="sunny" size={24} color="#FFD700" />
                  <View style={{ marginLeft: 12 }}>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>{workSessionSettings.goal || 'Clarity Mode'}</Text>
                    <Text style={{ color: '#A0A0A0' }}>{formatTime(timer)}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleBreak} style={{ backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="pause" size={18} color="black" />
                  <Text style={{ color: 'black', fontWeight: 'bold', marginLeft: 8 }}>Break</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity onPress={handleStartWork} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Start Work</Text>
              </TouchableOpacity>
            )}
        </View>
      </BlurView>
    </SafeAreaView>
  );
} 