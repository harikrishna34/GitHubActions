import { Component, OnInit ,ViewChild} from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { UsersService } from '../../users.service'
import { NgxSpinnerService } from 'ngx-spinner';
// import { FormGroup } from '@angular/forms';
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, FormArray, Form, AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-createchatgroup',
  templateUrl: './createchatgroup.component.html',
  styleUrls: ['./createchatgroup.component.css']
})
export class CreatechatgroupComponent implements OnInit {

  dropdownSettings:{}
  selectedItems: any = [];
  selectOwnerSettings:any={}
  dropdownList: any = [];
  createuser:UntypedFormGroup
  members:UntypedFormGroup
  employeearray:any = []
  grouplistarray:any=[]
  otherusers={}
  ownerarray:any=[]
  adminarray:any=[]
  participentsarray:any=[]
  customerlistarray:any=[]
  CustRecId:any
  submited:any =false
  datesChecked:any
  owner:any
  adminslistarray:any=[]
  participentslistarray:any=[]
  groupdetails:any
  groupmembersarray:any=[]
  addgroupmembersform:UntypedFormGroup
  membersadminarray:any=[]
  membersparticipentsarray:any=[]
  groupId:any
  membersadmin={}
  membersparticipents={}
  addedparticipent:any
  emptyData:boolean = false
  removeGroupID:any
  removeGroupMembersId:any
  constructor(private formBuilder: UntypedFormBuilder,private userservice: UsersService,private Router: Router, private activatedRoute: ActivatedRoute, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {

    // this.employeeslist() 
    this.groupsList()
    this.customerslist()
       
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'uid',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      onDeSelect: 'item_text',
      itemsShowLimit: 6,
      allowSearchFilter: false,
  
    };
    this.selectOwnerSettings = {
      singleSelection: false,
      idField: 'uid',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      onDeSelect: 'item_text',
      itemsShowLimit: 6,
      allowSearchFilter: true,
    }

    this.otherusers = {
      singleSelection: false,
      idField: 'EmployeeID',
      textField: 'FirstName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      onDeSelect: 'item_text',
      itemsShowLimit: 6,
      allowSearchFilter: true,
    }

    this.createuser = this.formBuilder.group({
      guid:['',Validators.required],
      name:['',Validators.required],
      // type:"private",
      icon:"http://string.com",
      description:['',Validators.required],
      owner:['',Validators.required],
      tag:[''],

     members:this.formBuilder.group(
        {
          admin: [""],
          moderators: [''],
          participants: ['']
        }
      ) 
     
    })



    this.addgroupmembersform = this.formBuilder.group({
      guid:[''],
      // name:[''],
      // type:"private",
      // icon:"http://string.com",
      // description:[''],
      // owner:[],
      // tag:[''],
      admin: [""],
      // moderators: [''],
      participants: ['']
    })
  }
  customerId(data:any){
    this.CustRecId = data.target.value
    this.participentsarray.push(this.CustRecId)
 }
  supportexcadd(data:any){

    this.owner = data.target.value
  }



  addadmin(data:any){
    console.log("ffffffff",data)
    this.adminarray.push(data.uid)
  }

  removeadim(data:any){
    let indexofmsg = this.adminarray.indexOf(data.uid);
    this.adminarray.splice(indexofmsg, 1);
  }

  others(data:any){
    for (let i = 0;i<data.length;i++){
    this.participentsarray.push(data[i].uid)
    }
  }

  othersSingleAdd(data:any){
    this.participentsarray.push(data.uid)
  }

  removeothers(data:any){

    console.log("remove data incoming",data)
    let indexofmsg = this.participentsarray.indexOf(data.uid);
    this.participentsarray.splice(indexofmsg, 1);

    console.log("removelog",this.participentsarray)
  }

  removeIndividule(data:any){
       this.participentsarray = data
  }
  // employeeslist() {
  //   this.spinner.show()
  //   this.userservice.employeesdetails().subscribe((Response) => {
  //     if (Response.code == "S001") {
  //       this.spinner.hide()
       
  //       // this.employeearray = Response.data
  //     } else {
  //       alert(Response.message)
  //       this.spinner.hide()
  //     }

  //   }, (error) => {
  //     alert(error.error.message)
  //     this.spinner.hide()
  //   })

  // }


