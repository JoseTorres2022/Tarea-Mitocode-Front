import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { SpecialtyService } from '../../../services/specialty.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-specialty-delete-dialog',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './specialty-delete-dialog.component.html',
  styleUrl: './specialty-delete-dialog.component.css'
})
export class SpecialtyDeleteDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) private id: number,
    private specialtyService: SpecialtyService,
    private _dialogRef: MatDialogRef<SpecialtyDeleteDialogComponent>
  ) { }

  close() {
    this._dialogRef.close();
  }

  delete() {
    console.log(this.id);
    this.specialtyService.delete(this.id)
    .pipe(switchMap(() => this.specialtyService.findAll()))
    .subscribe(data => {
      this.specialtyService.setSpecialtyChange(data);
      this.specialtyService.setMessageChange('DELETED!');
    });
    this._dialogRef.close();
  }

}
