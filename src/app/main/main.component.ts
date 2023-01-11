import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../services/client.service';
import { CurrentPositionService } from '../services/currentPosition.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder, private clientService: ClientService,
    private router: Router, private cps: CurrentPositionService) { }

  ngOnInit(): void {
    localStorage.clear();
    this.cps.getLocation();
    this.loginForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      loginDocument: ["", [Validators.required]],
      loginPassword: ["", [Validators.required]]
    })
  }

  onSubmit(): void {
    if(this.loginForm.value.loginDocument === "admin" && this.loginForm.value.loginPassword === "admin") {
      localStorage.setItem("role", "admin");
      localStorage.setItem("logged", "ok");
      this.router.navigate(["clinics"]);
    }
    else {
      this.clientService.login(this.loginForm.value).subscribe(
        (result: any) => {
          localStorage.setItem("role", "client");
          localStorage.setItem("logged", "ok");
          localStorage.setItem("id", `${result}`);
          this.router.navigate(["clinics"]);      
        },
        (error: any) => {
          alert(error.error);
        }
      );
    }

  }
}
