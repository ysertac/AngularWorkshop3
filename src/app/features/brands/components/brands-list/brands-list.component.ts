import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { BrandsListItemDto } from '../../models/brands-list-item-dto';
import { BrandsApiService } from '../../services/brands-api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './brands-list.component.html',
  styleUrl: './brands-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandsListComponent implements OnInit {
  @Output() selectBrand = new EventEmitter<number | null>();

  list: Array<BrandsListItemDto> = [];

  constructor(
    private brandsApiService: BrandsApiService,
    private change: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.brandsApiService.getList().subscribe((response) => {
      this.list = response;
      this.change.markForCheck();
    });
  }

  onBrandClick(id: number | null) {
    this.selectBrand.emit(id);
  }
}
