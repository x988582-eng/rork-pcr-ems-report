import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { useReport } from "@/hooks/report-context";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function TransportScreen() {
  const { currentReport, updateTransport } = useReport();
  const router = useRouter();
  const [formData, setFormData] = useState({
    destination: currentReport.transport?.destination || '',
    transportMode: currentReport.transport?.transportMode || '',
    position: currentReport.transport?.position || '',
    changesDuringTransport: currentReport.transport?.changesDuringTransport || '',
    transferOfCare: currentReport.transport?.transferOfCare || '',
    receivingProvider: currentReport.transport?.receivingProvider || '',
  });

  const handleSave = () => {
    updateTransport(formData);
    router.back();
  };

  const transportModes = ['Priority 1', 'Priority 2', 'Priority 3'];
  const positions = ['Supine', 'Semi-Fowler', 'Fowler', 'Left Lateral', 'Right Lateral', 'Trendelenburg'];
  const facilities = [
    'Trinity Saint Mary\'s',
    'Corewell Butterworth',
    'Corewell Blodgett',
    'Univ. of Michigan Metro',
    'Holland Community Hospital',
    'Zeeland Community Hospital',
    'Refused Transport'
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Destination Facility *</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.buttonRow}>
              {facilities.map((facility) => (
                <TouchableOpacity
                  key={facility}
                  style={[
                    styles.facilityButton,
                    formData.destination === facility && styles.facilityButtonActive
                  ]}
                  onPress={() => setFormData({...formData, destination: facility})}
                >
                  <Text style={[
                    styles.facilityButtonText,
                    formData.destination === facility && styles.facilityButtonTextActive
                  ]}>
                    {facility}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Transport Mode</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.buttonRow}>
              {transportModes.map((mode) => (
                <TouchableOpacity
                  key={mode}
                  style={[
                    styles.modeButton,
                    formData.transportMode === mode && styles.modeButtonActive
                  ]}
                  onPress={() => setFormData({...formData, transportMode: mode})}
                >
                  <Text style={[
                    styles.modeButtonText,
                    formData.transportMode === mode && styles.modeButtonTextActive
                  ]}>
                    {mode}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Patient Position</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.buttonRow}>
              {positions.map((pos) => (
                <TouchableOpacity
                  key={pos}
                  style={[
                    styles.positionButton,
                    formData.position === pos && styles.positionButtonActive
                  ]}
                  onPress={() => setFormData({...formData, position: pos})}
                >
                  <Text style={[
                    styles.positionButtonText,
                    formData.position === pos && styles.positionButtonTextActive
                  ]}>
                    {pos}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Changes During Transport</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.changesDuringTransport}
            onChangeText={(text) => setFormData({...formData, changesDuringTransport: text})}
            placeholder="Any changes in patient condition"
            placeholderTextColor="#C7C7CC"
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Transfer of Care *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.transferOfCare}
            onChangeText={(text) => setFormData({...formData, transferOfCare: text})}
            placeholder="Report given, patient transferred to..."
            placeholderTextColor="#C7C7CC"
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Receiving Provider</Text>
          <TextInput
            style={styles.input}
            value={formData.receivingProvider}
            onChangeText={(text) => setFormData({...formData, receivingProvider: text})}
            placeholder="Name and title"
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
  modeButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    borderRadius: 8,
  },
  modeButtonActive: {
    backgroundColor: "#0066CC",
    borderColor: "#0066CC",
  },
  modeButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000000",
  },
  modeButtonTextActive: {
    color: "#FFFFFF",
  },
  positionButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    borderRadius: 8,
  },
  positionButtonActive: {
    backgroundColor: "#0066CC",
    borderColor: "#0066CC",
  },
  positionButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000000",
  },
  positionButtonTextActive: {
    color: "#FFFFFF",
  },
  facilityButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    borderRadius: 8,
    minWidth: 120,
  },
  facilityButtonActive: {
    backgroundColor: "#0066CC",
    borderColor: "#0066CC",
  },
  facilityButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000000",
    textAlign: "center",
  },
  facilityButtonTextActive: {
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