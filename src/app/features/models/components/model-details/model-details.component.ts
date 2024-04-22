import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ModelsListItemDto } from '../../models/models-list-item-dto';
import { ModelsApiService } from '../../services/models-api.service';

@Component({
  selector: 'app-model-details',
  standalone: true,
  imports: [],
  templateUrl: './model-details.component.html',
  styleUrl: './model-details.component.scss',
})
export class ModelDetailsComponent implements OnInit {
  @Input() id!: number;

  modelDetails!: ModelsListItemDto;

  constructor(
    private modelsApiService: ModelsApiService,
    private change: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getModelDetails();
  }

  getModelDetails() {
    this.modelsApiService.getModel(this.id).subscribe({
      next: (response) => {
        this.modelDetails = response;
      },
      complete: () => {
        this.change.markForCheck();
      },
    });
  }
}
