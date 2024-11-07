import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MedicService } from '../../../services/medic.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-medic-delete-dialog',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './medic-delete-dialog.component.html',
  styleUrl: './medic-delete-dialog.component.css'
})
export class MedicDeleteDialogComponent {


  constructor(
    @Inject(MAT_DIALOG_DATA) private id: number,
    private medicService: MedicService,
    private _dialogRef: MatDialogRef<MedicDeleteDialogComponent>
  ){
  }

  close(){
    this._dialogRef.close();
  }

  delete(){
    console.log(this.id);
    this.medicService.delete(this.id)
    .pipe(switchMap( () => this.medicService.findAll()))
    .subscribe(data => {
      this.medicService.setMedicChange(data);
      this.medicService.setMessageChange('DELETED!');
    });
    this._dialogRef.close();
  }
}
