import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  empUsername:string=""
  empEmail:string=""
  empStatus:string=""


  constructor(private api:ApiService){}


  cancel(){
    this.empUsername=""
    this.empEmail=""
    this.empStatus=""
  }

  addEmployee(){
    if(!this.empUsername || this.empEmail || this.empStatus){
      Swal.fire({
        title:'Oops',
        text:'Please fill the form completely',
        icon:'success'
      })
    }
    else{
      //api
    }
  }
}
