import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ActivatedRoute, Router } from '@angular/router';
import { EmergencyTableDto } from '../models/emergencyTableDto.interface';
import { EmergencyService } from '../services/emergency.service';


@Component({
  selector: 'app-emergencies-table',
  templateUrl: './emergencies-table.component.html',
  styleUrls: ['./emergencies-table.component.css']
})
export class EmergenciesTableComponent implements OnInit {

  // Boolean to check role of active session and customize buttons for actions
  admin: boolean;

  emergencies: EmergencyTableDto[] = [];
  
  columns: any[];

  @ViewChild('dt') dt!: Table;

  constructor(private emergencyService: EmergencyService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    // Checks role of active session
    this.admin = localStorage.getItem("role") === "admin";
    this.getEmergencies();
    this.columns = [
      {field: "idEmergency", header: "Id emergencia"},
      {field: "emergencySubscriptionId", header: "Id suscripción"},
      {field: "emergencyClientDocument", header: "Documento de cliente"},
      {field: "emergencyClinicName", header: "Clínica"},
      {field: "emergencyDate", header: "Fecha"},
      {field: "emergencyStatus", header: "Estado"},
      {field: "emergencySpecies", header: "Especie"},
      {field: "emergencyMainSymptom", header: "Síntoma"},
      {field: "emergencyDescription", header: "Descripción"}
    ];
  }

  getEmergencies(): void {
    this.emergencyService.getEmergencies().subscribe(
      (emergencies: any[]) => {
        this.emergencies = emergencies;
      },
      (error: any) => {
        alert(error.error);
      }
    );
  }

  applyFilterGlobal($event: any, s: string): void {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, s);
  }

  goToEmergencyDetail(idEmergency: number): void {
    this.router.navigate([`/emergency/detail/${idEmergency}`]);
  }

  approveEmergency(idEmergency: number, idSubscription: number): void {
    this.emergencyService.approveEmergency(idEmergency, idSubscription).subscribe(
      (result: any) => {
        alert(result)
        this.ngOnInit();
      },
      (error: any) => {
        alert(error.error)
        this.ngOnInit();
      }
    );
  }

}
