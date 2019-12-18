import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './shared/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public right50:boolean;
  constructor(private userService:UserService){}
  ngOnInit(){
    this.userService.populate();
  }
}