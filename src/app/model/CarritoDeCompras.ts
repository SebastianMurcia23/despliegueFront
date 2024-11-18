import { ItemCompra } from "./ItemCompra";


export class CarritoDeCompras {
  private listItemsCompra: ItemCompra[];
  private cupon: string;
  private total: number;

  constructor() {
    this.listItemsCompra = [];
    this.cupon = '';
    this.total = 0;
  }

  getListItemsCompra(): ItemCompra[] {
    return this.listItemsCompra;
  }

  setListItemsCompra(listItemsCompra: ItemCompra[]): void {
    this.listItemsCompra = listItemsCompra;
  }

  getCupon(): string {
    return this.cupon;
  }

  setCupon(cupon: string): void {
    this.cupon = cupon;
  }

  getTotal(): number {
    return this.total;
  }

  setTotal(total: number): void {
    this.total = total;
  }
}