  customerslist() {
    this.spinner.show()
    this.userservice.chatusers().subscribe((Response) => {
      if (Response.code == "S001") {
        this.spinner.hide()
        this.customerlistarray = Response.data.filter((data:any)=>{
          if(data.role == "customer"){
            return data
          }
        })

        this.employeearray = Response.data.filter((data:any)=>{
          if(data.role == "customercareemployee"){
            return data
          }
        })

        console.log(this.employeearray)

        this.adminslistarray = Response.data.filter((data:any)=>{
          if(data.role == "fieldemployee"){
            return data
          }
        })

        this.participentslistarray = Response.data.filter((data:any)=>{
          if((data.role == "customercareemployee") || (data.role=="fieldemployee")){
            return data
          }
        })

      } else {
        alert(Response.message)
        this.spinner.hide()
      }
    }, (error) => {
      alert(error.error.message)
      this.spinner.hide()
    })

  }

  
  groupsList() {
    this.spinner.show()
    this.userservice.chatgrouplist().subscribe((Response) => {
      if (Response.code == "S001") {
        this.spinner.hide()
        this.emptyData = false
        this.grouplistarray = Response.data

       
      } else if(Response.code == "S002"){
       
          alert(Response.data)
      } else{


        alert(Response.message)
        this.spinner.hide()
      }
    }, (error) => {

      alert(error.error.data)
    
        this.grouplistarray = null
      
      this.emptyData = true
      this.spinner.hide()
    })

  }

  
  createchatgroup(){
    this.submited = true

 
if(this.createuser.status ==='INVALID'){

}else{

  // if(this.adminarray == "" ){
  //   return alert("Please Select Care Manager")
  //  }

  if (this.participentsarray.length < 2) {
    return alert("Please Select Participent")
  }else{
   this.createuser.value.members.participants = this.participentsarray

  }
   
   this.createuser.value.guid = this.CustRecId
   this.createuser.value.owner =this.owner
  //  this.createuser.value.members.admin = this.adminarray
   this.createuser.value.type = 'private'
   this.createuser.value.icon = "http://string.com"

   console.log(this.createuser.value)
   return
 this.spinner.show()
 this.userservice.creatchatgroup(this.createuser.value).subscribe((Response) => {
   if (Response.code == "S001") {
     this.spinner.hide()
      alert("Group Crated")
      this.createuser.reset()
      this.otherusers = ""
      this.selectedItems = ""
      this.participentsarray=[]
      this.groupsList()
      this.submited = false
   } else
    if(Response.code == "S002"){
      this.spinner.hide()
     alert(Response.data.message)

   }
   else{
    this.spinner.hide()
    
     alert(Response)
     this.spinner.hide()
   }
 }, (error) => {
   alert(error.error.data.message)
   this.spinner.hide()
 })
}
}


closeMembersModel(){
  this.createuser.reset()
  this.otherusers = ""
  this.selectedItems = ""
  this.participentsarray=[]
  this.groupsList()
  this.submited = false
}
  groupRemoveAlert(data:any){
      this.removeGroupID = data.guid

  }

  removegroup(){
    this.spinner.show()

    this.userservice.deletechatgroup(this.removeGroupID).subscribe((Response) => {
      if (Response.code == "S001") {
        this.spinner.hide()
        alert(Response.data.message)
        
         this.groupsList()
      } else {
        alert(Response.message)
        this.spinner.hide()
      }
    }, (error) => {
      alert(error.error.message)
      this.spinner.hide()
    })
  }



  updategroupdata(groupdata:any){


    this.getchatgroupdetails(groupdata.guid)
    this.getgroupmembers(groupdata.guid)

     this.groupId = groupdata.guid
   

  }

 getchatgroupdetails(groupdata:any){
  this.spinner.show()
  this.userservice.gertchatgroupbyid(groupdata).subscribe((Response) => {
    if (Response.code == "S001") {
      this.spinner.hide()

      this.groupdetails = Response.data
     
    } else {
      alert(Response.message)
      this.spinner.hide()
    }
  }, (error) => {
    alert(error.error.message)
    this.spinner.hide()
  })
 }

 getgroupmembers(groupdata:any){
   
  this.userservice.groupmembersbyid(groupdata).subscribe((Response) => {
    if (Response.code == "S001") {
      this.spinner.hide()
        this.groupmembersarray = Response.data
    } else {
      alert(Response.message)
      this.spinner.hide()
    }
  }, (error) => {
    alert(error.error.message)
    this.spinner.hide()
  })
 }

 addadinformember(data:any){
  this.membersadminarray.push(data.uid)
 }

 removemembersadim(data:any){
  let indexofmsg = this.membersadminarray.indexOf(data.uid);
  this.membersadminarray.splice(indexofmsg, 1);
}

membersaddothers(data:any){
      var uid = data.target.value
    this.membersparticipentsarray.push(uid)

  // this.addedparticipent = data.target.value
}

removememberothers(data:any){
  let indexofmsg = this.membersparticipentsarray.indexOf(data.uid);
  this.membersparticipentsarray.splice(indexofmsg, 1);
}


  addmembers(){

    this.submited = true;


    if(this.addgroupmembersform.status ==='INVALID'){

    }else{
      this.addgroupmembersform.value.guid = this.groupId
      // this.addgroupmembersform.value.admin = this.membersadminarray
      this.addgroupmembersform.value.participants = this.membersparticipentsarray
  
      this.spinner.show()
      
      this.userservice.addMemberstoChatGroup(this.addgroupmembersform.value).subscribe((Response) => {
        if (Response.code == "S001") {
          this.spinner.hide()
          alert("Member Added")
          this.addgroupmembersform.reset()
          this.getgroupmembers(this.groupId)
          this.getchatgroupdetails(this.groupId)
          this.groupsList()
          this.createuser.reset()
          this.otherusers = ""
          this.selectedItems = ""
          this.participentsarray=[]
          this.groupsList()
          this.submited = false
  
        } else {
          alert(Response.message)
          this.spinner.hide()
        }
      }, (error) => {
        alert(error.error.message)
        this.spinner.hide()
      })


    }
   
  }

  removeGroupDilough(data:any){

       this.removeGroupMembersId = data.uid
  }

  removeMemberInGroup(){
       this.spinner.show()
    this.userservice.deleteMemberInGroup(this.groupId,this.removeGroupMembersId ).subscribe((Response) => {
      if (Response.code == "S001") {
        this.spinner.hide()
        alert(Response.data.message)
        this.getgroupmembers(this.groupId)
        this.getchatgroupdetails(this.groupId)
        this.groupsList()

        this.createuser.reset()
        this.otherusers = ""
        this.selectedItems = ""
        this.participentsarray=[]
        this.groupsList()
        this.submited = false
      }  else if(Response.code == "S002"){
        this.spinner.hide()
         alert(Response.data.message)

      }else{
        alert(Response.message)
        this.spinner.hide()
      }
    }, (error) => {
      alert(error.error.message)
      alert(error.error.message)
      this.spinner.hide()
    })
  }
 
}
