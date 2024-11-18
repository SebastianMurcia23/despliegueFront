import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-transferir-ticket',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './transferir-ticket.component.html',
  styleUrl: './transferir-ticket.component.css'
})
export class TransferirTicketComponent {
  transferirTicketForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.transferirTicketForm = this.formBuilder.group({
      identificacionDestinatario: ['', [Validators.required]],
      codigoTicket: ['', [Validators.required]],
    });
  }

  public transferirTicket() {
    if (this.transferirTicketForm.valid) {
      console.log('Formulario de Transferencia de Ticket:', this.transferirTicketForm.value);
      // Aquí puedes agregar la lógica para procesar la transferencia de ticket
    }
  }
}
