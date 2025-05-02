import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environment/environment";

// Definir la estructura del producto, ajusta según los datos que tu API retorne
export interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imageUrl: string;
  talla: string;
  color: string;
  categoria: string;
  subcategoria: string;
}
  
export interface Subcategoria {
  name: string;
  image: string;
}

  @Injectable({
    providedIn: 'root',
  })
  export class CatalogoService {
    private readonly url = environment.apiUrl + 'productos';

    constructor(private http: HttpClient) {}

    // Método para obtener los productos
    getProducts(): Observable<Product[]> {
      return this.http.get<Product[]>(this.url);
    }

    getProductsByCategory(category: string): Observable<Product[]> {
      const categoryUrl = `${this.url}/filtrar/categoria?categoria=${category}`;
      return this.http.get<Product[]>(categoryUrl);
    }

    getFilteredProducts(filters: {
      categoria?: string;
      talla?: string;
      color?: string;
      precioMin?: number;
      precioMax?: number;
      subcategoria?: string;
    }): Observable<Product[]> {
      const params = new URLSearchParams();

      if (filters.categoria) params.append('categoria', filters.categoria);
      if (filters.talla) params.append('talla', filters.talla);
      if (filters.color) params.append('color', filters.color);
      if (filters.precioMin !== undefined)
        params.append('precioMin', filters.precioMin.toString());
      if (filters.precioMax !== undefined)
        params.append('precioMax', filters.precioMax.toString());
      if (filters.subcategoria)
        params.append('subcategoria', filters.subcategoria);

      const queryString = params.toString();
      const urlWithParams = `${this.url}/filtrar?${queryString}`;

      return this.http.get<Product[]>(urlWithParams);
    }

    filtrarPorSubcategoria(subcategoria: string): Observable<Product[]> {
      const params = new HttpParams().set('subcategoria', subcategoria);
      return this.http.get<Product[]>(
        'http://localhost:8080/api/productos/filtrar',
        { params }
      );
    }

    // Obtener subcategorías de una categoría
    obtenerSubcategorias(categoria: string): Observable<string[]> {
      return this.http.get<string[]>(
        `${this.url}/subcategorias?categoria=${categoria}`
      );
    }
  }