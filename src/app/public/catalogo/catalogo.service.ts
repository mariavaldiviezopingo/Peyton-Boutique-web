import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environment/environment";

// Definir la estructura del producto, ajusta según los datos que tu API retorne
export interface VarianteProducto {
  id: number;
  talla: string;
  color: string;
  stock: number;
  imagen: string;
}

export interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  subcategoria: string;
  variantes: VarianteProducto[]; 
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

   // Obtener todos los productos
   getProducts(): Observable<Product[]> {
     return this.http.get<Product[]>(this.url);
   }

   // Obtener productos por categoría
   getProductsByCategory(category: string): Observable<Product[]> {
     const categoryUrl = `${this.url}/filtrar/categoria?categoria=${category}`;
     return this.http.get<Product[]>(categoryUrl);
   }

   // Obtener productos filtrados
   getFilteredProducts(filters: {
     categoria?: string | null;
     talla?: string;
     color?: string;
     precioMin?: number;
     precioMax?: number;
     subcategoria?: string;
   }): Observable<Product[]> {
     const params = new HttpParams({
       fromObject: {
         ...(filters.categoria && { categoria: filters.categoria }),
         ...(filters.talla && { talla: filters.talla }),
         ...(filters.color && { color: filters.color }),
         ...(filters.precioMin !== undefined && {
           precioMin: filters.precioMin.toString(),
         }),
         ...(filters.precioMax !== undefined && {
           precioMax: filters.precioMax.toString(),
         }),
         ...(filters.subcategoria && { subcategoria: filters.subcategoria }),
       },
     });

     return this.http.get<Product[]>(`${this.url}/filtrar`, { params });
   }

   // Obtener subcategorías de una categoría
   obtenerSubcategorias(categoria: string): Observable<string[]> {
     return this.http.get<string[]>(
       `${this.url}/subcategorias?categoria=${categoria}`
     );
   }

   // Obtener un producto por ID
   getProductById(id: number): Observable<Product> {
     return this.http.get<Product>(`${this.url}/${id}`);
   }
 }