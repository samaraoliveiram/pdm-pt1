import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Tab2Page } from "./tab2.page";
import { MovieFormComponent } from "../components/movie-form/movie-form.component";
import { CameraComponent } from "../components/camera/camera.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: "", component: Tab2Page }])
  ],
  declarations: [Tab2Page, MovieFormComponent, CameraComponent]
})
export class Tab2PageModule {}
