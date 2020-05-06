import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { AuthService } from "../auth.service";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  myForm: FormGroup;
  isLoading = false;

  constructor(public authService: AuthService, private fb:FormBuilder) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.myForm.valueChanges.subscribe(console.log);
  }

  onLogin(form: FormGroup) {
    if (form.invalid) {
      console.log("Form invalid, returning");
      return;
    }
    this.isLoading = true;
    this.authService.login(form.value.username, form.value.password);
  }

  get username() {
    return this.myForm.get('username');
  }

  get password() {
    return this.myForm.get('password');
  }
}
