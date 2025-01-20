export class EmployeeModel{
    empId:number;
    name:string;
    city:string;
    pincode:number;
    state:string;
    emailId:string;
    contactNo:string;
    address:string;
    

    constructor(){
        this.address='';
        this.city='';
        this.pincode=0;
        this.contactNo='';
        this.emailId='';
        this.empId=1;
        this.name='';
        this.state='';
        
    }
}