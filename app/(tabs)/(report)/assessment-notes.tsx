import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { useReport } from "@/hooks/report-context";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function AssessmentNotesScreen() {
  const { currentReport, updateAssessmentNotes } = useReport();
  const router = useRouter();
  const [formData, setFormData] = useState({
    generalImpression: currentReport.assessmentNotes?.generalImpression || '',
    levelOfConsciousness: currentReport.assessmentNotes?.levelOfConsciousness || '',
    airway: currentReport.assessmentNotes?.airway || '',
    breathing: currentReport.assessmentNotes?.breathing || '',
    circulation: currentReport.assessmentNotes?.circulation || '',
    skinCondition: currentReport.assessmentNotes?.skinCondition || '',
    pupils: currentReport.assessmentNotes?.pupils || '',
    additionalFindings: currentReport.assessmentNotes?.additionalFindings || '',
  });

  const handleSave = () => {
    updateAssessmentNotes(formData);
    router.back();
  };

  const locOptions = ['Alert', 'Verbal', 'Pain', 'Unresponsive'];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>General Impression *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.generalImpression}
            onChangeText={(text) => setFormData({...formData, generalImpression: text})}
            placeholder="Initial patient presentation"
            placeholderTextColor="#C7C7CC"
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Additional Findings</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.additionalFindings}
            onChangeText={(text) => setFormData({...formData, additionalFindings: text})}
            placeholder="Other notable findings"
            placeholderTextColor="#C7C7CC"
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Level of Consciousness (AVPU) *</Text>
          <View style={styles.buttonRow}>
            {locOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  formData.levelOfConsciousness === option && styles.optionButtonActive
                ]}
                onPress={() => setFormData({...formData, levelOfConsciousness: option})}
              >
                <Text style={[
                  styles.optionButtonText,
                  formData.levelOfConsciousness === option && styles.optionButtonTextActive
                ]}>
                  {option[0]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Primary Assessment</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Airway *</Text>
            <TextInput
              style={styles.input}
              value={formData.airway}
              onChangeText={(text) => setFormData({...formData, airway: text})}
              placeholder="e.g., Patent, Obstructed, Maintained"
              placeholderTextColor="#C7C7CC"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Breathing *</Text>
            <TextInput
              style={styles.input}
              value={formData.breathing}
              onChangeText={(text) => setFormData({...formData, breathing: text})}
              placeholder="e.g., Normal, Labored, Absent"
              placeholderTextColor="#C7C7CC"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Circulation *</Text>
            <TextInput
              style={styles.input}
              value={formData.circulation}
              onChangeText={(text) => setFormData({...formData, circulation: text})}
              placeholder="e.g., Normal, Weak, Absent pulses"
              placeholderTextColor="#C7C7CC"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Skin Condition</Text>
          <TextInput
            style={styles.input}
            value={formData.skinCondition}
            onChangeText={(text) => setFormData({...formData, skinCondition: text})}
            placeholder="e.g., Warm/Dry, Cool/Clammy, Cyanotic"
            placeholderTextColor="#C7C7CC"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Pupils</Text>
          <TextInput
            style={styles.input}
            value={formData.pupils}
            onChangeText={(text) => setFormData({...formData, pupils: text})}
            placeholder="e.g., PERRL, Fixed, Dilated"
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
  section: {
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
    marginTop: 10,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 16,
    paddingHorizontal: 20,
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
  buttonRow: {
    flexDirection: "row",
    gap: 8,
  },
  optionButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    borderRadius: 8,
    alignItems: "center",
  },
  optionButtonActive: {
    backgroundColor: "#0066CC",
    borderColor: "#0066CC",
  },
  optionButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000000",
  },
  optionButtonTextActive: {
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