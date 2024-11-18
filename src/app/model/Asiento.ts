export class Asiento {
    private idAsiento: string;
    private disponible: boolean;
    private numeroAsiento: string;
    private usuarioCompra: string;
    private idTicket: string;

    constructor(
        idAsiento: string,
        disponible: boolean,
        numeroAsiento: string,
        usuarioCompra: string,
        idTicket: string
    ) {
        this.idAsiento = idAsiento;
        this.disponible = disponible;
        this.numeroAsiento = numeroAsiento;
        this.usuarioCompra = usuarioCompra;
        this.idTicket = idTicket;
    }

    // Getters
    public getIdAsiento(): string {
        return this.idAsiento;
    }

    public isDisponible(): boolean {
        return this.disponible;
    }

    public getNumeroAsiento(): string {
        return this.numeroAsiento;
    }

    public getUsuarioCompra(): string {
        return this.usuarioCompra;
    }

    public getIdTicket(): string {
        return this.idTicket;
    }

    // Setters
    public setIdAsiento(idAsiento: string): void {
        this.idAsiento = idAsiento;
    }

    public setDisponible(disponible: boolean): void {
        this.disponible = disponible;
    }

    public setNumeroAsiento(numeroAsiento: string): void {
        this.numeroAsiento = numeroAsiento;
    }

    public setUsuarioCompra(usuarioCompra: string): void {
        this.usuarioCompra = usuarioCompra;
    }

    public setIdTicket(idTicket: string): void {
        this.idTicket = idTicket;
    }
}
