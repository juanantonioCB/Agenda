import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfigPageRoutingModule } from './config-routing.module';

import { ConfigPage } from './config.page';
import { Camera } from '@ionic-native/camera/ngx';
import { UiComponent } from '../ui/ui.component';


@NgModule({
  entryComponents:[],
  imports: [
    CommonModule,    FormsModule,
    IonicModule,
    ConfigPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ConfigPage],
  providers:[Camera,UiComponent]
})
export class ConfigPageModule {}
