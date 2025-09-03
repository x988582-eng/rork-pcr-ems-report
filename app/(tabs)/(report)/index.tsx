import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { ChevronRight, AlertCircle, CheckCircle } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useReport } from "@/hooks/report-context";

interface SectionItemProps {
  title: string;
  route: string;
  isComplete: boolean;
  description?: string;
}

function SectionItem({ title, route, isComplete, description }: SectionItemProps) {
  const router = useRouter();
  
  return (
    <TouchableOpacity 
      style={styles.sectionItem}
      onPress={() => router.push(`/(tabs)/(report)/${route}` as any)}
      activeOpacity={0.7}
    >
      <View style={styles.sectionLeft}>
        {isComplete ? (
          <CheckCircle size={24} color="#34C759" />
        ) : (
          <AlertCircle size={24} color="#FF9500" />
        )}
        <View style={styles.sectionText}>
          <Text style={styles.sectionTitle}>{title}</Text>
          {description && (
            <Text style={styles.sectionDescription}>{description}</Text>
          )}
        </View>
      </View>
      <ChevronRight size={24} color="#C7C7CC" />
    </TouchableOpacity>
  );
}

export default function ReportScreen() {
  const { currentReport } = useReport();
  
  const checkDispatchComplete = () => {
    const d = currentReport.dispatch;
    return !!(d?.unitNumber && d?.dispatchTime && d?.location && d?.natureOfCall);
  };
  
  const checkChiefComplaintComplete = () => {
    const cc = currentReport.chiefComplaint;
    return !!(cc?.complaint && cc?.onset && cc?.severity);
  };
  
  const checkHistoryComplete = () => {
    const h = currentReport.history;
    return !!(h?.age && h?.gender && h?.events);
  };
  
  const checkAssessmentNotesComplete = () => {
    const an = currentReport.assessmentNotes;
    return !!(an?.generalImpression && an?.levelOfConsciousness && an?.airway && an?.breathing && an?.circulation);
  };
  
  const checkAssessmentComplete = () => {
    const a = currentReport.assessment;
    return !!(a?.vitalSigns && a.vitalSigns.length > 0 && a?.workingDiagnosis);
  };
  
  const checkTreatmentComplete = () => {
    const t = currentReport.treatment;
    return !!(t?.interventions && t.interventions.length > 0) || !!(t?.response);
  };
  
  const checkTransportComplete = () => {
    const t = currentReport.transport;
    return !!(t?.destination && t?.transportMode && t?.transferOfCare);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Current Report</Text>
        <Text style={styles.headerSubtitle}>
          {currentReport.dispatch?.dispatchTime || 'New Report'} • {new Date(currentReport.createdAt || '').toLocaleDateString()}
        </Text>
      </View>
      
      <View style={styles.sections}>
        <SectionItem 
          title="1. Dispatch Information"
          route="dispatch"
          isComplete={checkDispatchComplete()}
          description="Unit, dispatch time, location, nature of call"
        />
        
        <SectionItem 
          title="2. Chief Complaint"
          route="chief-complaint"
          isComplete={checkChiefComplaintComplete()}
          description="Primary complaint and symptom details"
        />
        
        <SectionItem 
          title="3. Patient History"
          route="history"
          isComplete={checkHistoryComplete()}
          description="Demographics, allergies, medications, PMH"
        />
        
        <SectionItem 
          title="4. Assessment Notes"
          route="assessment-notes"
          isComplete={checkAssessmentNotesComplete()}
          description="Initial impression, ABC assessment"
        />
        
        <SectionItem 
          title="5. Assessment & Vitals"
          route="assessment"
          isComplete={checkAssessmentComplete()}
          description="Vital signs, physical exam, diagnosis"
        />
        
        <SectionItem 
          title="6. Treatment"
          route="treatment"
          isComplete={checkTreatmentComplete()}
          description="Interventions, medications, procedures"
        />
        
        <SectionItem 
          title="7. Transport"
          route="transport"
          isComplete={checkTransportComplete()}
          description="Destination, mode, transfer of care"
        />
      </View>
      
      <View style={styles.statusCard}>
        <Text style={styles.statusTitle}>Report Status</Text>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Created:</Text>
          <Text style={styles.statusValue}>
            {new Date(currentReport.createdAt || '').toLocaleString()}
          </Text>
        </View>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Report ID:</Text>
          <Text style={styles.statusValue}>{currentReport.id}</Text>
        </View>
      </View>
    </ScrollView>
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
  sections: {
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#E5E5EA",
  },
  sectionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  sectionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  sectionText: {
    marginLeft: 12,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 2,
  },
  sectionDescription: {
    fontSize: 13,
    color: "#8E8E93",
  },
  statusCard: {
    margin: 20,
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
  },
  statusTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 12,
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  statusLabel: {
    fontSize: 15,
    color: "#8E8E93",
  },
  statusValue: {
    fontSize: 15,
    color: "#000000",
  },
});