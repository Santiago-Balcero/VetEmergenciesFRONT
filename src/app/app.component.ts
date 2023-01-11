import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'tc_sb_35_front';
  constructor (private router: Router) { }

  ngOnInit() {
    // Strategy defined to deal with roles for this MVP is storing role and client id in localStorage
    // Future iterations of this project must include proper login implementation
    // localStorage.setItem("role", "");
    // localStorage.setItem("role", "admin");
    // localStorage.setItem("id", "4301");
    // localStorage.setItem("id", "4302");
    // localStorage.setItem("id", "4301");
    // this.router.navigate(["main"]);
  }

}
