import { Injectable } from '@angular/core';

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

  getItems() {
    return this.items;
  }

  addItem(item: ItemCarrito) {
    // Si ya existe el mismo producto con mismo color y talla, suma la cantidad
    const existente = this.items.find(i =>
      i.id === item.id && i.color === item.color && i.talla === item.talla
    );
    if (existente) {
      existente.cantidad += item.cantidad;
    } else {
      this.items.push(item);
    }
  }

  clear() {
    this.items = [];
  }
}