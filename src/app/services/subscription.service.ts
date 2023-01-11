import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Constants } from "src/constants";

@Injectable({
    providedIn: "root"
})
export class SubscriptionService {

    constructor(private http: HttpClient, private apiUrl: Constants) {}

    subscriptionUrlApi: string = `${this.apiUrl.API_URL}/subscription`;

    renewSubscription(idSubscription: number): Observable<any> {
        return this.http.put(`${this.subscriptionUrlApi}/renew`, idSubscription, {responseType: "text"});
    }
    
    getSubscriptionByIdClient(idClient: number): Observable<any> {
        return this.http.get(`${this.subscriptionUrlApi}/client/${idClient}`);
    }

    getSubscriptionWithEmergenciesByClientDocument(clientDocument: string): Observable<any> {
        return this.http.get(`${this.subscriptionUrlApi}/clientdocument/emergencies/${clientDocument}`);
    }

    getSubscriptionWithEmergenciesByIdSubscription(idSubscription: number): Observable<any> {
        return this.http.get(`${this.subscriptionUrlApi}/emergencies/${idSubscription}`);
    }

    getSubscriptionWithEmergenciesByIdClient(idClient: number): Observable<any> {
        return this.http.get(`${this.subscriptionUrlApi}/idclient/emergencies/${idClient}`);
    }

    checkForExpiredSubscriptions(): Observable<any> {
        return this.http.get(this.subscriptionUrlApi, {responseType: "text"});
    }

}