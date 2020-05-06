import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm, FormGroupName } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    let result = false;

    if (control.touched) {
      result = (invalidCtrl || invalidParent);
    }

    return result;
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  myForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  private authStatusSub: Subscription;

  constructor(private fb:FormBuilder, public authService: AuthService) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')]],
      cpassword: ''
    }, {validator: this.checkPasswords })

    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
  }

  get username() {
    return this.myForm.get('username');
  }

  get password() {
    return this.myForm.get('password');
  }

  get cpassword() {
    return this.myForm.get('cpassword');
  }

  onSignup(form: FormGroupDirective) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.createUser(form.value.username, form.value.password);

    setTimeout(() => {
      this.authService.login(form.value.username, form.value.password);
    }, 500);
  }

  checkPasswords(group: FormGroup) {
    let pass = group.get('password').value;
    let cpass = group.get('cpassword').value;

    return pass === cpass ? null : { notSame: true }
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
