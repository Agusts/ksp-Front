export class Empleado {
  constructor(
    public nombre: string,
    public puesto: string,
    public salario: string,
    public fechaCont: string,
    public status: boolean,
    public foto: string,
    public beneficiario?: string,
    public _id?: string
  ) {}
}
