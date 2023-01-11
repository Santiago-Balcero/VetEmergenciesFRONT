// Dto to send info from a new clinic to backend
export interface ClinicFormDto {
    
    idClinic?: number;
    clinicName?: string,
    clinicNit?: string,
    clinicDepartment?: number,
    clinicCity?: string,
    clinicAddress?: string,
    clinicTelephone?: string,
    clinicEmail?: string,
    clinicServices?: number[],

}