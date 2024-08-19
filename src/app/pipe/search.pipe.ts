import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {


  // first arg - value to be transformed
  // second arg - based on which the transformation have to be done - formate
  transform(allEmployee:any[],searchkey:string): any[] {

    const result:any = []

    if(!allEmployee || searchkey==""){
      return allEmployee
    }
    allEmployee.forEach((item:any)=>{
      if(item.empUsername.trim().toLowerCase().includes(searchkey.trim().toLowerCase())){
        result.push(item)
      }
    })
    return result
  }

}
