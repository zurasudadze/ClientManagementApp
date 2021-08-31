import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientsTableComponent} from "./components/clients-table/clients-table.component";
import {ClientFormComponent} from "./components/client-form/client-form.component";
import {ClientProfileComponent} from "./components/client-profile/client-profile.component";
import {ClientResolver} from "./resolvers/client.resolver";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";

const routes: Routes = [
  {path: '', redirectTo: '/clients', pathMatch: 'full'},
  {path: 'clients', component: ClientsTableComponent},
  {path: 'clients/client/:id', component: ClientProfileComponent, resolve: {client: ClientResolver}},
  {path: 'add-client', component: ClientFormComponent, pathMatch: 'full'},
  {path: 'clients/edit-client/:id', component: ClientFormComponent, resolve: {client: ClientResolver}},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
