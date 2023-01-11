import { Injectable } from "@angular/core";
import { CitiesByDepartmentsService } from "../services/cities-by-departments.service";
import { Department } from "../models/department.interface";

@Injectable({
    providedIn: "root"
})
export class Departments {

    constructor (private citiesDepartmentsService: CitiesByDepartmentsService) {}

    cities: any[] = [];

    public getCities(idDepartment: number) {
        let department: string = this.departments[idDepartment - 1].department!;
        // Cleans the cities list before filling it again with the results of API call
        this.cities = [];
        // Condition evaluation to avoid having such a long string in dropdown menu
        if (department === "San Andrés y Providencia") {
            department = "Archipiélago de San Andrés, Providencia y Santa Catalina";
        }
        this.citiesDepartmentsService.citiesByDepartament(department).subscribe((data: any) => {
        for (let d of data) {
            this.cities.push({city: d.municipio});
        }
    });
    }

    departments: Department[] = [
        {idDepartment: 1, department: "Antioquia"},
        {idDepartment: 2, department: "Arauca"},
        {idDepartment: 3, department: "Amazonas"},
        {idDepartment: 4, department: "Atlántico"},
        {idDepartment: 5, department: "Bogotá D.C."},
        {idDepartment: 6, department: "Bolívar"},
        {idDepartment: 7, department: "Boyacá"},
        {idDepartment: 8, department: "Caldas"},
        {idDepartment: 9, department: "Caquetá"},
        {idDepartment: 10, department: "Casanare"},
        {idDepartment: 11, department: "Cauca"},
        {idDepartment: 12, department: "Cesar"},
        {idDepartment: 13, department: "Chocó"}, 
        {idDepartment: 14, department: "Córdoba"},
        {idDepartment: 15, department: "Cundinamarca"},
        {idDepartment: 16, department: "Guainía"},
        {idDepartment: 17, department: "Guaviare"},
        {idDepartment: 18, department: "Huila"},
        {idDepartment: 19, department: "La Guajira"},
        {idDepartment: 20, department: "Magdalena"},
        {idDepartment: 21, department: "Meta"},
        {idDepartment: 22, department: "Nariño"},
        {idDepartment: 23, department: "Norte de Santander"},
        {idDepartment: 24, department: "Putumayo"},
        {idDepartment: 25, department: "Quindío"},
        {idDepartment: 26, department: "Risaralda"},
        {idDepartment: 27, department: "San Andrés y Providencia"},
        {idDepartment: 28, department: "Santander"},
        {idDepartment: 29, department: "Sucre"},
        {idDepartment: 30, department: "Tolima"},
        {idDepartment: 31, department: "Valle del Cauca"},
        {idDepartment: 32, department: "Vaupés"},
        {idDepartment: 33, department: "Vichada"}
    ];

}