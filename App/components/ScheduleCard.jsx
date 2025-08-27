import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function SchedulePresetCard({ item, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.card}>
            <ImageBackground 
                source={item.image} 
                style={styles.imageBackground}
            >
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.8)']}
                    style={styles.gradient}
                />
                <View style={styles.contentContainer}>
                    <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                    <View style={styles.bottomRow}>
                        <Text style={styles.duration}>{item.duration}</Text>
                        <Ionicons name="play-circle-outline" size={26} color="rgba(255, 255, 255, 0.8)" />
                    </View>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 170,
        height: 220,
        borderRadius: 24,
        marginRight: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        backgroundColor: '#1E1E1E',
    },
    imageBackground: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
    },
    contentContainer: {
        padding: 16,
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    duration: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 15,
        fontWeight: '500',
    },
});
