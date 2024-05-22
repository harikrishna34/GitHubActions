import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { UsersService } from '../users.service';
import {
  UntypedFormGroup,
  FormControl,
  UntypedFormBuilder,
  Validators,
  FormArray,
  Form,
  UntypedFormArray,
} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { invalid } from 'moment';
import { GeocodingService } from '../geocoding.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-emergencyplan',
  templateUrl: './emergencyplan.component.html',
  styleUrls: ['./emergencyplan.component.css'],
  providers: [GeocodingService],
})
export class EmergencyplanComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;
  @ViewChild('sponsorclose') sponsorclose: any;
  @ViewChild('neighbourclose') neighbourclose: any;
  @ViewChild('preferedfamilyclose') preferedfamilyclose: any;
  @ViewChild('fireclose') fireclose: any;
  @ViewChild('emergencylocalclose') emergencylocalclose: any;
  @ViewChild('pharmacyclose') pharmacyclose: any;
  @ViewChild('propertyclose') propertyclose: any;
  @ViewChild('ambulanceTypeclose') ambulanceTypeclose: any; // ViewChild reference to your modal

  public Addpreferedemergencyhospitals!: UntypedFormGroup;
  public Addneighboursdetails!: UntypedFormGroup;
  public Addpreferedfamilydetails!: UntypedFormGroup;
  public Addfirestationdetails!: UntypedFormGroup;
  public AddEmergencylocalcontactdetails!: UntypedFormGroup;
  public Addnearestpharmacyoutletdetails!: UntypedFormGroup;
  public Addsponsorcontactdetails!: UntypedFormGroup;
  public AddCustomerEmergencyProfileDetails!: UntypedFormGroup;
  public AddPropertyDetails!: UntypedFormGroup;
  public AddMedicalDetails!: UntypedFormGroup;
  public AmbulanceTypeDetails!: UntypedFormGroup;


  createemergencyhospital: boolean = true;
  createneighbour: boolean = true;
  createpreferedfamily: boolean = true;
  createfirestations: boolean = true;
  createemergencylocalcontacts: boolean = true;
  createpharmacyoutlet: boolean = true;
  createsponsorcontact: boolean = true;
  createpropertydetails: boolean = true;
  createMedicalDetails: boolean = true;
  PreferredEmergencyHospitals: any = [];
  NearestSuperSpecialityHospitals: any = [];
  NearestAmbulanceServices: any = [];
  superspecialityarray: any = [];
  PoliceStations: any = [];
  Neighbours: any = [];
  PreferedFamilyPhysician: any = {};
  FireStations: any = [];
  properties: any = [];
  medical: any = [];
  EmergencyLocalContactDetails: any = [];
  NearestPharmacyOutlet: any = [];
  SponsorContactDetails: any = [];
  propertyDetailsArray: any = [];
  index: any;
  neighbourindex: any;
  preferedfamilyindex: any;
  nearestfireindex: any;
  localemergencyindex: any;
  pharmacyoutletindex: any;
  sponsorcontactindex: any;
  propertyindex: any;
  medicalindex: any;
  type: string;
  emergencypress: boolean = false;
  npress: boolean = false;
  pfpress: boolean = false;
  fspress: boolean = false;
  ecpress: boolean = false;
  popress: boolean = false;
  scpress: boolean = false;
  customerpress: boolean = false;
  propertypress: boolean = false;
  medicalPress: boolean = false;
  Emergencyplan: any = {};
  CustRecID: any;
  CustID: any;
  Type: any;
  found: boolean = false;
  TEMPOBJ: any = {};
  medicalArray: any = [];
  medicalclose: any;
  medicalDetailsObject: any = {};
  benMedicalConditions: any = []
  // new multiselect
  // options:any = ['BP', 'Sugar', 'Thyroid', 'Cholesterol'];
  options: any = [];
  dropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'Unselect All',
    itemsShowLimit: 3,
    allowSearchFilter: true,
  };
  selectedItems: any = [];
  outputData: any = {};

  ambulanceTypeDetails: any = []
  showDropDown: boolean = false
  ambulanceTypeFlag: boolean = false
  AmbulanceType: any = []
  ambulanceDetails: any = {}
  // constructor(private router: Router, private route: ActivatedRoute, private userservice: UsersService, private formBuilder: UntypedFormBuilder, private spinner: NgxSpinnerService) { }
  // emdetailsmodal:boolean = true
  latitude!: number;
  longitude!: number;
  address!: string;
  suggestions: any[] = [];
  apiKey: string = 'AIzaSyDXPAPzNI60GsR8IKB5lwPj-6FR43IPkMc';
  showCoordinates: boolean = false;
  form: any;
  AddAmbulanceTypeDetails: any
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private spinner: NgxSpinnerService,
    private geocodingService: GeocodingService,
    private http: HttpClient,
    private userservice: UsersService,
  ) { }

  ngOnInit(): void {
    this.submittingnewprefferedhospitalformbuilder();
    this.submitneighbourdetailsformbuilder();
    this.submitpreferedfamilydetailsformbuilder();
    this.submitnearestfirestationformbuilder();
    this.submitnearestemergencylocalcontactdetailsformbuilder();
    this.submitepharmacyoutletdetailsformbuilder();
    this.submitesponsorcontactdetailsformbuilder();
    this.submitcustomeremergencyprofileformbuilder();
    this.submitPropertyDetailsFormBuilder();
    this.submitMedicalReportsFormBuilder();
    this.AmbulanceTypeDetailsDetails()
    // this.ViewPropertyTypes()
    // this.viewLiftSizes()
    this.viewLyfeDiseases();
    this.viewAllAmbulances()
    this.CustRecID = this.route.snapshot.queryParamMap.get('CustRecID');
    this.CustID = this.route.snapshot.queryParamMap.get('CustID');
    this.Type = this.route.snapshot.queryParamMap.get('Type');

    this.viewemergencyhealthplan();
  }

  ////multi Select
  onItemSelect(item: any): void {
    this.updateOutputData();
  }

  onItemDeSelect(item: any): void {
    this.updateOutputData();
  }

  updateOutputData(): void {
    // this.outputData = {};
    this.options.forEach((option: any) => {
      this.outputData[option] = this.selectedItems.includes(option)
        ? 'Yes'
        : 'No';
    });

  }
  ////multi Select end

  submittingnewprefferedhospitalformbuilder() {
    this.Addpreferedemergencyhospitals = this.formBuilder.group({
      Address: ['', [Validators.required]],
      ContactNumber: ['', [Validators.required]],
      Name: ['', [Validators.required]],
      LatLong: this.formBuilder.group({
        Lat: ['', [Validators.required]],
        Long: ['', [Validators.required]],
      }),
    });
  }
  submitneighbourdetailsformbuilder() {
    //getAddressCoordinates1
    this.Addneighboursdetails = this.formBuilder.group({
      Address: ['', [Validators.required]],
      ContactNumber: ['', [Validators.required]],
      AlternativeContactNumber: ['', [Validators.required]],
      Name: ['', [Validators.required]],
      LatLong: this.formBuilder.group({
        Lat: ['', [Validators.required]],
        Long: ['', [Validators.required]],
      }),
    });
  }
  submitpreferedfamilydetailsformbuilder() {
    //getAddressCoordinates2
    this.Addpreferedfamilydetails = this.formBuilder.group({
      ContactNumber: ['', [Validators.required]],
      ClinicName: ['', [Validators.required]],
      Name: ['', [Validators.required]],
    });
  }
  submitnearestfirestationformbuilder() {
    //getAddressCoordinates3
    this.Addfirestationdetails = this.formBuilder.group({
      ContactNumber: ['', [Validators.required]],
      // AlternateContactNumber: ['', [Validators.required]],
      Name: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      LatLong: this.formBuilder.group({
        Lat: ['', [Validators.required]],
        Long: ['', [Validators.required]],
      }),
    });
  }
  submitnearestemergencylocalcontactdetailsformbuilder() {
    //getAddressCoordinates4
    this.AddEmergencylocalcontactdetails = this.formBuilder.group({
      ContactNumber: ['', [Validators.required]],
      Name: ['', [Validators.required]],
    });
  }
  submitepharmacyoutletdetailsformbuilder() {
    // getAddressCoordinates5
    this.Addnearestpharmacyoutletdetails = this.formBuilder.group({
      ContactNumber: ['', [Validators.required]],
      Name: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      IsAvailable24Hours: ['', [Validators.required]],
      LatLong: this.formBuilder.group({
        Lat: ['', [Validators.required]],
        Long: ['', [Validators.required]],
      }),
    });
  }
  submitesponsorcontactdetailsformbuilder() {
    // getAddressCoordinates6
    this.Addsponsorcontactdetails = this.formBuilder.group({
      ContactNumber: ['', [Validators.required]],
      Name: ['', [Validators.required]],
    });
  }
  submitcustomeremergencyprofileformbuilder() {
    // getAddressCoordinates7
    this.AddCustomerEmergencyProfileDetails = this.formBuilder.group({
      Name: ['', [Validators.required]],
      Age: ['', [Validators.required]],
      BloodGroup: ['', [Validators.required]],
      Gender: ['', [Validators.required]],
      Address: ['', [Validators.required]],
    });
  }
  submitPropertyDetailsFormBuilder() {
    this.AddPropertyDetails = this.formBuilder.group({
      Property: ['', [Validators.required]],
      Floor: ['', [Validators.required]],
      Lift: ['', [Validators.required]],
      LiftSize: ['', [Validators.required]],
    });
  }
  submitMedicalReportsFormBuilder() {
    this.AddMedicalDetails = this.formBuilder.group({
      Diseases: ['', [Validators.required]],
      MobilityofUser: ['', [Validators.required]],
      Height: ['', [Validators.required]],
      Weight: ['', [Validators.required]],
    });
  }
  AmbulanceTypeDetailsDetails() {
    this.AmbulanceTypeDetails = this.formBuilder.group({
      AmbulanceType: ['', [Validators.required]],
      IsParamedicRequired: ['', [Validators.required]],
    });
  }

  submittingnewprefferedhospital() {
    this.emergencypress = true;

    if (this.Addpreferedemergencyhospitals.status == 'INVALID') {
      return;
    }
    if (this.type === 'Emergency Hospital') {
      if (this.createemergencyhospital == false) {
        this.PreferredEmergencyHospitals[this.index] =
          this.Addpreferedemergencyhospitals.value;
        this.createemergencyhospital = true;
      } else {
        this.PreferredEmergencyHospitals.push(
          this.Addpreferedemergencyhospitals.value,
        );
      }
    }
    if (this.type === 'Nearest Super Speciality Hospitals') {
      if (this.createemergencyhospital == false) {
        this.NearestSuperSpecialityHospitals[this.index] =
          this.Addpreferedemergencyhospitals.value;
        this.createemergencyhospital = true;
      } else {
        this.NearestSuperSpecialityHospitals.push(
          this.Addpreferedemergencyhospitals.value,
        );
      }
    }
    if (this.type === 'Nearest Ambulance Services') {
      if (this.createemergencyhospital == false) {
        this.NearestAmbulanceServices[this.index] =
          this.Addpreferedemergencyhospitals.value;
        this.createemergencyhospital = true;
      } else {
        this.NearestAmbulanceServices.push(
          this.Addpreferedemergencyhospitals.value,
        );
      }
    }
    if (this.type === 'Nearest Police Station') {
      if (this.createemergencyhospital == false) {
        this.PoliceStations[this.index] =
          this.Addpreferedemergencyhospitals.value;
        this.createemergencyhospital = true;
      } else {
        this.PoliceStations.push(this.Addpreferedemergencyhospitals.value);
      }
    }
    if (this.type === 'Nearest Neighbours') {
      if (this.createemergencyhospital == false) {
        this.Neighbours[this.index] = this.Addpreferedemergencyhospitals.value;
        this.createemergencyhospital = true;
      } else {
        this.Neighbours.push(this.Addpreferedemergencyhospitals.value);
      }
    }

    // this.emdetailsmodal = false
    this.emergencypress = false;

    this.submittingnewprefferedhospitalformbuilder();

    this.closebutton.nativeElement.click();
  }
  submitneighbourdetails() {
    this.npress = true;

    if (this.Addneighboursdetails.status == 'INVALID') {
      return;
    }

    if (this.createneighbour == false) {
      this.Neighbours[this.neighbourindex] = this.Addneighboursdetails.value;
      this.createneighbour = true;
    } else {
      this.Neighbours.push(this.Addneighboursdetails.value);
    }
    this.npress = false;

    this.submitneighbourdetailsformbuilder();

    this.neighbourclose.nativeElement.click();
  }
  submitpreferedfamilydetails() {
    this.pfpress = true;
    if (this.Addpreferedfamilydetails.status == 'INVALID') {
      return;
    }

    if (
      this.Addpreferedfamilydetails.value &&
      this.Addpreferedfamilydetails.value.ClinicName &&
      this.Addpreferedfamilydetails.value.ClinicName.length > 0
    ) {
      this.PreferedFamilyPhysician = this.Addpreferedfamilydetails.value;
    }

    // if (this.Addpreferedfamilydetails.status == "INVALID") {
    //   return
    // }
    // if (this.createpreferedfamily == false) {
    //   this.PreferedFamilyPhysician[this.preferedfamilyindex] = this.Addpreferedfamilydetails.value
    //   this.createpreferedfamily = true;
    // } else {
    //   if(this.PreferedFamilyPhysician ==undefined){
    //     this.PreferedFamilyPhysician={}
    //   }
    // }
    this.pfpress = false;

    this.submitpreferedfamilydetailsformbuilder();

    this.preferedfamilyclose.nativeElement.click();
  }
  submitfirestationdetails() {
    this.fspress = true;

    if (this.Addfirestationdetails.status == 'INVALID') {
      return;
    }
    if (this.createfirestations == false) {
      this.FireStations[this.nearestfireindex] =
        this.Addfirestationdetails.value;
      this.createfirestations = true;
    } else {
      this.FireStations.push(this.Addfirestationdetails.value);
    }
    this.fspress = false;

    this.submitnearestfirestationformbuilder();

    this.fireclose.nativeElement.click();
  }
  submitemergencycontactdetails() {
    this.ecpress = true;

    if (this.AddEmergencylocalcontactdetails.status == 'INVALID') {
      return;
    }
    if (this.createemergencylocalcontacts == false) {
      this.EmergencyLocalContactDetails[this.localemergencyindex] =
        this.AddEmergencylocalcontactdetails.value;
      this.createemergencylocalcontacts = true;
    } else {
      this.EmergencyLocalContactDetails.push(
        this.AddEmergencylocalcontactdetails.value,
      );
    }
    this.ecpress = false;

    this.submitnearestemergencylocalcontactdetailsformbuilder();

    this.emergencylocalclose.nativeElement.click();
  }
  submitepharmacyoutletdetails() {
    this.popress = true;

    if (this.Addnearestpharmacyoutletdetails.status == 'INVALID') {
      return;
    }

    if (this.createpharmacyoutlet == false) {
      this.NearestPharmacyOutlet[this.pharmacyoutletindex] =
        this.Addnearestpharmacyoutletdetails.value;
      this.createpharmacyoutlet = true;
    } else {
      this.NearestPharmacyOutlet.push(
        this.Addnearestpharmacyoutletdetails.value,
      );
    }

    this.popress = false;

    this.submitepharmacyoutletdetailsformbuilder();

    this.pharmacyclose.nativeElement.click();
  }
  submitesponsorcontactdetails() {
    this.scpress = true;

    if (this.Addsponsorcontactdetails.status == 'INVALID') {
      return;
    }

    if (this.createsponsorcontact == false) {
      this.SponsorContactDetails[this.sponsorcontactindex] =
        this.Addsponsorcontactdetails.value;
      this.createsponsorcontact = true;
    } else {
      this.SponsorContactDetails.push(this.Addsponsorcontactdetails.value);
    }

    this.scpress = false;

    this.submitesponsorcontactdetailsformbuilder();
    this.sponsorclose.nativeElement.click();
  }
  submitPropertyDetails() {
    this.propertypress = true;

    if (this.AddPropertyDetails.status == 'INVALID') { return; }

    if (this.createpropertydetails == false) {
      this.propertyDetailsArray[this.propertyindex] =
        this.AddPropertyDetails.value;
      this.createpropertydetails = true;
      if (this.propertyDetailsArray > 1) {
        this.propertyDetailsArray.push(this.AddPropertyDetails.value);
      }
    }

    this.submitPropertyDetailsFormBuilder();
    this.propertyclose.nativeElement.click();
  }
  submitMedicalDeatils() {
    this.medicalPress = true;


    if (this.AddMedicalDetails.status == 'INVALID') {
      return
    }
    this.selectedItems.forEach((option: any) => {
      this.outputData[option] = this.selectedItems.includes(option)
        ? 'Yes'
        : 'No';
    });


    this.medicalDetailsObject = this.AddMedicalDetails.value;
    this.benMedicalConditions.pop()
    this.benMedicalConditions.push(this.AddMedicalDetails.value)


    this.propertypress = false;
  }

  updateandsubmittingnewprefferedhospital(i: any, list: any, type: any) {
    this.index = i;
    this.type = type;
    this.createemergencyhospital = false;
    this.Addpreferedemergencyhospitals.patchValue({ Address: list.Address });
    this.Addpreferedemergencyhospitals.patchValue({
      ContactNumber: list.ContactNumber,
    });
    this.Addpreferedemergencyhospitals.get('LatLong')?.patchValue({
      Lat: list.LatLong.Lat,
    });
    this.Addpreferedemergencyhospitals.get('LatLong')?.patchValue({
      Long: list.LatLong.Long,
    });
    this.Addpreferedemergencyhospitals.patchValue({ Name: list.Name });
  }
  updateandsubmittingnewnearesthospital(i: any, list: any, type: any) {
    this.index = i;
    this.type = type;
    this.createemergencyhospital = false;
    this.Addpreferedemergencyhospitals.patchValue({ Address: list.Address });
    this.Addpreferedemergencyhospitals.patchValue({
      ContactNumber: list.ContactNumber,
    });
    this.Addpreferedemergencyhospitals.get('LatLong')?.patchValue({
      Lat: list.LatLong.Lat,
    });
    this.Addpreferedemergencyhospitals.get('LatLong')?.patchValue({
      Long: list.LatLong.Long,
    });
    this.Addpreferedemergencyhospitals.patchValue({ Name: list.Name });
  }
  updateandsubmittingnewnearestambulance(i: any, list: any, type: any) {
    this.type = type;
    this.index = i;
    this.createemergencyhospital = false;
    this.Addpreferedemergencyhospitals.patchValue({ Address: list.Address });
    this.Addpreferedemergencyhospitals.patchValue({
      ContactNumber: list.ContactNumber,
    });
    this.Addpreferedemergencyhospitals.get('LatLong')?.patchValue({
      Lat: list.LatLong.Lat,
    });
    this.Addpreferedemergencyhospitals.get('LatLong')?.patchValue({
      Long: list.LatLong.Long,
    });
    this.Addpreferedemergencyhospitals.patchValue({ Name: list.Name });
  }
  updateandsubmittingnewnearestpolice(i: any, list: any, type: any) {
    this.type = type;
    this.index = i;
    this.createemergencyhospital = false;
    this.Addpreferedemergencyhospitals.patchValue({ Address: list.Address });
    this.Addpreferedemergencyhospitals.get('LatLong')?.patchValue({
      Lat: list.LatLong.Lat,
    });
    this.Addpreferedemergencyhospitals.patchValue({
      ContactNumber: list.ContactNumber,
    });
    this.Addpreferedemergencyhospitals.get('LatLong')?.patchValue({
      Long: list.LatLong.Long,
    });
    this.Addpreferedemergencyhospitals.patchValue({ Name: list.Name });
  }
  updateandsubmittingnewnearestneighbours(i: any, list: any) {
    this.neighbourindex = i;
    this.createneighbour = false;
    this.Addneighboursdetails.patchValue({ Address: list.Address });
    this.Addneighboursdetails.patchValue({ ContactNumber: list.ContactNumber });
    this.Addneighboursdetails.patchValue({
      AlternativeContactNumber: list.AlternativeContactNumber,
    });
    this.Addneighboursdetails.patchValue({ Name: list.Name });
    this.Addneighboursdetails.get('LatLong')?.patchValue({
      Lat: list.LatLong.Lat,
    });
    this.Addneighboursdetails.get('LatLong')?.patchValue({
      Long: list.LatLong.Long,
    });
  }
  updateandsubmittingnewnearestFamilyPhysician(list: any) {
    this.createpreferedfamily = false;
    this.Addpreferedfamilydetails.patchValue({
      ContactNumber: list.ContactNumber,
    });
    this.Addpreferedfamilydetails.patchValue({ ClinicName: list.ClinicName });
    this.Addpreferedfamilydetails.patchValue({ Name: list.Name });
  }
  updateandsubmittingnewnearestFirestation(i: any, list: any) {
    this.nearestfireindex = i;
    this.createfirestations = false;
    this.Addfirestationdetails.patchValue({
      ContactNumber: list.ContactNumber,
    });
    this.Addfirestationdetails.patchValue({
      AlternateContactNumber: list.AlternateContactNumber,
    });
    this.Addfirestationdetails.patchValue({ Address: list.Address });
    this.Addfirestationdetails.get('LatLong')?.patchValue({
      Lat: list.LatLong.Lat,
    });
    this.Addfirestationdetails.get('LatLong')?.patchValue({
      Long: list.LatLong.Long,
    });
    this.Addfirestationdetails.patchValue({ Name: list.Name });
  }
  updateandsubmittingnewnearestemergencylocaldetials(i: any, list: any) {
    this.localemergencyindex = i;
    this.createemergencylocalcontacts = false;
    this.AddEmergencylocalcontactdetails.patchValue({
      ContactNumber: list.ContactNumber,
    });
    this.AddEmergencylocalcontactdetails.patchValue({ Name: list.Name });
  }
  updateandsubmittingnewnearestpharmacyoutlet(i: any, list: any) {
    this.pharmacyoutletindex = i;
    this.createpharmacyoutlet = false;
    this.Addnearestpharmacyoutletdetails.patchValue({
      ContactNumber: list.ContactNumber,
    });
    this.Addnearestpharmacyoutletdetails.patchValue({ Name: list.Name });
    this.Addnearestpharmacyoutletdetails.patchValue({ Address: list.Address });
    this.Addnearestpharmacyoutletdetails.get('LatLong')?.patchValue({
      Lat: list.LatLong.Lat,
    });
    this.Addnearestpharmacyoutletdetails.get('LatLong')?.patchValue({
      Long: list.LatLong.Long,
    });
    this.Addnearestpharmacyoutletdetails.patchValue({
      IsAvailable24Hours: list.IsAvailable24Hours,
    });
  }
  updateandsubmittingnewnearestsposorcontact(i: any, list: any) {
    this.sponsorcontactindex = i;
    this.createsponsorcontact = false;
    this.Addsponsorcontactdetails.patchValue({
      ContactNumber: list.ContactNumber,
    });
    this.Addsponsorcontactdetails.patchValue({ Name: list.Name });
  }
  updateLastMedicalDetails() {
    // this.medicalindex = i;
    this.createMedicalDetails = false;
    this.medicalDetailsObject = this.benMedicalConditions[0]
    this.AddMedicalDetails.patchValue({ Diseases: this.medicalDetailsObject.Diseases });
    this.AddMedicalDetails.patchValue({
      MobilityofUser: this.medicalDetailsObject.MobilityofUser,
    });
    this.AddMedicalDetails.patchValue({
      Height: this.medicalDetailsObject.Height,
    });
    this.AddMedicalDetails.patchValue({
      Weight: this.medicalDetailsObject.Weight,
    });

  }
  UpdateLastPropertyDetails(i: any, list: any) {
    this.propertyindex = i;
    this.createpropertydetails = false;
    this.AddPropertyDetails.patchValue({ Property: list.Property });
    this.AddPropertyDetails.patchValue({ Floor: list.Floor });
    this.AddPropertyDetails.patchValue({ Lift: list.Lift });
    this.AddPropertyDetails.patchValue({ LiftSize: list.LiftSize });
  }
  updatingentireform(formdata: any) {
    this.spinner.show();
    if (this.PreferredEmergencyHospitals) {
      this.Emergencyplan.PreferredEmergencyHospitals =
        this.PreferredEmergencyHospitals;
    }
    if (this.NearestSuperSpecialityHospitals) {
      this.Emergencyplan.NearestSuperSpecialityHospitals =
        this.NearestSuperSpecialityHospitals;
    }
    if (this.NearestAmbulanceServices) {
      this.Emergencyplan.NearestAmbulanceServices =
        this.NearestAmbulanceServices;
    }
    if (this.PoliceStations) {
      this.Emergencyplan.PoliceStations = this.PoliceStations;
    }
    if (this.Neighbours) {
      this.Emergencyplan.Neighbours = this.Neighbours;
    }
    if (this.PoliceStations) {
      this.Emergencyplan.PreferedFamilyPhysician = this.PreferedFamilyPhysician;
    }
    if (this.FireStations) {
      this.Emergencyplan.FireStations = this.FireStations;
    }
    if (this.EmergencyLocalContactDetails) {
      this.Emergencyplan.EmergencyLocalContactDetails =
        this.EmergencyLocalContactDetails;
    }
    if (this.NearestPharmacyOutlet) {
      this.Emergencyplan.NearestPharmacyOutlet = this.NearestPharmacyOutlet;
    }
    if (this.SponsorContactDetails) {
      this.Emergencyplan.SponsorContactDetails = this.SponsorContactDetails;
    }
    if (this.propertyDetailsArray.length > 1) {
      this.Emergencyplan.BenProperty = this.propertyDetailsArray[0];
    }
    if (formdata.value.Name) {
      this.Emergencyplan.Name = formdata.value.Name;
    }
    if (formdata.value.Age) {
      this.Emergencyplan.Age = formdata.value.Age;
    }
    if (formdata.value.BloodGroup) {
      this.Emergencyplan.BloodGroup = formdata.value.BloodGroup;
    }
    if (formdata.value.Gender) {
      this.Emergencyplan.Gender = formdata.value.Gender;
    }
    if (formdata.value.Address) {
      this.Emergencyplan.Address = formdata.value.Address;
    }
    if (this.CustRecID) {
      this.Emergencyplan.CustRecID = this.CustRecID;
    }
    if (this.CustID) {
      this.Emergencyplan.CustID = this.CustID;
    }


    this.Emergencyplan.AmbulanceType = this.AmbulanceType[0]
    this.Emergencyplan.BenMedicalCondition = this.benMedicalConditions[0];
    this.Emergencyplan
    this.customerpress = true;
    if (this.found == true) {
      this.userservice.updateemergencyhealthplan(this.Emergencyplan).subscribe(
        (details) => {
          this.spinner.hide();
          if (details.code == 'U001') {
            alert(details.data);
            this.viewemergencyhealthplan();
            this.router.navigate(['Dashboard/Task/MyTask']);
          } else {
            alert(details.data);
          }
        },
        (error) => {
          this.spinner.hide();

          alert(error.error.data);

          // this.router.navigate(["Dashboard/Task/MyTask"])
        },
      );
    } else {
      this.userservice.createemergencyplan(this.Emergencyplan).subscribe(
        (details) => {
          this.spinner.hide();
          if (details.code == 'U001') {
            alert(details.data);
            this.viewemergencyhealthplan();
          } else {
            alert(details.data);
          }
        },
        (error) => {
          this.spinner.hide();

          alert(error.error.data);
        },
      );
    }

    this.customerpress = false;

    this.submitcustomeremergencyprofileformbuilder();
  }

  viewemergencyhealthplan() {
    this.spinner.show();
    this.userservice.viewemergencyplan({ CustRecID: this.CustRecID }).subscribe(
      (details) => {
        this.spinner.hide();
        if (details.code == 'S001') {
          //  alert(details.data)
          if (details.data && details.data.length > 0) {
            for (let dt in details.data) {
              if (details.data[dt].CustID == this.CustID) {
                this.Emergencyplan = details.data[dt];
                this.benMedicalConditions.push(this.Emergencyplan.BenMedicalCondition)
                this.found = true;

                this.AmbulanceType.push(this.Emergencyplan.AmbulanceType)
                this.PreferredEmergencyHospitals =
                  this.Emergencyplan.PreferredEmergencyHospitals;
                this.NearestSuperSpecialityHospitals =
                  this.Emergencyplan.NearestSuperSpecialityHospitals;
                this.NearestAmbulanceServices =
                  this.Emergencyplan.NearestAmbulanceServices;
                this.PoliceStations = this.Emergencyplan.PoliceStations;
                this.Neighbours = this.Emergencyplan.Neighbours;
                this.PreferedFamilyPhysician =
                  this.Emergencyplan.PreferedFamilyPhysician;
                this.FireStations = this.Emergencyplan.FireStations;
                this.EmergencyLocalContactDetails =
                  this.Emergencyplan.EmergencyLocalContactDetails;
                this.NearestPharmacyOutlet =
                  this.Emergencyplan.NearestPharmacyOutlet;
                this.SponsorContactDetails =
                  this.Emergencyplan.SponsorContactDetails;

                this.propertyDetailsArray.push(this.Emergencyplan.BenProperty);
                this.AddCustomerEmergencyProfileDetails.patchValue({
                  Name: details.data[dt].Name,
                });
                this.AddCustomerEmergencyProfileDetails.patchValue({
                  Age: details.data[dt].Age,
                });
                this.AddCustomerEmergencyProfileDetails.patchValue({
                  Address: details.data[dt].Address,
                });
                this.AddCustomerEmergencyProfileDetails.patchValue({
                  Gender: details.data[dt].Gender,
                });
                this.AddCustomerEmergencyProfileDetails.patchValue({
                  BloodGroup: details.data[dt].BloodGroup,
                });
              }
            }
          }
        } else {
          alert(details.data);
        }
      },
      (error) => {
        this.spinner.hide();
        //alert(error.error.data)
        // this.router.navigate(["Dashboard/Task/MyTask"])
      },
    );
  }
  addingdetails(type: string) {
    this.type = type;
  }
  refreshform() {
    this.emergencypress = false;

    this.submittingnewprefferedhospitalformbuilder();
  }
  viewPropertyData: any;
  ViewPropertyTypes() {
    this.userservice.viewPropertyType().subscribe(
      (response: any) => {
        this.viewPropertyData = response.data;
        if (response.code == 'S001') {
          // alert(response.data)
        } else if (response.code == 'S002') {
          alert(response.data);
        } else {
          alert(response.data);
        }
      },
      (error) => {
        alert(error.error.data);
      },
    );
  }
  liftSizes: any;
  viewLiftSizes() {
    this.userservice.viewLiftSizes().subscribe(
      (response: any) => {
        this.liftSizes = response.data;
        if (response.code == 'S001') {
          // alert(response.data)
        } else if (response.code == 'S002') {
          alert(response.data);
        } else {
          alert(response.data);
        }
      },
      (error) => {
        alert(error.error.data);
      },
    );
  }

  viewLyfeDiseases() {
    this.userservice.lifeStyleDiseases().subscribe(
      (response: any) => {
        this.options = response.data;
        if (response.code == 'S001') {
          // alert(response.data)
        } else if (response.code == 'S002') {
          alert(response.data);
        } else {
          alert(response.data);
        }
      },
      (error) => {
        alert(error.error.data);
      },
    );
  }

  getAddressCoordinates() {
    this.geocodingService
      .getLatLngFromAddress(this.Addpreferedemergencyhospitals.value.Address)
      .subscribe((data: any) => {
        if (data.results.length > 0) {
          this.Addpreferedemergencyhospitals.value.LatLong.Lat =
            data.results[0].geometry.location.lat;
          this.Addpreferedemergencyhospitals.value.LatLong.Long =
            data.results[0].geometry.location.lng;
          this.Addpreferedemergencyhospitals.get('LatLong')?.patchValue({
            Long: data.results[0].geometry.location.lng,
          });
          this.Addpreferedemergencyhospitals.get('LatLong')?.patchValue({
            Lat: data.results[0].geometry.location.lat,
          });

          this.showCoordinates = true; // Set the flag to true
        } else {
          console.error('Invalid address');
        }
      });
  }

  selectAddress(address: any) {
    this.Addpreferedemergencyhospitals.value.Address = address.description;
    this.suggestions = [];
  }
  getAddressSuggestions(list: any) {
    this.Addpreferedemergencyhospitals.get('LatLong')?.patchValue({
      Long: list.LatLong.Long,
    });
    this.Addpreferedemergencyhospitals.get('LatLong')?.patchValue({
      Lat: list.LatLong.Lat,
    });

    if (this.Addpreferedemergencyhospitals.value.Address.length > 2) {
      // Minimum characters before making a request
      const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${this.Addpreferedemergencyhospitals.value.Address}&key=${this.apiKey}`;
      this.http.get(apiUrl).subscribe((data: any) => {
        this.suggestions = data.predictions;
      });
    } else {
      this.suggestions = [];
    }
  }

  getAddressCoordinates1() {
    this.geocodingService
      .getLatLngFromAddress(this.Addneighboursdetails.value.Address)
      .subscribe((data: any) => {
        if (data.results.length > 0) {
          this.Addneighboursdetails.value.LatLong.Lat =
            data.results[0].geometry.location.lat;
          this.Addneighboursdetails.value.LatLong.Long =
            data.results[0].geometry.location.lng;
          this.Addneighboursdetails.get('LatLong')?.patchValue({
            Long: data.results[0].geometry.location.lng,
          });
          this.Addneighboursdetails.get('LatLong')?.patchValue({
            Lat: data.results[0].geometry.location.lat,
          });

          this.showCoordinates = true; // Set the flag to true
        } else {
          console.error('Invalid address');
        }
      });
  }

  getAddressCoordinates3() {
    this.geocodingService
      .getLatLngFromAddress(this.Addfirestationdetails.value.Address)
      .subscribe((data: any) => {
        if (data.results.length > 0) {
          this.Addfirestationdetails.value.LatLong.Lat =
            data.results[0].geometry.location.lat;
          this.Addfirestationdetails.value.LatLong.Long =
            data.results[0].geometry.location.lng;
          this.Addfirestationdetails.get('LatLong')?.patchValue({
            Long: data.results[0].geometry.location.lng,
          });
          this.Addfirestationdetails.get('LatLong')?.patchValue({
            Lat: data.results[0].geometry.location.lat,
          });

          this.showCoordinates = true; // Set the flag to true
        } else {
          console.error('Invalid address');
        }
      });
  }

  getAddressCoordinates5() {
    this.geocodingService
      .getLatLngFromAddress(this.Addnearestpharmacyoutletdetails.value.Address)
      .subscribe((data: any) => {
        if (data.results.length > 0) {
          this.Addnearestpharmacyoutletdetails.value.LatLong.Lat =
            data.results[0].geometry.location.lat;
          this.Addnearestpharmacyoutletdetails.value.LatLong.Long =
            data.results[0].geometry.location.lng;
          this.Addnearestpharmacyoutletdetails.get('LatLong')?.patchValue({
            Long: data.results[0].geometry.location.lng,
          });
          this.Addnearestpharmacyoutletdetails.get('LatLong')?.patchValue({
            Lat: data.results[0].geometry.location.lat,
          });

          this.showCoordinates = true; // Set the flag to true
        } else {
          console.error('Invalid address');
        }
      });
  }

  //ambulance tyoe details
  onSelectIsAmbulanceRequired(event: any) {
    this.showDropDown = event.target.checked
  }

  viewAllAmbulances() {
    this.userservice.viewAllAmbulances().subscribe(
      (response: any) => {
        this.options = response.data;
        if (response.code == 'S001') {
          this.ambulanceTypeDetails = response.data
        }
      },
      (error) => {
        alert(error.error.data);
      },
    );
  }
  submitAmbulanceTypeDetails() {
    this.ambulanceTypeFlag = true
    if (this.AmbulanceTypeDetails.status == "INVALID") {
      return
    }
    if (this.AmbulanceType.length > 0) {
      this.AmbulanceType[0].AmbulanceType = this.AmbulanceTypeDetails.value.AmbulanceType
      this.AmbulanceType[0].IsParamedicRequired = this.AmbulanceTypeDetails.value.IsParamedicRequired
    } else {
      this.AmbulanceType.push(this.AmbulanceTypeDetails.value)
    }
    this.ambulanceTypeclose.nativeElement.click();
  }
  updateAmbulanceTypeDetails() {
    if (this.AmbulanceType.length > 0) {
      this.ambulanceDetails = this.AmbulanceType[0]
    } else {
      this.ambulanceDetails = this.AmbulanceTypeDetails.value
    }
    this.AmbulanceTypeDetails.patchValue({ AmbulanceType: this.ambulanceDetails.AmbulanceType });
    this.AmbulanceTypeDetails.patchValue({
      IsParamedicRequired: this.ambulanceDetails.IsParamedicRequired.toString(),
    });

  }
}
