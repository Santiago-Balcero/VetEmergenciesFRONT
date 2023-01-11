// Dto to send emergency info to backend
export interface EmergencyFormDto {

    emergencySubscription: number,
    emergencyClinic: number,
    emergencySpecies: number,
    emergencyMainSymptom: number,
    emergencyDescription: string,

}