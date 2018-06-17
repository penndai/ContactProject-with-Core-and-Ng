import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, AUTOCOMPLETE_PANEL_HEIGHT } from '@angular/material';
import { ProjectlistComponent } from '../projectlist/projectlist.component';
import { IProject } from '../model/project';
import { ProjectService } from '../project.service';
import { DBOperation } from '../shared/DBOperation';
import { Global } from '../shared/Global';

@Component({
  selector: 'app-projectform',
  templateUrl: './projectform.component.html'
})

export class ProjectformComponent implements OnInit {
  msg: string;
  indLoading = false;
  projectFrm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _projectService: ProjectService,
    public dialogRef: MatDialogRef<ProjectlistComponent>) { }

  ngOnInit() {
    this.projectFrm = this.fb.group({
      id: [''],
      name: [''],     
      message: ['']
    });
        
    this.projectFrm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();

    if (this.data.dbops === DBOperation.create) {
      this.projectFrm.reset();
    } else {
      this.projectFrm.setValue(this.data.project);
    }
    this.SetControlsState(this.data.dbops === DBOperation.delete ? false : true);
  }
  
  onValueChanged(data?: any) {    
    if (!this.projectFrm) { return; }
    const form = this.projectFrm;
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
    'name': '',
    'message': ''
  };

  validationMessages = {
    'name': {
      'maxlength': 'Name cannot be more than 50 characters long.',
      'required': 'Name is required.'
    },
    'message': {
      'required': 'Project message is required.'
    }
  };

  onSubmit(formData: any) {
    const projectData = this.mapDateData(formData.value);
    
    switch (this.data.dbops) {
      case DBOperation.create:
        this._projectService.addProject(Global.BASE_PROJECT_ENDPOINT + 'addProject', projectData).subscribe(
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
        this._projectService.updateProject(Global.BASE_PROJECT_ENDPOINT + 'updateProject', projectData.id, projectData).subscribe(
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
        this._projectService.deleteProject(Global.BASE_PROJECT_ENDPOINT + 'deleteProject', projectData.id).subscribe(
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
    isEnable ? this.projectFrm.enable() : this.projectFrm.disable();
  }

  mapDateData(project: IProject): IProject {        
    return project;
  }
}
