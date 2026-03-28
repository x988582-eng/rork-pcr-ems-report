import { Stack } from "expo-router";

export default function ReportLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#0066CC",
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
          fontWeight: "600",
        },
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: "PCR Report"
        }} 
      />
      <Stack.Screen 
        name="dispatch" 
        options={{ 
          title: "Dispatch Information"
        }} 
      />
      <Stack.Screen 
        name="chief-complaint" 
        options={{ 
          title: "Chief Complaint"
        }} 
      />
      <Stack.Screen 
        name="history" 
        options={{ 
          title: "Patient History"
        }} 
      />
      <Stack.Screen 
        name="assessment-notes" 
        options={{ 
          title: "Assessment Notes"
        }} 
      />
      <Stack.Screen 
        name="assessment" 
        options={{ 
          title: "Assessment & Vitals"
        }} 
      />
      <Stack.Screen 
        name="treatment" 
        options={{ 
          title: "Treatment"
        }} 
      />
      <Stack.Screen 
        name="transport" 
        options={{ 
          title: "Transport"
        }} 
      />
    </Stack>
  );
}