// DTO to use veterinarian info in clinic's detail cards and veterinarian form (edit method)
export interface VeterinarianDetailDto {

    idVeterinarian?: number,
    vetDocument?: string,
    vetClinicId?: number,
    vetName?: string,
    vetLastname?: string,
    vetTelephone?: string,
    vetEmail?: string,
    isActive?: number,
    lastUpdateDate?: string,
    lastUpdateAction?: string

}