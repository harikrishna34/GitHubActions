import { Component } from '@angular/core';
import { UsersService } from '../users.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
RequestID:any
FeedBackID:any
comments:any
partnerRatingValue:number
staffRatingValue:number
sponserDetils:any = {}
benficiaries:any = []
stars: number[] = [1, 2, 3, 4, 5];
selectedValue: number;
staffSelectedValue:number
  constructor(private spinner: NgxSpinnerService,private userservice: UsersService,private router: Router,private route: ActivatedRoute,private formBuilder: UntypedFormBuilder,){}
  ngOnInit(): void {

    this.spinner.show();
    this.RequestID = this.route.snapshot.queryParamMap.get('RequestID');
    this.FeedBackID = this.route.snapshot.queryParamMap.get('FeedBackID');
    this.requestDetails()

  } 
  
  requestDetails(){
    this.spinner.show();
    this.userservice.viewRequest(this.RequestID).subscribe((details:any) => {
      this.spinner.hide();
      this.sponserDetils = details.data.customerDetails
      this.benficiaries = details.data.customerDetails.Beneficiaries
     
    }, (error) => {
      // Handle error response (status code 404 or other errors)
      if (error.status === 404) {
        this.spinner.hide();
        alert(error.error.data)
      } else {
        this.spinner.hide(); 
        // Handle other errors
      }
    })
  }

  partnerRating(star:any) {
    this.selectedValue = star;
    this.partnerRatingValue = star
    console.log('Value of star', star);
  }

  staffRating(star:any) {
    this.staffSelectedValue  = star;
    console.log('Value of star', star);
  }

  submitFeedback(){
     let feedBackObj:any = {
      "FeedBackID":this.FeedBackID,
      "PartnerRating":this.selectedValue,
      "PartnerStaffRating":this.staffSelectedValue,
      "Comments":this.comments
     }

     console.log("submit value",feedBackObj)
     this.spinner.show();
    //  this.userservice.updateFeedback(feedBackObj).subscribe((details:any) => {
    //    this.spinner.hide();
    //    this.router.navigate(['/Dashboard/Task/MyTask'])
    //  this.FeedBackID = '',
    //   this.selectedValue = NaN,
    //   this.staffSelectedValue = NaN,
    //   this.comments = '' 
    //  }, (error) => {
    //    // Handle error response (status code 404 or other errors)
    //    if (error.status === 404) {
    //      this.spinner.hide();
    //      alert(error.error.data)
    //    } else {
    //      this.spinner.hide(); 
    //      // Handle other errors
    //    }
    //  })


  }
}
