import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Share, Platform, Alert } from "react-native";
import { useReport } from "@/hooks/report-context";
import { generateNarrative } from "@/utils/narrative-generator";
import { Share2, Download, Copy } from "lucide-react-native";
import * as Clipboard from 'expo-clipboard';

export default function NarrativeScreen() {
  const { currentReport } = useReport();
  const narrative = generateNarrative(currentReport);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(narrative);
    Alert.alert('Success', 'Narrative copied to clipboard');
  };

  const handleShare = async () => {
    const fileName = `PCR_${currentReport.id}_${new Date().toISOString().split('T')[0]}.md`;
    
    if (Platform.OS === 'web') {
      // Web download
      const blob = new Blob([narrative], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
      Alert.alert('Success', 'File downloaded');
    } else {
      // Mobile share
      try {
        await Share.share({
          message: narrative,
          title: fileName,
        });
      } catch {
        Alert.alert('Error', 'Failed to share narrative');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Narrative Preview</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleCopy}>
            <Copy size={20} color="#0066CC" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
            {Platform.OS === 'web' ? (
              <Download size={20} color="#0066CC" />
            ) : (
              <Share2 size={20} color="#0066CC" />
            )}
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.narrativeContainer}>
          <Text style={styles.narrative}>{narrative}</Text>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.exportButton} onPress={handleShare}>
          {Platform.OS === 'web' ? (
            <>
              <Download size={20} color="#FFFFFF" />
              <Text style={styles.exportButtonText}>Download Markdown</Text>
            </>
          ) : (
            <>
              <Share2 size={20} color="#FFFFFF" />
              <Text style={styles.exportButtonText}>Share Markdown</Text>
            </>
          )}
        </TouchableOpacity>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000000",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#F2F2F7",
  },
  content: {
    flex: 1,
  },
  narrativeContainer: {
    backgroundColor: "#FFFFFF",
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  narrative: {
    fontSize: 14,
    lineHeight: 22,
    color: "#000000",
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  footer: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
  },
  exportButton: {
    flexDirection: "row",
    backgroundColor: "#0066CC",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  exportButtonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});