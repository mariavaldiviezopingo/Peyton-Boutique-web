import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export interface ItemCarrito {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  color: string;
  talla: string;
  cantidad: number;
}

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private items: ItemCarrito[] = [];
  private cantidadTotalSubject = new BehaviorSubject<number>(0);
  cantidadTotal$ = this.cantidadTotalSubject.asObservable();

  constructor() {
    if (typeof window !== 'undefined' && localStorage.getItem('carrito')) {
      this.items = JSON.parse(localStorage.getItem('carrito')!);
      this.actualizarCantidadTotal();
    }
  }

  private actualizarCantidadTotal(): void {
    const total = this.items.reduce((acc, item) => acc + item.cantidad, 0);
    this.cantidadTotalSubject.next(total);
  }

  getItems(): ItemCarrito[] {
    return this.items;
  }

  addItem(item: ItemCarrito): void {
    const existente = this.items.find(
      (i) =>
        i.id === item.id && i.color === item.color && i.talla === item.talla
    );
    if (existente) {
      existente.cantidad += item.cantidad;
    } else {
      this.items.push(item);
    }
    this.save();
    this.actualizarCantidadTotal();
  }

  clear(): void {
    this.items = [];
    this.save();
    this.actualizarCantidadTotal();
  }

  private save(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('carrito', JSON.stringify(this.items));
    }
  }

  removeItem(item: ItemCarrito): void {
    this.items = this.items.filter(
      (i) =>
        !(i.id === item.id && i.color === item.color && i.talla === item.talla)
    );
    this.save();
    this.actualizarCantidadTotal();
  }
  // getCantidadTotal(): number {
  //   return this.cantidadTotalSubject.getValue();
  // }
  // getItemById(id: number): ItemCarrito | undefined {
  //   return this.items.find(item => item.id === id);
  // }
  // getItemByIdAndColorAndTalla(id: number, color: string, talla: string): ItemCarrito | undefined {
  //   return this.items.find(item => item.id === id && item.color === color && item.talla === talla);
  // }
  // getCantidadById(id: number): number {
  //   const item = this.getItemById(id);
  //   return item ? item.cantidad : 0;
  // }
  // getCantidadByIdAndColorAndTalla(id: number, color: string, talla: string): number {
  //   const item = this.getItemByIdAndColorAndTalla(id, color, talla);
  //   return item ? item.cantidad : 0;
  // }
  // getTotalPrice(): number {
  //   return this.items.reduce((total, item) => total + item.precio * item.cantidad, 0);
  // }
  // getItemCount(): number {
  //   return this.items.length;
  // }
}