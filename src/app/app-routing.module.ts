import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginGuard } from './admin-login.guard';
import { ClientLoginGuard } from './client-login.guard';
import { ClientSearchComponent } from './client-search/client-search.component';
import { ClinicDetailComponent } from './clinic-detail/clinic-detail.component';
import { ClinicsTableComponent } from './clinics-table/clinics-table.component';
import { EmergenciesTableComponent } from './emergencies-table/emergencies-table.component';
import { EmergencyDetailComponent } from './emergency-detail/emergency-detail.component';
import { EmergencyFormComponent } from './emergency-form/emergency-form.component';
import { ExpiredSubscriptionsComponent } from './expired-subscriptions/expired-subscriptions.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { GeneralLoginGuard } from './general-login.guard';
import { MainComponent } from './main/main.component';
import { MapComponent } from './map/map.component';
import { NewClinicFormComponent } from './new-clinic-form/new-clinic-form.component';
import { NewVeterinarianFormComponent } from './new-veterinarian-form/new-veterinarian-form.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  {path: "clinics", title: "Clínicas aliadas", component: ClinicsTableComponent, canActivate: [GeneralLoginGuard]},
  {path: "clinics/newclinic", title: "Registro de nueva clínica", component: NewClinicFormComponent, canActivate: [AdminLoginGuard]},
  {path: "clinics/editclinic/:id", title: "Actualizar clínica", component: NewClinicFormComponent, canActivate: [AdminLoginGuard]},
  {path: "clinics/clinicdetail/:id", title: "Detalle de clínica", component: ClinicDetailComponent, canActivate: [GeneralLoginGuard]},
  {path: "clinics/newveterinarian/:idclinic", title: "Registro de nuevo veterinario", component: NewVeterinarianFormComponent, canActivate: [AdminLoginGuard]},
  {path: "clinics/editveterinarian/:idclinic/:idvet", title: "Actualizar veterinario", component: NewVeterinarianFormComponent, canActivate: [AdminLoginGuard]},
  {path: "map", title: "Mapa de clínicas veterinarias", component: MapComponent,  canActivate: [GeneralLoginGuard]},
  {path: "emergency/:id", title: "Solicitud de atención de emergencia", component: EmergencyFormComponent, canActivate: [ClientLoginGuard]},
  {path: "fileupload", title: "Carga de archivos", component: FileUploadComponent, canActivate: [AdminLoginGuard]},
  {path: "emergency/detail/:id", title: "Detalle de emergencia", component: EmergencyDetailComponent, canActivate: [GeneralLoginGuard]},
  {path: "emergency", title: "Emergencias veterinarias", component: EmergenciesTableComponent, canActivate: [AdminLoginGuard]},
  {path: "subscription", title: "Consulta de clientes", component: ClientSearchComponent, canActivate: [GeneralLoginGuard]},
  {path: "reports", title: "Reportes de emergencias atendidas", component: ReportsComponent, canActivate: [AdminLoginGuard]},
  {path: "expired-subscriptions", title: "Desactivar suscripciones vencidas", component: ExpiredSubscriptionsComponent, canActivate: [AdminLoginGuard]},
  {path: "", title: "Bienvenido a Sistema de Gestión de Emergencias de Mascotas", component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
