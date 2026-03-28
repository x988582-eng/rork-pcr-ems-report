import { StyleSheet, Text, View, TouchableOpacity, Alert, Share, Platform } from "react-native";
import { FileText, Save, Trash2, Share2 } from "lucide-react-native";
import { useReport } from "@/hooks/report-context";
import { useRouter } from "expo-router";
import { generateNarrative } from "@/utils/narrative-generator";

export default function ActionsScreen() {
  const { currentReport, saveReport, clearCurrentReport } = useReport();
  const router = useRouter();

  const handleGenerateNarrative = () => {
    router.push('/narrative' as any);
  };

  const handleSaveReport = () => {
    Alert.alert(
      'Save Report',
      'This will save the current report to history and start a new one. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Save', 
          onPress: () => {
            saveReport();
            Alert.alert('Success', 'Report saved to history');
          }
        }
      ]
    );
  };

  const handleClearReport = () => {
    Alert.alert(
      'Clear Report',
      'This will delete all current report data. This cannot be undone. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive',
          onPress: () => {
            clearCurrentReport();
            Alert.alert('Success', 'Report cleared');
          }
        }
      ]
    );
  };

  const handleExport = async () => {
    const narrative = generateNarrative(currentReport);
    const fileName = `PCR_${currentReport.id}_${new Date().toISOString().split('T')[0]}.md`;
    
    if (Platform.OS === 'web') {
      // Web export
      const blob = new Blob([narrative], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      // Mobile share
      try {
        await Share.share({
          message: narrative,
          title: fileName,
        });
      } catch {
        Alert.alert('Error', 'Failed to share report');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Report Actions</Text>
        <Text style={styles.headerSubtitle}>
          Manage and export your current report
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.primaryButton]}
          onPress={handleGenerateNarrative}
        >
          <FileText size={24} color="#FFFFFF" />
          <View style={styles.actionText}>
            <Text style={styles.actionTitle}>Generate Narrative</Text>
            <Text style={styles.actionDescription}>
              Create formatted report narrative
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, styles.secondaryButton]}
          onPress={handleExport}
        >
          <Share2 size={24} color="#0066CC" />
          <View style={styles.actionText}>
            <Text style={[styles.actionTitle, styles.secondaryText]}>
              Export Report
            </Text>
            <Text style={styles.actionDescription}>
              Share as Markdown file
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, styles.successButton]}
          onPress={handleSaveReport}
        >
          <Save size={24} color="#FFFFFF" />
          <View style={styles.actionText}>
            <Text style={styles.actionTitle}>Save to History</Text>
            <Text style={styles.actionDescription}>
              Archive and start new report
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, styles.dangerButton]}
          onPress={handleClearReport}
        >
          <Trash2 size={24} color="#FFFFFF" />
          <View style={styles.actionText}>
            <Text style={styles.actionTitle}>Clear Report</Text>
            <Text style={styles.actionDescription}>
              Delete all current data
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Privacy Notice</Text>
        <Text style={styles.infoText}>
          All data is stored locally on your device. No information is transmitted 
          to external servers. Reports are your responsibility to manage and secure.
        </Text>
      </View>
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
  actions: {
    padding: 20,
    gap: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    gap: 16,
  },
  primaryButton: {
    backgroundColor: "#0066CC",
  },
  secondaryButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#0066CC",
  },
  successButton: {
    backgroundColor: "#34C759",
  },
  dangerButton: {
    backgroundColor: "#FF3B30",
  },
  actionText: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  secondaryText: {
    color: "#0066CC",
  },
  actionDescription: {
    fontSize: 13,
    color: "rgba(255,255,255,0.8)",
  },
  infoCard: {
    margin: 20,
    marginTop: "auto",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: "#8E8E93",
    lineHeight: 18,
  },
});