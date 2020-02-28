import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfigPageRoutingModule } from './config-routing.module';

import { ConfigPage } from './config.page';
import { PopoverComponent } from '../ui/popover/popover.component';

@NgModule({
  entryComponents:[],
  imports: [
    CommonModule,
    PopoverComponent,
    FormsModule,
    IonicModule,
    ConfigPageRoutingModule,
    ReactiveFormsModule,
    PopoverComponent
  ],
  declarations: [ConfigPage],
  providers:[]
})
export class ConfigPageModule {}
