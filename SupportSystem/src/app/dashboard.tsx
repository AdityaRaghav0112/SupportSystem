import { useEffect, useState } from "react";
import { router } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import TicketCard from "../components/TicketCard";
import { getTickets } from "../api/ticket";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading, logout } = useAuth();
  const isManager = user?.role === "management";
  const isIt = user?.role === "it";
  const canCreateTicket = user?.role === "user";

  useEffect(() => {
    if (!user) {
      return;
    }

    loadTickets();
  }, [user]);

  const loadTickets = async () => {
    try {
      const data = await getTickets();
      const latestTickets = [...data].sort(
        (a, b) =>
          new Date(b.created_at ?? 0).getTime() -
          new Date(a.created_at ?? 0).getTime()
      );
      setTickets(latestTickets);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          padding: 20,
        }}
      >
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.hello}>Hello 👋</Text>
            <Text style={styles.name}>{user?.name ?? "Support"}</Text>
          </View>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.heading}>
          {isManager
            ? "Manager Dashboard"
            : isIt
              ? "IT Dashboard"
              : "Support Dashboard"}
        </Text>

        <Text style={styles.subheading}>
          {isManager
            ? "Review every ticket and assign work to the IT department."
            : isIt
              ? "Work only on tickets assigned to the IT department."
              : "Track your requests and raise a new ticket when needed."}
        </Text>

              {canCreateTicket ? (
                <Pressable
                  style={styles.button}
                  onPress={() => router.push("/ticket/create")}
                >
                  <Text style={styles.buttonText}>
                    + Raise New Ticket
                  </Text>
                </Pressable>
              ) : null}

        <View style={styles.row}>
          <Text style={styles.section}>
            {isManager
              ? "Latest Tickets"
              : isIt
                ? "Assigned Tickets"
                : "Recent Tickets"}
          </Text>

          <Pressable
            onPress={() => router.push("/ticket")}
          >
            <Text style={styles.viewAll}>
              View All
            </Text>
          </Pressable>
        </View>

        {loading || authLoading ? (
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

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
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
    marginBottom: 10,
  },

  subheading: {
    color: "#6B7280",
    lineHeight: 20,
    marginBottom: 20,
  },

  logoutButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "#111827",
  },

  logoutText: {
    color: "#FFFFFF",
    fontWeight: "700",
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