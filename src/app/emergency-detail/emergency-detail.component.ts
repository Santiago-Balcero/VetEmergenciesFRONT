import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmergencyDetailDto } from '../models/emergencyDetailDto.interface';
import { EmergencyService } from '../services/emergency.service';

@Component({
  selector: 'app-emergency-detail',
  templateUrl: './emergency-detail.component.html',
  styleUrls: ['./emergency-detail.component.css']
})
export class EmergencyDetailComponent implements OnInit {

  idEmergency: number = Number(this.route.snapshot.paramMap.get('id'));

  emergency: EmergencyDetailDto;

  constructor(private route: ActivatedRoute, private emergencyService: EmergencyService) { }

  ngOnInit(): void {
    this.getEmergency();
  }

  getEmergency(): void {
    this.emergencyService.getEmergencyById(this.idEmergency).subscribe(
      (emergency: any) => {
        this.emergency = emergency;
      },
      (error: any) => {
        alert(error.error);
      }
    );
  }

}
