import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { SignUpInfo } from '../auth/signup-info';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  registerForm: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
   
 
  constructor(private authService: AuthService) { }

  ngOnInit() {




  }


  onSubmit() {
    this.signupInfo = new SignUpInfo(
      this.registerForm.firstName,
      this.registerForm.lastName,
      this.registerForm.email,
      this.registerForm.phone,
      this.registerForm.password);
    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.isSignUpFailed = false;
        this.isSignedUp = true;
        this.reloadPage();
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  reloadPage() {
    window.location.href='ui/auth/login';
  }
}
