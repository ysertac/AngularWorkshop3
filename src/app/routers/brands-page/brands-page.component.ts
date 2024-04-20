import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { BrandsListComponent } from '../../features/brands/components/brands-list/brands-list.component';
import { ModelsListComponent } from '../../features/models/components/models-list/models-list.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands-page',
  standalone: true,
  imports: [BrandsListComponent, ModelsListComponent, RouterLink],
  templateUrl: './brands-page.component.html',
  styleUrl: './brands-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandsPageComponent {
  selectedBrandId: number | null = null;
  isBrandChoosen: boolean = false;

  constructor(private change: ChangeDetectorRef) {}

  onBrandSelect(brandId: number | null) {
    this.selectedBrandId = brandId;
    this.isBrandChoosen = true;
  }
}
