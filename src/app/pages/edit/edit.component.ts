import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Beneficiario } from 'src/app/models/beneficiario.model';
import { Empleado } from 'src/app/models/empleado.model';
import { BeneficiarioService } from 'src/app/services/beneficiario.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass'],
})
export class EditComponent implements OnInit {
  public empleadoForm!: FormGroup;
  public beneficiarioForm!: FormGroup;
  public empleadoSelect!: Empleado;
  public beneficiarioSelect!: Beneficiario;
  public idEmpleado = '';

  public imagenSubir!: File;
  public imagenTemp: any;

  constructor(
    private fb: FormBuilder,
    private empleadoServices: EmpleadoService,
    private beneficiarioServices: BeneficiarioService,
    private activedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.empleadoForm = this.fb.group({
      nombre: ['', Validators.required],
      puesto: ['', Validators.required],
      salario: ['', Validators.required],
      fechaCont: ['', Validators.required],
      status: [false, Validators.required],
    });
    this.beneficiarioForm = this.fb.group({
      nombre: ['', Validators.required],
      parentesco: ['', Validators.required],
      fechaN: ['', Validators.required],
      sexo: ['', Validators.required],
    });
    this.activedRoute.params.subscribe(({ id }) => {
      this.obtenerEmpleadoByID(id);
      this.idEmpleado = id;
    });
  }
  obtenerEmpleadoByID(id: string) {
    this.empleadoServices.obtenerEmpleadoID(id).subscribe((empleado) => {
      const { nombre, puesto, salario, fechaCont, status, beneficiario } =
        empleado;
      this.empleadoSelect = empleado;
      console.log(this.empleadoSelect);
      this.empleadoForm.setValue({
        nombre,
        puesto,
        salario,
        fechaCont,
        status,
      });
      if (beneficiario) this.obtenerBeneficiarioID(beneficiario);
    });
  }
  actualizarEmpleadoID() {
    const data = {
      ...this.empleadoForm.value,
      _id: this.empleadoSelect._id,
      beneficiario: this.beneficiarioSelect?._id,
    };
    this.empleadoServices.actualizarEmpleado(data).subscribe(
      (resp) => {
        console.log(resp);
      },
      (err) => {
        console.log(err);

        Swal.fire(
          err.error.mensaje,
          err.error.errors.errors.nombre.message,
          'error'
        );
      }
    );
  }
  obtenerBeneficiarioID(id: string) {
    this.beneficiarioServices
      .cargarBeneficiarioID(id)
      .subscribe((beneficiario) => {
        const { nombre, parentesco, fechaN, sexo } = beneficiario;
        this.beneficiarioSelect = beneficiario;
        this.beneficiarioForm.setValue({
          nombre,
          parentesco,
          fechaN,
          sexo,
        });
      });
  }

  crearBeneficiairo() {
    if (this.beneficiarioSelect) {
      const data = {
        ...this.beneficiarioForm.value,
        _id: this.beneficiarioSelect._id,
      };
      this.beneficiarioServices.actualizarBeneficiarioID(data).subscribe(
        (resp) => {
          console.log(resp);
        },
        (err) => {
          console.log(err);

          Swal.fire(
            err.error.mensaje,
            err.error.errors.errors.nombre.message,
            'error'
          );
        }
      );
    } else {
      this.beneficiarioServices
        .crearBeneficiario(this.beneficiarioForm.value)
        .subscribe(
          (resp) => {
            this.empleadoSelect.beneficiario = resp;
            console.log(this.empleadoSelect);

            this.empleadoServices
              .actualizarEmpleado(this.empleadoSelect)
              .subscribe((resp) => {
                console.log(resp);
              });
          },
          (err) => {
            console.log(err);

            Swal.fire(
              err.error.mensaje,
              err.error.errors.errors.nombre.message,
              'error'
            );
          }
        );
    }
  }
  cambiarImagen() {
    this.empleadoServices
      .cambiarimagen(this.imagenSubir, this.empleadoSelect)
      .subscribe((resp: any) => {
        console.log(resp);
        this.obtenerEmpleadoByID(resp.empleado._id);
        this.imagenTemp = null;
      });
  }
  seleccioImagen(archivo: any) {
    console.log(archivo);

    if (!archivo.target.files[0]) {
      return;
    }

    if (archivo.target.files[0].type.indexOf('image') < 0) {
      Swal.fire(
        'Solo Imagenes',
        'El Archivo seleccionado no es una Imagen',
        'error'
      );

      return;
    }

    this.imagenSubir = archivo.target.files[0];

    let reader = new FileReader();
    let urlImageTemp = reader.readAsDataURL(archivo.target.files[0]);

    reader.onloadend = () => (this.imagenTemp = reader.result);
  }
}
