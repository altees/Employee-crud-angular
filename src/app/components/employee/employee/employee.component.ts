import { Component, OnInit } from '@angular/core';
import { Init } from 'v8';
import { Employee } from '../employee.model';
import { MatSelectChange, matSelectAnimations } from '@angular/material/select';
import { MatRadioChange } from '@angular/material/radio';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { NgForm } from '@angular/forms';
import { json } from 'stream/consumers';
import { EmployeeService } from '../../../services/employee.service';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
  employee: Employee = {
    "id": 0,
    "employeName": "",
    "mobileNumber": "",
    "address": "",
    "gender": "",
    "department": "",
    "skills": ""
  }
  successMessage:String='';
  errorMessage:String='';

  skills: String[] = [];

  constructor(private employeeService: EmployeeService,private router:Router) {

  }

  ngOnInit(): void {

  }


  selectGender(value: string) {
    this.employee.gender = value;
  }

  handleSkillChange(event: MatCheckboxChange) {
    const selectedSkill = event.source.value;
    if (event.checked) {
      this.skills.push(selectedSkill);
    } else {
      this.skills.forEach((value, index) => {
        if (selectedSkill === value) {
          this.skills.splice(index, 1)
        }
      })
    }

    this.employee.skills = this.skills.toString();
  }

  saveEmployee(empForm: NgForm) {
    console.log(this.employee)
    this.employeeService.callSaveEmployeeAPI(this.employee).subscribe(response => {
      console.log(response);
      empForm.resetForm();
      this.successMessage="Employee Saved Successfully."
      this.router.navigate(['/employee-list']);
    }, error => {
      console.log(error)
      this.errorMessage=error;
    })
  }

  resetForm() {
   this.router.navigate(['employee'])
  }


}
