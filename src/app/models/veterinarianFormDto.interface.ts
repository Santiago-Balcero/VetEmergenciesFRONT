// DTO to send new veterinarian info from veterinarian form (create method)
export interface VeterinarianFormDto {

    vetClinicId?: number,
    vetDocument?: string,
    vetName?: string,
    vetLastname?: string,
    vetTelephone?: string,
    vetEmail?: string,

}