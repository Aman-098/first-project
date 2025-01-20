import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeModel } from '../../model/class/employee';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { TextareaModule } from 'primeng/textarea';
import { ValidationMessage } from '../../constant/validation-messages';
import { ToastComponent } from '../../reusablecomponent/toast/toast.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule,FloatLabel,
    FormsModule,InputTextModule,TextareaModule,ButtonModule,ToastComponent,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  employeeForm:FormGroup=new FormGroup({
    empid:new FormControl(),
    name:new FormControl('',[Validators.required,Validators.minLength(4)]),
    city:new FormControl('',[Validators.required]),
    pincode:new FormControl('',[Validators.required]),
    state:new FormControl('',[Validators.required]),
    emailId:new FormControl('',[Validators.required,Validators.email]),
    contactNo:new FormControl('',[Validators.required,Validators.minLength(10)]),
    address:new FormControl('',[Validators.required])

  });


  employeeObj:EmployeeModel=new EmployeeModel();
  employeeList:EmployeeModel[]=[];
  validationMessage=ValidationMessage

  // message and alerttype for alert
  message:string='';
  type:string='';
  alert:boolean=false;

  constructor(){
    const olddata=localStorage.getItem('EmpData');
    if(olddata != null){
      const parseData=JSON.parse(olddata);
      this.employeeList=parseData;
    }
  }
  
  // save form

  onSubmit(){
    
    const oldData=localStorage.getItem('EmpData');
    if(oldData!= null){
      const parseData=JSON.parse(oldData);
      this.employeeForm.controls['empid'].setValue(parseData.length +1)
      this.employeeList.unshift(this.employeeForm.value)

    }else{
      this.employeeList.unshift(this.employeeForm.value)
    }
    localStorage.setItem("EmpData",JSON.stringify(this.employeeList))
    this.showAlert("Employee Data Saved Successfully","success",3000);

  }

  onReset(){

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
      this.employeeForm.reset();
    }, time);
  }

}
