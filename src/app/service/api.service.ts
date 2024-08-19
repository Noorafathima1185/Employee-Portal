import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  serverURL:string="http://localhost:4000"

  constructor(private http:HttpClient) { }
  //observable - more than one asynchronous functions
  // httpclient class can return observable.
  //response is recieved using subscribe function
  //can subscribe the response in two diff ways
  //1) call back - no possibility of error
  //2) partial observation - object - error can happen - two keys - next(positive response) & error(negative response)
  // any one of the keys(next or error) will work at a time

  // login api
  loginApi(){
    return this.http.get(`${this.serverURL}/employee/1`)
  }

  //add employee api
  addEmployeeApi(reqbody:any){
    return this.http.post(`${this.serverURL}/employee`,reqbody)
  }

  // api to get all employees
  getAllEmployee(){
    return this.http.get(`${this.serverURL}/employee`)
  }

  // api to delete an employee
  deleteEmployeeApi(id:any){
    return this.http.delete(`${this.serverURL}/employee/${id}`)
  }

  // api to get particular employee
  getEmployeeApi(id:any){
    return this.http.get(`${this.serverURL}/employee/${id}`)
  }

  // api to update employee details
  updateEmployeeDetailsApi(id:any,reqbody:any){
    return this.http.put(`${this.serverURL}/employee/${id}`,reqbody)
  }
}
