import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ModelsApiService } from '../../services/models-api.service';
import { ModelsListItemDto } from '../../models/models-list-item-dto';

@Component({
  selector: 'app-models-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './models-list.component.html',
  styleUrl: './models-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModelsListComponent implements OnInit, OnChanges {
  @Input() brandId: number | null = null;
  //@Input() searchBrandName: string | null = null;

  list!: ModelsListItemDto[];
  constructor(
    private modelsApiService: ModelsApiService,
    private change: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['brandId'] &&
      changes['brandId'].currentValue !== changes['brandId'].previousValue
    ) {
      this.getList();
    }
  }

  private getList() {
    this.modelsApiService.getList(this.brandId).subscribe((response) => {
      this.list = response;
      this.change.markForCheck();
    });
  }
}
