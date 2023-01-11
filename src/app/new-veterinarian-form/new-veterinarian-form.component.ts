import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VeterinarianDetailDto } from '../models/veterinarianDetailDto.interface';
import { VeterinarianFormDto } from '../models/veterinarianFormDto.interface';
import { VeterinarianService } from '../services/veterinarian.service';

@Component({
  selector: 'app-new-veterinarian-form',
  templateUrl: './new-veterinarian-form.component.html',
  styleUrls: ['./new-veterinarian-form.component.css']
})
export class NewVeterinarianFormComponent implements OnInit {

  constructor(private readonly formBuilder: FormBuilder,
    private veterinarianService: VeterinarianService, private router: Router,
    private route: ActivatedRoute) { }

  // Gets idVeterinarian from URL, will be used to get info of veterinarian if form is for update
  idVet: number = Number(this.route.snapshot.paramMap.get('idvet'));

  idClinic: number = Number(this.route.snapshot.paramMap.get('idclinic'));

  createMode: boolean;

  newVeterinarianForm: FormGroup;

  newVeterinarian: VeterinarianFormDto;

  editVeterinarian: VeterinarianDetailDto;

  formTitle: string = "Registro de nuevo veterinario";

  formInstructions: string = "Diligencia todos los campos del formulario para registrar un nuevo veterinario.";
  
  buttonText: string = "Registrar veterinario";

  disableDocument: boolean = false;

  lastUpdateInfo: string;

  activeVeterinarian: number;

  ngOnInit(): void {
    this.newVeterinarianForm = this.initForm();
    this.createMode = !this.idVet;
    if(!this.createMode) {
      this.fillWithVeterinarianInfo();
    }
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      vetDocument: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      vetName: ["", [Validators.required, Validators.maxLength(50)]],
      vetLastname: ["", [Validators.required, Validators.maxLength(50)]],
      vetTelephone: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]\d*$/)]],
      vetEmail: ["", [Validators.required, Validators.email]]
    })
  }

  checkValid(field: string, validator: string): boolean {
      return this.newVeterinarianForm.get(field)?.touched && this.newVeterinarianForm.get(field)?.errors?.[validator];
  }

  veterinarianFactory(): void {
    if(this.createMode) {
      this.newVeterinarian = this.newVeterinarianForm.value;
      this.newVeterinarian.vetClinicId = this.idClinic;
    }
    else {
      this.editVeterinarian = this.newVeterinarianForm.value;
      this.editVeterinarian.idVeterinarian = this.idVet;
      this.editVeterinarian.vetClinicId = this.idClinic;
      this.editVeterinarian.isActive = this.activeVeterinarian;
    }
  }

  onSubmit(): void {
    this.veterinarianFactory();
    if (this.createMode) {
      this.veterinarianService.createVeterinarian(this.newVeterinarian).subscribe(
        (result: any) => {
          alert(result);
          this.router.navigate([`/clinics/clinicdetail/${this.idClinic}`]);
        },
        (error: any) => {
          alert(error.error);
        }
      );
    }
    else {
      this.veterinarianService.updateVeterinarian(this.editVeterinarian).subscribe(
        (result: any) => {
          alert(result);
            this.router.navigate([`/clinics/clinicdetail/${this.idClinic}`]);
        },
        (error: any) => {
          alert(error.error);
        }
      );
    }
  }

  fillWithVeterinarianInfo(): void {
    this.disableDocument = true;
    this.formTitle = "Actualizar información del veterinario";
    this.formInstructions = "Actualiza solo la información necesaria.";
    this.formInstructions = "Actualiza solo la información necesaria.";
    this.buttonText = "Actualizar veterinario";
    this.veterinarianService.getVeterinarianById(this.idVet).subscribe(
    (result: any) => {
      this.lastUpdateInfo = `Última modificación: ${result.lastUpdateAction} ${result.lastUpdateDate} 
        - Estado: ${result.isActive === 1 ? "Activo" : "Inactivo"}`;
      this.newVeterinarianForm.patchValue(result);
      this.activeVeterinarian = result.isActive;
    });
  }

}
