import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SelectionformComponent } from '../pcselectionform/pcselectionform.component';
import { SelectionService } from '../selection.service';
import { ISelection } from '../model/selection';
import { DBOperation } from '../shared/DBOperation';
import { Global } from '../shared/Global';

@Component({
  selector: 'app-selectionlist',
  templateUrl: './selectionlist.component.html',
  styleUrls: ['./selectionlist.component.css','../app.component.css']
})

export class SelectionlistComponent implements OnInit {
  selections: ISelection[];
  selection: ISelection;
  loadingState: boolean;
  dbops: DBOperation;
  modalTitle: string;
  modalBtnTitle: string;

  displayedColumns = ['project', 'contact', 'action'];
  dataSource = new MatTableDataSource<ISelection>();
  constructor(public snackBar: MatSnackBar, private _selectionService: SelectionService, private dialog: MatDialog) { }

  
  ngOnInit() {
    this.loadingState = true;
    this.loadSelections();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SelectionformComponent, {
      width: '500px',
      data: { dbops: this.dbops, modalTitle: this.modalTitle, modalBtnTitle: this.modalBtnTitle, selection: this.selection }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result === 'success') {
        this.loadingState = true;
        this.loadSelections();
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

  loadSelections(): void {
    this._selectionService.getAllSelection(Global.BASE_SELECTION_ENDPOINT + 'getAllSelection')
      .subscribe(selections => {       
        this.loadingState = false;
        this.dataSource.data = selections;
      });
  }

  addSelection() {
    this.dbops = DBOperation.create;
    this.modalTitle = 'Add New Selection';
    this.modalBtnTitle = 'Add';
    this.openDialog();
  }
  editSelection(id: number) {
    this.dbops = DBOperation.update;
    this.modalTitle = 'Edit Selection';
    this.modalBtnTitle = 'Update';
    this.selection = this.dataSource.data.filter(x => x.id === id)[0];
    this.openDialog();
  }
  deleteSelection(id: number) {
    this.dbops = DBOperation.delete;
    this.modalTitle = 'Confirm to Delete ?';
    this.modalBtnTitle = 'Delete';
    this.selection = this.dataSource.data.filter(x => x.id === id)[0];
    this.openDialog();
  }
  showMessage(msg: string) {
    this.snackBar.open(msg, '', {
      duration: 3000
    });
  }
}
