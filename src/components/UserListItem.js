import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { formatters } from '../utils/formatters';

const UserListItem = ({ user, onPress }) => {
  // Generate a deterministic image based on user ID
  const getUserImage = (userId) => {
    return `https://picsum.photos/seed/${userId}/200/200`;
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={() => onPress(user)}
    >
      <Image 
        source={{ uri: getUserImage(user.id) }}
        style={styles.profileImage}
        defaultSource={require('../../assets/images/placeholder.png')}
      />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>
          {formatters.capitalizeFirstLetter(user.name)}
        </Text>
        <Text style={styles.userEmail}>
          {user.email.toLowerCase()}
        </Text>
        <View style={styles.userInitials}>
          <Text style={styles.initialsText}>
            {formatters.getInitials(user.name)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    color: '#666',
    marginBottom: 5,
  },
  userInitials: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#007bff',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default UserListItem;