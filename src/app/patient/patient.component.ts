import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from './patient.service';
import { Patient } from './patient';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private patientService: PatientService
  ) { }
  patient: Observable<Patient>;

  ngOnInit() {
    let patientid: string = this.activatedRoute.snapshot.params['patientid'];
    this.patientService.get(patientid).subscribe(
      patientData => {
        this.patient = patientData;
      },
      error => {
        console.log(error);
      }
    );
  }
}
