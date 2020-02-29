import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'compruebaFinalizacion'
})
export class CompruebaFinalizacionPipe implements PipeTransform {

  transform(value): string {
    let d:Date=new Date();
    if(value<d.getTime()){
      return 'completed';
    }else{
      return 'current';
    }
  }

}
