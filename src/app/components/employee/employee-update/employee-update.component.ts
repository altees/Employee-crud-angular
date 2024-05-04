import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrl: './employee-update.component.css'
})
export class EmployeeUpdateComponent {

  employee: Employee = {
    "id": 0,
    "employeName": "",
    "mobileNumber": "",
    "address": "",
    "gender": "",
    "department": "",
    "skills": ""
  }
  successMessage: String = '';
  errorMessage: String = '';

  skills: String[] = [];

  javaSelected: boolean = false;
  angularSelected: boolean = false;
  reactSelected: boolean = false;
  pythonSelected: boolean = false;

  constructor(private employeeService: EmployeeService, private router: Router, private aRoute: ActivatedRoute) {

  }
  ngOnInit(): void {
    const id = this.aRoute.snapshot.params['id'];
    this.employeeService.fetchEmployee(id).subscribe(response => {
      this.employee = response;
      this.skills = this.employee.skills.split(','); // to refelect preselected skills in form
      this.skills.forEach(value => {
        if (value === 'Java') this.javaSelected = true;
        if (value === 'Python') this.pythonSelected = true;
        if (value === 'React') this.reactSelected = true;
        if (value === 'Angular') this.angularSelected = true;

      })
    },
      error => {
        console.log(error);
      }
    )

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


  updateEmployee(form: NgForm) {
    console.log(this.employee)
    this.employeeService.updateEmployee(this.employee.id, this.employee).subscribe(response => {
      console.log(response);
      this.successMessage = "Employee Updated Successfully."
      this.router.navigate(['/employee-list']);
    }, error => {
      console.log(error)
      this.errorMessage = error;
    })
  }


}
