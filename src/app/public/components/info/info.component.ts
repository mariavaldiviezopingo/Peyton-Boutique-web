import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-info',
    imports: [RouterModule],
    templateUrl: './info.component.html',
    styleUrl: './info.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoComponent {

}
