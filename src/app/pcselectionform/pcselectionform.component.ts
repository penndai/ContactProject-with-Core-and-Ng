import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, AUTOCOMPLETE_PANEL_HEIGHT } from '@angular/material';
import { SelectionlistComponent } from '../selectionlist/selectionlist.component';
import { ISelection } from '../model/selection';
import { SelectionService } from '../selection.service';
import { ProjectService } from '../project.service';
import { DBOperation } from '../shared/DBOperation';
import { Global } from '../shared/Global';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-selectionform',
  templateUrl: './pcselectionform.component.html'
})


export class SelectionformComponent implements OnInit {
  msg: string;
  indLoading = false;
  selectionFrm: FormGroup;

  projects = [];
  contacts = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _projectService: ProjectService,
    private _contactService :ContactService,
    private _selectionService: SelectionService,
    public dialogRef: MatDialogRef<SelectionlistComponent>) { }

  loadProjects(): void {
      this._projectService.getAllProjectNames(Global.BASE_PROJECT_ENDPOINT + 'getAllProjectNames')
        .subscribe(projects => {         
          this.projects = projects;
        });
    }

  loadContacts():void{
    this._contactService.getAllContactNames(Global.BASE_USER_ENDPOINT + 'getAllContactNames')
    .subscribe(contacts => {         
      this.contacts = contacts;
    });
  }

  ngOnInit() {
    this.selectionFrm = this.fb.group({
      id: [''],
      project: [''],     
      contact: ['']
    });

    this.loadContacts();
    this.loadProjects();

    this.selectionFrm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
    if (this.data.dbops === DBOperation.create) {
      this.selectionFrm.reset();
    } else {
      this.selectionFrm.setValue(this.data.selection);
    }
    this.SetControlsState(this.data.dbops === DBOperation.delete ? false : true);
  }

  onValueChanged(data?: any) {    
    if (!this.selectionFrm) { return; }
    const form = this.selectionFrm;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'contact': '',
    'project': ''
  };

  validationMessages = {
    'contact': {      
      'required': 'Contact is required.'
    },
    'project': {
      'required': 'Project is required.'
    }
  };

  onSubmit(formData: any) {
    const selectionData = this.mapDateData(formData.value);
    
    switch (this.data.dbops) {
      case DBOperation.create:
        this._selectionService.addSelection(Global.BASE_SELECTION_ENDPOINT + 'addSelection', selectionData).subscribe(
          data => {
            // Success
            if (data.message) {
              this.dialogRef.close('success');
            } else {
              this.dialogRef.close('error');
            }
          },
          error => {
            this.dialogRef.close('error');
          }
        );
        break;
      case DBOperation.update:
        this._selectionService.updateSelection(Global.BASE_SELECTION_ENDPOINT + 'updateSelection', selectionData.id, selectionData).subscribe(
          data => {
            // Success
            if (data.message) {
              this.dialogRef.close('success');
            } else {
              this.dialogRef.close('error');
            }
          },
          error => {
            this.dialogRef.close('error');
          }
        );
        break;
      case DBOperation.delete:
        this._selectionService.deleteSelection(Global.BASE_SELECTION_ENDPOINT + 'deleteSelection', selectionData.id).subscribe(
          data => {
            // Success
            if (data.message) {
              this.dialogRef.close('success');
            } else {
              this.dialogRef.close('error');
            }
          },
          error => {
            this.dialogRef.close('error');
          }
        );
        break;
    }
  }

  SetControlsState(isEnable: boolean) {
    isEnable ? this.selectionFrm.enable() : this.selectionFrm.disable();
  }

  mapDateData(selection: ISelection): ISelection {        
    return selection;
  }
}
