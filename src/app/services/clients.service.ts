import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Client} from "../models/types";
import {ENDPOINT_CLIENTS} from "../../constants";

@Injectable({
  providedIn: 'root'
})

export class ClientsService {
  constructor(private http: HttpClient) {
    console.log(ENDPOINT_CLIENTS)
  }

  getClients$(): Observable<Client[]> {
    return this.http.get<Client[]>(ENDPOINT_CLIENTS)
  }

  getClient$(id: string): Observable<Client> {
    return this.http.get<Client>(`${ENDPOINT_CLIENTS}/${id}`)
  }

  addClient$(data: Client): Observable<Client> {
    return this.http.post<Client>(ENDPOINT_CLIENTS, data)
  }

  updateClient$(id: string, data: Client): Observable<Client> {
    return this.http.put<Client>(`${ENDPOINT_CLIENTS}/${id}`, data)
  }

  deleteClient$(id: number): Observable<Client> {
    return this.http.delete<Client>(`${ENDPOINT_CLIENTS}/${id}`)
  }
}
