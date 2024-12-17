import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  Animated, 
  Easing 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // for background gradient

const UserDetailsScreen = ({ route }) => {
  const { user } = route.params;

  // Animations for smooth entry
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity is 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ScrollView style={styles.container} bounces={true}>
      <LinearGradient
        colors={['#e6dada', '#e6dada']}
        style={styles.gradientBackground}
      />
     
      <Animated.View style={[styles.detailsCard, { opacity: fadeAnim }]}>
        {/* User Profile Image */}
        <Image 
          source={{ uri: `https://picsum.photos/200?random=${user.id}` }} 
          style={styles.profileImage} 
        />
        
        <Text style={styles.name}>{user.name}</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <Text style={styles.detail}>Email: {user.email}</Text>
          <Text style={styles.detail}>Phone: {user.phone}</Text>
        </View>

        {/* Address Section - Ensure user.address is defined before accessing properties */}
        {user.address && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Address</Text>
            <Text style={styles.detail}>
              {user.address.street}, {user.address.suite}
            </Text>
            <Text style={styles.detail}>
              {user.address.city}, {user.address.zipcode}
            </Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Company</Text>
          <Text style={styles.detail}>{user.company.name}</Text>
          <Text style={styles.detail}>{user.company.catchPhrase}</Text>
        </View>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  gradientBackground: {
    position: 'absolute',
    top: 9,
    left: 11,
    right: 11,
    height: 555, // Height of the gradient background
    borderRadius: 56,
    elevation: 10,
  },
  detailsCard: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 50,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    elevation: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  section: {
    marginBottom: 20,
    alignSelf: 'stretch',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
    color: '#007bff',
  },
  detail: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
});

export default UserDetailsScreen;
