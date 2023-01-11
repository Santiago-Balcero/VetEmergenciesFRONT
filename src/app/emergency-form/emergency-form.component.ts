import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClinicEmergencyDto } from '../models/clinicEmergencyDto.interface';
import { EmergencyFormDto } from '../models/emergencyFormDto.interface';
import { Species } from '../models/species.interface';
import { SubscriptionEmergencyFormDto } from '../models/subscriptionEmergencyFormDto.interface';
import { Symptom } from '../models/symptom.interface';
import { ClinicService } from '../services/clinic.service';
import { EmergencyService } from '../services/emergency.service';
import { MainSymptomService } from '../services/mainSymptom.service';
import { SpeciesService } from '../services/species.service';
import { SubscriptionService } from '../services/subscription.service';

@Component({
  selector: 'app-emergency-form',
  templateUrl: './emergency-form.component.html',
  styleUrls: ['./emergency-form.component.css']
})
export class EmergencyFormComponent implements OnInit {

  idClinic: number = Number(this.route.snapshot.paramMap.get('id'));

  clientId: number;

  isActive: number;

  symptomsList: Symptom[];

  speciesList: Species[];

  // Initializes clinic to avoid undefined error in Chrome
  clinic: ClinicEmergencyDto;

  // Initializes subscription to avoid undefined error in Chrome
  subscription: SubscriptionEmergencyFormDto;

  newEmergencyForm: FormGroup;

  newEmergency: EmergencyFormDto;

  constructor(private subscriptionService: SubscriptionService, private route: ActivatedRoute,
    private clinicService: ClinicService, private readonly formBuilder: FormBuilder,
    private mainSymptomsService: MainSymptomService, private speciesService: SpeciesService,
    private emergencyService: EmergencyService, private router: Router) { }

  ngOnInit(): void {
    this.clientId = +localStorage.getItem("id");
    this.getSubscription();
    this.getClinic();
    this.getMainSymptoms();
    this.getSpecies();
    this.newEmergencyForm = this.initForm();
  }

  getSubscription(): void {
    this.subscriptionService.getSubscriptionByIdClient(this.clientId).subscribe(
      (result: SubscriptionEmergencyFormDto) => {
        this.subscription = result;
        this.isActive = result.isActive;
      },
      (error: any) => {
        alert(error.error);
      }
    );
  }

  getClinic(): void {
    this.clinicService.getClinicByIdForEmergency(this.idClinic).subscribe(
      (result: any) => {
        this.clinic = result;
      },
      (error: any) => {
        alert(error.error);
      }
    );
  }

  getMainSymptoms(): void {
    this.mainSymptomsService.getMainSymptoms().subscribe(
      (symptoms: Symptom[]) => {
        this.symptomsList = symptoms;
      },
      (error: any) => {
        alert(error.error);
      }
    );
  }

  getSpecies(): void {
    this.speciesService.getSpecies().subscribe(
      (species: Species[]) => {
        this.speciesList = species;
      },
      (error: any) => {
        alert(error.error);
      }
    );
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      emergencyMainSymptom: ["", [Validators.required]],
      emergencySpecies: ["", [Validators.required]],
      emergencyDescription: ["", [Validators.required, Validators.maxLength(1000)]]
    })
  }

  checkValid(field: string, validator: string): boolean {
      return this.newEmergencyForm.get(field)?.touched && this.newEmergencyForm.get(field)?.errors?.[validator];
  }

  emergencyFactory(): void {
    this.newEmergency = this.newEmergencyForm.value;
    this.newEmergency.emergencyClinic = this.idClinic;
    this.newEmergency.emergencySubscription = this.subscription.idSubscription;
  }

  onSubmit(): void {
    this.emergencyFactory();
    this.emergencyService.createEmergency(this.newEmergency).subscribe(
      (result: any) => {
        alert(result);
        let results = result.split(" ");
        let idEmergency = parseInt(results[results.length - 1]);
        this.router.navigate([`/emergency/detail/${idEmergency}`]);
      },
      (error: any) => {
        alert(error.error);
      }
    );
  }

  renewSubscription(): void {
    // This method will navigate to payment view in future versions
    // For MVP purposes this method renews subscription
    this.subscriptionService.renewSubscription(this.subscription.idSubscription).subscribe(
      (result: any) => {
        alert(result);
        this.ngOnInit();
      },
      (error: any) => {
        alert(error.errror);
      }
    );
  }

}
