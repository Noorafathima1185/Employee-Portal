import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = ""
  password: string = ""

  constructor(private api: ApiService, private router:Router) { }

  login() {

    if (!this.email || !this.password) {
      Swal.fire({
        title: "Oops!",
        text: "Please fill the fom completely",
        icon: "info"
      });
    }
    else {
      //api call
      this.api.loginApi().subscribe({
        next: (res: any) => {
          // console.log(res);
          const { empEmail, password } = res
          if (empEmail == this.email && password == this.password) {
            Swal.fire({
              title: "Wow",
              text: "Login Successful",
              icon: "success"
            })
            this.api.updateData(true)
            this.router.navigateByUrl('/dashboard')
          }
          else {
            Swal.fire({
              title: "Oops",
              text: "Please fill the fom completely",
              icon: "error"
            })
          }
        },
        error: (err: any) => {
          // console.log(err);
        }
      })
    }
  }
}
