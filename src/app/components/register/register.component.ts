import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/services/alert.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private userService: UserService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName:['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f(){ return this.registerForm.controls;}

  onSubmit(){
    this.submitted = true;
        console.log("In Submit ")
    if(this.registerForm.invalid){
      return;
    }
    console.log("register form value",this.registerForm.value)
    this.loading= true;
    this.userService.register(this.registerForm.value).pipe(first()).subscribe(data => {
      this.alertService.success('Registration Successful', true);
      console.log("$$$$$$$$$$$$", data)
      this.router.navigate(['/']);
    },
    error => {
      this.alertService.error(error);
      this.loading = false;
    }
    )

  }

}
