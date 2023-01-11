import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ClinicTableDto } from '../models/clinicTableDto.interface';
import { ClinicService } from '../services/clinic.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-clinics-table',
  templateUrl: './clinics-table.component.html',
  styleUrls: ['./clinics-table.component.css']
})
export class ClinicsTableComponent implements OnInit {

  // Boolean to check role of active session and customize buttons for actions
  admin: boolean;

  clinics: ClinicTableDto[] = [];
  columns!: any[];

  @ViewChild('dt') dt!: Table;

  constructor(private clinicService: ClinicService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    // Checks role of active session
    this.admin = localStorage.getItem("role") === "admin";
    this.getClinics();
    this.columns = [
      {field: "idClinic", header: "Id"},
      {field: "clinicName", header: "Nombre"},
      {field: "clinicNit", header: "NIT"},
      {field: "isActive", header: "Estado"},
      {field: "clinicDepartment", header: "Departamento"},
      {field: "clinicCity", header: "Municipio"},
      {field: "clinicAddress", header: "Dirección"},
      {field: "clinicTelephone", header: "Teléfono"},
      {field: "clinicEmail", header: "Correo electrónico"}
    ];
  }

  getClinics(): void {
    if (this.admin) {
      this.clinicService.getAllClinics().subscribe(
        (result: any) => {
          for (let clinic of result) {
            clinic.isActive = clinic.isActive === 1 ? "Activo" : "Inactivo";
            this.clinics.push(clinic as ClinicTableDto);
          }
        },
        (error: any) => {
          alert(error.error);
        }
      );
    }
    else {
      this.clinicService.getActiveClinics().subscribe(
        (result: any) => {
          for (let clinic of result) {
              clinic.active = clinic.isActive === 1 ? "Activo" : "Inactivo" ;
            this.clinics.push(clinic as ClinicTableDto);
          }
        },
        (error: any) => {
          alert(error.error);
        }
      );
    }
  }

  applyFilterGlobal($event: any, s: string): void {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, s);
  }

  goToClinicDetail(idClinic: number): void {
    this.router.navigate([`/clinics/clinicdetail/${idClinic}`]);
  }

}
