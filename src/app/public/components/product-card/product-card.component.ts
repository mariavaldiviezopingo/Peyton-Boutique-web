import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({
    selector: 'app-product-card',
    imports: [NgOptimizedImage],
    templateUrl: './product-card.component.html',
    styleUrl: './product-card.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {}
