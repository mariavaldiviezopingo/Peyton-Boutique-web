import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import { environment } from 'src/environment/environment';

export interface ItemCarrito {
  productoId: number;
  varianteId: number;
  nombre: string;
  precio: number;
  imagen: string;
  color: string;
  talla: string;
  cantidad: number;
}

export interface CarritoResponse {
  detalles: ItemCarrito[];
  total: number;
}

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);

  private items: ItemCarrito[] = [];
  private cantidadTotalSubject = new BehaviorSubject<number>(0);
  cantidadTotal$ = this.cantidadTotalSubject.asObservable();

  private totalCarrito = 0;

  constructor() {
    if (this.isBrowser()) {
      try {
        const data = localStorage.getItem('carrito');
        const parsed = data ? JSON.parse(data) : [];
        this.items = Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        console.error('Error parsing carrito:', e);
        this.items = [];
      }
      this.actualizarCantidadTotal();
    }
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
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
        i.productoId === item.productoId &&
        i.varianteId === item.varianteId &&
        i.color === item.color &&
        i.talla === item.talla
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

  removeItem(item: ItemCarrito): void {
    this.items = this.items.filter(
      (i) =>
        !(
          i.productoId === item.productoId &&
          i.varianteId === item.varianteId &&
          i.color === item.color &&
          i.talla === item.talla
        )
    );
    this.save();
    this.actualizarCantidadTotal();
  }

  private save(): void {
    if (this.isBrowser()) {
      localStorage.setItem('carrito', JSON.stringify(this.items));
    }
  }

  sincronizarCarritoAlIniciarSesion(): void {
    if (!this.isBrowser()) return;

    const carritoLocal = this.getItems();
    if (carritoLocal.length === 0) {
      this.obtenerCarritoServidor(); // Cargar del backend si no hay local
      return;
    }

    const payload = carritoLocal.map((item) => ({
      productoId: item.productoId,
      varianteId: item.varianteId,
      cantidad: item.cantidad,
    }));

    console.log('Enviando carrito a sincronizar:', payload);

    this.http
      .post(`${this.apiUrl}/carrito/merge`, payload)
      .pipe(
        tap(() => this.obtenerCarritoServidor()),
        catchError((error) => {
          console.error('Error al fusionar carrito:', error);
          return of(null);
        })
      )
      .subscribe();
  }

  obtenerCarritoServidor(): void {
    this.http
      .get<CarritoResponse>(`${this.apiUrl}/carrito/listar`)
      .pipe(
        tap((response) => {
          if (!Array.isArray(response.detalles)) {
            this.items = [];
            this.totalCarrito = 0;
          } else {
            this.items = response.detalles;
            this.totalCarrito = response.total;
          }
          this.save();
          this.actualizarCantidadTotal();
        }),
        catchError((error) => {
          console.error('Error al obtener carrito del servidor:', error);
          return of(null);
        })
      )
      .subscribe();
  }

  getTotalCarrito(): number {
    return this.totalCarrito;
  }

  agregarProductoAlServidor(item: ItemCarrito) {
    const payload = {
      productoId: item.productoId,
      varianteId: item.varianteId,
      cantidad: item.cantidad,
    };

    console.log('Agregando producto al servidor:', payload);

    return this.http.post(`${this.apiUrl}/carrito/agregar`, payload).pipe(
      tap(() => this.obtenerCarritoServidor()),
      catchError((error) => {
        console.error('Error al agregar producto al servidor:', error);
        return of(null);
      })
    );
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
