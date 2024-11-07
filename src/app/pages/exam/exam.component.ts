import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { Exam } from '../../model/exam';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ExamService } from '../../services/exam.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExamDialogComponent } from './exam-dialog/exam-dialog.component';
import { ExamDeleteDialogComponent } from './exam-delete-dialog/exam-delete-dialog.component';

@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.css'
})
export class ExamComponent {


  dataSource: MatTableDataSource<Exam>;

  columnsDefinitions = [
    { def: 'idExam', label: 'ID Exam', hide: true },
    { def: 'nameExam', label: 'Exam Name', hide: false },
    { def: 'descriptionExam', label: 'Description Exam', hide: false },
    { def: 'actions', label: 'Actions', hide: false }
  ];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private examService: ExamService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    // Obtiene todos los médicos y los muestra en la tabla al cargar la página 
    this.examService.findAll().subscribe(data => this.createTable(data));

    // Se suscribe a los cambios en la lista de médicos y actualiza la tabla cuando se recibe un cambio en la lista de médicos 
    this.examService.getExamChange().subscribe(data => this.createTable(data));

    // Se suscribe a los mensajes y muestra una notificación cuando se recibe un mensaje
    this.examService.getMessageChange().subscribe(data => this._snackBar.open(data, 'INFO', { duration: 2000 }));
  }

  createTable(data: Exam[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getDisplayedColumns() {
    return this.columnsDefinitions.filter(cd => !cd.hide).map(cd => cd.def);
  }

  applyFilter(e: any) {
    this.dataSource.filter = e.target.value.trim();
  }

  openDialog(exam?: Exam) {
    this._dialog.open(ExamDialogComponent, {
      width: '750px',
      data: exam
    });
  }

  delete(id: number) {
    console.log('Delete medic with id: ' + id);
    this._dialog.open(ExamDeleteDialogComponent, {
      width: '200px',
      data: id
    })
  }

}
