import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  data: any[] = [];
  title = 'angular-frontend';
  users : any[] = [];

  firstName: string = '';
  lastName: string = '';
  age: number = 0;

  constructor(private dataService: DataService){}

  ngOnInit(): void {
    this.loadUsers();
  }

  addUser() {
    const newUser = {
      firstName: this.firstName,
      lastName: this.lastName,
      age: this.age,
    };

    this.dataService.addUser(newUser).subscribe(() => {
      console.log('Usuario creado');
      this.loadUsers();
    });
  }

  loadUsers() {
    this.dataService.getUsers().subscribe((data: any) => {
      this.users = data;
    })
  }
}
