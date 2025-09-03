import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { useReport } from "@/hooks/report-context";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function HistoryScreen() {
  const { currentReport, updateHistory } = useReport();
  const router = useRouter();
  const [formData, setFormData] = useState({
    age: currentReport.history?.age || '',
    gender: currentReport.history?.gender || '',
    allergies: currentReport.history?.allergies || '',
    allergyType: currentReport.history?.allergyType || 'custom',
    medications: currentReport.history?.medications || '',
    pastMedicalHistory: currentReport.history?.pastMedicalHistory || '',
    lastOralIntake: currentReport.history?.lastOralIntake || '',
    events: currentReport.history?.events || '',
    // Pertinent Negatives
    pn_source: currentReport.history?.pn_source || 'Patient',
    pn_unobtainable: currentReport.history?.pn_unobtainable || false,
    pn_unobtainable_reason: currentReport.history?.pn_unobtainable_reason || '',
    pn_chest_pain: currentReport.history?.pn_chest_pain || false,
    pn_sob: currentReport.history?.pn_sob || false,
    pn_head_pain: currentReport.history?.pn_head_pain || false,
    pn_neck_pain: currentReport.history?.pn_neck_pain || false,
    pn_back_pain: currentReport.history?.pn_back_pain || false,
    pn_weakness: currentReport.history?.pn_weakness || false,
    pn_dizziness: currentReport.history?.pn_dizziness || false,
    pn_nausea: currentReport.history?.pn_nausea || false,
    pn_vomiting: currentReport.history?.pn_vomiting || false,
    pn_diarrhea: currentReport.history?.pn_diarrhea || false,
  });

  const handleSave = () => {
    updateHistory(formData);
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <View style={styles.row}>
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.label}>Age *</Text>
            <TextInput
              style={styles.input}
              value={formData.age}
              onChangeText={(text) => setFormData({...formData, age: text})}
              placeholder="Patient age"
              placeholderTextColor="#C7C7CC"
              keyboardType="numeric"
            />
          </View>

          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.label}>Gender *</Text>
            <View style={styles.genderButtons}>
              {['Male', 'Female', 'Other'].map((gender) => (
                <TouchableOpacity
                  key={gender}
                  style={[
                    styles.genderButton,
                    formData.gender === gender && styles.genderButtonActive
                  ]}
                  onPress={() => setFormData({...formData, gender})}
                >
                  <Text style={[
                    styles.genderButtonText,
                    formData.gender === gender && styles.genderButtonTextActive
                  ]}>
                    {gender[0]}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Allergies</Text>
          <View style={styles.allergyButtons}>
            {['NKDA', 'See Med List', 'Custom'].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.allergyButton,
                  formData.allergyType === type.toLowerCase().replace(' ', '') && styles.allergyButtonActive
                ]}
                onPress={() => {
                  const allergyType = type.toLowerCase().replace(' ', '');
                  setFormData({
                    ...formData, 
                    allergyType,
                    allergies: allergyType === 'nkda' ? 'NKDA' : allergyType === 'seemedlist' ? 'See Med List' : formData.allergies
                  });
                }}
              >
                <Text style={[
                  styles.allergyButtonText,
                  formData.allergyType === type.toLowerCase().replace(' ', '') && styles.allergyButtonTextActive
                ]}>
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          {formData.allergyType === 'custom' && (
            <TextInput
              style={[styles.input, styles.textArea, { marginTop: 12 }]}
              value={formData.allergies}
              onChangeText={(text) => setFormData({...formData, allergies: text})}
              placeholder="List specific allergies"
              placeholderTextColor="#C7C7CC"
              multiline
              numberOfLines={2}
            />
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Medications</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.medications}
            onChangeText={(text) => setFormData({...formData, medications: text})}
            placeholder="Current medications"
            placeholderTextColor="#C7C7CC"
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Past Medical History</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.pastMedicalHistory}
            onChangeText={(text) => setFormData({...formData, pastMedicalHistory: text})}
            placeholder="Relevant medical history"
            placeholderTextColor="#C7C7CC"
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Last Oral Intake</Text>
          <TextInput
            style={styles.input}
            value={formData.lastOralIntake}
            onChangeText={(text) => setFormData({...formData, lastOralIntake: text})}
            placeholder="Time and description"
            placeholderTextColor="#C7C7CC"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Events Leading to Injury/Illness *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.events}
            onChangeText={(text) => setFormData({...formData, events: text})}
            placeholder="Describe what happened"
            placeholderTextColor="#C7C7CC"
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Pertinent Negatives Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Pertinent Negatives</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Source</Text>
          <View style={styles.sourceButtons}>
            {['Patient', 'Spouse/Guardian', 'Police', 'Other EMS', 'Staff/Facility', 'Unknown'].map((source) => (
              <TouchableOpacity
                key={source}
                style={[
                  styles.sourceButton,
                  formData.pn_source === source && styles.sourceButtonActive
                ]}
                onPress={() => setFormData({...formData, pn_source: source})}
              >
                <Text style={[
                  styles.sourceButtonText,
                  formData.pn_source === source && styles.sourceButtonTextActive
                ]}>
                  {source}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setFormData({...formData, pn_unobtainable: !formData.pn_unobtainable})}
          >
            <View style={[styles.checkbox, formData.pn_unobtainable && styles.checkboxActive]}>
              {formData.pn_unobtainable && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>Unable to obtain pertinent negatives</Text>
          </TouchableOpacity>
        </View>

        {formData.pn_unobtainable && (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Reason</Text>
            <TextInput
              style={styles.input}
              value={formData.pn_unobtainable_reason}
              onChangeText={(text) => setFormData({...formData, pn_unobtainable_reason: text})}
              placeholder="e.g., AMS, aphasia, intoxication"
              placeholderTextColor="#C7C7CC"
            />
          </View>
        )}

        <View style={styles.inputGroup}>
          <Text style={styles.helperText}>Checked = denied by the source</Text>
          
          {[
            { key: 'pn_chest_pain', label: 'Chest pain' },
            { key: 'pn_sob', label: 'Shortness of breath' },
            { key: 'pn_head_pain', label: 'Head pain' },
            { key: 'pn_neck_pain', label: 'Neck pain' },
            { key: 'pn_back_pain', label: 'Back pain' },
            { key: 'pn_weakness', label: 'Weakness' },
            { key: 'pn_dizziness', label: 'Dizziness' },
            { key: 'pn_nausea', label: 'Nausea' },
            { key: 'pn_vomiting', label: 'Vomiting' },
            { key: 'pn_diarrhea', label: 'Diarrhea' },
          ].map((item) => (
            <TouchableOpacity
              key={item.key}
              style={styles.checkboxRow}
              onPress={() => setFormData({...formData, [item.key]: !formData[item.key as keyof typeof formData]})}
            >
              <View style={[styles.checkbox, formData[item.key as keyof typeof formData] && styles.checkboxActive]}>
                {formData[item.key as keyof typeof formData] && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkboxLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
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
  genderButtons: {
    flexDirection: "row",
    gap: 8,
  },
  genderButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    borderRadius: 8,
    alignItems: "center",
  },
  genderButtonActive: {
    backgroundColor: "#0066CC",
    borderColor: "#0066CC",
  },
  genderButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000000",
  },
  genderButtonTextActive: {
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
  sectionHeader: {
    backgroundColor: "#F2F2F7",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  sourceButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  sourceButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    borderRadius: 6,
    backgroundColor: "#FFFFFF",
  },
  sourceButtonActive: {
    backgroundColor: "#0066CC",
    borderColor: "#0066CC",
  },
  sourceButtonText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#000000",
  },
  sourceButtonTextActive: {
    color: "#FFFFFF",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    borderRadius: 4,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  checkboxActive: {
    backgroundColor: "#0066CC",
    borderColor: "#0066CC",
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  checkboxLabel: {
    fontSize: 15,
    color: "#000000",
    flex: 1,
  },
  helperText: {
    fontSize: 13,
    color: "#8E8E93",
    marginBottom: 12,
    fontStyle: "italic",
  },
  allergyButtons: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 4,
  },
  allergyButton: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  allergyButtonActive: {
    backgroundColor: "#0066CC",
    borderColor: "#0066CC",
  },
  allergyButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000000",
  },
  allergyButtonTextActive: {
    color: "#FFFFFF",
  },
});