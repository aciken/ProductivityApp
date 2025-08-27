import { View, TouchableOpacity, Text } from 'react-native';
import { usePathname, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function CustomTabBar() {
  const pathname = usePathname();

  const tabs = [
    { 
      name: 'Home', 
      path: '/home', 
      ionIcon: 'home'
    },
    { 
      name: 'Time Focused', 
      path: '/timeFocused', 
      ionIcon: 'leaf'
    },
    { 
      name: 'Screen Time', 
      path: '/screenTime', 
      ionIcon: 'phone-portrait'
    },
    { 
      name: 'Profile', 
      path: '/profile', 
      ionIcon: 'person'
    },
  ];

  const handleTabPress = (path) => {
    router.push(path);
  };

  return (
    <View style={{ 
      flexDirection: 'row', 
      justifyContent: 'space-around', 
      alignItems: 'center', 
      backgroundColor: '#121212', 
      paddingTop: 12,
      paddingBottom: 24, // Increased bottom padding to move icons up
    }}>
      {tabs.map((tab) => {
        const isActive = pathname === tab.path;
        return (
          <TouchableOpacity
            key={tab.path}
            style={{ 
              alignItems: 'center', 
              justifyContent: 'center',
            }}
            onPress={() => handleTabPress(tab.path)}
          >
            <Ionicons name={tab.ionIcon} size={28} color={isActive ? '#FFFFFF' : '#B3B8C8'} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}