import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeModel } from '../../model/class/employee';
import { ToastComponent } from '../../reusablecomponent/toast/toast.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-emp-list',
  imports: [TableModule,Dialog,ButtonModule,InputTextModule,
    ConfirmDialogModule,ConfirmDialog,ReactiveFormsModule,ToastComponent,CommonModule],
  templateUrl: './emp-list.component.html',
  styleUrl: './emp-list.component.css'
})
export class EmpListComponent {

  employeeForm:FormGroup=new FormGroup({
    empId:new FormControl(),
    name:new FormControl('',[Validators.required,Validators.minLength(4)]),
    city:new FormControl('',[Validators.required]),
    pincode:new FormControl('',[Validators.required]),
    state:new FormControl('',[Validators.required]),
    emailId:new FormControl('',[Validators.required,Validators.email]),
    contactNo:new FormControl('',[Validators.required,Validators.minLength(10)]),
    address:new FormControl('',[Validators.required])

  });

employeeList: EmployeeModel[] = JSON.parse(localStorage.getItem('EmpData') || '[]');


visible: boolean = false;
// message and alerttype for alert
message:string='';
type:string='';
alert:boolean=false;

onEdit(item:any){
  // console.log(item);
  this.visible=true;
  debugger;
  this.employeeForm.patchValue({
    empId:item.empid,
    name:item.name,
    emailId:item.emailId,
    city:item.city,
    state:item.state,
    contactNo:item.contactNo,
    pincode:item.pincode,
    address:item.address,

  });
}

onSave(){
  const record = this.employeeList.find(
    (m) => m.empId === this.employeeForm.controls['empId'].value
  );

  if(record != undefined){
    // Update the record with the form values
    Object.assign(record, this.employeeForm.value);
    localStorage.setItem('EmpData', JSON.stringify(this.employeeList));
    // console.log('Record updated:', record);
    this.showAlert("Record has been updated successfully","success",3000)
    this.visible = false;
  }

}

showAlert(message:string,type:string,duration:number){
  this.message=message,
  this.type=type,
  this.alert=true,
  this.alertClose(duration)
}

alertClose(time:number){
  setTimeout(() => {
    this.alert=false
  }, time);
}




}
