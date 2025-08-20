import createContextHook from '@nkzw/create-context-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, useCallback, useMemo } from 'react';
import type { 
  PCRReport, 
  DispatchInfo, 
  ChiefComplaint, 
  PatientHistory,
  AssessmentNotes,
  Assessment,
  Treatment,
  Transport,
  VitalSigns
} from '@/types/report';

const STORAGE_KEY = 'pcr_reports';
const CURRENT_REPORT_KEY = 'current_pcr_report';

const generateIncidentNumber = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

const createNewReport = (): Partial<PCRReport> => ({
  id: Date.now().toString(),
  createdAt: new Date().toISOString(),
  dispatch: {
    dateTime: new Date().toISOString(),
    unitNumber: '112',
    incidentNumber: generateIncidentNumber(),
    location: '',
    natureOfCall: '',
    priority: ''
  },
  chiefComplaint: {
    complaint: '',
    onset: '',
    duration: '',
    severity: '',
    quality: '',
    radiation: '',
    associatedSymptoms: '',
    aggravatingFactors: '',
    alleviatingFactors: ''
  },
  history: {
    age: '',
    gender: '',
    allergies: '',
    medications: '',
    pastMedicalHistory: '',
    lastOralIntake: '',
    events: '',
    pn_source: 'Patient',
    pn_unobtainable: false,
    pn_unobtainable_reason: '',
    pn_chest_pain: false,
    pn_sob: false,
    pn_head_pain: false,
    pn_neck_pain: false,
    pn_back_pain: false,
    pn_weakness: false,
    pn_dizziness: false,
    pn_nausea: false,
    pn_vomiting: false,
    pn_diarrhea: false
  },
  assessmentNotes: {
    generalImpression: '',
    levelOfConsciousness: '',
    airway: '',
    breathing: '',
    circulation: '',
    skinCondition: '',
    pupils: '',
    additionalFindings: ''
  },
  assessment: {
    vitalSigns: [],
    physicalExam: '',
    workingDiagnosis: ''
  },
  treatment: {
    interventions: [],
    medications: [],
    procedures: [],
    response: ''
  },
  transport: {
    destination: '',
    transportMode: '',
    position: '',
    changesDuringTransport: '',
    transferOfCare: '',
    receivingProvider: ''
  }
});

