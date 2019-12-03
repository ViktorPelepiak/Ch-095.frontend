import {Component, OnInit} from '@angular/core';
import {User} from '../../entities/user';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {
  title: string;
  data: string;
  user: User;

  constructor(private userService: UserService) {
    this.title = 'SurveysFront';
    this.data = 'Data2';
  }

  getFirstUser() {
    this.userService
      .getFirst()
      .toPromise()
      .then(e => this.user = e)
      .catch(e => console.log(e));
  }

  postUser() {
    this.userService
      .postUser(this.user)
      .subscribe(e => console.log(e));
  }

  ngOnInit(): void {
    this.getFirstUser();
  }

}
