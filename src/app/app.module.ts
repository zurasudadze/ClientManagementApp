import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ClientsTableComponent } from './components/clients-table/clients-table.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import {HttpClientModule} from "@angular/common/http";
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { ClientProfileComponent } from './components/client-profile/client-profile.component';
import { ClientProfileDetailsComponent} from "./components/client-profile/client-profile-details/client-profile-details.component";
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ClientAccountDetailsComponent } from './components/client-profile/client-account-details/client-account-details.component';
import { DeleteClientComponent } from './components/delete-client/delete-client.component';
import {ImageUploaderComponent} from "./components/client-form/image-uploader/image-uploader.component";
import { PaginatorComponent } from './components/clients-table/paginator/paginator.component';


@NgModule({
  declarations: [
    AppComponent,
    ClientsTableComponent,
    ClientFormComponent,
    LayoutComponent,
    HeaderComponent,
    ClientProfileComponent,
    ClientProfileDetailsComponent,
    PageNotFoundComponent,
    ClientAccountDetailsComponent,
    DeleteClientComponent,
    ImageUploaderComponent,
    PaginatorComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule  { }
