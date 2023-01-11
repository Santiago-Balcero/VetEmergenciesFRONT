// Dto to show info of an emergency in clients search
export interface EmergencySearchDto {
    
    idEmergency: number;
    clinicNit: string;
    clinicName: string;
    clinicDepartment: string;
    clinicCity: string;
    clinicAddress: string;
    emergencyDate: string;
    emergencyStatus: string;
    emergencySpecies: string;
    emergencyMainSymptom: string;
    emergencyDescription: string;
    lastStatusUpdateDate: string;
    
}