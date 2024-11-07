import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { FormsModule } from '@angular/forms';
import { Specialty } from '../../../model/specialty';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SpecialtyService } from '../../../services/specialty.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-specialty-dialog',
  standalone: true,
  imports: [MaterialModule,FormsModule],
  templateUrl: './specialty-dialog.component.html',
  styleUrl: './specialty-dialog.component.css'
})
export class SpecialtyDialogComponent {

  specialty: Specialty;
  specialties: Specialty[];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Specialty,
    private _dialogRef: MatDialogRef<SpecialtyDialogComponent>,
    private specialtyService: SpecialtyService
  ) { }

  ngOnInit(): void {
    this.specialty = { ...this.data }
    this.specialtyService.findAll().subscribe(data => this.specialties = data);
  }

  close() {
    this._dialogRef.close();
  }

  operate() {
    if (this.specialty != null && this.specialty.idSpecialty > 0) {
      //UPDATE
      this.specialtyService.update(this.specialty.idSpecialty, this.specialty)
        .pipe(switchMap(() => this.specialtyService.findAll()))
        .subscribe(data => {
          this.specialtyService.setSpecialtyChange(data);
          this.specialtyService.setMessageChange('UPDATED!');
        });
    } else {
      //INSERT
      this.specialtyService.save(this.specialty)
        .pipe(switchMap(() => this.specialtyService.findAll()))
        .subscribe(data => {
          this.specialtyService.setSpecialtyChange(data);
          this.specialtyService.setMessageChange('INSERTED!');
        });
    }
    this.close();
  }

}
