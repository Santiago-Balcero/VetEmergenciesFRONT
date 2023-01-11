import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../services/subscription.service';

@Component({
  selector: 'app-expired-subscriptions',
  templateUrl: './expired-subscriptions.component.html',
  styleUrls: ['./expired-subscriptions.component.css']
})
export class ExpiredSubscriptionsComponent implements OnInit {

  // Boolean to check role of active session and customize buttons for actions
  admin: boolean;

  constructor(private subscriptionService: SubscriptionService) { }

  ngOnInit(): void {
    // Checks role of active session
    this.admin = localStorage.getItem("role") === "admin";
  }

  checkForExpiredSubscriptions(): void {
    this.subscriptionService.checkForExpiredSubscriptions().subscribe(
      (result: any) => {
        alert(result);
      },
      (error: any) => {
        alert(error.error);
      }
    );
  }

}
