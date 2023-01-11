import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClinicDetailDto } from '../models/clinicDetailDto.interface';
import { VeterinarianDetailDto } from '../models/veterinarianDetailDto.interface';
import { ClinicService } from '../services/clinic.service';
import { VeterinarianService } from '../services/veterinarian.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-clinic-detail',
  templateUrl: './clinic-detail.component.html',
  styleUrls: ['./clinic-detail.component.css'],
  providers: [ConfirmationService]
})
export class ClinicDetailComponent implements OnInit {

  // Boolean to check role of active session and customize buttons for actions
  admin: boolean;

  // Gets idClinic from URL, will be used in several methods
  id: number = Number(this.route.snapshot.paramMap.get('id'));

  clinic: ClinicDetailDto;

  veterinarians: VeterinarianDetailDto[] = [];

  constructor(private route: ActivatedRoute, private clinicService: ClinicService,
    private veterinarianService: VeterinarianService, private router: Router,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    // Checks role of active session
    this.admin = localStorage.getItem("role") === "admin";
    this.getClinicById();
    this.getVeterinariansByIdClinic();
  }

  getClinicById(): void {
    this.clinicService.getClinicById(this.id).subscribe(
      (result: any) => {
      this.clinic = result;
      },
      (error: any) => {
        alert(error.error);
      }
    );
  }

  getVeterinariansByIdClinic(): void {
    // For admin role all veterinarians are displayed
    if (this.admin) {
      this.veterinarianService.getAllVeterinariansByIdClinic(this.id).subscribe(
        (result: any) => {
          this.veterinarians = result;
        },
        (error: any) => {
        }
      );
    }
    // For user role only active veterinarians are displayed
    else {
      this.veterinarianService.getActiveVeterinariansByIdClinic(this.id).subscribe(
        (result: any) => {
          this.veterinarians = result;
        },
        (error: any) => {
          alert(error.error);
        }
      );
    }
  }

  confirmDeactivateClinic(): void {
    this.confirmationService.confirm({
      message: '¿Estás seguro de desactivar esta clínica?',
      header: 'Desactivar clínica',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.clinicService.updateActiveStatus(this.id, 0).subscribe(
            (result: any) => {
              this.confirmationService.close();
              alert(result);
              this.ngOnInit();
            },
            (error: any) => {
              alert(error.error);
            }
          );
      },
      reject: () => {
        this.confirmationService.close();
      }
  });
  }

  confirmActivateClinic(): void {
    this.confirmationService.confirm({
      message: '¿Estás seguro de activar esta clínica?',
      header: 'Activar clínica',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.clinicService.updateActiveStatus(this.id, 1).subscribe(
            (result: any) => {
              this.confirmationService.close();
              alert(result);
              this.ngOnInit();
            },
            (error: any) => {
              alert(error.error);
            }
          );
      },
      reject: () => {
        this.confirmationService.close();
      }
  });
  }

  confirmDeleteClinic(): void {
    this.confirmationService.confirm({
      message: '¿Estás seguro de borrar permanentemente esta clínica?',
      header: 'Borrar clínica',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.clinicService.deleteClinic(this.id).subscribe(
            (result: any) => {
              this.confirmationService.close();
              alert(result);
              this.router.navigate(['/clinics']);
            },
            (error: any) => {
              alert(error.error);
            }
          );
      },
      reject: () => {
        this.confirmationService.close();
      }
  });
  }

  confirmDeactivateVet(idVeterinarian: number): void {
    this.confirmationService.confirm({
      message: '¿Estás seguro de desactivar este veterinario?',
      header: 'Desactivar veterinario',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.veterinarianService.updateActiveStatus(idVeterinarian, 0).subscribe(
            (result: any) => {
              this.confirmationService.close();
              alert(result);
              this.ngOnInit();
            },
            (error: any) => {
              alert(error.error);
            }
          );
      },
      reject: () => {
        this.confirmationService.close();
      }
  });
  }

  confirmActivateVet(idVeterinarian: number): void {
    this.confirmationService.confirm({
      message: '¿Estás seguro de activar este veterinario?',
      header: 'Activar veterinario',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.veterinarianService.updateActiveStatus(idVeterinarian, 1).subscribe(
            (result: any) => {
              this.confirmationService.close();
              alert(result);
              this.ngOnInit();
            },
            (error: any) => {
              alert(error.error);
            }
          );
      },
      reject: () => {
        this.confirmationService.close();
      }
    });
  }

  confirmDeleteVet(idVeterinarian: number): void {
    this.confirmationService.confirm({
      message: '¿Estás seguro de borrar permanentemente este veterinario?',
      header: 'Borrar veterinario',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.veterinarianService.deleteVeterinarian(idVeterinarian).subscribe(
            (result: any) => {
              this.confirmationService.close();
              alert(result);
              this.ngOnInit();
            },
            (error: any) => {
              alert(error.error);
            }
          );
      },
      reject: () => {
        this.confirmationService.close();
      }
  });
  }

  goToCreateVet(): void {
    this.router.navigate([`/clinics/newveterinarian/${this.clinic.idClinic}`]);
  }

  goToEditClinic(): void {
    this.router.navigate([`/clinics/editclinic/${this.id}`]);
  }

  goToEditVeterinarian(idVeterinarian: number): void {
    this.router.navigate([`/clinics/editveterinarian/${this.id}/${idVeterinarian}`]);
  }

  goToEmergencyForm(): void {
    this.router.navigate([`/emergency/${this.id}`]);
  }

}
