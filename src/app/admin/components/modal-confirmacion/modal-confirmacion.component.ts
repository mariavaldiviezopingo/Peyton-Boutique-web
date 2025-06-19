import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ModalConfig {
  titulo: string;
  mensaje: string;
  textoConfirmar?: string;
  textoCancelar?: string;
  tipo?: 'warning' | 'danger' | 'info' | 'success';
  icono?: string;
}

@Component({
  selector: 'app-modal-confirmacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-confirmacion.component.html',
  styleUrls: ['./modal-confirmacion.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalConfirmacionComponent {
  @Input() visible = signal(false);
  @Input() config = signal<ModalConfig>({
    titulo: 'Confirmar acción',
    mensaje: '¿Estás seguro de que deseas continuar?',
    textoConfirmar: 'Confirmar',
    textoCancelar: 'Cancelar',
    tipo: 'warning',
  });

  @Output() confirmar = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();
  @Output() cerrar = new EventEmitter<void>();

  /**
   * Maneja la confirmación de la acción
   */
  onConfirmar(): void {
    this.confirmar.emit();
    this.cerrarModal();
  }

  /**
   * Maneja la cancelación de la acción
   */
  onCancelar(): void {
    this.cancelar.emit();
    this.cerrarModal();
  }

  /**
   * Cierra el modal
   */
  cerrarModal(): void {
    this.visible.set(false);
    this.cerrar.emit();
  }

  /**
   * Maneja el clic en el overlay para cerrar el modal
   */
  onOverlayClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.cerrarModal();
    }
  }

  /**
   * Abre el modal con configuración específica
   */
  abrirModal(config: ModalConfig): void {
    this.config.set(config);
    this.visible.set(true);

    // Focus automático en el modal para accesibilidad
    setTimeout(() => {
      const modalElement = document.querySelector('[role="dialog"]') as HTMLElement;
      if (modalElement) {
        modalElement.focus();
      }
    }, 100);
  }

  /**
   * Maneja el enfoque del teclado para accesibilidad
   */
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.cerrarModal();
    }

    // Navegación con Tab dentro del modal
    if (event.key === 'Tab') {
      this.handleTabNavigation(event);
    }
  }

  /**
   * Maneja la navegación con Tab para mantener el foco dentro del modal
   */
  private handleTabNavigation(event: KeyboardEvent): void {
    const modal = event.currentTarget as HTMLElement;
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }

  /**
   * Obtiene las clases CSS para el icono según el tipo
   */
  getIconClasses(): string {
    const baseClasses = 'w-16 h-16 mx-auto mb-4 p-4 rounded-full shadow-2xl';

    switch (this.config().tipo) {
      case 'danger':
        return `${baseClasses} text-white bg-gradient-to-br from-red-500 via-red-600 to-red-700 shadow-red-500/40`;
      case 'warning':
        return `${baseClasses} text-white bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-500 shadow-yellow-500/40`;
      case 'info':
        return `${baseClasses} text-white bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 shadow-blue-500/40`;
      case 'success':
        return `${baseClasses} text-white bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 shadow-green-500/40`;
      default:
        return `${baseClasses} text-white bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-500 shadow-yellow-500/40`;
    }
  }

  /**
   * Obtiene las clases CSS para el fondo del icono
   */
  getIconBackgroundClasses(): string {
    switch (this.config().tipo) {
      case 'danger':
        return 'bg-gradient-to-br from-red-400 to-red-600';
      case 'warning':
        return 'bg-gradient-to-br from-amber-400 to-orange-600';
      case 'info':
        return 'bg-gradient-to-br from-blue-400 to-indigo-600';
      case 'success':
        return 'bg-gradient-to-br from-emerald-400 to-teal-600';
      default:
        return 'bg-gradient-to-br from-amber-400 to-orange-600';
    }
  }

  /**
   * Obtiene las clases CSS para el gradiente del header
   */
  getHeaderGradientClasses(): string {
    switch (this.config().tipo) {
      case 'danger':
        return 'from-red-500 via-red-400 to-red-600';
      case 'warning':
        return 'from-amber-500 via-yellow-400 to-orange-500';
      case 'info':
        return 'from-blue-500 via-blue-400 to-indigo-600';
      case 'success':
        return 'from-emerald-500 via-green-400 to-teal-600';
      default:
        return 'from-amber-500 via-yellow-400 to-orange-500';
    }
  }

  /**
   * Obtiene las clases CSS para el botón de confirmación según el tipo
   */
  getConfirmButtonClasses(): string {
    const baseClasses =
      'px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-4 relative overflow-hidden backdrop-blur-sm';

    switch (this.config().tipo) {
      case 'danger':
        return `${baseClasses} bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800 text-white focus:ring-red-300/50 border border-red-600/30 shadow-red-500/25`;
      case 'warning':
        return `${baseClasses} bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 hover:from-amber-600 hover:via-yellow-600 hover:to-orange-600 text-white focus:ring-yellow-300/50 border border-yellow-600/30 shadow-yellow-500/25`;
      case 'info':
        return `${baseClasses} bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 hover:from-blue-600 hover:via-blue-700 hover:to-indigo-700 text-white focus:ring-blue-300/50 border border-blue-600/30 shadow-blue-500/25`;
      case 'success':
        return `${baseClasses} bg-gradient-to-r from-emerald-500 via-green-500 to-teal-600 hover:from-emerald-600 hover:via-green-600 hover:to-teal-700 text-white focus:ring-green-300/50 border border-green-600/30 shadow-green-500/25`;
      default:
        return `${baseClasses} bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 hover:from-amber-600 hover:via-yellow-600 hover:to-orange-600 text-white focus:ring-yellow-300/50 border border-yellow-600/30 shadow-yellow-500/25`;
    }
  }

  /**
   * Obtiene el icono para el botón de confirmación
   */
  getConfirmButtonIcon(): string {
    switch (this.config().tipo) {
      case 'danger':
        return `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />`;
      case 'warning':
        return `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />`;
      case 'info':
        return `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />`;
      case 'success':
        return `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />`;
      default:
        return `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />`;
    }
  }

  /**
   * Obtiene el icono SVG según el tipo
   */
  getIconSvg(): string {
    switch (this.config().tipo) {
      case 'danger':
        return `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />`;
      case 'warning':
        return `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />`;
      case 'info':
        return `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />`;
      case 'success':
        return `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />`;
      default:
        return `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />`;
    }
  }

  /**
   * Obtiene el título descriptivo basado en el tipo de modal
   */
  getTipoDescriptivo(): string {
    switch (this.config().tipo) {
      case 'danger':
        return 'Modal de peligro';
      case 'warning':
        return 'Modal de advertencia';
      case 'info':
        return 'Modal informativo';
      case 'success':
        return 'Modal de éxito';
      default:
        return 'Modal de confirmación';
    }
  }
}
