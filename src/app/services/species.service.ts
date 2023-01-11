import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Constants } from "src/constants";

@Injectable({
    providedIn: "root"
})
export class SpeciesService {

    constructor(private http: HttpClient, private apiUrl: Constants) {}

   speciesUrlApi: string = `${this.apiUrl.API_URL}/species`;

    getSpecies(): Observable<any> {
        return this.http.get(this.speciesUrlApi);
    }
}