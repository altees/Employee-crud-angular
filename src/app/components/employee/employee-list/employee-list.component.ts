import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { error } from 'console';
import { Employee } from '../employee.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {


  displayedColumns: string[] = ['id', 'employeName', 'mobileNumber', 'address', 'gender', 'department', 'skills', 'delete', 'update'];
  dataSource: Employee[] = [];
  constructor(private empService: EmployeeService, private router: Router) {

  }
  ngOnInit(): void {
    this.empService.fetchAllEmployee().subscribe(response => {
      this.dataSource = response;
      this.router.navigate(['employee-list'])
    },
      error => {
        console.log(error);
      })
  }
  deleteEmployee(empId: number) {
    console.log(empId)
    this.empService.deleteEmployee(empId).subscribe(response => {
      console.log(response);
      this.ngOnInit();
    },
      error => {
        console.log(error);
      })
  }

  updateEmployee(arg0: number) {
    this.router.navigate(['/employee-update/'+arg0]);
  }
}


