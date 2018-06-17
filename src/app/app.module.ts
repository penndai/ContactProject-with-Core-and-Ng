import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Routing } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { AppMaterialModule } from './app.material.module';
import { ContactformComponent } from './contactform/contactform.component';
import { ContactlistComponent } from './contactlist/contactlist.component';
import { ContactService } from './contact.service';
import { ProjectService } from './project.service';
import { SelectionService } from './selection.service';
import { ProjectlistComponent } from './projectlist/projectlist.component';
import { ProjectformComponent } from './projectform/projectform.component';
import { SelectionlistComponent } from './selectionlist/selectionlist.component';
import { SelectionformComponent } from './pcselectionform/pcselectionform.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactformComponent,
    ContactlistComponent,
    ProjectlistComponent,
    ProjectformComponent,
    SelectionformComponent,
    SelectionlistComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    Routing
  ],
  providers: [ContactService, ProjectService, SelectionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
