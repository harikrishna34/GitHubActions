import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../users.service'
import { UntypedFormGroup, FormControl, UntypedFormBuilder, Validators, UntypedFormArray, Form } from '@angular/forms';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { first, retryWhen } from 'rxjs';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DatePipe } from '@angular/common'
import * as moment from 'moment';
import { conforms } from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dementia-initial-assessment-form',
  templateUrl: './dementia-initial-assessment-form.component.html',
  styleUrls: ['./dementia-initial-assessment-form.component.css']
})
export class DementiaInitialAssessmentFormComponent implements OnInit {
  Demographicsbtn: any = false
  medicalhistorybtn: any = false
  title: any = ""
  dropdownSettings = {}
  dropdownSetting = {}
  generalabilitydataOBj: any = {}
  otherphysicalcondition: any = {}
  status: any = {}
  public dementiaAssesmentForm!: UntypedFormGroup;
  public dementiaAssesmentFormMedicalHistory!: UntypedFormGroup;
  public dementiaAssesmentFormGeneralAbilities!: UntypedFormGroup;
  public dementiaAssesmentBiography!: UntypedFormGroup
  public children!: UntypedFormGroup
  public Spouses!: UntypedFormGroup
  public ClosestFriends!: UntypedFormGroup
  public silblings!: UntypedFormGroup
  spouseIndex: any
  childIndex: any
  siblingIndex: any
  pastFriendIndex: any
  presenttFriendIndex: any
  frndDrop: boolean = false
  Conditions: any[] = [


    {
      ConditionName: 'HTN',
      ConditionStatus: '',
      Duration: ''
    }
    ,
    {
      ConditionName: 'DM',
      ConditionStatus: '',
      Duration: ''
    },
    {
      ConditionName: 'CVD/CAD',
      ConditionStatus: '',
      Duration: ''
    },
    {
      ConditionName: 'H/O_Stroke',
      ConditionStatus: '',
      Duration: ''
    },
    {
      ConditionName: 'H/O_head_injury',
      ConditionStatus: '',
      Duration: ''
    },
    {
      ConditionName: 'H/O_allergies',
      ConditionStatus: '',
      Duration: ''
    },
    {
      ConditionName: 'H/O_illness',
      ConditionStatus: '',
      Duration: ''
    }




  ]
  step: any
  impdata: any = false
  stagedata: any
  // dementiaQuestion:any
  dementiaassesment: any;
  dementiaPhyConditions: any
  Type: any;
  childrendata: any = []
  spousedata: any = []
  siblingsdata: any = []
  tempimparmants: any = []
  tempimparmantboj: any = {}


  CustID: any;
  // element:any
  CustRecID: any
  foundgenablityqn: any
  demographicsdata: any
  stagevalues: any
  items: UntypedFormArray | undefined
  data: UntypedFormArray | undefined
  phisicalcondition: any
  dementiacondition: any
  phisicalconditionID: any
  dropdownphydata: any
  lastgeneralability: any
  index: any
  objdata: any
  dropdownmusicSetting: any;
  dropdownvideosetting: any
  dementiavideodataarray: any = []
  dropdownActivitysetting: any = []
  activitydataarray: any = []
  selectphy: any = []
  othercondition: any = []
  dementiamusicdataarray: any = []
  generalAbilityData: any = [

  ]
  selectedData: any
  dementiamusic: any
  dementiavideo: any
  dementiaActivity: any
  cmtdata: any = {
    'datanew': ""
  }
  ondataadded = false
  spouseadded = false
  childrenadded = false

  music = false
  video = false
  activity = false
  phycondition = false
  genbtn = false
  dementiaSpouseData: any
  demetiaChildrenData: any
  dementiaSiblingData: any
  dementiaClosestFrndData: any = []
  physicalconditionData: any

  activithyData: any
  musicData: any
  videoData: any
  comment: any = ''
  MedicalHistorybtn: any = false
  Biographysbtn: any = false
  dementiaQuestion: any
  dementiaQuestiondata: any = []
  constructor(private userservice: UsersService, private router: Router, private route: ActivatedRoute, private formBuilder: UntypedFormBuilder, private DatePipe: DatePipe, private spinner:NgxSpinnerService) { }
  maxdate = new Date();
  dataaaaaaaaaa: any = []
  itemss: any = []
  dropdownList: any = [];
  dropdownphysnd: any = []
  selectedItems: any = [];
  selectedItem: any = []
  phydata: any;
  otherconditiondata: any = []
  dementiaclosestfrndData: any = []
  viewAnchorData: any = []
  Past_friends: any = []
  Present_friends: any = []

