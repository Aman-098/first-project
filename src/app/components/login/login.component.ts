import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Login } from '../../model/class/Login';
import { ValidationMessage } from '../../constant/validation-messages';
import { AlertComponent } from '../../reusablecomponent/alert/alert.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [RouterLink,ReactiveFormsModule,AlertComponent,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm:FormGroup=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(6)])
  });

  formValue:Login|null=null;

  router=inject(Router);

  validatonMessage=ValidationMessage

  //message and alertype for alert
  message:string='';
  alertType:string='';
  alert:boolean=false;

  onLogin(){

    const data= JSON.parse(localStorage.getItem('register') || '{}');
    if(this.loginForm.valid){
      this.formValue=this.loginForm.value
      if(data.email && this.formValue?.email === data.email){
        if(this.formValue?.password===data.password){

          this.showAlert("Logged in Successfull! Redirecting","success",3000);

          setTimeout(() => {
            this.router.navigateByUrl('home')
          }, 1000);
          
        }else{
          
          this.showAlert("Incorrect Password","danger",3000);
        }
      }else{
        
        this.showAlert("User not Found","danger",3000);
      }
    }else{
      console.log("form is invalid ");
    }

  }


  // function to show alert

  showAlert(message:string,type:string,duration:number){
    this.message=message;
    this.alertType=type;
    this.alert=true;
    this.alertClose(duration)
  }

  alertClose(time:number) {
    setTimeout(() => {
      this.alert=false;
    }, time);
    
  }





}
