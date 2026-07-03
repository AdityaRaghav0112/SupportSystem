import { router } from "expo-router";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import TicketCard from "../components/TicketCard";

const tickets = [
  {
    id: 1,
    title: "Laptop not booting",
    priority: "High",
    status: "Pending",
  },
  {
    id: 2,
    title: "VPN not connecting",
    priority: "Medium",
    status: "In Progress",
  },
  {
    id: 3,
    title: "Printer issue",
    priority: "Low",
    status: "Resolved",
  },
];

export default function Dashboard() {
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
          <Text style={styles.buttonText} onPress={() => router.push("/ticket/create")}>
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

        {tickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            {...ticket}
            onPress={() =>
              router.push(`/ticket/${ticket.id}`)
            }
          />
        ))}
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
});