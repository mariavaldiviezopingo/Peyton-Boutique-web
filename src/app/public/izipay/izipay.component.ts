import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { IzipayService } from './services/izipay.service';

// Declaración global para el SDK de Izipay
declare global {
  interface Window {
    Izipay: any;
  }
}

@Component({
  selector: 'app-izipay',
  imports: [CommonModule],
  templateUrl: './izipay.component.html',
  styleUrl: './izipay.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IzipayComponent implements OnInit {
  private readonly izipayService = inject(IzipayService); // Aquí deberías inyectar tu servicio IzipayService
  isLoading = false;
  error: string | null = null;
  window = window;
  showCredentialsWarning = true;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    console.log('🚀 Componente Izipay inicializado');
    console.log('🔍 SDK Izipay disponible:', !!window.Izipay);

    // Verificar si estamos usando credenciales reales
    this.checkCredentials();
  }
  private checkCredentials() {
    // En un entorno real, aquí verificarías si tienes credenciales válidas
    // Por ahora mostramos la advertencia siempre
    this.showCredentialsWarning = true;
  }

  // Generar un transactionId único
  private generateTransactionId(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `TXN_${timestamp}_${random}`;
  }

  // Generar un orderNumber único
  private generateOrderNumber(): string {
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .slice(0, 10)
      .toString();
    return `ORD_${random}`;
  }

  // Generar dateTimeTransaction en el formato correcto
  private generateDateTime(): string {
    return Date.now().toString() + '000';
  }
  async redirectToCheckout() {
    try {
      this.isLoading = true;
      this.error = null;
      this.cdr.detectChanges();

      console.log('🔄 Iniciando proceso de checkout...');

      // Verificar si el SDK está disponible
      if (!window.Izipay) {
        throw new Error('SDK de Izipay no está cargado');
      }

      // Generar datos dinámicos
      const transactionId = this.generateTransactionId();
      const orderNumber = this.generateOrderNumber();
      const dateTimeTransaction = this.generateDateTime();

      console.log('📊 Datos generados:');
      console.log('- Transaction ID:', transactionId);
      console.log('- Order Number:', orderNumber);
      console.log('- DateTime:', dateTimeTransaction);

      // Solicitar token al backend
      console.log('🔗 Solicitando token al backend...');
      const tokenRequest = {
        transactionId: transactionId,
        orderNumber: orderNumber,
        amount: '1.99',
        currency: 'PEN',
        customerEmail: 'jwick@izipay.pe',
      };

      const tokenResponse = await this.izipayService
        .generateSessionToken(tokenRequest)
        .toPromise();

      if (!tokenResponse?.success) {
        throw new Error(tokenResponse?.error || 'Error obteniendo token');
      }

      console.log('✅ Token obtenido del backend:', tokenResponse.token);

      // Configuración de Izipay usando enums del SDK
      const iziConfig = {
        config: {
          transactionId: transactionId,
          action: window.Izipay.enums.payActions.PAY,
          merchantCode: '4001834',
          order: {
            orderNumber: orderNumber,
            currency: window.Izipay.enums.currencies.PEN,
            amount: 199, // Monto en centavos
            processType: window.Izipay.enums.processType.AT,
            merchantBuyerId: 'BUYER_001',
            dateTimeTransaction: dateTimeTransaction,
          },
          billing: {
            firstName: 'Juan',
            lastName: 'Pérez',
            email: 'jwick@izipay.pe',
            phoneNumber: '987654321',
            street: 'Av. Ejemplo 123',
            city: 'Lima',
            state: 'Lima',
            country: window.Izipay.enums.countries.PE,
            postalCode: '15001',
            documentType: window.Izipay.enums.documentType.DNI,
            document: '12345678',
          },
          render: {
            typeForm: window.Izipay.enums.typeForm.POP_UP,
            container: '#izipay-container',
            showResult: true,
          },
        },
      };

      console.log('📋 Configuración enviada a Izipay:');
      console.log(JSON.stringify(iziConfig, null, 2));

      // Crear instancia de Izipay
      console.log('🏗️ Creando instancia de Izipay...');
      const checkout = new window.Izipay(iziConfig);

      // Configurar callback para manejar la respuesta
      checkout
        .LoadForm({
          authorization: tokenResponse.token!,
          keyRSA: tokenResponse.keyRSA!,
        })
        .then((response: any) => {
          console.log('✅ Respuesta del checkout:', response);
          if (response && response.data) {
            console.log('💳 Pago procesado:', response.data);
          }
        })
        .catch((error: any) => {
          console.error('❌ Error en el checkout:', error);
          throw error;
        });

      console.log('� Checkout iniciado correctamente');
    } catch (error: any) {
      console.error('❌ Error:', error);
      this.error = `Error: ${error.message || 'Error desconocido'}`;
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }
}
