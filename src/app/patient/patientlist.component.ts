import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PatientService } from './patient.service';
import { Patient } from './patient';

@Component({
  selector: 'app-patientlist',
  templateUrl: './patientlist.component.html',
  styleUrls: ['./patientlist.component.css']
})
export class PatientlistComponent implements OnInit {
  constructor(private patientService: PatientService) { }

  patients: Observable<Patient[]>;
  breakpoint;
  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 6;
    this.patientService.getAll().subscribe(
      data => {
        this.patients = data;
      },
      error => {
        console.log(error);
      }
    );
  }

onResize(event) {
  this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 6;
}
}
