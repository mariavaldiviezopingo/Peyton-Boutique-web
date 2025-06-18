import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  signal,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Interfaz para las variantes del producto
export interface VarianteProducto {
  color: string;
  talla: string;
  stock: number;
}

@Component({
  selector: 'app-variante-producto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './variante-producto.component.html',
  styleUrl: './variante-producto.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VarianteProductoComponent implements OnInit {
  // Referencias a los inputs de archivos
  @ViewChild('fileInput0') fileInput0!: ElementRef<HTMLInputElement>;
  @ViewChild('fileInput1') fileInput1!: ElementRef<HTMLInputElement>;
  @ViewChild('fileInput2') fileInput2!: ElementRef<HTMLInputElement>;

  // Arrays reactivos para variantes e imágenes
  variantes = signal<VarianteProducto[]>([]);
  imagenes = signal<(string | null)[]>([null, null, null]);

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Inicializar con una variante vacía
    this.agregarVariante();
  }

  // ========== MÉTODOS PARA MANEJO DE VARIANTES ==========

  /**
   * Agrega una nueva variante vacía a la tabla
   */
  agregarVariante(): void {
    const nuevaVariante: VarianteProducto = {
      color: '',
      talla: '',
      stock: 0,
    };

    this.variantes.update((variantes) => [...variantes, nuevaVariante]);
    this.cdr.detectChanges();
  }

  /**
   * Elimina una variante de la tabla
   * @param index Índice de la variante a eliminar
   */
  eliminarVariante(index: number): void {
    if (this.variantes().length > 1) {
      this.variantes.update((variantes) =>
        variantes.filter((_, i) => i !== index)
      );
    } else {
      // Si es la última variante, la resetea en lugar de eliminarla
      this.variantes.update((variantes) => [
        {
          color: '',
          talla: '',
          stock: 0,
        },
      ]);
    }
    this.cdr.detectChanges();
  }

  /**
   * Obtiene todas las variantes válidas (con datos completos)
   * @returns Array de variantes válidas
   */
  getVariantesValidas(): VarianteProducto[] {
    return this.variantes().filter(
      (variante) =>
        variante.color.trim() !== '' &&
        variante.talla !== '' &&
        variante.stock >= 0
    );
  }

  // ========== MÉTODOS PARA MANEJO DE IMÁGENES ==========

  /**
   * Maneja el evento dragover para el drag and drop
   * @param event Evento de dragover
   * @param index Índice del área de imagen
   */
  onDragOver(event: DragEvent, index: number): void {
    event.preventDefault();
    event.stopPropagation();

    const target = event.currentTarget as HTMLElement;
    target.classList.add('dragover');
  }

  /**
   * Maneja el evento dragleave para el drag and drop
   * @param event Evento de dragleave
   * @param index Índice del área de imagen
   */
  onDragLeave(event: DragEvent, index: number): void {
    event.preventDefault();
    event.stopPropagation();

    const target = event.currentTarget as HTMLElement;
    target.classList.remove('dragover');
  }

  /**
   * Maneja el evento drop para el drag and drop
   * @param event Evento de drop
   * @param index Índice del área de imagen
   */
  onFileDrop(event: DragEvent, index: number): void {
    event.preventDefault();
    event.stopPropagation();

    const target = event.currentTarget as HTMLElement;
    target.classList.remove('dragover');

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.processFile(files[0], index);
    }
  }

  /**
   * Activa el input de archivo para una imagen específica
   * @param index Índice del área de imagen
   */
  triggerFileInput(index: number): void {
    const fileInputs = [this.fileInput0, this.fileInput1, this.fileInput2];
    if (fileInputs[index]) {
      fileInputs[index].nativeElement.click();
    }
  }

  /**
   * Maneja la selección de archivo desde el input
   * @param event Evento de cambio del input
   * @param index Índice del área de imagen
   */
  onFileSelected(event: Event, index: number): void {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (files && files.length > 0) {
      this.processFile(files[0], index);
    }
  }

  /**
   * Procesa un archivo de imagen y genera la vista previa
   * @param file Archivo de imagen
   * @param index Índice del área de imagen
   */
  private processFile(file: File, index: number): void {
    // Validar que sea una imagen
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido.');
      return;
    }

    // Validar tamaño (máximo 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert('El archivo es demasiado grande. Máximo 5MB permitido.');
      return;
    }

    // Crear FileReader para generar vista previa
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      this.imagenes.update((imagenes) => {
        const newImagenes = [...imagenes];
        newImagenes[index] = result;
        return newImagenes;
      });
      this.cdr.detectChanges();
    };

    reader.readAsDataURL(file);
  }

  /**
   * Elimina una imagen de la vista previa
   * @param index Índice del área de imagen
   */
  removeImage(index: number): void {
    this.imagenes.update((imagenes) => {
      const newImagenes = [...imagenes];
      newImagenes[index] = null;
      return newImagenes;
    });

    // Limpiar el input de archivo correspondiente
    const fileInputs = [this.fileInput0, this.fileInput1, this.fileInput2];
    if (fileInputs[index]) {
      fileInputs[index].nativeElement.value = '';
    }

    this.cdr.detectChanges();
  }

  /**
   * Obtiene las imágenes válidas (no nulas)
   * @returns Array de URLs de imágenes válidas
   */
  getImagenesValidas(): string[] {
    return this.imagenes().filter((imagen) => imagen !== null) as string[];
  }

  // ========== MÉTODOS PARA VALIDACIÓN Y ENVÍO ==========

  /**
   * Valida que el formulario de variantes esté completo
   * @returns true si es válido, false en caso contrario
   */
  isFormularioValido(): boolean {
    const variantesValidas = this.getVariantesValidas();
    return variantesValidas.length > 0 && this.getImagenesValidas().length > 0;
  }

  /**
   * Obtiene los datos completos para enviar al backend
   * @returns Objeto con variantes e imágenes
   */
  getDatosFormulario() {
    return {
      variantes: this.getVariantesValidas(),
      imagenes: this.getImagenesValidas(),
    };
  }
}
