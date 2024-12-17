import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '../styles/globalStyles';

const LoadingIndicator = ({ 
  size = 'large', 
  color = colors.primary, 
  fullScreen = true 
}) => {
  return (
    <View 
      style={[
        styles.container, 
        fullScreen ? styles.fullScreen : styles.inline
      ]}
    >
      <ActivityIndicator 
        size={size} 
        color={color} 
        testID="loading-indicator"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  inline: {
    height: 100,
    width: '100%',
  }
});

export default LoadingIndicator;