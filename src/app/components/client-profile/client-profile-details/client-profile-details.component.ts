import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Client} from "../../../models/types";

@Component({
  selector: 'app-client-profile-details',
  templateUrl: './client-profile-details.component.html',
  styleUrls: ['./client-profile-details.component.css']
})
export class ClientProfileDetailsComponent implements OnInit {
  @Input() data: Observable<Client>
  constructor() { }

  ngOnInit(): void {
  }

}
