import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from "react-native";
import { FileText, Trash2 } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useReport } from "@/hooks/report-context";
import type { PCRReport } from "@/types/report";

export default function HistoryScreen() {
  const { reports, deleteReport, loadReport } = useReport();
  const router = useRouter();

  const handleDelete = (report: PCRReport) => {
    Alert.alert(
      'Delete Report',
      `Delete report ${report.dispatch?.dispatchTime || report.id}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => deleteReport(report.id)
        }
      ]
    );
  };

  const handleOpenReport = async (report: PCRReport) => {
    await loadReport(report);
    router.push('/(tabs)/(report)');
  };

  const renderReport = ({ item }: { item: PCRReport }) => (
    <TouchableOpacity 
      style={styles.reportCard}
      onPress={() => handleOpenReport(item)}
      activeOpacity={0.7}
    >
      <View style={styles.reportIcon}>
        <FileText size={24} color="#0066CC" />
      </View>
      <View style={styles.reportContent}>
        <Text style={styles.reportTitle}>
          {item.dispatch?.dispatchTime || `Report ${item.id.slice(-6)}`}
        </Text>
        <Text style={styles.reportDate}>
          {new Date(item.createdAt).toLocaleDateString()} • {new Date(item.createdAt).toLocaleTimeString()}
        </Text>
        {item.dispatch?.natureOfCall && (
          <Text style={styles.reportNature}>{item.dispatch.natureOfCall}</Text>
        )}
        {item.dispatch?.location && (
          <Text style={styles.reportLocation}>{item.dispatch.location}</Text>
        )}
      </View>
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={(e) => {
          e.stopPropagation();
          handleDelete(item);
        }}
      >
        <Trash2 size={20} color="#FF3B30" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Report History</Text>
        <Text style={styles.headerSubtitle}>
          {reports.length} saved {reports.length === 1 ? 'report' : 'reports'}
        </Text>
      </View>

      {reports.length === 0 ? (
        <View style={styles.emptyState}>
          <FileText size={48} color="#C7C7CC" />
          <Text style={styles.emptyTitle}>No Reports Yet</Text>
          <Text style={styles.emptyText}>
            Saved reports will appear here
          </Text>
        </View>
      ) : (
        <FlatList
          data={reports}
          renderItem={renderReport}
          keyExtractor={(item, index) => item.id || `report-${index}`}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  header: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 15,
    color: "#8E8E93",
  },
  list: {
    padding: 20,
  },
  reportCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
  },
  reportIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E8F2FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  reportContent: {
    flex: 1,
  },
  reportTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 2,
  },
  reportDate: {
    fontSize: 13,
    color: "#8E8E93",
    marginBottom: 4,
  },
  reportNature: {
    fontSize: 14,
    color: "#0066CC",
    marginTop: 2,
  },
  reportLocation: {
    fontSize: 13,
    color: "#8E8E93",
    marginTop: 2,
  },
  deleteButton: {
    padding: 8,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    color: "#8E8E93",
    textAlign: "center",
  },
});