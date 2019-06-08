import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

@Component({
  selector: "app-camera",
  templateUrl: "./camera.component.html",
  styleUrls: ["./camera.component.scss"]
})
export class CameraComponent implements OnInit {
  @Output() photed = new EventEmitter<string>();
  @Input() foto = "";

  constructor(private camera: Camera) {}

  takePicture() {
    const options: CameraOptions = {
      targetWidth: 50,
      quality: 1,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then(
      imageData => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        let base64Image = "data:image/jpeg;base64," + imageData;
        this.foto = base64Image;
        this.photed.emit(base64Image);
      },
      err => {
        // Handle error
      }
    );
  }

  ngOnInit() {}
}
