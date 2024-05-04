import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home/home.component';
import { EmployeeComponent } from './components/employee/employee/employee.component';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';
import { EmployeeUpdateComponent } from './components/employee/employee-update/employee-update.component';

const routes: Routes = [
  {path: 'header',component:HeaderComponent},
  {path: 'employee',component:EmployeeComponent},
  {path: 'employee-list',component:EmployeeListComponent},
  {path: 'employee-update/:id',component:EmployeeUpdateComponent},
  {path: '',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
