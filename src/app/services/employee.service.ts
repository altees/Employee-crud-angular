import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../components/employee/employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  constructor(private http: HttpClient) { }

  callSaveEmployeeAPI(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>('http://localhost:8080/api/employees', employee);
  }

  fetchAllEmployee():Observable<Employee[]>{
    return this.http.get<Employee[]>('http://localhost:8080/api/employees');
  }

  deleteEmployee(empId:number):Observable<Employee>{
   return this.http.delete<Employee>('http://localhost:8080/api/employees/'+empId);
  }
  fetchEmployee(empId:number):Observable<Employee>{
    return this.http.get<Employee>('http://localhost:8080/api/employees/'+empId);
   }
  updateEmployee(empId:number,employee: Employee):Observable<Employee>{
    return this.http.put<Employee>('http://localhost:8080/api/employees/'+empId, employee);
  }
}
