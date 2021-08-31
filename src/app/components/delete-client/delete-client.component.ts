import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ClientsService} from "../../services/clients.service";

@Component({
  selector: 'app-delete-client',
  templateUrl: './delete-client.component.html',
  styleUrls: ['./delete-client.component.css']
})
export class DeleteClientComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {id: number},
              private dialogRef: MatDialogRef<DeleteClientComponent>,
              private clientsService: ClientsService,) {
  }

  ngOnInit(): void {
  }

  deleteClient() {
    console.log(this.data)
    this.clientsService.deleteClient$(+this.data.id).subscribe(() => {
      this.dialogRef.close({event: 'deleted'});
    });
  }
}