  ngOnInit(): void {


      this.CustRecID = this.route.snapshot.queryParamMap.get("CustRecID")
      this.CustID = this.route.snapshot.queryParamMap.get("CustID")
     
     console.log("")

    this.userservice.languages().subscribe((languages) => {
      this.dropdownList = languages.data.Languages
    })
    this.userservice.dementiaInitialAssesmentData(this.CustRecID, this.CustID).subscribe((viewAnchorData) => {
      this.viewAnchorData = viewAnchorData;
      if (this.viewAnchorData.code != "ND01") {

      }
      this.dementiaAssesmentForm.get('Demographics')?.patchValue({ Date_of_birth: this.DatePipe.transform((viewAnchorData.data.Demographics[0].Date_of_birth) * 1000, 'YYYY-MM-dd') })
      this.dementiaAssesmentForm.patchValue({ Responder_Name: viewAnchorData.data.Responder_Name })
      this.dementiaAssesmentForm.patchValue({ Relationship_With_PWD: viewAnchorData.data.Relationship_With_PWD })
      this.dementiaAssesmentForm.get('Demographics')?.patchValue({ Name: viewAnchorData.data.Demographics[0].Name })
      this.dementiaAssesmentForm.get('Demographics')?.patchValue({ Gender: viewAnchorData.data.Demographics[0].Gender })
      this.dementiaAssesmentForm.get('Demographics')?.patchValue({ Occupation: viewAnchorData.data.Demographics[0].Occupation })
      this.dementiaAssesmentForm.get('Demographics')?.patchValue({ Langduages_known: viewAnchorData.data.Demographics[0].Languages_known })
      this.dementiaAssesmentForm.get('Demographics')?.patchValue({ Primary_Caregiver_Name: viewAnchorData.data.Demographics[0].Primary_Caregiver_Name })
      this.dementiaAssesmentForm.get('Demographics')?.patchValue({ Current_Homecare_Attender: viewAnchorData.data.Demographics[0].Current_Homecare_Attender })
      this.dementiaAssesmentForm.get('Demographics')?.patchValue({ Languages_known: viewAnchorData.data.Demographics[0].Languages_known })




      this.dementiaQuestiondata = viewAnchorData.data.GeneralAbilities[0]

      let data = new Date((viewAnchorData.data.MedicalHistory[0].Date_Of_Diagnosis) * 1000)


      this.dementiaAssesmentFormMedicalHistory.get('MedicalHistory')?.patchValue({ Date_Of_Diagnosis: this.DatePipe.transform((viewAnchorData.data.MedicalHistory[0].Date_Of_Diagnosis) * 1000, 'YYYY-MM-dd') })
      this.dementiaAssesmentFormMedicalHistory.get('MedicalHistory')?.patchValue({ Dementia_Diagnosis: viewAnchorData.data.MedicalHistory[0].Dementia_Diagnosis })
      this.dementiaAssesmentFormMedicalHistory.get('MedicalHistory')?.patchValue({ Stage: viewAnchorData.data.MedicalHistory[0].Stage })
      this.dementiaAssesmentFormMedicalHistory.get('MedicalHistory')?.patchValue({ MRI_CTScan: viewAnchorData.data.MedicalHistory[0].MRI_CTScan })
      // this.dementiaAssesmentFormMedicalHistory.get('MedicalHistory')?.patchValue({ MaxApplicableLevel: viewAnchorData.data.MedicalHistory[0].MaxApplicableLevel })
      this.stagevalues = viewAnchorData.data.MedicalHistory[0].StageID



      this.dementiaAssesmentFormMedicalHistory.get('MedicalHistory')?.get('Physical_impairment')?.get('Physical_impairmentData')?.patchValue({ Physical_impairmentData: viewAnchorData.data.MedicalHistory[0].Physical_Impairment.Physical_impairmentData[0].PhysicalCondition })
      this.dementiaAssesmentFormMedicalHistory.get('MedicalHistory')?.get('Physical_impairment')?.patchValue({ MaxApplicableLevel: viewAnchorData.data.MedicalHistory[0].Physical_Impairment.MaxApplicableLevel })
      this.Conditions = viewAnchorData.data.MedicalHistory[0].Other_Conditions

      //generalabilities

      // this.videoData = viewAnchorData.data.Biography[0]?.Preference_Of_TV_or_Videos.Data
      // this.musicData = viewAnchorData.data.Biography[0]?.Preference_Of_Music.Data
      //   this.activithyData = viewAnchorData.data.Biography[0].Recreational_Activitie_They_Enjoy.Past.Data
      this.physicalconditionData = viewAnchorData.data.MedicalHistory[0].Physical_Impairment.Physical_impairmentData
      this.dementiaSpouseData = viewAnchorData.data.Biography[0].Personal_Life.Name_of_Spouses
      this.demetiaChildrenData = viewAnchorData.data.Biography[0].Personal_Life.Name_of_Children
      this.dementiaSiblingData = viewAnchorData.data.Biography[0].Personal_Life.Name_of_Siblings
      this.Past_friends = viewAnchorData.data.Biography[0].Closest_Friends.Past_friends
      this.Present_friends = viewAnchorData.data.Biography[0].Closest_Friends.Present_friends

      //  this.activitydataarray=viewAnchorData.data.Biography[0].Recreational_Activitie_They_Enjoy.Past.Data 

      if (this.activitydataarray && this.activitydataarray.length > 0) {
        for (let act in this.activitydataarray) {
          delete this.activitydataarray[act].AliasActivityName;
          delete this.activitydataarray[act].Status;
          delete this.activitydataarray[act]._id;

        }
      }




      //Biography

      this.spousedata = viewAnchorData.data.Biography[0].Personal_Life.Name_of_Spouses
      this.childrendata = viewAnchorData.data.Biography[0].Personal_Life.Name_of_Children
      this.siblingsdata = viewAnchorData.data.Biography[0].Personal_Life.Name_of_Siblings

      this.dementiaAssesmentBiography.get('Biography')?.patchValue({ What_does_typical_Day_look_like_for_PWD: viewAnchorData.data.Biography[0].What_does_typical_Day_look_like_for_PWD })
      this.dementiaAssesmentBiography.get('Biography')?.patchValue({ OtherInformation: viewAnchorData.data.Biography[0].OtherInformation })
      this.dementiaAssesmentBiography.get('Biography')?.get('Personal_Life')?.patchValue({ Place_of_Birth: viewAnchorData.data.Biography[0].Personal_Life.Place_of_Birth })
      this.dementiaAssesmentBiography.get('Biography')?.get('Personal_Life')?.patchValue({ Any_award_or_achievement: viewAnchorData.data.Biography[0].Personal_Life.Any_award_or_achievement })
      this.dementiaAssesmentBiography.get('Biography')?.get('Personal_Life')?.patchValue({ Any_important_personal_information: viewAnchorData.data.Biography[0].Personal_Life.Any_important_personal_information })

      //likesand dislikes
      this.dementiaAssesmentBiography.get('Biography')?.get('Likes_And_Dislikes')?.patchValue({ "What_makes_him/her_happy": viewAnchorData.data.Biography[0].Likes_And_Dislikes['What_makes_him/her_happy'] })
      this.dementiaAssesmentBiography.get('Biography')?.get('Likes_And_Dislikes')?.patchValue({ "What_Are_things_upset_him/her": viewAnchorData.data.Biography[0].Likes_And_Dislikes['What_Are_things_upset_him/her'] })
      this.dementiaAssesmentBiography.get('Biography')?.get('Likes_And_Dislikes')?.patchValue({ "What_makes_him/her_physically_comfortable": viewAnchorData.data.Biography[0].Likes_And_Dislikes['What_makes_him/her_physically_comfortable'] })

      //Dietary_Habits
      this.dementiaAssesmentBiography.get('Biography')?.get('Dietary_Habits')?.get('Timings_of_meals')?.patchValue({ Breakfast: viewAnchorData.data.Biography[0].Dietary_Habits.Timings_of_meals.Breakfast })
      this.dementiaAssesmentBiography.get('Biography')?.get('Dietary_Habits')?.get('Timings_of_meals')?.patchValue({ BreakfastComment: viewAnchorData.data.Biography[0].Dietary_Habits.Timings_of_meals.BreakfastComment })
      this.dementiaAssesmentBiography.get('Biography')?.get('Dietary_Habits')?.get('Timings_of_meals')?.patchValue({ Lunch: viewAnchorData.data.Biography[0].Dietary_Habits.Timings_of_meals.Lunch })
      this.dementiaAssesmentBiography.get('Biography')?.get('Dietary_Habits')?.get('Timings_of_meals')?.patchValue({ LunchComment: viewAnchorData.data.Biography[0].Dietary_Habits.Timings_of_meals.LunchComment })
      this.dementiaAssesmentBiography.get('Biography')?.get('Dietary_Habits')?.get('Timings_of_meals')?.patchValue({ Snacks: viewAnchorData.data.Biography[0].Dietary_Habits.Timings_of_meals.Snacks })
      this.dementiaAssesmentBiography.get('Biography')?.get('Dietary_Habits')?.get('Timings_of_meals')?.patchValue({ SnacksComment: viewAnchorData.data.Biography[0].Dietary_Habits.Timings_of_meals.SnacksComment })
      this.dementiaAssesmentBiography.get('Biography')?.get('Dietary_Habits')?.get('Timings_of_meals')?.patchValue({ Dinner: viewAnchorData.data.Biography[0].Dietary_Habits.Timings_of_meals.Dinner })
      this.dementiaAssesmentBiography.get('Biography')?.get('Dietary_Habits')?.get('Timings_of_meals')?.patchValue({ DinnerComment: viewAnchorData.data.Biography[0].Dietary_Habits.Timings_of_meals.DinnerComment })
      this.dementiaAssesmentBiography.get('Biography')?.get('Dietary_Habits')?.patchValue({ Favourite_foods: viewAnchorData.data.Biography[0].Dietary_Habits.Favourite_foods[0] })

      //preference of music
      this.dementiaAssesmentBiography.get('Biography')?.get('Preference_Of_Music')?.patchValue({ OtherInfo: viewAnchorData.data.Biography[0].Preference_Of_Music.OtherInfo })
      this.dementiaAssesmentBiography.get('Biography')?.get('Preference_Of_Music')?.patchValue({ AdditionalInfo: viewAnchorData.data.Biography[0].Preference_Of_Music.AdditionalInfo })
      this.dementiaAssesmentBiography.get('Biography')?.get('Preference_Of_Music')?.patchValue({ Data: viewAnchorData.data.Biography[0].Preference_Of_Music.Data })
      // this.dementiamusicdataarray = viewAnchorData.data.Biography[0].Preference_Of_Music.Data[0].MusicName
      //video
      this.dementiaAssesmentBiography.get('Biography')?.get('Preference_Of_TV_or_Videos')?.patchValue({ OtherInfo: viewAnchorData.data.Biography[0].Preference_Of_TV_or_Videos.OtherInfo })
      this.dementiaAssesmentBiography.get('Biography')?.get('Preference_Of_TV_or_Videos')?.patchValue({ AdditionalInfo: viewAnchorData.data.Biography[0].Preference_Of_TV_or_Videos.AdditionalInfo })
      this.dementiaAssesmentBiography.get('Biography')?.get('Preference_Of_TV_or_Videos')?.patchValue({ Data: viewAnchorData.data.Biography[0].Preference_Of_TV_or_Videos.Data })
      //closestfrnd
      this.dementiaAssesmentBiography.get('Biography')?.get('Preference_Of_TV_or_Videos')?.patchValue({ OtherInfo: viewAnchorData.data.Biography[0].Preference_Of_TV_or_Videos.OtherInfo })
      this.dementiaAssesmentBiography.get('Biography')?.get('Recreational_Activitie_They_Enjoy')?.get('Past')?.patchValue({ AdditionalInfo: viewAnchorData.data.Biography[0].Recreational_Activitie_They_Enjoy.Past.AdditionalInfo })
      this.dementiaAssesmentBiography.get('Biography')?.get('Recreational_Activitie_They_Enjoy')?.get('Past')?.patchValue({ Data:viewAnchorData.data.Biography[0].Recreational_Activitie_They_Enjoy.Past.Data })

      this.dementiaAssesmentBiography.get('Biography')?.get('Recreational_Activitie_They_Enjoy')?.get('Present')?.patchValue({ AdditionalInfo: viewAnchorData.data.Biography[0].Recreational_Activitie_They_Enjoy.Present.AdditionalInfo })
      this.dementiaAssesmentBiography.get('Biography')?.get('Recreational_Activitie_They_Enjoy')?.get('Present')?.patchValue({ Data:viewAnchorData.data.Biography[0].Recreational_Activitie_They_Enjoy.Present.Data })
      

    })

    // console.log("incoming Data ",this.dementiaAssesmentForm)

    this.dementiamusicData();
    this.dementiavideodata();
    this.dementiaActivityData();

    // this.dropdownList = [
    //   "kannada",
    //   "English",
    //   "hindi",
    //   "Tamil"
    // ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      onDeSelect: 'item_text',
      itemsShowLimit: 6,
      allowSearchFilter: true,

    };

