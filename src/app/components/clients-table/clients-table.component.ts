import {AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ClientsService} from "../../services/clients.service";
import {Observable, Subscription} from "rxjs";
import {MatDialog} from '@angular/material/dialog';
import {slideInAnimation} from "../animations/animations";
import {DeleteClientComponent} from "../delete-client/delete-client.component";
import {Client} from "../../models/types";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.css'],
  animations: [slideInAnimation]
})
export class ClientsTableComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'lastName', 'gender', 'personalNumber', 'phoneNumber', 'actions'];
  clients: Client[];
  dataSource: any = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('paginator', {static: true}) paginator: any;
  search: string;
  pageIndex = 0;
  filterValue = ''
  isLoading = true;
  private subscription: Subscription;

  constructor(
    private clientsService: ClientsService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.getClients();
    const filterValue = localStorage.getItem('filterValue');
    if (filterValue) {
      this.filterValue = filterValue;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    const pageIndex = localStorage.getItem('pageIndex');
    if (pageIndex) {
      this.pageIndex = +pageIndex;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort
  }

  getClients(): void {
    this.subscription = this.clientsService.getClients$().subscribe(clients => {
      this.dataSource.data = clients
      this.isLoading = false;
      this.dataSource.paginator = this.paginator.paginator
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    localStorage.setItem('filterValue', filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  deleteClient(id: string) {
    const dialogRef = this.dialog.open(DeleteClientComponent, {
      data: {id},
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'deleted') {
        this.getClients()
      }
    });
  }

  onPageChange(e: any) {
    this.pageIndex = e;
    localStorage.setItem('pageIndex', `${this.pageIndex}`);
  }
}
