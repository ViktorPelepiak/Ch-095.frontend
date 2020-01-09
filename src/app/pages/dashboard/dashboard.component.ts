import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {faUser, faBuilding, faChartBar, faTools, faImage, faUsers} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  icons = {faUser,faBuilding,faChartBar, faTools, faImage, faUsers};

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

}
