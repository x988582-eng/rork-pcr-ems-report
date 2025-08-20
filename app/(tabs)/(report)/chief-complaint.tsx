import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { useReport } from "@/hooks/report-context";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function ChiefComplaintScreen() {
  const { currentReport, updateChiefComplaint } = useReport();
  const router = useRouter();
  const [formData, setFormData] = useState({
    complaint: currentReport.chiefComplaint?.complaint || '',
    onset: currentReport.chiefComplaint?.onset || '',
    duration: currentReport.chiefComplaint?.duration || '',
    severity: currentReport.chiefComplaint?.severity || '',
    quality: currentReport.chiefComplaint?.quality || '',
    radiation: currentReport.chiefComplaint?.radiation || '',
    associatedSymptoms: currentReport.chiefComplaint?.associatedSymptoms || '',
    aggravatingFactors: currentReport.chiefComplaint?.aggravatingFactors || '',
    alleviatingFactors: currentReport.chiefComplaint?.alleviatingFactors || '',
  });

  const handleSave = () => {
    updateChiefComplaint(formData);
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Chief Complaint *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.complaint}
            onChangeText={(text) => setFormData({...formData, complaint: text})}
            placeholder="Patient's main complaint"
            placeholderTextColor="#C7C7CC"
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.label}>Onset *</Text>
            <TextInput
              style={styles.input}
              value={formData.onset}
              onChangeText={(text) => setFormData({...formData, onset: text})}
              placeholder="e.g., 2 hours ago"
              placeholderTextColor="#C7C7CC"
            />
          </View>

          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.label}>Duration</Text>
            <TextInput
              style={styles.input}
              value={formData.duration}
              onChangeText={(text) => setFormData({...formData, duration: text})}
              placeholder="e.g., 30 minutes"
              placeholderTextColor="#C7C7CC"
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.label}>Severity (1-10) *</Text>
            <TextInput
              style={styles.input}
              value={formData.severity}
              onChangeText={(text) => setFormData({...formData, severity: text})}
              placeholder="Pain scale"
              placeholderTextColor="#C7C7CC"
              keyboardType="numeric"
            />
          </View>

          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.label}>Quality</Text>
            <TextInput
              style={styles.input}
              value={formData.quality}
              onChangeText={(text) => setFormData({...formData, quality: text})}
              placeholder="e.g., Sharp, dull"
              placeholderTextColor="#C7C7CC"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Radiation</Text>
          <TextInput
            style={styles.input}
            value={formData.radiation}
            onChangeText={(text) => setFormData({...formData, radiation: text})}
            placeholder="Where pain radiates to"
            placeholderTextColor="#C7C7CC"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Associated Symptoms</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.associatedSymptoms}
            onChangeText={(text) => setFormData({...formData, associatedSymptoms: text})}
            placeholder="Other symptoms present"
            placeholderTextColor="#C7C7CC"
            multiline
            numberOfLines={2}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Aggravating Factors</Text>
          <TextInput
            style={styles.input}
            value={formData.aggravatingFactors}
            onChangeText={(text) => setFormData({...formData, aggravatingFactors: text})}
            placeholder="What makes it worse"
            placeholderTextColor="#C7C7CC"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Alleviating Factors</Text>
          <TextInput
            style={styles.input}
            value={formData.alleviatingFactors}
            onChangeText={(text) => setFormData({...formData, alleviatingFactors: text})}
            placeholder="What makes it better"
            placeholderTextColor="#C7C7CC"
          />
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  form: {
    backgroundColor: "#FFFFFF",
    marginTop: 20,
    paddingVertical: 20,
  },
  inputGroup: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 10,
  },
  halfWidth: {
    flex: 1,
    paddingHorizontal: 0,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E5EA",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#000000",
    backgroundColor: "#FFFFFF",
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  saveButton: {
    margin: 20,
    backgroundColor: "#0066CC",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});