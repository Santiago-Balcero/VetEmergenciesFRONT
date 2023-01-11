import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ClinicDetailDto } from "../models/clinicDetailDto.interface";
import { ClinicFormDto } from "../models/clinicFormDto.interface";
import { Constants } from "src/constants";

@Injectable({
    providedIn: "root"
})
export class ClinicService {

    constructor(private http: HttpClient, private apiUrl: Constants) {}

    clinicUrlApi: string = `${this.apiUrl.API_URL}/clinic`;

    updateClinic(clinic: ClinicDetailDto): Observable<any> {
        return this.http.put(this.clinicUrlApi, clinic, {responseType: "text"})
    }

    updateActiveStatus(idClinic: number, newStatus: number): Observable<any> {
        return this.http.put(`${this.clinicUrlApi}/activestatus/${newStatus}`, idClinic, {responseType: "text"});
    }

    createClinic(clinic: ClinicFormDto): Observable<any> {
        return this.http.post(this.clinicUrlApi, clinic, {responseType: "text"});
    }

    getActiveClinics(): Observable<any> {
        return this.http.get(this.clinicUrlApi);
    }

    getActiveClinicsMap(): Observable<any> {
        return this.http.get(`${this.clinicUrlApi}/map`);
    }

    getAllClinics(): Observable<any> {
        return this.http.get(`${this.clinicUrlApi}/all`);
    }

    getClinicById(idClinic: number): Observable<any> {
        return this.http.get(this.clinicUrlApi + `/${idClinic}`);
    }

    getClinicByIdForEmergency(idClinic: number): Observable<any> {
        return this.http.get(`${this.clinicUrlApi}/emergency/${idClinic}`);
    }

    deleteClinic(idClinic: number): Observable<any> {
        return this.http.delete(`${this.clinicUrlApi}/${idClinic}`, {responseType: 'text'});
    }

}