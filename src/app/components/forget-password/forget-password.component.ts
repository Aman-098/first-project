import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { forgetPassword } from '../../model/class/forget-password';
import { ValidationMessage } from '../../constant/validation-messages';
import { AlertComponent } from '../../reusablecomponent/alert/alert.component';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-forget-password',
  imports: [RouterOutlet,RouterLink,ReactiveFormsModule,AlertComponent,CommonModule,FormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {

  passwordForm:FormGroup=new FormGroup({

    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(6)]),
    confirmPassword:new FormControl('',[Validators.required,Validators.minLength(6)]),
    otpValue:new FormControl('')

  });

  formValue:forgetPassword|null=null;

  validationMessage=ValidationMessage;

  message:string='';
  alertType:string='';
  alert:boolean=false;

  otpField:boolean=false;
  otpArray:number[]=[]

  newPassword:boolean=false;
  confirmPassword:boolean=false;

  emailVerified:boolean=false

  onVerifyEmail() {
    const data = JSON.parse(localStorage.getItem('register') || '{}'); 
    console.log(data);
    if (this.passwordForm.get('email')?.valid) {
      this.formValue = this.passwordForm.value;

      if (data.email && this.formValue?.email === data.email) {
        this.emailVerified = true;
        const otp = Math.floor(1000 + Math.random() * 9000); 
        this.otpArray.push(otp);
        alert("Your OTP is: " + otp); 
        // this.showAlert("OTP sent to your email", "success", 3000);
        this.otpField = true; // Show OTP field
      } else {
        this.showAlert("User not Found", "danger", 3000);
      }
    } else {
      this.showAlert("Form is Not Valid", "danger", 3000);
    }
  }

  validateOtp(){
    
    const latestOtp = this.otpArray[this.otpArray.length - 1];

    if(parseInt(this.passwordForm.get('otpValue')?.value,10)===latestOtp){
      this.newPassword=true
      this.confirmPassword=true
      this.showAlert("Otp Verfiied successfully","success",3000)
      this.otpField=false
    }else{
      this.showAlert("Invalid OTP","danger",3000)
    }

  }

  onSubmitPassword(){
    const nPassword=this.passwordForm.get('password')?.value
    const cPassword=this.passwordForm.get('confirmPassword')?.value
    let data=JSON.parse(localStorage.getItem('register') || '{}')
   

    if(nPassword === cPassword){
     
      data.password=nPassword;
      localStorage.setItem('register',JSON.stringify(data))

      this.showAlert("Password changed Successfully","success",3000)
      this.resetForm();
      
    }else{
      this.showAlert("Password do not Match","danger",3000);
    }

  }


  resetForm(){
    this.passwordForm.reset()
    this.otpField=false
    this.emailVerified = false;
    this.newPassword = false;
    this.confirmPassword = false;
  }
  

  showAlert(message:string,type:string,duration:number){
    this.message=message;
    this.alertType=type;
    this.alert=true;
    this.alertClose(duration)

  }

  alertClose(time:number){
    setTimeout(() => {
      this.alert=false
    }, time);
  }


}
