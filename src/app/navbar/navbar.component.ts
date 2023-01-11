import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  items: MenuItem[];

  buttonLabel: string;

  logged: boolean;

  constructor(private router: Router) { }

   ngOnInit() {
        this.logged = localStorage.getItem("logged") === "ok" ? true : false;
        // Reads role from localStorage as defined for this MVP and shows menu items according to role
        if(localStorage.getItem("role") === "admin") {
            this.buttonLabel = "Cerrar sesión";
            this.items = [
                {
                    label: "Clínicas",
                    routerLink: "/clinics"
                },
                {
                    label: "Suscripciones",
                    items: [
                        {
                            label: "Buscar suscripciones o clientes",
                            routerLink: "/subscription"
                        },
                        {
                            label: "Desactivar suscripciones vencidas",
                            routerLink: "/expired-subscriptions"
                        }
                    ]
                },
                {
                    label: "Solicitudes de emergencias",
                    routerLink: "/emergency"
                },
                {
                    label: "Reportes",
                    routerLink: "/reports"
                },
                {
                    label: "Carga de archivos",
                    routerLink: "/fileupload"
                }
            ];
        }
        else if(localStorage.getItem("role") === "client"){
            this.buttonLabel = "Cerrar sesión";
            this.items = [
                {
                    label: "Clínicas",
                    routerLink: "/clinics"
                },
                {
                    label: "Mi suscripción",
                    routerLink: "/subscription"
                }
            ];
        }
        else {
            this.buttonLabel = "Regístrate";
            this.items = [];
        }
    }

    buttonClick(): void {
        this.router.navigate([""]);
    }

}
