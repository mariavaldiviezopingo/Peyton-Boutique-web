import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Categoria {
  nombre: string;
  imagen: string;
  alt: string;
  gradiente: string;
}

@Component({
  selector: 'app-destacados',
  imports: [CommonModule],
  templateUrl: './destacados.component.html',
  styleUrl: './destacados.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DestacadosComponent {
  categorias: Categoria[] = [
    {
      nombre: 'Moda',
      imagen:
        'https://thumbs.dreamstime.com/b/casual-adecuado-para-la-vida-joven-linda-chica-con-estilo-de-ropa-calle-informal-aspecto-del-modelo-moda-y-comprar-mujeres-mujer-178115523.jpg',
      alt: 'Moda',
      gradiente: 'from-primary to-primary-dark',
    },
    {
      nombre: 'Navidad',
      imagen:
        'https://i.pinimg.com/736x/17/14/13/1714139c275b5824dc3dbcab9b5344cc.jpg',
      alt: 'campaña',
      gradiente: 'from-red-500 to-red-600',
    },
    {
      nombre: 'Escuela',
      imagen:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQovtkjkJutB5nsacgk6J4JVwcufYna315jYA&s',
      alt: 'escuela',
      gradiente: 'from-yellow-500 to-yellow-600',
    },
    {
      nombre: 'Hogar',
      imagen:
        'https://pibadesign.com/wp-content/uploads/2023/08/decoracion-sala.jpg',
      alt: 'Hogar',
      gradiente: 'from-purple-500 to-purple-600',
    },
  ];

  onCategoriaClick(categoria: string): void {
    console.log(`Navegando a categoría: ${categoria}`);
    //TODO: Aquí agregar la lógica de navegación o emisión de eventos
  }

  onVerMasClick(): void {
    console.log('Ver más categorías');
    //TODO: Aquí agregar la lógica para mostrar más categorías
  }

  trackByCategoria(index: number, categoria: Categoria): string {
    return categoria.nombre;
  }
}
