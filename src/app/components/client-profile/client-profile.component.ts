import {Component, OnDestroy, OnInit} from '@angular/core';
import {slideInAnimation} from "../animations/animations";
import {Client} from "../../models/types";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {ClientsService} from "../../services/clients.service";
import {filter, mergeMap} from "rxjs/operators";

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css'],
  animations: [slideInAnimation]
})
export class ClientProfileComponent implements OnInit, OnDestroy {

  client: Client
  isLoading = true;
  clientId: string
  private subscription: Subscription;
  constructor(
    private clientsService: ClientsService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.params.pipe(
      filter(({id}) => Boolean(id)),
      mergeMap(({id}) => {
        this.clientId = id
        this.isLoading = false;
        return this.clientsService.getClient$(id)
      })
    ).subscribe(client => {
      this.client = client
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  toggle(accountNumber: number) {
    const updatedAccounts = this.client.account.map(acc => {
      if (acc.accountNumber === accountNumber) {
        return {
          ...acc,
          accountStatus: acc.accountStatus === 'open' ? 'closed' : 'open'
        }
      }
      return acc
    })
    this.clientsService.updateClient$(this.clientId, {
      ...this.client,
      account: updatedAccounts
    }).subscribe(() => {
      this.clientsService.getClient$(this.clientId).subscribe(client => {
        this.client = client
      })
    })
  }
}
