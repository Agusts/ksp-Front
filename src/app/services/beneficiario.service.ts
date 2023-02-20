import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Beneficiario } from '../models/beneficiario.model';
import { Empleado } from '../models/empleado.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class BeneficiarioService {
  constructor(private http: HttpClient) {}

  crearBeneficiario(formData: any) {
    return this.http
      .post(`${base_url}/beneficiario`, formData)
      .pipe(map((resp: any) => resp.beneficiaro));
  }
  cargarBeneficiarioID(id: any) {
    return this.http
      .get(`${base_url}/beneficiario/${id}`)
      .pipe(map((resp: any) => resp.beneficiario));
  }
  actualizarBeneficiarioID(beneficiario: Beneficiario) {
    return this.http
      .put(`${base_url}/beneficiario/${beneficiario._id}`, beneficiario)
      .pipe(map((resp: any) => resp.beneficiario));
  }
}
