import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { router } from "expo-router";

import { createTicket } from "../../api/ticket";

export default function CreateTicketScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert("Validation", "Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      await createTicket({
        title,
        description,
      });

      Alert.alert("Success", "Ticket created successfully!");

      router.replace("/dashboard");
    } catch (error: any) {
      console.log(error.response?.data || error);
      Alert.alert("Error", "Unable to create ticket.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Raise Ticket</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>

        <TextInput
          placeholder="Enter ticket title"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Description</Text>

        <TextInput
          placeholder="Describe your issue"
          style={[styles.input, styles.description]}
          multiline
          textAlignVertical="top"
          value={description}
          onChangeText={setDescription}
        />

        <Pressable
          style={styles.button}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Submit Ticket</Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 20,
  },

  heading: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 30,
  },

  form: {
    gap: 14,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  description: {
    height: 140,
  },

  button: {
    marginTop: 20,
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});