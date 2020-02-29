import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { UiComponent } from '../ui/ui.component';
import { CompruebaFinalizacionPipe } from '../pipes/comprueba-finalizacion.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage,CompruebaFinalizacionPipe],
  providers:[UiComponent,]
})
export class HomePageModule {}
