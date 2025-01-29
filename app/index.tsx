import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>To Do List</Text>
      <Pressable style={styles.button} onPress={() => router.push('/logIn')}>
        <Text style={styles.buttonText}>Log In</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => router.push('/signUp')}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  button: {
    width: '90%',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 10,
    backgroundColor: '#E65F35',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
