import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../material/material.module';
import { PatientComponent } from '../patient.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PatientService } from '../../../services/patient.service';
import { Patient } from '../../../model/patient';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-patient-edit',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule, PatientComponent, RouterLink],
  templateUrl: './patient-edit.component.html',
  styleUrl: './patient-edit.component.css'
})
export class PatientEditComponent implements OnInit {

  form: FormGroup;
  id: number;
  isEdit: boolean;

  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  // Metodo que se ejecuta al iniciar el componente
  ngOnInit(): void {
    this.form = new FormGroup({
      idPatient: new FormControl(0),
      firstName: new FormControl('',
        [Validators.required, Validators.minLength(3), Validators.maxLength(70)]),
      lastName: new FormControl('',
        [Validators.required, Validators.minLength(3), Validators.maxLength(70)]
      ),
      dni: new FormControl('',
        Validators.required
      ),
      address: new FormControl('',
        Validators.required
      ),
      phone: new FormControl('',
        Validators.pattern('[0-9]+')
      ),
      email: new FormControl('',
        Validators.email
      ),
    });

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.isEdit = this.id != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.isEdit) {
      this.patientService.findById(this.id).subscribe(data => {
        this.form.setValue(data);
      });
    }
  }
  operate() {

    const patient: Patient = new Patient();
    patient.idPatient = this.form.value['idPatient'];
    patient.firstName = this.form.value['firstName'];
    patient.lastName = this.form.value['lastName'];
    patient.dni = this.form.value['dni'];
    patient.address = this.form.value['address'];
    patient.phone = this.form.value['phone'];
    patient.email = this.form.value['email'];

    if (this.isEdit) {
      //Practica comun pero no recomendada
      this.patientService.update(this.id, patient).subscribe(() => {
        this.patientService.findAll().subscribe(data => {
          console.log(data);
          this.patientService.setPatientChange(data);
          this.patientService.setMessageChange('Paciente actualizado correctamente');
        });
      });
    } else {
      // Práctica recomendada
      this.patientService.save(patient)
        .pipe((switchMap(() => this.patientService.findAll())))
        .subscribe(data => {
          console.log(data);

          this.patientService.setPatientChange(data);
          this.patientService.setMessageChange('Paciente creado correctamente');
        });
    }

    this.router.navigate(['/pages/patient']);

  }

  get f() {
    return this.form.controls;
  }

}
