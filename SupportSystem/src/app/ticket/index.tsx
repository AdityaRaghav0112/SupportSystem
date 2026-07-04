import { useEffect, useState } from "react";
import { router } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { getTickets } from "../../api/ticket";
import { useAuth } from "../../context/AuthContext";

export default function TicketListScreen() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const isManager = user?.role === "management";

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const data = await getTickets();
      console.log(data);
      setTickets(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>All Tickets</Text>
        <Text style={styles.subtitle}>
          {isManager
            ? "Browse every support request across the system."
            : "Browse your support requests."}
        </Text>

        {tickets.length === 0 ? (
          <Text style={styles.empty}>No tickets found.</Text>
        ) : (
          tickets.map((ticket: any) => (
            <Pressable
              key={ticket.id}
              style={styles.card}
              onPress={() => router.push(`/ticket/${ticket.id}`)}
            >
              <View style={styles.row}>
                <Text style={styles.cardTitle}>{ticket.title}</Text>
                <Text style={styles.status}>{ticket.status}</Text>
              </View>

              <Text style={styles.description}>
                {ticket.description}
              </Text>
            </Pressable>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 20,
    color: "#6B7280",
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 14,
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  cardTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  status: {
    color: "#2563EB",
    fontWeight: "600",
  },
  description: {
    marginTop: 10,
    color: "#6B7280",
  },
  empty: {
    marginTop: 40,
    textAlign: "center",
    color: "#6B7280",
    fontSize: 16,
  },
});