import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { ReportRequest } from '../models/reportRequest.interface';
import { Species } from '../models/species.interface';
import { Symptom } from '../models/symptom.interface';
import { MainSymptomService } from '../services/mainSymptom.service';
import { ReportService } from '../services/report.service';
import { SpeciesService } from '../services/species.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  @ViewChild('dt') dt!: Table;

  yearsList: any[] = [
    {yearValue: 0,  year: "Últimos 5 años"},
    {yearValue: 2022, year: 2022},
    {yearValue: 2021, year: 2021},
    {yearValue: 2020, year: 2020},
    {yearValue: 2019, year: 2019},
    {yearValue: 2018, year: 2018},
    {yearValue: 2017, year: 2017},
  ];

  monthsList: any[] = [
    {monthValue: 0, month: "Todo el año"},
    {monthValue: 1, month: "Enero"},
    {monthValue: 2, month: "Febrero"},
    {monthValue: 3, month: "Marzo"},
    {monthValue: 4, month: "Abril"},
    {monthValue: 5, month: "Mayo"},
    {monthValue: 6, month: "Junio"},
    {monthValue: 7, month: "Julio"},
    {monthValue: 8, month: "Agosto"},
    {monthValue: 9, month: "Septiembre"},
    {monthValue: 10, month: "Octubre"},
    {monthValue: 11, month: "Noviembre"},
    {monthValue: 12, month: "Diciembre"}
  ];

  speciesList: Species[] = [
    {idSpecies: 0, species: "Todas"}
  ];

  symptomsList: Symptom[] = [
    {idMainSymptom: 0, mainSymptom: "Todos"}
  ];

  reports: any[] = [];

  columns: any[];

  reportsForm: FormGroup;

  reportRequest: ReportRequest;

  totalEmergencies: number;

  constructor(private reportService: ReportService, private readonly formBuilder: FormBuilder,
    private speciesService: SpeciesService, private mainSymptomsService: MainSymptomService) { }

  ngOnInit(): void {
    this.getSpecies();
    this.getMainSymptoms();
    this.columns = [
      {field: "idReport", header: "Id reporte"},
      {field: "reportYear", header: "Año"},
      {field: "reportMonth", header: "Mes"},
      {field: "species", header: "Especie atendida"},
      {field: "mainSymptom", header: "Síntoma reportado"},
      {field: "numberEmergencies", header: "Número de emergencias atendidas"},
      {field: "reportExecutionDate", header: "Fecha de corte"}
    ];
    this.reportsForm = this.initForm();
  }

  getSpecies() {
    this.speciesService.getSpecies().subscribe(
      (species: Species[]) => {
        this.speciesList = [...this.speciesList, ...species];
      },
      (error: any) => {
        alert(error.error);
      }
    );
  }

  getMainSymptoms() {
    this.mainSymptomsService.getMainSymptoms().subscribe(
      (symptoms: Symptom[]) => {
        this.symptomsList = [...this.symptomsList, ...symptoms];
      },
      (error: any) => {
        alert(error.error);
      }
    );
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      year: ["", [Validators.required]],
      month: ["", [Validators.required]],
      species: ["", [Validators.required]],
      symptom: ["", [Validators.required]]
    })
  }

  checkValid(field: string, validator: string): boolean {
    return this.reportsForm.get(field)?.touched && this.reportsForm.get(field)?.errors?.[validator];
  }

  onSubmit() {
    this.reportRequest = this.reportsForm.value;
    this.reportService.getReports(this.reportRequest).subscribe(
      (result: any) => {
        this.reports = result.reportsDto;
        this.totalEmergencies = result.numberOfEmergencies;
      },
      (error: any) => {
        alert(error.error);
      }
    );
  }

  downloadReport() {
    this.reportRequest = this.reportsForm.value;
    this.reportService.downloadReport(this.reportRequest).subscribe(
      (result: any) => {
        let file = new Blob([result], {type: "text/csv"})
        saveAs(
          file,
          `emergencies_report_${new Date().toDateString()}_year${this.reportsForm.value.year}/month${this.reportsForm.value.month}/species${this.reportsForm.value.species}/symptom${this.reportsForm.value.symptom}.csv`)
      }
    );
  }

  applyFilterGlobal($event: any, s: string): void {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, s);
  }

}
