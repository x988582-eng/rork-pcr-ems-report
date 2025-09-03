export interface DispatchInfo {
  dateTime: string;
  unitNumber: string;
  dispatchTime: string;
  location: string;
  natureOfCall: string;
  priority: string;
}

export interface ChiefComplaint {
  complaint: string;
  onset: string;
  duration: string;
  severity: string; // 1-10
  quality: string;
  radiation: string;
  associatedSymptoms: string;
  aggravatingFactors: string;
  alleviatingFactors: string;
}

export interface PatientHistory {
  age: string;
  gender: string;
  allergies: string;
  allergyType?: string;
  medications: string;
  medicationType?: string;
  pastMedicalHistory: string;
  lastOralIntake: string;
  events: string; // Events leading to injury/illness
  // Pertinent Negatives
  pn_source: string;
  pn_unobtainable: boolean;
  pn_unobtainable_reason: string;
  pn_chest_pain: boolean;
  pn_sob: boolean;
  pn_head_pain: boolean;
  pn_neck_pain: boolean;
  pn_back_pain: boolean;
  pn_weakness: boolean;
  pn_dizziness: boolean;
  pn_nausea: boolean;
  pn_vomiting: boolean;
  pn_diarrhea: boolean;
}

export interface AssessmentNotes {
  generalImpression: string;
  levelOfConsciousness: string;
  airway: string;
  breathing: string;
  circulation: string;
  skinCondition: string;
  pupils: string;
  additionalFindings: string;
}

export interface VitalSigns {
  time: string;
  bloodPressure: string;
  pulse: string;
  respirations: string;
  spO2: string;
  temperature: string;
  bloodGlucose: string;
  gcs: string; // Glasgow Coma Scale
  painScale: string;
}

export interface Assessment {
  vitalSigns: VitalSigns[];
  physicalExam: string;
  workingDiagnosis: string;
}

export interface Treatment {
  interventions: string[];
  medications: string[];
  procedures: string[];
  response: string;
}

export interface Transport {
  destination: string;
  transportMode: string;
  position: string;
  changesDuringTransport: string;
  transferOfCare: string;
  receivingProvider: string;
}

export interface PCRReport {
  id: string;
  createdAt: string;
  dispatch: DispatchInfo;
  chiefComplaint: ChiefComplaint;
  history: PatientHistory;
  assessmentNotes: AssessmentNotes;
  assessment: Assessment;
  treatment: Treatment;
  transport: Transport;
}