    this.dropdownSetting = {
      singleSelection: false,

      idField: 'PhysicalConditionID',
      textField: 'PhysicalCondition',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 6,

      allowSearchFilter: true
    };
    this.dropdownmusicSetting = {
      singleSelection: false,
      idField: 'MusicID',
      textField: 'MusicName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 6,
      allowSearchFilter: true
    };
    this.dropdownvideosetting = {
      singleSelection: false,
      idField: 'VideoID',
      textField: 'VideoName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 6,
      allowSearchFilter: true
    };
    this.dropdownActivitysetting = {
      singleSelection: false,
      idField: 'ActivityID',
      textField: 'ActivityName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 6,
      allowSearchFilter: true
    }



    this.Type = this.route.snapshot.queryParamMap.get("Type")
    this.CustID = this.route.snapshot.queryParamMap.get("CustID")
    this.CustRecID = this.route.snapshot.queryParamMap.get("CustRecID")




    this.children = this.formBuilder.group({
      "ChildrenName": [''],
      "Expired": [''],
      "ChildrenComment": ['']
    })
    this.Spouses = this.formBuilder.group({
      "SpouseName": [''],
      "Marital_Status": [''],
      "Expired": [''],
      "SpouseComment": ['']

    })
    this.silblings = this.formBuilder.group({
      "Name": [''],
      "Expired": [''],
      "SiblingComment": ['']
    })
    this.ClosestFriends = this.formBuilder.group({
      "Name": [''],
      "FriendType": [''],
      "PastFriendsComment": ['']
    })



