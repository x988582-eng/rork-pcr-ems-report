import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { useReport } from "@/hooks/report-context";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { Plus, X } from "lucide-react-native";

export default function TreatmentScreen() {
  const { currentReport, updateTreatment } = useReport();
  const router = useRouter();
  
  const [interventions, setInterventions] = useState<string[]>(
    currentReport.treatment?.interventions || []
  );
  const [medications, setMedications] = useState<string[]>(
    currentReport.treatment?.medications || []
  );
  const [procedures, setProcedures] = useState<string[]>(
    currentReport.treatment?.procedures || []
  );
  const [response, setResponse] = useState(
    currentReport.treatment?.response || ''
  );
  
  const [newIntervention, setNewIntervention] = useState('');
  const [newMedication, setNewMedication] = useState('');
  const [newProcedure, setNewProcedure] = useState('');

  useEffect(() => {
    if (interventions.length === 0) {
      setInterventions(['Therapeutic communication', 'Position of comfort']);
    }
    if (procedures.length === 0) {
      setProcedures(['Primary assessment', 'Vital signs']);
    }
  }, []);

  const addIntervention = () => {
    if (!newIntervention.trim()) return;
    setInterventions([...interventions, newIntervention]);
    setNewIntervention('');
  };

  const addMedication = () => {
    if (!newMedication.trim()) return;
    setMedications([...medications, newMedication]);
    setNewMedication('');
  };

  const addProcedure = () => {
    if (!newProcedure.trim()) return;
    setProcedures([...procedures, newProcedure]);
    setNewProcedure('');
  };

  const removeItem = (list: string[], setList: (items: string[]) => void, index: number) => {
    const updated = list.filter((_, i) => i !== index);
    setList(updated);
  };

  const handleSave = () => {
    updateTreatment({
      interventions,
      medications,
      procedures,
      response
    });
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        {/* Patient Response */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Patient Response to Treatment</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={response}
            onChangeText={setResponse}
            placeholder="How did the patient respond to treatment?"
            placeholderTextColor="#C7C7CC"
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Interventions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interventions</Text>
          
          {interventions.map((item, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.listItemText}>{item}</Text>
              <TouchableOpacity 
                onPress={() => removeItem(interventions, setInterventions, index)}
              >
                <X size={20} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          ))}
          
          <View style={styles.addRow}>
            <TextInput
              style={[styles.input, styles.addInput]}
              value={newIntervention}
              onChangeText={setNewIntervention}
              placeholder="e.g., Oxygen therapy, IV access"
              placeholderTextColor="#C7C7CC"
            />
            <TouchableOpacity style={styles.addButton} onPress={addIntervention}>
              <Plus size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Medications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Medications</Text>
          
          {medications.map((item, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.listItemText}>{item}</Text>
              <TouchableOpacity 
                onPress={() => removeItem(medications, setMedications, index)}
              >
                <X size={20} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          ))}
          
          <View style={styles.addRow}>
            <TextInput
              style={[styles.input, styles.addInput]}
              value={newMedication}
              onChangeText={setNewMedication}
              placeholder="e.g., Aspirin 325mg PO"
              placeholderTextColor="#C7C7CC"
            />
            <TouchableOpacity style={styles.addButton} onPress={addMedication}>
              <Plus size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Procedures */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Procedures</Text>
          
          {procedures.map((item, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.listItemText}>{item}</Text>
              <TouchableOpacity 
                onPress={() => removeItem(procedures, setProcedures, index)}
              >
                <X size={20} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          ))}
          
          <View style={styles.addRow}>
            <TextInput
              style={[styles.input, styles.addInput]}
              value={newProcedure}
              onChangeText={setNewProcedure}
              placeholder="e.g., 12-lead ECG, Splinting"
              placeholderTextColor="#C7C7CC"
            />
            <TouchableOpacity style={styles.addButton} onPress={addProcedure}>
              <Plus size={20} color="#FFFFFF" />
            </TouchableOpacity>
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
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 12,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F2F2F7",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  listItemText: {
    fontSize: 15,
    color: "#000000",
    flex: 1,
  },
  addRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  addInput: {
    flex: 1,
  },
  addButton: {
    backgroundColor: "#34C759",
    width: 44,
    height: 44,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
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
    minHeight: 100,
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