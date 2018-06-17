import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ContactlistComponent } from './contactlist/contactlist.component';
import { ContactformComponent } from './contactform/contactform.component';
import { ProjectlistComponent } from './projectlist/projectlist.component';
import { ProjectformComponent } from './projectform/projectform.component';
import {SelectionlistComponent} from './selectionlist/selectionlist.component';
import {SelectionformComponent} from './pcselectionform/pcselectionform.component';

const appRoutes: Routes = [
  { path: '',  pathMatch: 'full' , component: ContactlistComponent },
  { path: 'contactlist', component: ContactlistComponent},
  { path: 'contactform', component: ContactformComponent },
  {path: 'projectlist', component: ProjectlistComponent},
  {path: 'projectform', component: ProjectformComponent},
  {path: 'selectionlist', component: SelectionlistComponent},
  {path: 'selectionform', component: SelectionformComponent}
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
