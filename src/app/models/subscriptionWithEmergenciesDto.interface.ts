import { EmergencySearchDto } from "./emergencySearchDto.interface";

// Dto to show detailed info of a client and subscription in client search
export interface SubscriptionWithEmergenciesDto {
    
    idSubscription: number;
    isActive: number;
    startDate: string;
    finishDate: string;
    clientDocument: string;
    clientName: string;
    clientLastname: string;
    clientTelephone: string;
    clientEmail: string;
    emergencies: EmergencySearchDto[];
    
}