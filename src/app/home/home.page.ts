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
  constructor(private db: FirebaseDBService, private ui:UiComponent) { }

  async ngOnInit() {
    (await this.db.getTasks('user1')).subscribe(res => {
      this.tasks = res;
    });
  }

  edit(id:string){
    console.log(id);
  }
  
  async delete(id:string){
    await this.ui.presentLoading();
    this.db.removeTask(id,'user1').then(async r=>{
      await this.ui.presentToast('Tarea eliminada correctamente','success');
    }).catch(async err=>{
      await this.ui.presentToast('Ha ocurrido un error al eliminar','danger');
    });
     await this.ui.hideLoading();
  }

}
