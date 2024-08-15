import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiService } from '../service/api.service';
import { EmployeeModel } from 'src/employee.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
 employeeDetails:EmployeeModel={}


  constructor(private api:ApiService, private router:Router){}


  cancel(){
    this.employeeDetails={}
  }

  addEmployee(){
    console.log(this.employeeDetails);
    
    this.api.addEmployeeApi(this.employeeDetails).subscribe({
      next:(res:any)=>{
        console.log(res);
        Swal.fire({
          title:'wow',
          text:'Employee Added Successfully',
          icon:"success"
        })
        this.router.navigateByUrl('/employee')

      },
      error:(err:any)=>{
        console.log(err);
        Swal.fire({
          title:'oops',
          text:'Something went to wrong',
          icon:"error"
        })
      }
    })

  }
}
