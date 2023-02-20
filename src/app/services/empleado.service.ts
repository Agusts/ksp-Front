import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EmpleadoForm } from '../interface/empleado-form.interface';
import { Empleado } from '../models/empleado.model';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  constructor(private http: HttpClient) {}

  crearEmpleado(formData: any) {
    return this.http.post(`${base_url}/empleado`, formData);
  }
  actualizarEmpleado(empleado: Empleado) {
    return this.http.put(`${base_url}/empleado/${empleado._id}`, empleado);
  }
  getEmpleados() {
    return this.http
      .get(`${base_url}/empleado`)
      .pipe(map((resp: any) => resp.empleados));
  }
  deleteEmpleado(id: string) {
    return this.http.delete(`${base_url}/empleado/${id}`);
  }

  obtenerEmpleadoID(id: string) {
    return this.http
      .get(`${base_url}/empleado/${id}`)
      .pipe(map((resp: any) => resp.empleado));
  }
  cambiarimagen(fileD: File, empleado: Empleado) {
    const formData = new FormData();
    formData.append('imagen', fileD, fileD.name);

    return this.http.post(
      `${base_url}/upload/empleados/${empleado._id}`,
      formData
    );
  }
}
