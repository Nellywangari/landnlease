import { Component, NgZone, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import {} from 'google-maps';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public placeTitle: string;

  @ViewChild("search")
  public searchElementRef;

  constructor(public navCtrl: NavController, private view: ViewController, public navParams: NavParams, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {

    this.zoom = 4;
    this.latitude = 0;
    this.longitude = 0;
    this.placeTitle = "";

    //search form control
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();
  }

  ionViewDidLoad() {


    this.zoom = 4;
    this.latitude = 0;
    this.longitude = 0;

    //search form control
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load places autocomplete
    this.mapsAPILoader.load().then(() => {
      let nativeHomeInputBox = document.getElementById('txtHome').getElementsByTagName('input')[0];
      let autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox,{
        types: ["address"]
      });
      autocomplete.addListener("place_changed",()=>{
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if(place.geometry == undefined || place.geometry == null) {
            return;
          }

          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
          this.placeTitle = place.name;
        })
      })
    })
  
  }

  seeCoords() {
    const localeData = {
      name:this.placeTitle,
      lat:this.latitude,
      lng:this.longitude

    
    };

    this.view.dismiss(localeData);

    // console.log(localeData);
  }

  private setCurrentPosition() {
    if("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

}
