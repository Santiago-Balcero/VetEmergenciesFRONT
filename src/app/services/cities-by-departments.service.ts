import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class CitiesByDepartmentsService {

    constructor(private http: HttpClient) {}

    // Gets cities info for a given colombian department
    // Gets data from public government API
    public citiesByDepartament(department: string): Observable<any> {
        return this.http.get(`https://www.datos.gov.co/resource/xdk5-pm3f.json?departamento=${department}`);
    }
}