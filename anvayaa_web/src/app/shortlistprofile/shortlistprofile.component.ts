import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { UsersService } from 'src/app/users.service';
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-shortlistprofile',
  templateUrl: './shortlistprofile.component.html',
  styleUrls: ['./shortlistprofile.component.css']
})


export class ShortlistprofileComponent {
  @ViewChild('modal') modal: ElementRef; // Reference to the modal element
  @ViewChild('rejectmodal') rejectmodal: ElementRef; // Reference to the rejectmodal element
  @ViewChild('rejectModalClose') rejectCloseBtn: any;
  @ViewChild('ApproveModalClose') approveCloseBtn: any;

  shortListperofiles: any = []
  reqId: any
  pid: any;
  rpid: any;
  isModalOpen: any = true
  isModalclosetoreject: any = true
  selectedProfile: any;
  selectedProfiletoreject: any;
  selectedProfileforimage: any
  myForm!: UntypedFormGroup;
  press: boolean = false;

  constructor(private spinner: NgxSpinnerService, private userservice: UsersService, private router: Router, private route: ActivatedRoute, private formBuilder: UntypedFormBuilder) { }
  ngOnInit(): void {
    this.spinner.show();

    this.reqId = this.route.snapshot.queryParamMap.get("RequestID");
    //  reading the requestid from url
    console.log(this.reqId, "reqId")
    this.shortlistprofiles()
    this.myForm = this.formBuilder.group({
      comments: ['', [Validators.required]] // Default value for textarea
    });
    this.spinner.hide();

  };

  shortlistprofiles() {
    this.spinner.show();
    this.userservice.shortlistprofilelist(this.reqId).subscribe((response: any) => {
      console.log(response, "shortlistprofiles")
      this.shortListperofiles = response.data
      this.spinner.hide();
    }, (error: any) => {
      this.spinner.hide();
      alert(error.error.message)
      this.router.navigate(["Dashboard/Task/MyTask"]);
    })
  }

  Saveandapproveprofile() {
    this.spinner.show();
    this.press = true
    if (this.myForm.status == "INVALID") {
      this.spinner.hide();
      return
    } else {
      const noteValue = this.myForm.value.comments; // Extracting the value of comments

      this.userservice.saveandapproveprofile({ RequestID: this.reqId, ProfileID: this.pid, Note: noteValue }).subscribe((response: any) => {
        console.log(response, "saveandapproveprofile");
        this.spinner.hide();
        this.shortlistprofiles();
        alert(response.message)
        this.router.navigate(["Dashboard/Task/MyTask"]);
      }, (error) => {
        // Handle error response (status code 404 or other errors)
        if (error.status === 404) {
          this.spinner.hide();
          alert(error.error.message)
          // Handle 404 Not Found error
        } else {
          this.spinner.hide();
          // Handle other errors
        }
      })

      this.spinner.hide();

    }

    this.spinner.hide();

    this.approveCloseBtn.nativeElement.click();

  }
  openModal(profile: any) {
    console.log('ssssssssyyyyyyyyyyyyyyyssss', profile)
    this.selectedProfile = profile;
  }
  openmd(profileid: any) {
    console.log("22222", profileid)
    this.pid = profileid
    console.log("123123123", profileid)


    // this.modal.nativeElement.style.display = 'block';
  }
  Saveandrejectprofile() {
    this.press = true


    const noteValue = this.myForm.value.comments; // Extracting the value of comments

    this.userservice.saveandrejectprofile({ RequestID: this.reqId, ProfileID: this.rpid, Note: noteValue }).subscribe((response: any) => {
      console.log(response, "saveandrejectprofile");
      this.shortlistprofiles();
      alert(response.message)
      // this.router.navigate(["Dashboard/Task/MyTask"]);
      this.shortlistprofiles();
    }, (error) => {
      // Handle error response (status code 404 or other errors)
      if (error.status === 404) {
        alert(error.error.message)
        this.spinner.hide();
        // Handle 404 Not Found error
      } else {
        this.spinner.hide();
        // Handle other errors
      }
    })

    this.spinner.hide();

    this.rejectCloseBtn.nativeElement.click();

  }
  rejectModal(profile: any) {
    console.log('ssssssssyyyyyyyyyyyyyyyssss', profile)
    this.selectedProfiletoreject = profile;
  }
  rejectmd(profileids: any) {
    console.log("22222", profileids)
    this.rpid = profileids
    console.log("123123123", this.rpid)


    // this.rejectmodal.nativeElement.style.display = 'block';
  }
  openModalpopupforimage(profile: any) {
    console.log("modal pop up for image", profile)
    this.selectedProfileforimage = profile;
    console.log("images to be binded", this.selectedProfileforimage)
    // this.images = profile.ProfileImages;
    // console.log("images to be binded",this.images)

  }
}