export const [ReportProvider, useReport] = createContextHook(() => {
  const [reports, setReports] = useState<PCRReport[]>([]);
  const [currentReport, setCurrentReport] = useState<Partial<PCRReport>>(() => createNewReport());
  const [isLoading, setIsLoading] = useState(true);

  // Load saved reports and current report on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [savedReports, savedCurrent] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEY),
        AsyncStorage.getItem(CURRENT_REPORT_KEY)
      ]);
      
      if (savedReports) {
        setReports(JSON.parse(savedReports));
      }
      
      if (savedCurrent) {
        setCurrentReport(JSON.parse(savedCurrent));
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveCurrentReport = async (report: Partial<PCRReport>) => {
    try {
      await AsyncStorage.setItem(CURRENT_REPORT_KEY, JSON.stringify(report));
    } catch (error) {
      console.error('Error saving current report:', error);
    }
  };

  const updateDispatch = useCallback((dispatch: Partial<DispatchInfo>) => {
    const updated = {
      ...currentReport,
      dispatch: { ...currentReport.dispatch, ...dispatch } as DispatchInfo
    };
    setCurrentReport(updated);
    saveCurrentReport(updated);
  }, [currentReport]);

  const updateChiefComplaint = useCallback((chiefComplaint: Partial<ChiefComplaint>) => {
    const updated = {
      ...currentReport,
      chiefComplaint: { ...currentReport.chiefComplaint, ...chiefComplaint } as ChiefComplaint
    };
    setCurrentReport(updated);
    saveCurrentReport(updated);
  }, [currentReport]);

  const updateHistory = useCallback((history: Partial<PatientHistory>) => {
    const updated = {
      ...currentReport,
      history: { ...currentReport.history, ...history } as PatientHistory
    };
    setCurrentReport(updated);
    saveCurrentReport(updated);
  }, [currentReport]);

  const updateAssessmentNotes = useCallback((assessmentNotes: Partial<AssessmentNotes>) => {
    const updated = {
      ...currentReport,
      assessmentNotes: { ...currentReport.assessmentNotes, ...assessmentNotes } as AssessmentNotes
    };
    setCurrentReport(updated);
    saveCurrentReport(updated);
  }, [currentReport]);

  const updateAssessment = useCallback((assessment: Partial<Assessment>) => {
    const updated = {
      ...currentReport,
      assessment: { ...currentReport.assessment, ...assessment } as Assessment
    };
    setCurrentReport(updated);
    saveCurrentReport(updated);
  }, [currentReport]);

  const addVitalSigns = useCallback((vitals: VitalSigns) => {
    const updated = {
      ...currentReport,
      assessment: {
        ...currentReport.assessment,
        vitalSigns: [...(currentReport.assessment?.vitalSigns || []), vitals]
      } as Assessment
    };
    setCurrentReport(updated);
    saveCurrentReport(updated);
  }, [currentReport]);

  const updateTreatment = useCallback((treatment: Partial<Treatment>) => {
    const updated = {
      ...currentReport,
      treatment: { ...currentReport.treatment, ...treatment } as Treatment
    };
    setCurrentReport(updated);
    saveCurrentReport(updated);
  }, [currentReport]);

  const updateTransport = useCallback((transport: Partial<Transport>) => {
    const updated = {
      ...currentReport,
      transport: { ...currentReport.transport, ...transport } as Transport
    };
    setCurrentReport(updated);
    saveCurrentReport(updated);
  }, [currentReport]);

  const saveReport = useCallback(async () => {
    if (!currentReport.id) return;
    
    const reportToSave = currentReport as PCRReport;
    const updatedReports = [...reports, reportToSave];
    setReports(updatedReports);
    
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReports));
      // Clear current report after saving
      const newReport = createNewReport();
      setCurrentReport(newReport);
      await AsyncStorage.setItem(CURRENT_REPORT_KEY, JSON.stringify(newReport));
    } catch (error) {
      console.error('Error saving report:', error);
    }
  }, [currentReport, reports]);

  const deleteReport = useCallback(async (id: string) => {
    const updatedReports = reports.filter(r => r.id !== id);
    setReports(updatedReports);
    
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReports));
    } catch (error) {
      console.error('Error deleting report:', error);
    }
  }, [reports]);



  const clearCurrentReport = useCallback(async () => {
    const newReport = createNewReport();
    setCurrentReport(newReport);
    try {
      await AsyncStorage.setItem(CURRENT_REPORT_KEY, JSON.stringify(newReport));
    } catch (error) {
      console.error('Error clearing current report:', error);
    }
  }, []);

  const loadReport = useCallback(async (report: PCRReport) => {
    setCurrentReport(report);
    await AsyncStorage.setItem(CURRENT_REPORT_KEY, JSON.stringify(report));
  }, []);

  return useMemo(() => ({
    reports,
    currentReport,
    isLoading,
    updateDispatch,
    updateChiefComplaint,
    updateHistory,
    updateAssessmentNotes,
    updateAssessment,
    addVitalSigns,
    updateTreatment,
    updateTransport,
    saveReport,
    deleteReport,
    clearCurrentReport,
    loadReport
  }), [
    reports,
    currentReport,
    isLoading,
    updateDispatch,
    updateChiefComplaint,
    updateHistory,
    updateAssessmentNotes,
    updateAssessment,
    addVitalSigns,
    updateTreatment,
    updateTransport,
    saveReport,
    deleteReport,
    clearCurrentReport,
    loadReport
  ]);
});