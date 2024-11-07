import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { Specialty } from '../../model/specialty';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SpecialtyService } from '../../services/specialty.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpecialtyDialogComponent } from './specialty-dialog/specialty-dialog.component';
import { SpecialtyDeleteDialogComponent } from './specialty-delete-dialog/specialty-delete-dialog.component';

@Component({
  selector: 'app-specialty',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './specialty.component.html',
  styleUrl: './specialty.component.css'
})
export class SpecialtyComponent {

  dataSource: MatTableDataSource<Specialty>;

  columnsDefinitions = [
    { def: 'idSpecialty', label: 'ID Specialty', hide: true },
    { def: 'nameSpecialty', label: 'Specialty Name', hide: false },
    { def: 'descriptionSpecialty', label: 'Description', hide: false },
    { def: 'actions', label: 'Actions', hide: false }
  ];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private specialtySevice: SpecialtyService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    // Obtiene todos los médicos y los muestra en la tabla al cargar la página 
    this.specialtySevice.findAll().subscribe(data => this.createTable(data));

    // Se suscribe a los cambios en la lista de médicos y actualiza la tabla cuando se recibe un cambio en la lista de médicos 
    this.specialtySevice.getSpecialtyChange().subscribe(data => this.createTable(data));

    // Se suscribe a los mensajes y muestra una notificación cuando se recibe un mensaje
    this.specialtySevice.getMessageChange().subscribe(data => this._snackBar.open(data, 'INFO', { duration: 2000 }));
  }

  createTable(data: Specialty[]) {
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

  openDialog(specialty?: Specialty) {
    this._dialog.open(SpecialtyDialogComponent, {
      width: '750px',
      data: specialty
    });
  }

  delete(id: number) {
    console.log('Delete medic with id: ' + id);
    this._dialog.open(SpecialtyDeleteDialogComponent, {
      width: '200px',
      data: id
    })
  }

}
