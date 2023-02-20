import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Empleado } from 'src/app/models/empleado.model';
import { EmpleadoService } from 'src/app/services/empleado.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  public empleados: Empleado[] = [];
  public cargando: boolean = true;

  ngOnInit(): void {
    this.getEmpleados();
  }

  public formSubmitted = false;
  public oculto = '';
  public registerForm = this.fb.group({
    nombre: ['', Validators.required],
    puesto: ['web', Validators.required],
    salario: ['30000', Validators.required],
    fechaCont: ['2023-02-14', Validators.required],
    status: [false, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private empleadoServices: EmpleadoService,
    private element: ElementRef
  ) {}

  crearEmpleado() {
    this.formSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.empleadoServices.crearEmpleado(this.registerForm.value).subscribe(
      (resp) => {
        console.log(resp);
        this.getEmpleados();
        this.oculto = 'd-none';
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

  getEmpleados() {
    this.cargando = true;

    this.empleadoServices.getEmpleados().subscribe((empleados) => {
      this.cargando = false;
      this.empleados = empleados;
    });
  }

  borrarEmpleado(empleado: any) {
    Swal.fire({
      title: '¿Borrar empleado?',
      text: `Esta apunto de borrar a ${empleado.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo',
    }).then((result) => {
      if (result.value) {
        this.empleadoServices
          .deleteEmpleado(empleado._id)
          .subscribe((borrado) => {
            this.getEmpleados();
            Swal.fire(
              'Empleado borrado',
              `${empleado.nombre} fue eliminado correctamente`,
              'success'
            );
          });
      }
    });
  }

  campoNovalido(campo: string): boolean {
    if (this.registerForm.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }
  exportToExcel(): void {
    let element = document.getElementById('table-empleados');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, 'Archivo Excel.xlsx');
  }
}
