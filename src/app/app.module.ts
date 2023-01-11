import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CheckboxModule} from 'primeng/checkbox';
import {TableModule} from 'primeng/table';
import {CardModule} from 'primeng/card';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {GMapModule} from 'primeng/gmap';
import {FileUploadModule} from 'primeng/fileupload';
import {InputTextareaModule} from 'primeng/inputtextarea';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NewClinicFormComponent } from './new-clinic-form/new-clinic-form.component';
import { ClinicsTableComponent } from './clinics-table/clinics-table.component';
import { ClinicDetailComponent } from './clinic-detail/clinic-detail.component';
import { NewVeterinarianFormComponent } from './new-veterinarian-form/new-veterinarian-form.component';
import { MapComponent } from './map/map.component';
import { EmergencyFormComponent } from './emergency-form/emergency-form.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { EmergencyDetailComponent } from './emergency-detail/emergency-detail.component';
import { EmergenciesTableComponent } from './emergencies-table/emergencies-table.component';
import { ClientSearchComponent } from './client-search/client-search.component';
import { ReportsComponent } from './reports/reports.component';
import { ExpiredSubscriptionsComponent } from './expired-subscriptions/expired-subscriptions.component';
import { MainComponent } from './main/main.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NewClinicFormComponent,
    ClinicsTableComponent,
    ClinicDetailComponent,
    NewVeterinarianFormComponent,
    MapComponent,
    EmergencyFormComponent,
    FileUploadComponent,
    EmergencyDetailComponent,
    EmergenciesTableComponent,
    ClientSearchComponent,
    ReportsComponent,
    ExpiredSubscriptionsComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CheckboxModule,
    TableModule,
    CardModule,
    ConfirmDialogModule,
    GMapModule,
    FileUploadModule,
    InputTextareaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
