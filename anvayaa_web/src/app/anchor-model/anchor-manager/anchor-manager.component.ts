import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router, Route } from '@angular/router';


@Component({
  selector: 'app-anchor-manager',
  templateUrl: './anchor-manager.component.html',
  styleUrls: ['./anchor-manager.component.css']
})
export class AnchorManagerComponent implements OnInit {

  constructor(private router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  dashboard(){
    this.router.navigate(["/anchorboard"])
   }

}
