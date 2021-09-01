import {Injectable} from "@angular/core";
import {ClientsService} from "../services/clients.service";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClientResolver implements Resolve<any> {
  constructor(private clientsService: ClientsService) {

  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.clientsService.getClient$(route.paramMap.get('id') || '')
  }

}
