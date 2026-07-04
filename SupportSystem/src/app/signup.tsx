import { useState } from "react";
import { router } from "expo-router";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useAuth } from "../context/AuthContext";

export default function SignupScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { registerUser } = useAuth();

  const handleSignup = async () => {
    try {
      setLoading(true);

      await registerUser(name, email, password, confirmPassword);

      router.replace("/dashboard");
    } catch (error: any) {
      const message =
        error?.response?.data?.message ??
        "Unable to create account. Please check the form and try again.";
      Alert.alert("Signup failed", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Create account</Text>
        <Text style={styles.subtitle}>
          New signups are created as regular users by default.
        </Text>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              placeholder="Enter your name"
              placeholderTextColor="#9CA3AF"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="Enter your email"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="Create a password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              placeholder="Confirm your password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.input}
            />
          </View>

          <TouchableOpacity
            style={styles.signupButton}
            onPress={handleSignup}
            disabled={loading}
          >
            <Text style={styles.signupButtonText}>
              {loading ? "Creating..." : "Sign Up"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.replace("/")}> 
            <Text style={styles.loginLink}>Already have an account? Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1E3A8A",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    lineHeight: 22,
    marginBottom: 40,
  },
  form: {
    gap: 18,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 15,
    fontSize: 16,
  },
  signupButton: {
    marginTop: 10,
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  signupButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  loginLink: {
    textAlign: "center",
    color: "#2563EB",
    fontWeight: "600",
    marginTop: 8,
  },
});