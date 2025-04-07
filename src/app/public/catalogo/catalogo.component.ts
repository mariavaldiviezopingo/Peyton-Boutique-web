import { ChangeDetectionStrategy, Component,ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Importa RouterModule
import { ProductDetailComponent } from '../product-detail/product-detail.component';
@Component({
    selector: 'app-catalogo',
    imports: [RouterModule, CommonModule],
    templateUrl: './catalogo.component.html',
    styleUrl: './catalogo.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class CatalogoComponent {
  products = [
    { name: 'Camisa Manga Larga', price: 100, imageUrl: 'https://uploads.tiendada.com/public/file-storage/im/product/95297b9a-21ad-4c3b-aa87-bab00b60bd90.rs6b0l-1727149172935' },
    { name: 'Pantalón', price: 120, imageUrl: 'https://rimage.ripley.com.pe/home.ripley/Attachment/MKP/4491/PMP20000449884/full_image-1.jpeg' },
    { name: 'Zapatos', price: 200, imageUrl: 'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaPE/126638798_01/w=1500,h=1500,fit=pad' },
    { name: 'Gorra', price: 80, imageUrl: 'https://sc04.alicdn.com/kf/Hd47a10a2a6754c4483c5e9171754c994i.jpg' },
    { name: 'Chaqueta', price: 250, imageUrl: 'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaPE/19899584_1/w=800,h=800,fit=pad' },
    { name: 'Vestido', price: 150, imageUrl: 'https://isatexhome.com/cdn/shop/files/834E9EDA-4ACD-40AD-9402-62975A36D98E.jpg?v=1698857065&width=2048' },
    { name: 'Bufanda', price: 60, imageUrl: 'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaPE/14820959_1/w=800,h=800,fit=pad' },
    { name: 'Guantes', price: 40, imageUrl: 'https://m.media-amazon.com/images/I/610Ep73wfDL.jpg' },
    { name: 'Cinturón', price: 90, imageUrl: 'path_to_image_9' },
    { name: 'Bolso', price: 300, imageUrl: 'path_to_image_10' },
    { name: 'Camisa Manga Larga', price: 100, imageUrl: 'path_to_image_1' },
    { name: 'Pantalón', price: 120, imageUrl: 'path_to_image_2' },
    { name: 'Zapatos', price: 200, imageUrl: 'path_to_image_3' },
    { name: 'Gorra', price: 80, imageUrl: 'path_to_image_4' },
    { name: 'Chaqueta', price: 250, imageUrl: 'path_to_image_5' },
    { name: 'Vestido', price: 150, imageUrl: 'path_to_image_6' },
    { name: 'Bufanda', price: 60, imageUrl: 'path_to_image_7' },
    { name: 'Guantes', price: 40, imageUrl: 'path_to_image_8' },
    { name: 'Cinturón', price: 90, imageUrl: 'path_to_image_9' },
    { name: 'Bolso', price: 300, imageUrl: 'path_to_image_10' }
  ];

  currentPage = 1;
  itemsPerPage = 8; // Número de productos por página

  get paginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.products.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.products.length / this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  @ViewChild('drawingCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private drawing = false;
  isCanvasVisible = false;

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.addCanvasEventListeners(canvas);
  }

  private addCanvasEventListeners(canvas: HTMLCanvasElement): void {
    // Iniciar dibujo
    canvas.addEventListener('mousedown', () => {
      this.drawing = true;
      this.ctx.beginPath();
    });

    // Dibujar
    canvas.addEventListener('mousemove', (event: MouseEvent) => {
      if (this.drawing) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
      }
    });

    // Finalizar dibujo
    canvas.addEventListener('mouseup', () => {
      this.drawing = false;
    });
  }

  toggleCanvasPanel(): void {
    this.isCanvasVisible = !this.isCanvasVisible;
  }

  clearCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  saveCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const link = document.createElement('a');
    link.download = 'canvas-image.png';
    link.href = canvas.toDataURL();
    link.click();
  }
}