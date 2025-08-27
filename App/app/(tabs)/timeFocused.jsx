import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';

export default function TimeFocusedScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#121212', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>Time Focused</Text>
    </SafeAreaView>
  );
}
