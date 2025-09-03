import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { useReport } from "@/hooks/report-context";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function DispatchScreen() {
  const { currentReport, updateDispatch } = useReport();
  const router = useRouter();
  
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  const [formData, setFormData] = useState({
    unitNumber: currentReport.dispatch?.unitNumber || '112',
    dispatchTime: currentReport.dispatch?.dispatchTime || getCurrentDate(),
    location: currentReport.dispatch?.location || '',
    natureOfCall: currentReport.dispatch?.natureOfCall || '',
    priority: currentReport.dispatch?.priority || '',
  });

  const handleSave = () => {
    updateDispatch({
      ...formData,
      dateTime: currentReport.dispatch?.dateTime || new Date().toISOString()
    });
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Unit Number *</Text>
          <TextInput
            style={styles.input}
            value={formData.unitNumber}
            onChangeText={(text) => setFormData({...formData, unitNumber: text})}
            placeholder="e.g., Medic 1"
            placeholderTextColor="#C7C7CC"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Dispatch Time *</Text>
          <TextInput
            style={styles.input}
            value={formData.dispatchTime}
            onChangeText={(text) => setFormData({...formData, dispatchTime: text})}
            placeholder="e.g., 2024-01-15"
            placeholderTextColor="#C7C7CC"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Location *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.location}
            onChangeText={(text) => setFormData({...formData, location: text})}
            placeholder="Full address or location description"
            placeholderTextColor="#C7C7CC"
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nature of Call *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.natureOfCall}
            onChangeText={(text) => setFormData({...formData, natureOfCall: text})}
            placeholder="e.g., Chest pain, MVA, Fall"
            placeholderTextColor="#C7C7CC"
            multiline
            numberOfLines={2}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Priority</Text>
          <View style={styles.priorityButtons}>
            {['Level 1', 'Level 2', 'Level 3'].map((priority) => (
              <TouchableOpacity
                key={priority}
                style={[
                  styles.priorityButton,
                  formData.priority === priority && styles.priorityButtonActive
                ]}
                onPress={() => setFormData({...formData, priority})}
              >
                <Text style={[
                  styles.priorityButtonText,
                  formData.priority === priority && styles.priorityButtonTextActive
                ]}>
                  {priority}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
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
  priorityButtons: {
    flexDirection: "row",
    gap: 10,
  },
  priorityButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    borderRadius: 8,
    alignItems: "center",
  },
  priorityButtonActive: {
    backgroundColor: "#0066CC",
    borderColor: "#0066CC",
  },
  priorityButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000000",
  },
  priorityButtonTextActive: {
    color: "#FFFFFF",
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