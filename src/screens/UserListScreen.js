import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Image,
  TextInput,
  Dimensions,
  LayoutAnimation,
  UIManager,
  Platform
} from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient'; // for gradient backgrounds
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome for the search icon

const { width } = Dimensions.get('window'); // Screen width

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const UserListScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [hasMoreUsers, setHasMoreUsers] = useState(true);
  const [sortKey, setSortKey] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchUsers = async (pageNum, isRefresh = false) => {
    if (!hasMoreUsers && !isRefresh) return;

    try {
      isRefresh ? setRefreshing(true) : setLoading(true);

      const response = await axios.get('https://jsonplaceholder.typicode.com/users', {
        params: {
          _page: pageNum,
          _limit: 10
        }
      });

      const newUsers = response.data;
      setHasMoreUsers(newUsers.length === 10);

      setUsers(prevUsers =>
        isRefresh ? newUsers : [...prevUsers, ...newUsers]
      );

      setError(null);
    } catch (err) {
      setError(
        err.response
          ? `Error ${err.response.status}: ${err.response.data}`
          : 'Network error. Please check your connection.'
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const onRefresh = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setUsers(prevUsers => shuffleArray(prevUsers)); // Shuffle users
    setPage(1);
    fetchUsers(1, true);
  }, []);

  const shuffleArray = (array) => {
    return array
      .map(item => ({ ...item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ sort, ...item }) => item);
  };

  const sortUsers = (key) => {
    setSortKey(key);
    const sortedUsers = [...users].sort((a, b) =>
      a[key].localeCompare(b[key])
    );
    setUsers(sortedUsers);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderUserItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.userItem}
      onPress={() => navigation.navigate('UserDetails', { user: item })}
    >
      <View style={styles.userContent}>
        <Image
          source={{ uri: `https://picsum.photos/100?random=${index + 1}` }}
          style={styles.profilePicture}
        />
        <View>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.userEmail}>{item.email}</Text>
        </View>
      </View>
      <Image
        source={{ uri: 'https://img.icons8.com/ios-filled/50/666666/chevron-right.png' }}
        style={styles.arrowIcon}
      />
    </TouchableOpacity>
  );

  const loadMoreUsers = () => {
    if (!loading && hasMoreUsers) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff6347" />
      </View>
    );
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No users found</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search by name or email"
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Icon name="search" size={20} color="#aaa" style={styles.searchIconInside} />
      </View>
      <View style={styles.sortContainer}>
        <TouchableOpacity
          onPress={() => sortUsers('name')}
          style={[styles.sortButton, { backgroundColor: sortKey === 'name' ? '#007BFF' : '#f0f0f0' }]}
        >
          <Text style={[styles.sortButtonText, { color: sortKey === 'name' ? '#fff' : '#000' }]}>Sort by Name</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => sortUsers('email')}
          style={[styles.sortButton, { backgroundColor: sortKey === 'email' ? '#ff6347' : '#f0f0f0' }]}
        >
          <Text style={[styles.sortButtonText, { color: sortKey === 'email' ? '#fff' : '#000' }]}>Sort by Email</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredUsers}
        renderItem={renderUserItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        onEndReached={loadMoreUsers}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmptyList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#ff6347']}
            tintColor="#ff6347"
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    position: 'relative', // Ensure icon can be positioned inside the container
  },
  searchBar: {
    height: 45,
    flex: 1,
    paddingLeft: 35, // Add space on the left for the icon
    paddingRight: 15,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 25,
  },
  searchIconInside: {
    position: 'absolute',
    left: 10,
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  sortButton: {
    flex: 1,
    marginHorizontal: 9,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 15,
  },
  sortButtonText: {
    fontWeight: 'bold',
  },
  userItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
    alignItems: 'center',
  },
  userContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profilePicture: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: (width * 0.15) / 2,
    marginRight: 15,
  },
  arrowIcon: {
    width: 12,
    height: 13,
    marginLeft: 'auto',
    tintColor: '#000',
  },
  userName: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  userEmail: {
    color: '#666',
    fontSize: width * 0.035,
  },
  loadingContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  },
});

export default UserListScreen;
