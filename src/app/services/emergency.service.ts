import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EmergencyFormDto } from "../models/emergencyFormDto.interface";
import { Constants } from "src/constants";

@Injectable({
    providedIn: "root"
})
export class EmergencyService {

    constructor(private http: HttpClient, private apiUrl: Constants) {}

    emergencyUrlApi: string = `${this.apiUrl.API_URL}/emergency`;
    
    approveEmergency(idEmergency: number, idSubscription: number): Observable<any> {
        return this.http.put(this.emergencyUrlApi, [idEmergency, idSubscription], {responseType: "text"});
    }

    confirmEmergency(idEmergency: number, idSubscription: number): Observable<any> {
        return this.http.put(`${this.emergencyUrlApi}/confirm`, [idEmergency, idSubscription], {responseType: "text"});
    }
    
    createEmergency(emergency: EmergencyFormDto): Observable<any> {
        return this.http.post(this.emergencyUrlApi, emergency, {responseType: "text"});
    }

    getEmergencyById(idEmergency: number): Observable<any> {
        return this.http.get(`${this.emergencyUrlApi}/${idEmergency}`);
    }

    getEmergencies(): Observable<any> {
        return this.http.get(this.emergencyUrlApi);
    }
    
}