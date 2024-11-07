import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExamService } from '../../../services/exam.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-exam-delete-dialog',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './exam-delete-dialog.component.html',
  styleUrl: './exam-delete-dialog.component.css'
})
export class ExamDeleteDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) private id: number,
    private examService: ExamService,
    private _dialogRef: MatDialogRef<ExamDeleteDialogComponent>
  ) { }

  close() {
    this._dialogRef.close();
  }

  delete() {
    console.log(this.id);
    this.examService.delete(this.id)
      .pipe(switchMap(() => this.examService.findAll()))
      .subscribe(data => {
        this.examService.setExamChange(data);
        this.examService.setMessageChange('DELETED!');
      });
    this._dialogRef.close();
  }

} 
