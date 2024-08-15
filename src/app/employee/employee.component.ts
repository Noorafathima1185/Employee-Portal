import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { EmployeeModel } from 'src/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  allEmployee:EmployeeModel[]=[]


  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.getEmployee()
  }

  getEmployee(){
    this.api.getAllEmployee().subscribe({
      next:(res:any)=>{
        // console.log(res);
        this.allEmployee=res
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  sortById(){
    this.allEmployee.sort((a:any,b:any)=>a.id-b.id)
  }

  sortByName(){
    this.allEmployee.sort((a:any,b:any)=>a.empUsername.localeCompare(b.empUsername))
  }

}
