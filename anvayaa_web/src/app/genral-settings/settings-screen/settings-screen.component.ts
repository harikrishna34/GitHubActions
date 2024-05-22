import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';


@Component({
  selector: 'app-settings-screen',
  templateUrl: './settings-screen.component.html',
  styleUrls: ['./settings-screen.component.css']
})
export class SettingsScreenComponent implements OnInit {

  constructor( private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  viewScreen(){
    this.router.navigate(['Dashboard/settings/view'])

  }
  viewRequest(){
    this.router.navigate(['Dashboard/settings/viewrequest'])

  }
  viewRemainders(){
    this.router.navigate(['Dashboard/settings/viewtemplates'])
  }
  viewstates(){
    this.router.navigate(['Dashboard/settings/viewstates'])
  }
  viewcsatquestions(){
    this.router.navigate(['Dashboard/settings/csat'])
  }
  viewactivecustomers(){
    this.router.navigate(['Dashboard/settings/viewactivecustomers'])
  }
}
