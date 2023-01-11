import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionWithEmergenciesDto } from '../models/subscriptionWithEmergenciesDto.interface';
import { SubscriptionService } from '../services/subscription.service';
import { ConfirmationService } from 'primeng/api';
import { EmergencyService } from '../services/emergency.service';

@Component({
  selector: 'app-client-search',
  templateUrl: './client-search.component.html',
  styleUrls: ['./client-search.component.css']
})
export class ClientSearchComponent implements OnInit {

  numberType: any[] = [
    {idNumberType: 1, numberType: "Documento de cliente"},
    {idNumberType: 2, numberType: "Número de suscripción"}
  ]

  title: string = "Búsqueda de emergencias de clientes";

  subtitle: string = "Selecciona la opción para consultar la información:";

  emergenciesSearchForm: FormGroup;

  subscriptionWithEmergencies: SubscriptionWithEmergenciesDto;

  // Boolean to check role of active session and customize buttons for actions
  admin: boolean;

  idClient: number;

  constructor(private readonly formBuilder: FormBuilder, private subscriptionService: SubscriptionService,
    private emergencyService: EmergencyService,
    private router: Router) { }

  ngOnInit(): void {
    // Checks role of active session
    this.admin = localStorage.getItem("role") === "admin";
    if(this.admin) {
      this.emergenciesSearchForm = this.initForm();
    }
    // If role is user
    else if(!this.admin) {
      this.idClient = parseInt(localStorage.getItem("id"));
      this.title = "Tu suscripción";
      this.subtitle = "A continuación encontrarás información detallada de tu suscripción y tu historial de emergencias.";
      this.getSubscriptionWithEmergenciesByIdClient();
    }
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      numberType: ["", [Validators.required]],
      // maxLength value is because maximum posible is the maximum idSubscription value in oracle sequence
      number: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(28), Validators.pattern(/^[0-9]\d*$/)]]
    })
  }

  checkValid(field: string, validator: string): boolean {
    return this.emergenciesSearchForm.get(field)?.touched && this.emergenciesSearchForm.get(field)?.errors?.[validator];
  }

  onSubmit(): void {
    if(this.emergenciesSearchForm.value.numberType === 1){
      this.subscriptionService.getSubscriptionWithEmergenciesByClientDocument(this.emergenciesSearchForm.value.number).subscribe(
        (result: any) => {
          this.subscriptionWithEmergencies = result;
        },
        (error: any) => {
          alert(error.error)
        }
      );
    }
    else if(this.emergenciesSearchForm.value.numberType === 2) {
      this.subscriptionService.getSubscriptionWithEmergenciesByIdSubscription(parseInt(this.emergenciesSearchForm.value.number)).subscribe(
        (result: any) => {
          this.subscriptionWithEmergencies = result;
        },
        (error: any) => {
          alert(error.error)
        }
      );
    }
  }

  getSubscriptionWithEmergenciesByIdClient() {
    this.subscriptionService.getSubscriptionWithEmergenciesByIdClient(this.idClient).subscribe(
      (result: any) => {
        this.subscriptionWithEmergencies = result;
      },
      (error: any) => {
        alert(error.error);
      }
    );
  }

  approveEmergency(idEmergency: number, idSubscription: number): void {
    this.emergencyService.approveEmergency(idEmergency, idSubscription).subscribe(
      (result: any) => {
        alert(result)
        this.onSubmit();
      },
      (error: any) => {
        alert(error.error)
      }
    );
  }

  confirmEmergency(idEmergency: number, idSubscription: number): void {
    this.emergencyService.confirmEmergency(idEmergency, idSubscription).subscribe(
      (result: any) => {
        alert(result);
        this.onSubmit();
      },
      (error: any) => {
        alert(error.error);
      }
    );
  }

  goToEmergencyDetail(idEmergency: number): void {
    this.router.navigate([`/emergency/detail/${idEmergency}`]);
  } 

}
