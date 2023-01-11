import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { VeterinarianDetailDto } from "../models/veterinarianDetailDto.interface";
import { VeterinarianFormDto } from "../models/veterinarianFormDto.interface";
import { Constants } from "src/constants";

@Injectable({
    providedIn: "root"
})
export class VeterinarianService {

    constructor(private http: HttpClient, private apiUrl: Constants) {}

    veterinarianUrlApi: string = `${this.apiUrl.API_URL}/veterinarian`;

    updateVeterinarian(veterinarian: VeterinarianDetailDto): Observable<any> {
        return this.http.put(this.veterinarianUrlApi, veterinarian, {responseType: "text"});
    }

    updateActiveStatus(idVeterinarian: number, newStatus: number): Observable<any> {
        return this.http.put(`${this.veterinarianUrlApi}/activestatus/${newStatus}`, idVeterinarian ,{responseType: "text"})
    }

    createVeterinarian(veterinarian: VeterinarianFormDto): Observable<any> {
        return this.http.post(this.veterinarianUrlApi, veterinarian, {responseType: "text"});
    }

    getActiveVeterinariansByIdClinic(idClinic: number): Observable<any> {
        return this.http.get(`${this.veterinarianUrlApi}/clinic/${idClinic}`);
    }

    getAllVeterinariansByIdClinic(idClinic: number): Observable<any> {
        return this.http.get(`${this.veterinarianUrlApi}/clinic/all/${idClinic}`);
    }

    getVeterinarianById(idVeterinarian: number): Observable<any> {
        return this.http.get(this.veterinarianUrlApi + `/${idVeterinarian}`);
    }

    deleteVeterinarian(idVeterinarian: number): Observable<any> {
        return this.http.delete(this.veterinarianUrlApi + `/${idVeterinarian}`, {responseType: 'text'});
    }

}