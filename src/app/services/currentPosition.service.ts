import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class CurrentPositionService {

    options: any = {maximumAge:60000, timeout:5000, enableHighAccuracy: true}

    // In production environment it is possible that majority of clients of this app will use mobile phones
    // to request attention to an emergency. Because of this in future iterations of this project getLocation()
    // could be improved for better performance and accuracy using mobile phone's GPS
    getLocation(): Observable<any> {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position: any) => {
                console.log(position);
                localStorage.setItem("latitude", JSON.stringify(position.coords.latitude));
                localStorage.setItem("longitude", JSON.stringify(position.coords.longitude));
                // Zoom 12 to help deal with lack of accuracy of getcurrentPosition method
                // Provides better user experience and less sense of inaccuracy
                localStorage.setItem("zoom", "12");
                return position.coords;
        }, (error: any) => alert(error), this.options);
        }
        else {
            // For a case on which it is not possible to access geolocation
            // Bogotá's coordinates with zoom 6 for an almost entire country view
            localStorage.setItem("latitude", "4.601854926531007");
            localStorage.setItem("longitude", "-74.07204998076452");
            localStorage.setItem("zoom", "6");
            return;
        }
    }

}