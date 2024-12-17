import { StyleSheet } from 'react-native';

export const colors = {
  background: '#f5f5f5',
  primary: '#333',
  secondary: '#666',
  white: '#ffffff',
  shadow: '#000000'
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  cardContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    color: colors.primary,
  },
  subText: {
    color: colors.secondary,
  }
});