    this.dementiaAssesmentForm = this.formBuilder.group({

      // FranchiseType: [''],
      Relationship_With_PWD: ['', Validators.pattern('[a-zA-Z \-\]*$')],
      Responder_Name: ['', Validators.pattern('[a-zA-Z \-\]*$')],
      Demographics: this.formBuilder.group({
        Name: ['', Validators.pattern('[a-zA-Z \-\]*$')],
        Gender: ['', Validators.required],
        Date_of_birth: ['', Validators.required],
        Occupation: ['', Validators.required],
        Languages_known: ['', Validators.required],
        Primary_Caregiver_Name: [''],
        Current_Homecare_Attender: [''],
      }),
    })
    
    this.dementiaAssesmentFormMedicalHistory = this.formBuilder.group({
      MedicalHistory: this.formBuilder.group({
        Dementia_Diagnosis: [''],
        Stage: [''],
        StageID: [''],
        Date_Of_Diagnosis: [''],
        MRI_CTScan: [''],
        Physical_Impairment: this.formBuilder.group({
          // AdditionalInfo:[''],
          // OtherInfo:[''],
          MaxApplicableLevel: [''],

          Physical_impairmentData: this.formBuilder.array([]),
        }),
        Other_Conditions: this.formBuilder.array([
        ]),
      }),
    })


    this.dementiaAssesmentBiography = this.formBuilder.group({
      Biography: this.formBuilder.group({
        What_does_typical_Day_look_like_for_PWD: [''],
        OtherInformation: [''],
        Personal_Life: this.formBuilder.group({
          Place_of_Birth: [''],
          Any_award_or_achievement: [''],
          Any_important_personal_information: [''],
          Name_of_Spouses: this.formBuilder.array([this.nameOfSpouses()]),
          Name_of_Children: this.formBuilder.array([this.namesOfChildren()]),
          Name_of_Siblings: this.formBuilder.array([this.namesOfSibling()
          ])
        })
        ,
        Likes_And_Dislikes: this.formBuilder.group({
          "What_makes_him/her_happy": [''],
          "What_Are_things_upset_him/her": [''],
          "What_makes_him/her_physically_comfortable": ['']


        }),
        Dietary_Habits: this.formBuilder.group({
          Timings_of_meals: this.formBuilder.group({
            Breakfast: [''],
            BreakfastComment: [''],
            Lunch: [''],
            LunchComment: [''],
            Snacks: [''],
            SnacksComment: [''],
            Dinner: [''],
            DinnerComment: []
          }),
          Favourite_foods: ['']
        }),
        Recreational_Activitie_They_Enjoy: this.formBuilder.group({
          Past: this.formBuilder.group({
            AdditionalInfo: [''],
            Data: ['',Validators.required]

          }),
          Present: this.formBuilder.group({
            AdditionalInfo: [''],
            Data: ['', Validators.required]

          })
        })
        ,
        Preference_Of_Music: this.formBuilder.group({

          OtherInfo: [''],
          AdditionalInfo: [''],
          Data: ['']

        }),
        Preference_Of_TV_or_Videos: this.formBuilder.group({
          OtherInfo: [''],
          AdditionalInfo: [''],
          Data:['']

        }),
        Closest_Friends: this.formBuilder.group({
          Past_friends: this.formBuilder.array([this.pastFrndsData()]),
          Present_friends: this.formBuilder.array([this.PresentFrndsData()
          ])
        })
      })
    })


    this.userservice.dementiaStages().subscribe((viewAnchorData) => {
      this.stagedata = viewAnchorData.data


    })

