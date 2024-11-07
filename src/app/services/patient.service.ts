import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Patient } from '../model/patient';
import { Subject } from 'rxjs';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService extends GenericService<Patient> {

  // private url: string = `${environment.HOST}/patients`; // URL de la API Patients
  private patientChange: Subject<Patient[]> = new Subject<Patient[]>(); // Subject para notificar cambios en la lista de pacientes
  private messageChange: Subject<string> = new Subject<string>(); // Subject para notificar mensajes

  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/patients`)
  }

  // Inyectamos el servicio HttpClient
  // constructor(private http: HttpClient) { }

  // findAll() {
  //   return this.http.get<Patient[]>(this.url);
  // }

  // findById(id: number) {
  //   return this.http.get<Patient>(`${this.url}/${id}`);
  // }

  // save(patient: Patient) {
  //   return this.http.post<Patient>(this.url, patient);
  // }

  // update(id: number,patient: Patient) {
  //   return this.http.put<Patient>(`${this.url}/${id}`, patient);
  // }

  // delete(id: number) {
  //   return this.http.delete(`${this.url}/${id}`);
  // }

  setPatientChange(data: Patient[]) {
    this.patientChange.next(data);
  }

  getPatientChange() {
    return this.patientChange.asObservable();
  }

  setMessageChange(message: string) {
    this.messageChange.next(message);
  }

  getMessageChange() {
    return this.messageChange.asObservable();
  }

}
