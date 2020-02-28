import { Component } from '@angular/core';
import { FirebaseDBService } from '../services/firebase-db.service';
import { Task } from '../model/Task';
import { UiComponent } from '../ui/ui.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  tasks: Task[];
  perfiles: any[];
  perfilSeleccionado:any;
  time;
  constructor(private db: FirebaseDBService, private ui: UiComponent) {
  }


  async loadPerfil(){
    await this.ui.presentLoading();
    (await this.db.getTasks(this.perfilSeleccionado)).subscribe(res => {
      this.tasks = res;
    });
    await this.ui.hideLoading();
  }

  async ngOnInit() {
   /* (await this.db.getTasks('user1')).subscribe(res => {
      console.log(res);
      this.tasks = res;
    });*/

    (await this.db.getProfiles()).subscribe(res => {
      console.log(res);
      this.perfiles=res
    })
    this.tiempo();

  }

  tiempo(){
    var d = new Date();
    let hI=930;
    let hF=1630;
    let h=1630-930;
    //if(d.getHours()>9&&d.getHours()<4){
      let horaActual=parseInt(d.getHours()+''+d.getMinutes());
      console.log(horaActual);
      //this.tiempo=h/horaActual;
      console.log(h/horaActual);
   // }
    
    
  }


  edit(id: string) {
    console.log(this.perfilSeleccionado);
   console.log(this.perfiles);
    //console.log(this.tasks);
  }

  async delete(id: string) {
    await this.ui.presentLoading();
    this.db.removeTask(id, 'user1').then(async r => {
      await this.ui.presentToast('Tarea eliminada correctamente', 'success');
    }).catch(async err => {
      await this.ui.presentToast('Ha ocurrido un error al eliminar', 'danger');
    });
    await this.ui.hideLoading();
  }

}
