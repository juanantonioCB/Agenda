import { Component } from '@angular/core';
import { FirebaseDBService } from '../services/firebase-db.service';
import { Task } from '../model/Task';
import { UiComponent } from '../ui/ui.component';
import {  ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild(IonContent,{static: false}) ionContent: IonContent;

  tasks: Task[];
  perfiles: any[];
  perfilSeleccionado: any;
  time: number;
  horaActual: Date=new Date();
  bloqueado:boolean=false;
  bloqueoScroll:string='';
  constructor(private db: FirebaseDBService, private ui: UiComponent) {
  }


  async loadPerfil() {
    await this.ui.presentLoading();
    (await this.db.getTasks(this.perfilSeleccionado)).subscribe(res => {
      this.tasks = res;
    });
    await this.ui.hideLoading();

  }

  scroll(element:string){
    console.log(element);
    let e = document.getElementById(element);    
    e.scrollIntoView();
  
  }

  async ngOnInit() {
    (await this.db.getProfiles()).subscribe(res => {
      this.perfiles = res.collections;
    });
    this.setTiempo();
    setInterval(() => {
      this.setTiempo(); 
    }, 5000);

  }

  bloquear(){
    if(this.bloqueado){
      this.bloqueado=false;
      this.bloqueoScroll='';
    }else{
      this.bloqueado=true;
      this.bloqueoScroll='fixed';
    }
    console.log(this.bloqueado);

  }

  setTiempo() {
    let hInicio: Date = new Date();
    hInicio.setHours(9);
    hInicio.setMinutes(30);
    this.time=((this.horaActual.getTime()-hInicio.getTime())/60000)/420;
  }


  edit(id: string) {
    console.log(this.perfilSeleccionado);
    console.log(this.perfiles);
    console.log(this.tasks);
  }

  async delete(id: string) {
    await this.ui.presentLoading();
    this.db.removeTask(id, this.perfilSeleccionado).then(async r => {
      await this.ui.presentToast('Tarea eliminada correctamente', 'success');
    }).catch(async err => {
      await this.ui.presentToast('Ha ocurrido un error al eliminar', 'danger');
    });
    await this.ui.hideLoading();
  }

}
