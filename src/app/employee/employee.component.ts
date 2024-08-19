import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { EmployeeModel } from 'src/employee.model';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  allEmployee:EmployeeModel[]=[]
  p: number = 1;


  searchkey:string=""

  time:any = new Date() //fetches the system time and date


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

  removeEmployee(id:any){
    this.api.deleteEmployeeApi(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getEmployee()
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })

  }

  generatePdf(){
    // 1) create an object for jspdf
    const pdf = new jsPDF()

    let head = [['id','Username','Email','Status']]
    const body:any=[]

    this.allEmployee.forEach((item:any)=>{
      if(item.id!='1'){ // inorder to exclude admin
        if(item.empStatus=='1'){ // since we have store status as 1 and 2 we need to convert that in active and inactive
          body.push([item.id, item.empUsername, item.empEmail,'Active'])
        }
        else{
          body.push([item.id, item.empUsername, item.empEmail,'Inactive'])
        }
      }
    })

    // fontsize
    pdf.setFontSize(16)

    //heading
    pdf.text("Employee List",10,10)


    // 2) call autotable function
    autoTable(pdf,{head, body})

    //to open in new tab
    pdf.output('dataurlnewwindow')

    // 3) download
    pdf.save('Employee_Table.pdf')
  }

}
