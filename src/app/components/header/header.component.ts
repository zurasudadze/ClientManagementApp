import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {APP_TITLE} from "../../../constants";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = APP_TITLE;
  constructor() { }

  ngOnInit(): void {
  }

}
