import type { PCRReport, PatientHistory } from '@/types/report';

function generatePertinentNegativesSentence(history: PatientHistory): string {
  // Rule A - Unobtainable
  if (history.pn_unobtainable) {
    if (history.pn_unobtainable_reason) {
      if (history.pn_source === 'Patient' || history.pn_source === 'Unknown') {
        return `Unable to obtain pertinent negatives due to ${history.pn_unobtainable_reason}.`;
      } else {
        return `${history.pn_source} unable to provide pertinent negatives due to ${history.pn_unobtainable_reason}.`;
      }
    } else {
      return 'Unable to obtain pertinent negatives.';
    }
  }
  
  // Rule B - Denials selected
  const deniedSymptoms: string[] = [];
  const symptomLabels = {
    pn_chest_pain: 'chest pain',
    pn_sob: 'shortness of breath',
    pn_head_pain: 'head pain',
    pn_neck_pain: 'neck pain',
    pn_back_pain: 'back pain',
    pn_weakness: 'weakness',
    pn_dizziness: 'dizziness',
    pn_nausea: 'nausea',
    pn_vomiting: 'vomiting',
    pn_diarrhea: 'diarrhea'
  };
  
  // Check each symptom in the exact order specified
  Object.entries(symptomLabels).forEach(([key, label]) => {
    if (history[key as keyof PatientHistory]) {
      deniedSymptoms.push(label);
    }
  });
  
  if (deniedSymptoms.length > 0) {
    const joinedList = deniedSymptoms.join(', ');
    if (history.pn_source === 'Patient') {
      return `Patient denies ${joinedList}.`;
    } else {
      return `${history.pn_source} reports patient denies ${joinedList}.`;
    }
  }
  
  // Rule C - Nothing selected
  return '';
}

