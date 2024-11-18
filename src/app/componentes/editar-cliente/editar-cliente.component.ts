import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-cliente',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editar-cliente.component.html',
  styleUrl: './editar-cliente.component.css'
})
export class EditarClienteComponent {
  editarClienteForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.editarClienteForm = this.formBuilder.group({
      identificacion: ['', [Validators.required]],
      nombreCompleto: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],  // Validación de teléfono de 10 dígitos
    });
  }

  public editarCliente() {
    if (this.editarClienteForm.valid) {
      console.log('Formulario de Edición de Cliente:', this.editarClienteForm.value);
      // Aquí puedes agregar la lógica para actualizar los datos del cliente
    }
  }
}