    this.dementiaQuestions();
    this.dementiaPhysicalConditions();
  }
  previous() {
    if (this.Type == 'MedicalHistory') {

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { Type: "Demographics", CustID: this.CustID, CustRecID: this.CustRecID },
        replaceUrl: true,
      })
      this.Type = 'Demographics'

    }
    if (this.Type == 'GeneralAbilities') {

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { Type: "MedicalHistory", CustID: this.CustID, CustRecID: this.CustRecID },
        replaceUrl: true,
      })
      this.Type = 'MedicalHistory'
    }

    if (this.Type == 'Biography') {

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { Type: "GeneralAbilities", CustID: this.CustID, CustRecID: this.CustRecID },
        replaceUrl: true,
      })
      this.Type = 'GeneralAbilities'
    }
  }

  Next() {

    if (this.Type == 'Demographics') {

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { Type: "MedicalHistory", CustID: this.CustID, CustRecID: this.CustRecID },
        replaceUrl: true,
      })
      this.Type = 'MedicalHistory'

    }
    if (this.Type == 'MedicalHistory') {

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { Type: "GeneralAbilities", CustID: this.CustID, CustRecID: this.CustRecID },
        replaceUrl: true,
      })
      this.Type = 'GeneralAbilities,'
    }

    if (this.Type == 'GeneralAbilities') {

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { Type: "Biography", CustID: this.CustID, CustRecID: this.CustRecID },
        replaceUrl: true,
      })
      this.Type = 'Biography'

    }
  }
  dementiamusicData() {
    this.userservice.dementiamusicdata().subscribe((viewAnchorData) => {
      this.dementiamusic = viewAnchorData.data

    })
  }

  onChildrenAdd() {

    this.childrenadded = true

    if (this.children.status == 'INVALID') {
      return;
    } else {

      if (this.childIndex == null) {
        this.childrendata.push(this.children.value)
      } else {

        this.childrendata.splice(this.childIndex, 1)
        this.childrendata.splice(this.childIndex, 0, this.children.value)
      }

      for (let keys in this.children.value) {

        this.children.get(keys)?.setValue("")
        this.childrenadded = false
      }
    }
    ;
  }

  onspouseadd() {
    this.spouseadded = true
    if (this.Spouses.status == 'INVALID') {
      return;
    } else {

      if (this.spouseIndex == null) {
        this.spousedata.push(this.Spouses.value)
      } else {
        this.spousedata.splice(this.spouseIndex, 1)
        this.spousedata.splice(this.spouseIndex, 0, this.Spouses.value)
      }

      for (let keys in this.Spouses.value) {

        this.Spouses.get(keys)?.setValue("")
        this.spouseadded = false
      }

    }
  }

  onsiblingsadd() {
    this.ondataadded = true

    if (this.silblings.status == 'INVALID') {
      return;
    } else {
      if (this.siblingIndex == null) {
        this.siblingsdata.push(this.silblings.value)

      } else {

        this.siblingsdata.splice(this.siblingIndex, 1)
        this.siblingsdata.splice(this.siblingIndex, 0, this.silblings.value)
      }
      for (let keys in this.silblings.value) {

        this.silblings.get(keys)?.setValue("")
        this.ondataadded = false
      }

    }

  }

  onAddClosestFrnds() {
    this.ondataadded = true
    this.ClosestFriends.controls['FriendType'].enable()
    if (this.ClosestFriends.status == 'INVALID') {
      return;
    } else {

      if (this.ClosestFriends.value.FriendType == "Past") {

        if (this.pastFriendIndex == null) {
          this.Past_friends.push(this.ClosestFriends.value)
        } else {

          this.Past_friends.splice(this.pastFriendIndex, 1)
          this.Past_friends.splice(this.pastFriendIndex, 0, this.ClosestFriends.value)
        }
      } else {

        if (this.presenttFriendIndex == null) {
          this.Present_friends.push(this.ClosestFriends.value)

        } else {


          this.Present_friends.splice(this.presenttFriendIndex, 1)
          this.Present_friends.splice(this.presenttFriendIndex, 0, this.ClosestFriends.value)
        }
      }

      this.dementiaClosestFrndData.push(this.ClosestFriends.value)
      for (let keys in this.ClosestFriends.value) {
        this.ClosestFriends.get(keys)?.setValue("")
        this.ondataadded = false
      }

    }
  }

  editSpouse(data: any, index: any) {

    this.spouseIndex = index

    this.Spouses.patchValue({ SpouseName: data.SpouseName })
    this.Spouses.patchValue({ Marital_Status: data.Marital_Status })
    this.Spouses.patchValue({ Expired: data.Expired })
    this.Spouses.patchValue({ SpouseComment: data.SpouseComment })
  }

  editChildren(data: any, index: any) {
    this.childIndex = index

    this.children.patchValue({ ChildrenName: data.ChildrenName })
    this.children.patchValue({ Expired: data.Expired })
    this.children.patchValue({ ChildrenComment: data.ChildrenComment })

  }

  editSibling(data: any, index: any) {
    this.siblingIndex = index

    this.silblings.patchValue({ Name: data.Name })
    this.silblings.patchValue({ Expired: data.Expired })
    this.silblings.patchValue({ SiblingComment: data.SiblingComment })

  }

  editPastFriend(data: any, index: any) {
    this.frndDrop = false
    this.ClosestFriends.controls['FriendType'].disable()
    this.pastFriendIndex = index
    this.ClosestFriends.patchValue({ Name: data.Name })
    this.ClosestFriends.patchValue({ FriendType: data.FriendType })
    this.ClosestFriends.patchValue({ PastFriendsComment: data.PastFriendsComment })
  }

  editPresentFriend(data: any, index: any) {
    this.frndDrop = false
    this.ClosestFriends.controls['FriendType'].disable()

    this.presenttFriendIndex = index
    this.ClosestFriends.patchValue({ Name: data.Name })
    this.ClosestFriends.patchValue({ FriendType: data.FriendType })
    this.ClosestFriends.patchValue({ PastFriendsComment: data.PastFriendsComment })
  }
  deleteClosestPresentFrnd(index: any) {
    let frndsfilter = this.Present_friends.filter((obj: any) => {
      return obj != this.Present_friends[index]
    })
    // this.childrendata.pop(index)
    this.Present_friends = frndsfilter
  }
  deleteClosestPastFrnd(index: any) {
    let frndsfilter = this.Past_friends.filter((obj: any) => {
      return obj != this.Past_friends[index]
    })

    // this.childrendata.pop(index)
    this.Past_friends = frndsfilter
  }

  deletchilddata(index: any) {


    let childfilter = this.childrendata.filter((obj: any) => {
      return obj != this.childrendata[index]
    })

    // this.childrendata.pop(index)
    this.childrendata = childfilter
  }

  deletespousedata(index: any) {

    let spousefilterdata = this.spousedata.filter((obj: any) => {
      return obj != this.spousedata[index]
    })
    this.spousedata = spousefilterdata
  }

  deletsiblingdata(index: any) {
    let siblingfilter = this.siblingsdata.filter((obj: any) => {

      return obj != this.siblingsdata[index]
    })
    this.siblingsdata = siblingfilter
  }

  dementiavideodata() {

    this.userservice.dementivideodata().subscribe((viewAnchorData) => {
      this.dementiavideo = viewAnchorData.data

    })
  }

  dementiaActivityData() {

    this.userservice.demetiaactivitydata().subscribe((viewAnchorData) => {
      this.dementiaActivity = viewAnchorData.data
    })
  }


  dementiaQuestions() {

    this.userservice.dementiaQuestions("General_Abilities").subscribe((viewQuestions) => {
      this.dementiaQuestion = viewQuestions.data
      this.dementiaQuestiondata;
      for (let i = 0; i < this.dementiaQuestion.length; i++) {
        this.dementiaQuestion[i].Answer = ''
        this.dementiaQuestion[i].Comment = ''

        for (let j = 0; j < this.dementiaQuestiondata.length; j++) {

          if (this.dementiaQuestiondata[j].QuestionID == this.dementiaQuestion[i].QuestionID) {
            this.dementiaQuestion[i].Answer = this.dementiaQuestiondata[j].Answer
            this.dementiaQuestion[i].Comment = this.dementiaQuestiondata[j].Comment
          }
        }
      }
    })
  }

  dementiaPhysicalConditions() {

    this.userservice.physicalConditions().subscribe((viewAnchorData) => {

      this.dropdownphysnd = viewAnchorData.data;
      if (this.viewAnchorData.data && this.viewAnchorData.data.MedicalHistory && this.viewAnchorData.data.MedicalHistory.length > 0) {
        if (this.dropdownphysnd && this.dropdownphysnd.length > 0) {
          for (let im in this.viewAnchorData.data.MedicalHistory[0].Physical_Impairment.Physical_impairmentData) {
            for (let k in this.dropdownphysnd) {
              if (this.dropdownphysnd[k].MaxApplicableLevel == undefined) {
                this.dropdownphysnd[k].MaxApplicableLevel = 0
              }

              if (this.viewAnchorData.data.MedicalHistory[0].Physical_Impairment.Physical_impairmentData[im].PhysicalConditionID == this.dropdownphysnd[k].PhysicalConditionID) {
                this.dropdownphysnd[k].MaxApplicableLevel = this.viewAnchorData.data.MedicalHistory[0].Physical_Impairment.Physical_impairmentData[im].MaxApplicableLevel
              }
            }

          }
        }
      } else {


        for (let m in this.dropdownphysnd) {
          if (this.dropdownphysnd[m].MaxApplicableLevel == undefined) {
            this.dropdownphysnd[m].MaxApplicableLevel = 0;
          }
        }
      }
    })
  }
  stageSelection(stage: any) {

    for (let i = 0; i < this.stagedata.length; i++) {

      if (this.stagedata[i].StageLevel === stage.target.value) {
        this.stagevalues = this.stagedata[i].StageID

      }
    }
  }
  phycnd(phy: any) {

    for (let i = 0; i < this.dementiaPhyConditions.length; i++) {

      if (this.dementiaPhyConditions[i].PhysicalConditionID === phy.target.value) {

        this.dementiacondition = this.dementiaPhyConditions[i].PhysicalConditionID


        this.phisicalcondition = this.dementiaPhyConditions[i].PhysicalCondition
        this.phisicalconditionID = phy.target.value
      }
    }
  }

  question(quest: any) {

    this.otherphysicalcondition = {
      "ConditionName": quest.target.name,
      "ConditionStatus": quest.target.value,
      "Comment": ''
    }

    this.impdata = quest.target.value
    if (this.otherconditiondata.length == 0) {
      this.otherconditiondata.push(this.otherphysicalcondition)

    } else {
      for (let gb in this.otherconditiondata) {
        this.foundgenablityqn = false;

        if (this.otherconditiondata[gb].ConditionName == quest.target.name) {
          this.foundgenablityqn = true;
          this.otherconditiondata[gb] = this.otherphysicalcondition
          break;
        }
      }
      if (this.foundgenablityqn == false) {
        this.otherconditiondata.push(this.otherphysicalcondition)
      }
    }
  }

  onmusicselect(muusic: any) {

    this.music = true

    this.dementiamusicdataarray.push(muusic)
  }

  onmusicselectAll(muusic: any) {
    this.music = true

    this.dementiamusicdataarray.push(muusic)
  }

  onmusicDeselect(music: any) {
    let filtermusic = this.dementiamusicdataarray.filter((obj: any) => {
      return obj['MusicID'] != music.MusicID
    })

    this.dementiamusicdataarray = filtermusic
  }

  onmusicDeselectAll(music: any) {
    let filtermusic = this.dementiamusicdataarray.filter((obj: any) => {
      return obj['MusicID'] != music.MusicID
    })

    this.dementiamusicdataarray = filtermusic
  }

  onvideoselectAll(video: any) {
    this.video = true

    this.dementiavideodataarray.push(video)
  }
  onvideoselect(video: any) {
    this.video = true

    this.dementiavideodataarray.push(video)
  }

  onDeSelectVideoALL(video: any) {
    let videofilter = this.dementiavideodataarray.filter((obj: any) => {
      return obj["VideoID"] != video.VideoID;
    })
    this.dementiavideodataarray = videofilter

  }

  onDeSelectVideo(video: any) {
    let videofilter = this.dementiavideodataarray.filter((obj: any) => {
      return obj["VideoID"] != video.VideoID;
    })
    this.dementiavideodataarray = videofilter

  }
  onActivitySelct(activity: any) {

    this.activity = true
    this.activitydataarray.push(activity)
  }

  onDeSelectActivity(activity: any) {
    let filteractivity = this.activitydataarray.filter((obj: any) => {
      return obj['ActivityID'] !== activity.ActivityID
    })
    this.activitydataarray = filteractivity
  }
  onItemSelectphycnd(data: any) {
    this.phycondition = true

    this.selectphy.push(data)

  }

  onDeSelectphycnd(data: any) {

    // let filteredArr=this.selectphy.remove(data)
    let filteredArr = this.selectphy.filter((obj: any) => {
      return obj["PhysicalConditionID"] != data.PhysicalConditionID;
    })
    this.selectphy = filteredArr;
  }
  dementiaQuestionsdata(data: any) {

    this.generalabilitydataOBj = {
      "QuestionID": data.target.name,
      "Answer": data.target.value,
      "comment": this.comment
    }


    return;
    if (this.generalAbilityData.length == 0) {
      this.generalAbilityData.push(this.generalabilitydataOBj)
    } else {
      for (let gb in this.generalAbilityData) {
        this.foundgenablityqn = false;
        if (this.generalAbilityData[gb].QuestionID == data.target.name) {
          this.foundgenablityqn = true;
          this.generalAbilityData[gb] = this.generalabilitydataOBj
          break;
        }
      }
      if (this.foundgenablityqn == false) {
        this.generalAbilityData.push(this.generalabilitydataOBj)
      }
    }
  }

  nameOfSpouses(): UntypedFormGroup {
    return this.formBuilder.group({
      SpouseName: [''],
      Marital_Status: [''],
      SpouseComment: [''],
      Expired: ['']
    })
  }

  getControls() {
    return (this.dementiaAssesmentBiography.controls['Biography'].get('Personal_Life')?.get('Name_of_Siblings') as UntypedFormArray).controls
  }

  namesOfChildren() {
    return this.formBuilder.group({
      ChildrenName: [''],
      Expired: [''],
      ChildrenComment: [''],
    })
  }

  namesOfSibling() {
    return this.formBuilder.group({
      Name: [''],
      Expired: [''],
      SiblingComment: ['']
    })
  }

  pastFrndsData() {
    return this.formBuilder.group({
      Name: [''],
      FriendType: [''],
      PastFriendsComment: ['']
    })
  }
  PresentFrndsData() {
    return this.formBuilder.group({
      Name: [''],
      FriendType: [''],
      PresentFriendsComment: ['']
    })
  }
  dementiaCreateAssesment() {

    this.tempimparmants = []
    for (let imp in this.dropdownphysnd) {
      this.tempimparmantboj.PhysicalConditionID = this.dropdownphysnd[imp].PhysicalConditionID
      this.tempimparmantboj.PhysicalCondition = this.dropdownphysnd[imp].PhysicalCondition
      this.tempimparmantboj.MaxApplicableLevel = this.dropdownphysnd[imp].MaxApplicableLevel
      this.tempimparmants.push(this.tempimparmantboj)
      this.tempimparmantboj = {}
    }

    // tempimparmants

    if (this.Type === "Demographics") {
      this.spinner.show()
      // this.step=2
      this.Demographicsbtn = true

      if (this.dementiaAssesmentForm.status === "INVALID") {
        this.spinner.hide()

      } else {
        this.Type = this.route.snapshot.queryParamMap.get("Type")

        this.demographicsdata = this.dementiaAssesmentForm.value

        this.dementiaAssesmentForm.value['CustRecID'] = this.CustRecID
        this.dementiaAssesmentForm.value['CustID'] = this.CustID
        this.dementiaAssesmentForm.value['Type'] = "Demographics"


        if (!moment(this.dementiaAssesmentForm.value.Demographics.Date_of_birth, "DD-MM-YYYY HH:mm", true).isValid()) {
          this.dementiaAssesmentForm.value.Demographics.Date_of_birth = this.DatePipe.transform(this.dementiaAssesmentForm.value.Demographics.Date_of_birth, 'dd-MM-YYYY')
        }
        // if (!moment( this.dementiaAssesmentForm.value.MedicalHistory.Date_Of_Diagnosis  , "DD-MM-YYYY HH:mm", true).isValid()) {
        //   this.dementiaAssesmentForm.value.MedicalHistory.Date_Of_Diagnosis = this.DatePipe.transform(this.dementiaAssesmentForm.value.MedicalHistory.Date_Of_Diagnosis, 'dd-MM-YYYY')
        // }


        // this.dementiaAssesmentForm.value['Demographics']=this.dementiaAssesmentForm.value
        this.userservice.dementiaassesement(this.demographicsdata).subscribe(Response => {

          if (Response.code = "S001") {
            this.spinner.hide()
             
            // alert(Response.data)
            // alert("Updated")
            this.router.navigate([], {
              relativeTo: this.route,
              queryParams: { Type: "MedicalHistory", CustID: this.CustID, CustRecID: this.CustRecID },
              replaceUrl: true,
            })
            this.Type = "MedicalHistory"

          }


        },
          function (error) {
            alert(error.error.data)
          }
        )
      }


    }
    if (this.Type === "MedicalHistory") {

     this.spinner.show()
      this.MedicalHistorybtn = true


      this.step = 2

      // if (this.selectphy.length < 1) {
      //   alert("select physical Condition")
      //   return;
      // }
      if (this.Conditions.length > 0) {
        for (let condition of this.Conditions) {
          if (condition.ConditionStatus == 'Yes' && condition.Duration == '') {

            return alert('Duration must not be empty')

          } else {

          }
        }

      }

      if (this.dementiaAssesmentFormMedicalHistory.status === "INVALID") {
        this.spinner.hide()

      } else {

        this.dementiaAssesmentFormMedicalHistory.value['Type'] = "MedicalHistory"
        this.dementiaAssesmentFormMedicalHistory.value['CustRecID'] = this.CustRecID
        this.dementiaAssesmentFormMedicalHistory.value['CustID'] = this.CustID


        this.dementiaAssesmentFormMedicalHistory.value['MedicalHistory']['StageID'] = this.stagevalues
        this.dementiaAssesmentFormMedicalHistory.value.MedicalHistory.Physical_Impairment.Physical_impairmentData = this.tempimparmants
        this.dementiaAssesmentFormMedicalHistory.value.MedicalHistory.Other_Conditions = this.Conditions



        this.userservice.dementiaassesement(this.dementiaAssesmentFormMedicalHistory.value).subscribe(Response => {

          if (Response.code = "S001") {
     this.spinner.hide()
                  
            // alert(Response.data)
            this.router.navigate([], {
              relativeTo: this.route,
              queryParams: { Type: "GeneralAbilities", CustID: this.CustID, CustRecID: this.CustRecID },
              replaceUrl: true,
            })
            this.Type = "GeneralAbilities"

          }


        },
          function (error) {
            alert(error.error.data)
          }
        )

      }
    }



    if (this.Type == "GeneralAbilities") {
      this.spinner.show()
      this.dementiaQuestiondata = [];
      for (let i = 0; i < this.dementiaQuestion.length; i++) {

        let obj = {
          "QuestionID": this.dementiaQuestion[i].QuestionID,
          "Answer": this.dementiaQuestion[i].Answer,
          "Comment": this.dementiaQuestion[i].Comment

        }
        this.dementiaQuestiondata.push(obj)
      }

      this.genbtn = true
      for (let ans of this.dementiaQuestiondata) {
        if (ans.Answer == "") {
          alert("All question mandatoy");
          this.spinner.hide()
          return;
        }
      }


      let data = {
        "Type": "GeneralAbilities",
        "CustRecID": this.CustRecID,
        "CustID": this.CustID,
        GeneralAbilities: this.dementiaQuestiondata
      }



      this.userservice.dementiaassesement(data).subscribe((Response) => {

        if (Response.code = "S001") {
          this.spinner.hide()   
          // alert(Response.data)
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { Type: "Biography", CustID: this.CustID, CustRecID: this.CustRecID },
            replaceUrl: true,
          })
          this.Type = "Biography"

        }


      },
        function (error) {
          alert(error.error.data)

        }

      )


          


    }



    if (this.Type == "Biography") {

      this.Biographysbtn = true
      this.spinner.show()

      if (this.spousedata == '') {
        this.spinner.hide()

        return alert(" Spouse Data Missing")

      }

      if (this.childrendata == '') {
        this.spinner.hide()

        return alert(" Spouse Data Missing")
      }

      if (this.siblingsdata == '') {
        this.spinner.hide()

        return alert(" Spouse Data Missing")
      }
         
      if (this.dementiaAssesmentBiography.status == 'INVALID') {
        this.spinner.hide()

      } else {


        this.dementiaAssesmentBiography.value.Biography.Personal_Life.Name_of_Children = this.childrendata
        this.dementiaAssesmentBiography.value.Biography.Personal_Life.Name_of_Siblings = this.siblingsdata
        this.dementiaAssesmentBiography.value.Biography.Personal_Life.Name_of_Spouses = this.spousedata

        this.dementiaAssesmentBiography.value['Type'] = "Biography"
        this.dementiaAssesmentBiography.value['CustRecID'] = this.CustRecID
        this.dementiaAssesmentBiography.value['CustID'] = this.CustID
        // this.dementiaAssesmentBiography.value.Biography.Preference_Of_Music.Data = this.dementiamusicdataarray
        // this.dementiaAssesmentBiography.value.Biography.Preference_Of_TV_or_Videos.Data = this.dementiavideodataarray
        //this.dementiaAssesmentBiography.value.Biography.Recreational_Activitie_They_Enjoy.Past.Data=[]
        // this.dementiaAssesmentBiography.value.Biography.Recreational_Activitie_They_Enjoy.Past.Data = this.dementiaAssesmentBiography.value.Biography.Recreational_Activitie_They_Enjoy.Past.PastData
        // this.dementiaAssesmentBiography.value.Biography.Recreational_Activitie_They_Enjoy.Past.Data=[]
        this.dementiaAssesmentBiography.value.Biography.Closest_Friends.Past_friends = this.Past_friends
        this.dementiaAssesmentBiography.value.Biography.Closest_Friends.Present_friends = this.Present_friends

        // if (this.dementiamusicdataarray.length < 1) {
        //   this.dementiaAssesmentBiography.value.Biography.Preference_Of_Music.Data = this.musicData
        // }

        // if (this.dementiavideodataarray.length < 1) {
        //   this.dementiaAssesmentBiography.value.Biography.Preference_Of_TV_or_Videos.Data = this.videoData
        // }
        // if (this.activitydataarray.length < 1) {
        //   this.dementiaAssesmentBiography.value.Biography.Recreational_Activitie_They_Enjoy.Past.Data = this.activithyData
        // }
        // if (this.dementiaClosestFrndData.length < 1) {
        //   this.dementiaAssesmentBiography.value.Biography.Closest_Friends.Past_friends = this.dementiaclosestfrndData
        // }


        console.log("biography",this.dementiaAssesmentBiography.value.Biography.reference_Of_Music)
        console.log("biography",this.dementiaAssesmentBiography.value.Biography.Preference_Of_TV_or_Videos)

      
        this.userservice.dementiaassesement(this.dementiaAssesmentBiography.value).subscribe(Response => {

          if (Response.code = "S001") {
            this.spinner.hide()
            // alert(Response.data)
         
            this.router.navigate(['Dashboard/dementia/dementiaSchedule'])

          }
        },
          function (error) {

            alert(error.error.data)

          }
        )
        this.spinner.hide()

      }

    }
  }

}
