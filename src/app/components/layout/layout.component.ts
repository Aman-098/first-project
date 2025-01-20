import { Component, inject,OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Toolbar } from 'primeng/toolbar';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-layout',
  imports: [RouterOutlet,ButtonModule,Toolbar,Menu, ToastModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  //menu items
  items: MenuItem[] | undefined;

  ngOnInit(){
    this.items=[
      {
        label:'Profile',
        items:[
          {
            label:'Add Employee',
            icon:'pi pi-plus',
            command:()=>{
              this.router.navigateByUrl('/dashboard/home')
            }
          },
          {
            label:'Employee List',
            icon:'pi pi-search',
            command:()=>{
              this.router.navigateByUrl('/dashboard/emp-list')
            }
          },
          {
            label:'Setting',
            icon:'pi pi-cog'

          }
        ]
      }
    ]
  }

  // Menu items end



  name:string='';

  constructor(){
    const data=JSON.parse(localStorage.getItem('register') || '{}');
    this.name=data.name

    
  }

  router=inject(Router);

  onLogout(){
    this.router.navigateByUrl('login');
  }
  

}
