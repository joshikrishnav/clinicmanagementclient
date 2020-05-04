import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { Patient } from './patient';
import { PatientService } from './patient.service';

@Component({
  selector: 'app-patient-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {
  searchPatientsCtrl = new FormControl();
  filteredPatients: any;
  isLoading = false;
  errorMsg: string;

  constructor(private patientService: PatientService) { }

  options: Patient[] = [
  ];

  ngOnInit() {
    this.searchPatientsCtrl.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.errorMsg = "";
          this.filteredPatients = [];
          this.isLoading = true;
        }),
        switchMap(value => this.patientService.search(value.toLowerCase())
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe(data => {
        if (data == undefined) {
          this.filteredPatients = [];
        } else {
          this.errorMsg = "";
          this.filteredPatients = data;
        }

        console.log(this.filteredPatients);
      });
  }

  displayFn(patient: Patient): string {
    return patient && patient.name ? patient.name : '';
  }
}
