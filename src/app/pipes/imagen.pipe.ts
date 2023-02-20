import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {
  transform(imagen: string, tipo: string): any {
    let url = base_url + '/img';

    if (!imagen) {
      return url + '/empleados/xxx';
    }

    if (imagen.indexOf('https') >= 0) {
      return imagen;
    }

    switch (tipo) {
      case 'empleado':
        url += '/empleados/' + imagen;
        break;

      case 'beneficiario':
        url += '/beneficiarios/' + imagen;

        break;

      default:
        console.log('Tipo de Imagen no existe');
        url += '/empleados/login.png';
    }

    return url;
  }
}
