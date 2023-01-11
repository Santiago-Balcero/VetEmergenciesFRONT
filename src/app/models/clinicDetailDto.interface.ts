// Dto to show clinic details
export interface ClinicDetailDto {

    idClinic?: number,
    clinicName?: string,
    clinicNit?: string,
    clinicDepartment?: any,
    clinicCity?: string,
    clinicAddress?: string,
    clinicLatitude?: number,
    clinicLongitude?: number,
    clinicTelephone?: string,
    clinicEmail?: string,
    clinicServices?: any[],
    isActive?: any,
    lastUpdateDate?: string,
    lastUpdateAction?: string
    
}