export function generateNarrative(report: Partial<PCRReport>): string {
  const sections: string[] = [];
  
  // Header
  sections.push('# PCR NARRATIVE REPORT');
  sections.push(`\n**Generated:** ${new Date().toLocaleString()}`);
  sections.push(`**Report ID:** ${report.id || 'N/A'}\n`);
  sections.push('---\n');
  
  // 1. DISPATCH
  if (report.dispatch) {
    sections.push('## DISPATCH');
    const d = report.dispatch;
    if (d.dateTime) sections.push(`**Date/Time:** ${new Date(d.dateTime).toLocaleString()}`);
    if (d.unitNumber) sections.push(`**Unit:** ${d.unitNumber}`);
    if (d.incidentNumber) sections.push(`**Incident #:** ${d.incidentNumber}`);
    if (d.location) sections.push(`**Location:** ${d.location}`);
    if (d.natureOfCall) sections.push(`**Nature of Call:** ${d.natureOfCall}`);
    if (d.priority) sections.push(`**Priority:** ${d.priority}`);
    sections.push('');
  }
  
  // 2. CHIEF COMPLAINT
  if (report.chiefComplaint) {
    sections.push('## CHIEF COMPLAINT');
    const cc = report.chiefComplaint;
    
    const narrative: string[] = [];
    if (cc.complaint) {
      narrative.push(`Patient presents with ${cc.complaint}`);
      
      if (cc.onset) narrative.push(`with onset ${cc.onset}`);
      if (cc.duration) narrative.push(`lasting ${cc.duration}`);
      if (cc.severity) narrative.push(`rated ${cc.severity}/10 in severity`);
      
      const details: string[] = [];
      if (cc.quality) details.push(`described as ${cc.quality}`);
      if (cc.radiation) details.push(`radiating to ${cc.radiation}`);
      if (details.length > 0) narrative.push(details.join(', '));
      
      if (cc.associatedSymptoms) narrative.push(`Associated symptoms include: ${cc.associatedSymptoms}`);
      if (cc.aggravatingFactors) narrative.push(`Aggravated by: ${cc.aggravatingFactors}`);
      if (cc.alleviatingFactors) narrative.push(`Alleviated by: ${cc.alleviatingFactors}`);
    }
    
    if (narrative.length > 0) {
      sections.push(narrative.join('. ') + '.');
    }
    sections.push('');
  }
  
  // 3. HISTORY
  if (report.history) {
    sections.push('## PATIENT HISTORY');
    const h = report.history;
    
    const demographics: string[] = [];
    if (h.age) demographics.push(`${h.age} year old`);
    if (h.gender) demographics.push(h.gender);
    if (demographics.length > 0) {
      sections.push(`**Demographics:** ${demographics.join(' ')}`);
    }
    
    if (h.allergies) sections.push(`**Allergies:** ${h.allergies || 'NKDA'}`);
    if (h.medications) sections.push(`**Medications:** ${h.medications || 'None'}`);
    if (h.pastMedicalHistory) sections.push(`**PMH:** ${h.pastMedicalHistory}`);
    if (h.lastOralIntake) sections.push(`**Last Oral Intake:** ${h.lastOralIntake}`);
    if (h.events) sections.push(`**Events:** ${h.events}`);
    
    // Pertinent Negatives
    const pertinentNegativesSentence = generatePertinentNegativesSentence(h);
    if (pertinentNegativesSentence) {
      sections.push(pertinentNegativesSentence);
    }
    
    sections.push('');
  }
  
  // 4. ASSESSMENT NOTES
  if (report.assessmentNotes) {
    sections.push('## ASSESSMENT NOTES');
    const an = report.assessmentNotes;
    
    if (an.generalImpression) sections.push(`**General Impression:** ${an.generalImpression}`);
    if (an.levelOfConsciousness) sections.push(`**LOC:** ${an.levelOfConsciousness}`);
    
    const primaryAssessment: string[] = [];
    if (an.airway) primaryAssessment.push(`Airway: ${an.airway}`);
    if (an.breathing) primaryAssessment.push(`Breathing: ${an.breathing}`);
    if (an.circulation) primaryAssessment.push(`Circulation: ${an.circulation}`);
    
    if (primaryAssessment.length > 0) {
      sections.push(`**Primary Assessment:** ${primaryAssessment.join(', ')}`);
    }
    
    if (an.skinCondition) sections.push(`**Skin:** ${an.skinCondition}`);
    if (an.pupils) sections.push(`**Pupils:** ${an.pupils}`);
    if (an.additionalFindings) sections.push(`**Additional Findings:** ${an.additionalFindings}`);
    sections.push('');
  }
  
  // 5. ASSESSMENT (Vital Signs & Physical Exam)
  if (report.assessment) {
    sections.push('## ASSESSMENT');
    
    // Vital Signs
    if (report.assessment.vitalSigns && report.assessment.vitalSigns.length > 0) {
      sections.push('### Vital Signs');
      report.assessment.vitalSigns.forEach((vs, index) => {
        sections.push(`\n**Set ${index + 1} (${vs.time || 'Time not recorded'})**`);
        if (vs.bloodPressure) sections.push(`- BP: ${vs.bloodPressure}`);
        if (vs.pulse) sections.push(`- Pulse: ${vs.pulse}`);
        if (vs.respirations) sections.push(`- Resp: ${vs.respirations}`);
        if (vs.spO2) sections.push(`- SpO2: ${vs.spO2}`);
        if (vs.temperature) sections.push(`- Temp: ${vs.temperature}`);
        if (vs.bloodGlucose) sections.push(`- BGL: ${vs.bloodGlucose}`);
        if (vs.gcs) sections.push(`- GCS: ${vs.gcs}`);
        if (vs.painScale) sections.push(`- Pain: ${vs.painScale}/10`);
      });
      sections.push('');
    }
    
    if (report.assessment.physicalExam) {
      sections.push(`**Physical Exam:** ${report.assessment.physicalExam}`);
    }
    
    if (report.assessment.workingDiagnosis) {
      sections.push(`**Working Diagnosis:** ${report.assessment.workingDiagnosis}`);
    }
    sections.push('');
  }
  
  // 6. TREATMENT
  if (report.treatment) {
    sections.push('## TREATMENT');
    const t = report.treatment;
    
    if (t.interventions && t.interventions.length > 0) {
      sections.push('**Interventions:**');
      t.interventions.forEach(i => sections.push(`- ${i}`));
    }
    
    if (t.medications && t.medications.length > 0) {
      sections.push('\n**Medications:**');
      t.medications.forEach(m => sections.push(`- ${m}`));
    }
    
    if (t.procedures && t.procedures.length > 0) {
      sections.push('\n**Procedures:**');
      t.procedures.forEach(p => sections.push(`- ${p}`));
    }
    
    if (t.response) {
      sections.push(`\n**Patient Response:** ${t.response}`);
    }
    sections.push('');
  }
  
  // 7. TRANSPORT
  if (report.transport) {
    sections.push('## TRANSPORT');
    const t = report.transport;
    
    if (t.destination) sections.push(`**Destination:** ${t.destination}`);
    if (t.transportMode) sections.push(`**Mode:** ${t.transportMode}`);
    if (t.position) sections.push(`**Position:** ${t.position}`);
    if (t.changesDuringTransport) sections.push(`**Changes During Transport:** ${t.changesDuringTransport}`);
    if (t.transferOfCare) sections.push(`**Transfer of Care:** ${t.transferOfCare}`);
    if (t.receivingProvider) sections.push(`**Receiving Provider:** ${t.receivingProvider}`);
    sections.push('');
  }
  
  sections.push('---');
  sections.push('\n*This narrative was generated from PCR form data and should be reviewed for accuracy and completeness.*');
  
  return sections.join('\n');
}