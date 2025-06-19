export interface IziPayConfig {
  config: {
    transactionId: string;
    action: 'pay';
    merchantCode: string;
    order: {
      orderNumber: string;
      currency: string;
      amount: string;
      processType: 'AT';
      merchantBuyerId: string;
      dateTimeTransaction: string;
    };
    billing: {
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
      street: string;
      city: string;
      state: string;
      country: string;
      postalCode: string;
      documentType: string;
      document: string;
    };
    render: {
      typeForm: string;
      redirectUrls?: {
        onSuccess: string;
        onError: string;
        onCancel: string;
      };
    };
  };
}

// Interfaz para los datos de autenticación
export interface IziPayAuthData {
  authorization: string;
  keyRSA: string;
  callbackResponse?: (response: any) => void;
}

// Interfaz para errores de Izipay
export interface IziPayError {
  Errors?: any;
  message: string;
  date?: string;
}
