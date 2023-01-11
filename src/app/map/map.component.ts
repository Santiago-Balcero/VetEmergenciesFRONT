import { Component, OnInit} from '@angular/core';
import { ClinicMapDto } from '../models/clinicMapDto.interface';
import { ClinicService } from '../services/clinic.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  options: any;

  overlays: any[] = [];

  clinics: ClinicMapDto[] = [];

  map: google.maps.Map;

  infoWindow: any;

  constructor(private clinicService: ClinicService) { 
  }

  ngOnInit(): void {
    this.getClinics();
    this.options = {
      center: {lat: +localStorage.getItem("latitude"), lng: +localStorage.getItem("longitude")},
      zoom: +localStorage.getItem("zoom")
    };
    this.infoWindow = new google.maps.InfoWindow();
  }

  setMap(event) {
    this.map = event.map;
  }

  getClinics() {
    this.clinicService.getActiveClinicsMap().subscribe(
      (result: any) => {
        this.clinics = result;
        this.createMarkers();
      },
      (error: any) => {
        alert(error.error);
      }
    )
  }

  createMarkers(): void {
    for (let clinic of this.clinics) {
      // Adds to title info of clinic separated by * to split title string
      this.overlays.push(new google.maps.Marker({position: {lat: +clinic.clinicLatitude, lng: +clinic.clinicLongitude},
        title: `${clinic.idClinic}*${clinic.clinicName}*${clinic.clinicAddress}*${clinic.clinicTelephone}`}));
    }
  }

  handleOverlayClick(event: any) {
    let isMarker = event.overlay.getTitle != undefined;
    let attributes = event.overlay.title.split("*");
    let id = attributes[0];
    let name = attributes[1];
    let address = attributes[2];
    let telephone = attributes[3];
    if (isMarker) {
      this.infoWindow.setContent(`
        <div class="infowindow">
          <p><strong>Clínica:</strong> ${name}<p/>
          <p><strong>Dirección:</strong> ${address}<p/>
          <p><strong>Teléfono:</strong> ${telephone}<p/>
          <a href="/clinics/clinicdetail/${id}">Ver más información</a>

        </div>`
      );
      this.infoWindow.open(event.map, event.overlay);
    }
  }

}
