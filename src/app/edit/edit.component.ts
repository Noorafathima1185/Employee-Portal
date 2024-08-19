import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { EmployeeModel } from 'src/employee.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit{

  employeeDetails:EmployeeModel={}

  // Activated Route - class is used to access data from the path/url

  constructor(private Aroute:ActivatedRoute, private api:ApiService,private router:Router){}

  ngOnInit(): void {
    // params - method return observable - subscribe
    this.Aroute.params.subscribe((res:any)=>{
      // console.log(res.id);
      const{id} = res
      this.getEmployee(id)
    })
  }

  getEmployee(id:any){
    this.api.getEmployeeApi(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.employeeDetails=res
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

  cancel(id:any){
    this.getEmployee(id)
  }

  editEmployee(){
    this.api.updateEmployeeDetailsApi(this.employeeDetails.id,this.employeeDetails).subscribe({
      next:(res:any)=>{
        console.log(res);
        Swal.fire({
          title:'wow',
          text:'Updated Successfully',
          icon:'success'
        })
        this.router.navigateByUrl('/employee')
      },
      error:(err:any)=>{
        console.log(err);
        Swal.fire({
          title:'Oops',
          text:'Something went to wrong',
          icon:'error'
        })
      }
    })
  }
}
