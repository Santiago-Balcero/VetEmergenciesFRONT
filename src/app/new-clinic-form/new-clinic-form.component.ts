import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClinicDetailDto } from '../models/clinicDetailDto.interface';
import { ClinicFormDto } from '../models/clinicFormDto.interface';
import { Service } from '../models/service.interface';
import { ClinicService } from '../services/clinic.service';
import { ServiceService } from '../services/service.service';
import { Departments } from './departments-list';

@Component({
  selector: 'app-new-clinic-form',
  templateUrl: './new-clinic-form.component.html',
  styleUrls: ['./new-clinic-form.component.css']
})
export class NewClinicFormComponent implements OnInit {

  constructor(private readonly formBuilder: FormBuilder,
    private d: Departments, private clinicService: ClinicService,
    private router: Router, private route: ActivatedRoute, private serviceService: ServiceService) { }

  // Gets idClinic from URL, will be used to get info of clinic if form is for update
  id: number = Number(this.route.snapshot.paramMap.get('id'));

  createMode: boolean;

  newClinicForm: FormGroup;

  formTitle: string = "Registro de nueva clínica";

  formInstructions: string = "Diligencia todos los campos del formulario para registrar una nueva clínica.";
  
  buttonText: string = "Registrar clínica";

  departmentsList = this.d.departments;

  servicesList: Service[];

  citiesList = this.d.cities;

  newClinic: ClinicFormDto = {};

  editClinic: ClinicDetailDto = {};

  selectedServices: any[] = [];

  disableNit: boolean = false;

  lastUpdateInfo: string;

  activeClinic: number;

  ngOnInit(): void {
    this.newClinicForm = this.initForm();
    this.getServices();
    // createMode will be true if id from URL is false or 0, otherwise false and will enter in edit mode
    this.createMode = !this.id;
    if(!this.createMode) {
      this.fillWithClinicInfo();
    }
  }

  getServices() {
    this.serviceService.getServices().subscribe(
      (result: Service[]) => {
        this.servicesList = result;
      },
      (error: any) => {
        alert(error.error);
      }
    );
  }

  setCities(): void {
    this.d.getCities(this.newClinicForm.get('clinicDepartment')!.value);
    this.citiesList = this.d.cities;
  }

  onSubmit(): void {
    this.clinicFactory();
    if (this.createMode) {
      this.clinicService.createClinic(this.newClinic).subscribe(
        (result: any) => {
          alert(result);
          this.router.navigate(["/clinics"]);
        },
        (error) => {
          alert(error.error)
          this.newClinicForm.reset();
          this.selectedServices = [];
        }
      );
    }
    else {
      this.clinicService.updateClinic(this.editClinic).subscribe(
        (result: any) => {
          alert(result);
          this.router.navigate([`/clinics/clinicdetail/${this.id}`]);
        },
        (error: any) => {
          alert(error.error);
        }
      );
    }
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      clinicNit: ["", [Validators.required, Validators.minLength(9), Validators.maxLength(9),Validators.pattern(/^[0-9]\d*$/)]],
      clinicName: ["", [Validators.required]],
      clinicDepartment: ["", [Validators.required]],
      clinicCity: ["", [Validators.required]],
      clinicAddress: ["", [Validators.required, Validators.minLength(10)]],
      clinicTelephone: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]\d*$/)]],
      clinicEmail: ["", [Validators.required, Validators.email]]
    })
  }

  checkValid(field: string, validator: string): boolean {
      return this.newClinicForm.get(field)?.touched && this.newClinicForm.get(field)?.errors?.[validator];
  }

  clinicFactory(): void {
    if(this.createMode) {
      this.newClinic = this.newClinicForm.value;
      this.newClinic.clinicServices = this.selectedServices;
    }
    else {
      this.editClinic = this.newClinicForm.value;
      this.editClinic.idClinic = this.id;
      // Method to get the entire department based on idDepartment as selected from values in dropdown menu
      this.editClinic.clinicDepartment = this.departmentsList.find(dept => dept.idDepartment === this.newClinicForm.value.clinicDepartment);
      this.editClinic.clinicServices = this.selectedServices;
      this.editClinic.isActive = this.activeClinic;
    }
  }

  fillWithClinicInfo(): void {
    this.formTitle = "Actualizar información de la clínica";
    this.formInstructions = "Actualiza solo la información necesaria.";
    this.buttonText = "Actualizar clínica";
    this.clinicService.getClinicById(this.id).subscribe(
      (result: any) => {
        this.newClinicForm.patchValue(result);
        this.disableNit = true;
        this.newClinicForm.get('clinicDepartment').setValue(result.clinicDepartment.idDepartment);
        this.setCities();
        // This push makes appear the city repeated in dropdown list
        this.citiesList.push({city: result.clinicCity});
        this.newClinicForm.get('clinicCity').setValue(result.clinicCity);
        this.selectedServices = result.clinicServices;
        this.lastUpdateInfo = `Última modificación: ${result.lastUpdateAction} ${result.lastUpdateDate} 
          - Estado: ${result.isActive === 1 ? "Activo" : "Inactivo"}`;
        this.activeClinic = result.isActive;
    });
  }

}
