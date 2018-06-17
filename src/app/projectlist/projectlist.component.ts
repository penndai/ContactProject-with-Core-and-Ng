import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProjectformComponent } from '../projectform/projectform.component';
import { ProjectService } from '../project.service';
import { IProject } from '../model/project';
import { DBOperation } from '../shared/DBOperation';
import { Global } from '../shared/Global';

@Component({
  selector: 'app-projectlist',
  templateUrl: './projectlist.component.html',
  styleUrls: ['./projectlist.component.css','../app.component.css']
})

export class ProjectlistComponent implements OnInit {
  projects: IProject[];
  project: IProject;
  loadingState: boolean;
  dbops: DBOperation;
  modalTitle: string;
  modalBtnTitle: string;

  displayedColumns = ['name', 'message', 'action'];
  dataSource = new MatTableDataSource<IProject>();

  constructor(public snackBar: MatSnackBar, private _projectService: ProjectService, private dialog: MatDialog) { }

  ngOnInit() {
    this.loadingState = true;
    this.loadProjects();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ProjectformComponent, {
      width: '500px',
      data: { dbops: this.dbops, modalTitle: this.modalTitle, modalBtnTitle: this.modalBtnTitle, project: this.project }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result === 'success') {
        this.loadingState = true;
        this.loadProjects();
        switch (this.dbops) {
          case DBOperation.create:
            this.showMessage('Data successfully added.');
            break;
          case DBOperation.update:
            this.showMessage('Data successfully updated.');
            break;
          case DBOperation.delete:
            this.showMessage('Data successfully deleted.');
            break;
        }
      } else if (result === 'error') {
        this.showMessage('There is some issue in saving records, please project to system administrator!');
      } else {
       // this.showMessage('Please try again, something went wrong');
      }
    });
  }

  loadProjects(): void {
    this._projectService.getAllProject(Global.BASE_PROJECT_ENDPOINT + 'getAllProject')
      .subscribe(projects => {
        this.loadingState = false;
        this.dataSource.data = projects;
      });
  }

  addProject() {
    this.dbops = DBOperation.create;
    this.modalTitle = 'Add New Project';
    this.modalBtnTitle = 'Add';
    this.openDialog();
  }
  editProject(id: number) {
    this.dbops = DBOperation.update;
    this.modalTitle = 'Edit Project';
    this.modalBtnTitle = 'Update';
    this.project = this.dataSource.data.filter(x => x.id === id)[0];
    this.openDialog();
  }
  deleteProject(id: number) {
    this.dbops = DBOperation.delete;
    this.modalTitle = 'Confirm to Delete ?';
    this.modalBtnTitle = 'Delete';
    this.project = this.dataSource.data.filter(x => x.id === id)[0];
    this.openDialog();
  }
  showMessage(msg: string) {
    this.snackBar.open(msg, '', {
      duration: 3000
    });
  }
}

