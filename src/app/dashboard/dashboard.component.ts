import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ApiService } from '../service/api.service';
import { addEvent } from 'highcharts/highcharts.src';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    selected: Date = new Date()
    Highcharts: typeof Highcharts = Highcharts;
    chartOptions = {}

    isClicked: boolean = false

    AdminDetails: any = {}

    total:number=0

    profImg:string="https://snsrheumatology.com/wp-content/uploads/2023/03/SNS-Rheumatology-Testimonials-female-300x300-1.png"

    constructor(private api: ApiService) {
        this.chartOptions = {
            chart: {
                type: 'pie'
            },
            title: {
                text: 'Project Completion Report'
            },
            tooltip: {
                valueSuffix: '%'
            },
            plotOptions: {
                series: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: [{
                        enabled: true,
                        distance: 20
                    }, {
                        enabled: true,
                        distance: -40,
                        format: '{point.percentage:.1f}%',
                        style: {
                            fontSize: '1.2em',
                            textOutline: 'none',
                            opacity: 0.7
                        },
                        filter: {
                            operator: '>',
                            property: 'percentage',
                            value: 10
                        }
                    }]
                }
            },

            credits: {
                enabled: false
            },

            series: [
                {
                    name: 'Percentage',
                    colorByPoint: true,
                    data: [
                        {
                            name: 'safari',
                            y: 55.02
                        },
                        {
                            name: 'chrome',
                            sliced: true,
                            selected: true,
                            y: 26.71
                        },
                        {
                            name: 'firefox',
                            y: 1.09
                        },
                        {
                            name: 'edge',
                            y: 15.5
                        },
                        {
                            name: 'opera',
                            y: 1.68
                        }
                    ]
                }
            ]
        }
    }

    ngOnInit(): void {
        this.api.loginApi().subscribe({
            next: (res: any) => {
                console.log(res);
                this.AdminDetails = res
                if(res.profile){
                    this.profImg = res.profile
                }
            },
            error:(err: any)=>{
            console.log(err);
        }
      })

      this.api.getAllEmployee().subscribe({
        next:(res:any)=>{
            this.total=res.length-1
        },
        error:(err:any)=>{
            console.log(err);
            
        }
      })
    }

buttonClick(){
    this.isClicked = true
}

cancel(){
    this.isClicked = false
    if(this.AdminDetails.profile){
        this.profImg = this.AdminDetails.profile
    }
    else{
        this.profImg = "https://snsrheumatology.com/wp-content/uploads/2023/03/SNS-Rheumatology-Testimonials-female-300x300-1.png"
    }
    
}

getFile(event:any){
    // console.log(event.target.files[0]);
    const file = event.target.files[0]

    //FileReader - class used to convert a file into url

    // 1)create an object for the classs
    const fr = new FileReader()

    // url convert
    fr.readAsDataURL(file)

    // inorder to access url - onload()
    fr.onload = (event:any)=>{
        console.log(event.target.result);
        this.profImg = event.target.result
    }
    
}

updateAdmin(){
    this.AdminDetails.profile = this.profImg
    console.log(this.AdminDetails);

    this.api.updateAdminDetails(this.AdminDetails).subscribe({
        next:(res:any)=>{
            console.log(res);
            Swal.fire({
                title:"wow",
                text:"Profile added successfullly",
                icon:"success"
            })
            this.isClicked = false
            
        },
        error:(err:any)=>{
            console.log(err);
            Swal.fire({
                title:"oops",
                text:"something went to wrong",
                icon:"error"
            })
        }
    })
    
}

}
