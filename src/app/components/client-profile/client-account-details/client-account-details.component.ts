import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";

@Component({
  selector: 'app-client-account-details',
  templateUrl: './client-account-details.component.html',
  styleUrls: ['./client-account-details.component.css']
})
export class ClientAccountDetailsComponent implements OnInit {
  @Input() data: any;
  displayedColumns: string[] = ['accountNumber', 'accountType', 'accountStatus', 'currency', 'actions'];
  constructor() { }

  ngOnInit(): void {
  }

}
