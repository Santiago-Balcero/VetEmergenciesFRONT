// Dto to show info of an emergency in emergency detail
export interface EmergencyDetailDto {

    idEmergency: number;   
    emergencySubscription: number;
    clientDocument: string;
    clientName: string;
    clientLastname: string;
    clientTelephone: string;
    clientEmail: string;
    emergencyClinicId: number;
    clinicName: string;
    clinicDepartment: string;
    clinicCity: string;
    clinicAddress: string;
    clinicTelephone: string;
    clinicEmail: string;
    emergencyDate: string;
    emergencyStatus: string;
    emergencySpecies: string;
    emergencyMainSymptom: string;
    emergencyDescription: string;
    lastStatusUpdateDate: string;

}
