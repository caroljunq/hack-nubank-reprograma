import { Component, OnInit } from '@angular/core';
// import { Http, Response } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  teste: any;
  constructor(private camera: Camera) {

  }

  ngOnInit() {

  }

  options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
  }

  // takePicture(cep: string): Observable<Frete> {
  //       return this._http.get(this._Url)
  //           .map((response: Response) => <Frete>response.json())
  //           .do(data => console.log('All: ' + JSON.stringify(data)))
  //           .catch(this.handleError);
  //   }


    takePicture(){
      this.camera.getPicture(this.options).then((imageData) => {
       // imageData is either a base64 encoded string or a file URI
       // If it's base64 (DATA_URL):
       let base64Image = 'data:image/jpeg;base64,' + imageData;
       console.log("deuu bom");
      }, (err) => {
       // Handle error
       this.teste = err;
      });
    }


}
