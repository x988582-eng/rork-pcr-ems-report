import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Alert } from "react-native";
import { useReport } from "@/hooks/report-context";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Plus } from "lucide-react-native";
import type { VitalSigns } from "@/types/report";

export default function AssessmentScreen() {
  const { currentReport, updateAssessment, addVitalSigns } = useReport();
  const router = useRouter();
  const [formData, setFormData] = useState({
    physicalExam: currentReport.assessment?.physicalExam || '',
    workingDiagnosis: currentReport.assessment?.workingDiagnosis || '',
  });
  
  const [newVitals, setNewVitals] = useState<VitalSigns>({
    time: new Date().toLocaleTimeString(),
    bloodPressure: '',
    pulse: '',
    respirations: '',
    spO2: '',
    temperature: '',
    bloodGlucose: '',
    gcs: '',
    painScale: '',
  });

  const handleAddVitals = () => {
    if (!newVitals.bloodPressure && !newVitals.pulse && !newVitals.respirations) {
      Alert.alert('Error', 'Please enter at least one vital sign');
      return;
    }
    
    // Default blank vital signs to "within normal limits"
    const vitalsWithDefaults = {
      ...newVitals,
      time: new Date().toLocaleTimeString(),
      bloodPressure: newVitals.bloodPressure || 'within normal limits',
      pulse: newVitals.pulse || 'within normal limits',
      respirations: newVitals.respirations || 'within normal limits',
      spO2: newVitals.spO2 || 'within normal limits',
      temperature: newVitals.temperature || 'within normal limits',
      bloodGlucose: newVitals.bloodGlucose || 'within normal limits',
      gcs: newVitals.gcs || 'within normal limits',
      painScale: newVitals.painScale || 'within normal limits',
    };
    
    addVitalSigns(vitalsWithDefaults);
    
    // Reset form
    setNewVitals({
      time: new Date().toLocaleTimeString(),
      bloodPressure: '',
      pulse: '',
      respirations: '',
      spO2: '',
      temperature: '',
      bloodGlucose: '',
      gcs: '',
      painScale: '',
    });
  };

  const handleSave = () => {
    updateAssessment(formData);
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vital Signs</Text>
          
          {/* Existing Vitals */}
          {currentReport.assessment?.vitalSigns?.map((vitals, index) => (
            <View key={index} style={styles.vitalCard}>
              <Text style={styles.vitalTime}>Set {index + 1} - {vitals.time}</Text>
              {vitals.bloodPressure && <Text style={styles.vitalText}>BP: {vitals.bloodPressure}</Text>}
              {vitals.pulse && <Text style={styles.vitalText}>Pulse: {vitals.pulse}</Text>}
              {vitals.respirations && <Text style={styles.vitalText}>Resp: {vitals.respirations}</Text>}
              {vitals.spO2 && <Text style={styles.vitalText}>SpO2: {vitals.spO2}</Text>}
              {vitals.temperature && <Text style={styles.vitalText}>Temp: {vitals.temperature}</Text>}
              {vitals.bloodGlucose && <Text style={styles.vitalText}>BGL: {vitals.bloodGlucose}</Text>}
              {vitals.gcs && <Text style={styles.vitalText}>GCS: {vitals.gcs}</Text>}
              {vitals.painScale && <Text style={styles.vitalText}>Pain: {vitals.painScale}/10</Text>}
            </View>
          ))}
          
          {/* Add New Vitals */}
          <View style={styles.newVitalsForm}>
            <Text style={styles.subSectionTitle}>Add New Vital Signs</Text>
            
            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>Blood Pressure</Text>
                <TextInput
                  style={styles.input}
                  value={newVitals.bloodPressure}
                  onChangeText={(text) => setNewVitals({...newVitals, bloodPressure: text})}
                  placeholder="120/80"
                  placeholderTextColor="#C7C7CC"
                />
              </View>
              
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>Pulse</Text>
                <TextInput
                  style={styles.input}
                  value={newVitals.pulse}
                  onChangeText={(text) => setNewVitals({...newVitals, pulse: text})}
                  placeholder="72"
                  placeholderTextColor="#C7C7CC"
                  keyboardType="numeric"
                />
              </View>
            </View>
            
            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>Respirations</Text>
                <TextInput
                  style={styles.input}
                  value={newVitals.respirations}
                  onChangeText={(text) => setNewVitals({...newVitals, respirations: text})}
                  placeholder="16"
                  placeholderTextColor="#C7C7CC"
                  keyboardType="numeric"
                />
              </View>
              
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>SpO2 (%)</Text>
                <TextInput
                  style={styles.input}
                  value={newVitals.spO2}
                  onChangeText={(text) => setNewVitals({...newVitals, spO2: text})}
                  placeholder="98"
                  placeholderTextColor="#C7C7CC"
                  keyboardType="numeric"
                />
              </View>
            </View>
            
            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>Temperature</Text>
                <TextInput
                  style={styles.input}
                  value={newVitals.temperature}
                  onChangeText={(text) => setNewVitals({...newVitals, temperature: text})}
                  placeholder="98.6"
                  placeholderTextColor="#C7C7CC"
                  keyboardType="numeric"
                />
              </View>
              
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>Blood Glucose</Text>
                <TextInput
                  style={styles.input}
                  value={newVitals.bloodGlucose}
                  onChangeText={(text) => setNewVitals({...newVitals, bloodGlucose: text})}
                  placeholder="120"
                  placeholderTextColor="#C7C7CC"
                  keyboardType="numeric"
                />
              </View>
            </View>
            
            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>GCS</Text>
                <TextInput
                  style={styles.input}
                  value={newVitals.gcs}
                  onChangeText={(text) => setNewVitals({...newVitals, gcs: text})}
                  placeholder="15"
                  placeholderTextColor="#C7C7CC"
                  keyboardType="numeric"
                />
              </View>
              
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>Pain Scale (1-10)</Text>
                <TextInput
                  style={styles.input}
                  value={newVitals.painScale}
                  onChangeText={(text) => setNewVitals({...newVitals, painScale: text})}
                  placeholder="5"
                  placeholderTextColor="#C7C7CC"
                  keyboardType="numeric"
                />
              </View>
            </View>
            
            <TouchableOpacity style={styles.addButton} onPress={handleAddVitals}>
              <Plus size={20} color="#FFFFFF" />
              <Text style={styles.addButtonText}>Add Vital Signs</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Physical Exam Findings</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.physicalExam}
            onChangeText={(text) => setFormData({...formData, physicalExam: text})}
            placeholder="Detailed physical examination findings"
            placeholderTextColor="#C7C7CC"
            multiline
            numberOfLines={4}
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Working Diagnosis *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.workingDiagnosis}
            onChangeText={(text) => setFormData({...formData, workingDiagnosis: text})}
            placeholder="Provisional diagnosis"
            placeholderTextColor="#C7C7CC"
            multiline
            numberOfLines={2}
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
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 16,
  },
  subSectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 12,
  },
  vitalCard: {
    backgroundColor: "#F2F2F7",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  vitalTime: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 8,
  },
  vitalText: {
    fontSize: 14,
    color: "#000000",
    marginBottom: 4,
  },
  newVitalsForm: {
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
    paddingTop: 16,
    marginTop: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  halfWidth: {
    flex: 1,
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    color: "#000000",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E5EA",
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
    color: "#000000",
    backgroundColor: "#FFFFFF",
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
    paddingHorizontal: 20,
    marginHorizontal: 20,
  },
  addButton: {
    flexDirection: "row",
    backgroundColor: "#34C759",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  addButtonText: {
    fontSize: 15,
    fontWeight: "600",
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