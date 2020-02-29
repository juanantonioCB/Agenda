import { Component, OnInit } from '@angular/core';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { Task } from '../model/Task';
import { PopoverController, AlertController } from '@ionic/angular';
import { PopovercomponentPage } from '../ui/popovercomponent/popovercomponent.page';
import { UiComponent } from '../ui/ui.component';
import { FirebaseDBService } from '../services/firebase-db.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {

  task: Task;
  id: string;
  imageResponse: any;
  image: string = 'assets/no_image.png';
  taskForm: FormGroup;
  perfilSeleccionado: any;
  comprobarTiempoo: boolean = true;
  perfiles: string[];
  constructor(private imagePicker: ImagePicker, private formBuilder: FormBuilder,
    private popoverController: PopoverController,
    private camera: Camera,
    private ui: UiComponent,
    private alertController: AlertController,
    private db: FirebaseDBService) {
    this.taskForm = formBuilder.group({
      titulo: ["", Validators.required],
      horaComienzo: ['', Validators.required],
      horaFinalizacion: ['', Validators.required],
      perfil: ['', Validators.required]
    });
  }

  async ngOnInit() {
    (await this.db.getProfiles()).subscribe(res => {
      this.perfiles = res.collections;
    });
  }


  async createPopover(ev: any) {
    this.popoverController.create({
      component: PopovercomponentPage,
      showBackdrop: false
    }).then((popoverElement) => {
      popoverElement.onDidDismiss().then((d) => {
        if (d.data) {
          if (d.data === 'pictograma') {
            console.log('pictog');
            this.choosePhoto();
          }
          if (d.data === 'gallery') {
            this.getImages();
          }
        }
      })
      popoverElement.present();
    });
  }

  selectChanged(selectedColor) {
    if (selectedColor === 'Nuevo Usuario') {
      this.inputNuevoUsuario();
    }
  };


  async inputNuevoUsuario() {
    const inputAlert = await this.alertController.create({
      header: 'Enter your custom color:',
      inputs: [{ type: 'text', placeholder: 'type in' }],
      buttons: [{ text: 'Cancel' }, { text: 'Ok' }]
    });
    await inputAlert.present();

    await inputAlert.onDidDismiss().then((data) => {
      let customUsuario: string = data.data.values[0];
      if (customUsuario) {
        this.perfiles.push(customUsuario);
        this.perfilSeleccionado=customUsuario;
      }
    })

  };


  public choosePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.camera.getPicture(options).then(imageData => {
      this.image = 'data:image/jpeg;base64,' + imageData;
    })
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

  async crearTask() {
    await this.ui.presentLoading();
    const hc = new Date(this.taskForm.get('horaComienzo').value);
    const hf = new Date(this.taskForm.get('horaFinalizacion').value);

    let task: Task = {
      name: this.taskForm.get('titulo').value,
      horaComienzo: hc,
      horaFinalizacion: hf,
      image: this.image
    }

    this.task = task;

    let p: Date = new Date();
    p.setHours(10);
    p.setMinutes(30);

    this.db.addTask(this.task, this.perfilSeleccionado).then(async r => {
      await this.ui.presentToast('Tarea agregada correctamente', 'success');
      await this.ui.hideLoading();
    }).catch(async err => {
      await this.ui.presentToast(err, 'danger');
      await this.ui.hideLoading();
    });
  }
}


