import {Component, OnInit} from "@angular/core";
import {AuthService} from "../auth/auth.service";
import {SignUpInfo} from "../auth/signup-info";
import {UserService} from "../services/user.service";

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
  emailExist;

  constructor(private authService: AuthService, private userService: UserService) {
  }

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

  emailChange(): void {
    this.authService.checkEmail(this.registerForm.email).subscribe(data => {
      if (data === 'false') {
        this.emailExist = false;
      } else {
        this.emailExist = true;
      }
    }, error => {
      console.log(error);
    });
  }

  reloadPage() {
    window.location.href = '/ui/home';
  }
}



