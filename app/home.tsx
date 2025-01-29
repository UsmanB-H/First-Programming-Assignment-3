import { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { collection, addDoc, onSnapshot, deleteDoc, doc, query, where } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

interface Task {
  id: string;
  text: string;
}

export default function HomeScreen() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchTasks(user.uid);
      } else {
        router.replace('/');
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const fetchTasks = (userId: string) => {
    const q = query(collection(db, 'tasks'), where('userId', '==', userId));
    const unsubscribeTasks = onSnapshot(q, (snapshot) => {
      const fetchedTasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Task, 'id'>),
      }));
      setTasks(fetchedTasks);
    });

    return unsubscribeTasks;
  };

  // Add a new task
  const handleAddTask = async () => {
    if (!newTask.trim() || !userId) return;

    await addDoc(collection(db, 'tasks'), {
      text: newTask,
      userId,
    });

    setNewTask('');
  };

  // Delete a task
  const handleDeleteTask = async (id: string) => {
    await deleteDoc(doc(db, 'tasks', id));
  };

  // Log out
  const handleLogout = () => {
    auth.signOut();
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📓 My To-Do Notebook</Text>

      <TextInput
        style={styles.input}
        placeholder="Add a new task..."
        value={newTask}
        onChangeText={setNewTask}
        onSubmitEditing={handleAddTask}
      />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }: { item: Task }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>{item.text}</Text>
            <Pressable onPress={() => handleDeleteTask(item.id)}>
              <Text>✖</Text>
            </Pressable>
          </View>
        )}
      />

      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </Pressable>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf3e7',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Courier',
  },
  input: {
    width: '90%',
    padding: 10,
    borderBottomWidth: 2,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  taskItem: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
  },
  taskText: {
    fontSize: 18,
    fontFamily: 'Courier',
  },
  logoutButton: {
    marginTop: 20,
    marginBottom: 35,
    width: '50%',
    paddingVertical: 15,
    backgroundColor: '#E65F35',
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
