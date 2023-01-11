import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Constants } from "src/constants";

@Injectable({
    providedIn: "root"
})
export class ClientService {

    constructor(private http: HttpClient, private apiUrl: Constants) {}

    clientUrlApi: string = `${this.apiUrl.API_URL}/client`;
    
    // Form data compiles a set of key/value pairs to be sent to server
    // Values can be files or blobs
    // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
    createClients(file: File): Observable<any> {
        const formData: FormData = new FormData();
        // Appends file to formData to be sent under key "clients"
        formData.append("clients", file);
        return this.http.post(this.clientUrlApi, formData, {responseType: "text"});
    }

    login(loginData: any): Observable<any> {
        return this.http.get(`${this.clientUrlApi}/${loginData.loginDocument}/${loginData.loginPassword}`, {responseType: "text"});
    }
    
}