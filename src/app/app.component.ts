import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PatientComponent } from "./pages/patient/patient.component";
import { LayoutComponent } from './pages/layout/layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PatientComponent,LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mediapp-frontend';
}
