import { Component, OnInit, ViewChild } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../model/patient';
import { MaterialModule } from '../../material/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [MaterialModule, RouterLink, RouterOutlet],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css'
})
export class PatientComponent implements OnInit {

  dataSource: MatTableDataSource<Patient>;
  // displayedColumns: string[] = ['idPatient','firstName','lastName','dni'];
  columnsDefinition = [
    { def: 'idPatient', label: 'ID', hide: true },
    { def: 'firstName', label: 'First Name', hide: false },
    { def: 'lastName', label: 'Last Name', hide: false },
    { def: 'dni', label: 'DNI', hide: false },
    // { def: 'email', label: 'Email', hide: false }, // Nueva columna
    { def: 'actions', label: 'Actions', hide: false }
  ];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private patientService: PatientService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.patientService.findAll().subscribe(data => {
      this.createTable(data);
    });

    this.patientService.getPatientChange().subscribe(data => {
      this.createTable(data);
    });

   
  }

  createTable(data: Patient[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  getDisplayedColumns(): string[] {
    return this.columnsDefinition.filter(cd => !cd.hide).map(cd => cd.def);
  }

  applyFilter(e: any) {
    this.dataSource.filter = e.target.value.trim();
  }

  delete(id: number) {
    this.patientService.delete(id)
    .pipe(switchMap(() => this.patientService.findAll()))
    .subscribe(data => {
      this.createTable(data);
      this.patientService.setMessageChange('Patient deleted');
    });
  }

}
