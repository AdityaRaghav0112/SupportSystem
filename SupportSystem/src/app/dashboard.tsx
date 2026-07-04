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

import TicketCard from "../components/TicketCard";
import { getTickets } from "../api/ticket";

export default function Dashboard() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const data = await getTickets();
      console.log("Tickets:", data);
      const latestTickets = [...data].sort(
        (a, b) =>
          new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime()
      );
      setTickets(latestTickets);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          padding: 20,
        }}
      >
        <Text style={styles.hello}>Hello 👋</Text>

        <Text style={styles.name}>Aditya</Text>

        <Text style={styles.heading}>
          Support Dashboard
        </Text>

        <Pressable
          style={styles.button}
          onPress={() => router.push("/ticket/create")}
        >
          <Text style={styles.buttonText}>
            + Raise New Ticket
          </Text>
        </Pressable>

        <View style={styles.row}>
          <Text style={styles.section}>
            Recent Tickets
          </Text>

          <Pressable
            onPress={() => router.push("/ticket")}
          >
            <Text style={styles.viewAll}>
              View All
            </Text>
          </Pressable>
        </View>

        {loading ? (
          <ActivityIndicator size="large" />
        ) : tickets.length === 0 ? (
          <Text style={styles.emptyText}>
            No tickets found.
          </Text>
        ) : (
          tickets.slice(0, 3).map((ticket: any) => (
            <TicketCard
              key={ticket.id}
              title={ticket.title}
              description={ticket.description}
              status={ticket.status}
              onPress={() =>
                router.push(`/ticket/${ticket.id}`)
              }
            />
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

  hello: {
    fontSize: 18,
    color: "#6B7280",
  },

  name: {
    fontSize: 30,
    fontWeight: "700",
    marginTop: 4,
  },

  heading: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 28,
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#2563EB",
    padding: 18,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 30,
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
    alignItems: "center",
  },

  section: {
    fontSize: 20,
    fontWeight: "700",
  },

  viewAll: {
    color: "#2563EB",
    fontWeight: "600",
  },

  emptyText: {
    textAlign: "center",
    color: "#6B7280",
    marginTop: 20,
    fontSize: 16,
  },
});