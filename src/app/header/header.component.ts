import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLogged:boolean = false

  constructor(private api:ApiService, private router:Router){
    api.dataShare.subscribe((result:any)=>{
      this.isLogged = result
    })
  }

  logout(){
    this.api.updateData(false)
    this.router.navigateByUrl('/')
  }
}
