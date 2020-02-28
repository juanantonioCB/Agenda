import { Component, OnInit } from '@angular/core';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { Task } from '../model/Task';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../ui/popover/popover.component';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {

  task:Task;
  id:string;
  imageResponse: any;
  image:string='assets/no_image.png';
  taskForm: FormGroup;
  constructor(private imagePicker: ImagePicker, private formBuilder: FormBuilder,
    private popoverController: PopoverController) {
    this.taskForm=formBuilder.group({
      titulo: ["", Validators.required]
    });
   }

  ngOnInit() {
  }


  async createPopover(ev: any){
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  getImages() {
    let options: any;
    options = {
      width: 200,
      quality: 20,
      maximumImagesCount: 1,
      outputType: 1
    };
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.imageResponse = ('data:image/jpeg;base64,' + results[i]);
        console.log(this.imageResponse);
      }
    }, (err) => {
      alert(err);
    });
  }

  onSubmit() {
    // Process checkout data here
    console.warn(this.taskForm.value);


  }
}

