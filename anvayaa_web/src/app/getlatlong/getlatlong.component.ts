import { Component } from '@angular/core';
import { GeocodingService } from '../geocoding.service';
import { HttpClient } from '@angular/common/http';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-getlatlong',
  templateUrl: './getlatlong.component.html',
  styleUrls: ['./getlatlong.component.css'],
  providers: [GeocodingService]
})
export class GetlatlongComponent {
  latitude!: number;
  longitude!: number;
  address!: string;
  suggestions: any[] = [];
  apiKey:string='AIzaSyDXPAPzNI60GsR8IKB5lwPj-6FR43IPkMc';
  

  constructor(private geocodingService: GeocodingService,private http:HttpClient,private userservice: UsersService) {}

  getAddressCoordinates() {
    this.geocodingService.getLatLngFromAddress(this.address).subscribe((data: any) => {
      if (data.results.length > 0) {
        this.latitude = data.results[0].geometry.location.lat;
        this.longitude = data.results[0].geometry.location.lng;
      } else {
        console.error('Invalid address');
      }
      
    });
  }
  selectAddress(address: any) {     
    this.address = address.description;     
    this.suggestions = [];   
  }
  getAddressSuggestions() {    
     if (this.address.length > 2) { 
      // Minimum characters before making a request      
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${this.address}&key=${this.apiKey}`;              
    this.http.get(apiUrl).subscribe((data: any) => {          
      this.suggestions = data.predictions;        
     });    
     } else {       
      this.suggestions = [];     
    }   
  }
}
