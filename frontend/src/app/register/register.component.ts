import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user.model';
import { RegisterService } from './register.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = {
    username: null,
    password: null,
    firstName: null,
    lastName: null,
    email: '',
    userImgSrc: null,
    wallet_balance: null,
    _id:null
};


  constructor(private register_service: RegisterService) {
    
  }

  saveUser(newUser: User) {
    this.register_service.saveUserIntoDB(newUser);
  }
  


  ngOnInit() {
  }

}
