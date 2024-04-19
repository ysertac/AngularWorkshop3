import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { BrandsListItemDto } from '../../models/brands-list-item-dto';
import { BrandsApiService } from '../../services/brands-api.service';
import { ModelsListItemDto } from '../../../models/models/models-list-item-dto';
import { ModelsApiService } from '../../../models/services/models-api.service';

@Component({
  selector: 'app-brands-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brands-list.component.html',
  styleUrl: './brands-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandsListComponent implements OnInit {
  list!: BrandsListItemDto[];
  models!: ModelsListItemDto[];
  param!: number;

  constructor(
    private brandsApiService: BrandsApiService,
    private modelsApiService: ModelsApiService,
    private change: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.brandsApiService.getList().subscribe((response) => {
      this.list = response;
      this.change.markForCheck();
    });
  }

  brandModelHandler(value: number): void {
    this.param = value;
    this.modelsApiService.getListByBrandId(value).subscribe((response) => {
      this.models = response;
      this.change.markForCheck();
      console.log(value);
    });
  }
}
