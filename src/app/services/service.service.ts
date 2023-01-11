import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Constants } from "src/constants";

@Injectable({
    providedIn: "root"
})
export class ServiceService {

    constructor(private http: HttpClient, private apiUrl: Constants) {}

    servicesUrlApiCrud: string = `${this.apiUrl.API_URL}/service`;

    getServices(): Observable<any> {
        return this.http.get(this.servicesUrlApiCrud);
    }

}