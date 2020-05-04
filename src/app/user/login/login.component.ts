import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './authentication.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private route: ActivatedRoute,
    private router: Router) {
      if (this.authenticationService.currentUserValue) {
        this.router.navigate(['/']);
      }
  }

  submitted = false;
  returnUrl: string;
  ngOnInit() {
    this.submitted = false;
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  userauthenticateform = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  loginCheck() {
    this.submitted = true;
    this.authenticationService.login(this.userauthenticateform.value.username, this.userauthenticateform.value.password)
      .subscribe(data => { this.router.navigate([this.returnUrl]); }, error => console.log(error));
  }


}
