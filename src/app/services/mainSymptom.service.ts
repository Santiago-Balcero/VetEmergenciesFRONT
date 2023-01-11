import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Constants } from "src/constants";

@Injectable({
    providedIn: "root"
})
export class MainSymptomService {

    constructor(private http: HttpClient, private apiUrl: Constants) {}

    mainSymptomsUrlApi: string = `${this.apiUrl.API_URL}/mainsymptom`;

    getMainSymptoms(): Observable<any> {
        return this.http.get(this.mainSymptomsUrlApi);
    }
}