import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {ClientsService} from "../../../services/clients.service";

@Component({
  selector: 'app-client-account-details',
  templateUrl: './client-account-details.component.html',
  styleUrls: ['./client-account-details.component.css']
})
export class ClientAccountDetailsComponent implements OnInit {
  @Input() data: any;
  @Output() toggleAccountStatus = new EventEmitter<number>()
  displayedColumns: string[] = ['accountNumber', 'accountType', 'accountStatus', 'currency', 'actions'];
  constructor() { }

  ngOnInit(): void {
  }

  onToggleAccountStatus(accountNumber: number) {
    this.toggleAccountStatus.emit(accountNumber)
  }
}

