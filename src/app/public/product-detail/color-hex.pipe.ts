import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colorHex',
  standalone: true
})
export class ColorHexPipe implements PipeTransform {
  private colorMap: { [key: string]: string } = {
    red: '#FF0000',
    rojo: '#FF0000',
    blue: '#0000FF',
    azul: '#0000FF',
    green: '#008000',
    verde: '#008000',
    black: '#000000',
    negro: '#000000',
    white: '#FFFFFF',
    blanco: '#FFFFFF',
    yellow: '#FFFF00',
    amarillo: '#FFFF00',
    orange: '#FFA500',
    naranja: '#FFA500',
    pink: '#FFC0CB',
    rosa: '#FFC0CB',
    purple: '#800080',
    morado: '#800080',
    gray: '#808080',
    grey: '#808080',
    gris: '#808080',
    brown: '#A52A2A',
    marron: '#A52A2A'
    // Agrega más si necesitas
  };

  transform(value: string): string {
    if (!value) return '#FFFFFF';
    if (/^#([0-9A-F]{3}){1,2}$/i.test(value.trim())) {
      return value;
    }
    const hex = this.colorMap[value.trim().toLowerCase()];
    return hex ? hex : '#FFFFFF';
  }
}