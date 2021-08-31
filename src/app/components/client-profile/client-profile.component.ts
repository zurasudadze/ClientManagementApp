import { Component, OnInit } from '@angular/core';
import {slideInAnimation} from "../animations/animations";
import {Client} from "../../models/types";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {ClientsService} from "../../services/clients.service";

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css'],
  animations: [slideInAnimation]
})
export class ClientProfileComponent implements OnInit {

  client$: Observable<Client>

  constructor(
    private clientsService: ClientsService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit():void {
  this.activatedRoute.params.subscribe(params => {
    console.log(params)
   this.client$ = this.clientsService.getClient$(params.id)
    console.log(this.client$)
  })

  }

}
