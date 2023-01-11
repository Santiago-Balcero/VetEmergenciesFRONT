import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ReportRequest } from "../models/reportRequest.interface";
import { Constants } from "src/constants";

@Injectable({
    providedIn: "root"
})
export class ReportService {

    constructor(private http: HttpClient, private apiUrl: Constants) {}

    reportsUrlApi: string = `${this.apiUrl.API_URL}/report`;

    getReports(reportRequest: ReportRequest): Observable<any> {
        return this.http.get(`${this.reportsUrlApi}/${reportRequest.year}/${reportRequest.month}/${reportRequest.species}/${reportRequest.symptom}`);
    }

    downloadReport(reportRequest: ReportRequest): Observable<any> {
        return this.http.get(`${this.reportsUrlApi}/download/${reportRequest.year}/${reportRequest.month}/${reportRequest.species}/${reportRequest.symptom}`, {responseType: "text"});
    }

}