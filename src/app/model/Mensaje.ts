export class Mensaje {
  private codigo: string;
    private idAutor: string;
    private Titulo: string;
    private mensaje: string;
  
    constructor(codigo: string, idAutor: string, Titulo: string, mensaje: string) {
      this.codigo = codigo;
      this.idAutor = idAutor;
      this.Titulo = Titulo;
      this.mensaje = mensaje;
    }
  
    // Getters
    public getCodigo(): string {
      return this.codigo;
    }
  
    public getIdAutor(): string {
      return this.idAutor;
    }
  
    public getTitulo(): string {
      return this.Titulo;
    }
  
    public getMensaje(): string {
      return this.mensaje;
    }
  
    // Setters
    public setCodigo(codigo: string): void {
      this.codigo = codigo;
    }
  
    public setIdAutor(idAutor: string): void {
      this.idAutor = idAutor;
    }
  
    public setTitulo(Titulo: string): void {
      this.Titulo = Titulo;
    }
  
    public setMensaje(mensaje: string): void {
      this.mensaje = mensaje;
    }
  }