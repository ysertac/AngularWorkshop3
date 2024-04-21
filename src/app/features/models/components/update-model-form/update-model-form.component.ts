import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ModelsApiService } from '../../services/models-api.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UpdateModelRequest } from '../../models/update-model-request';
import { DataManageService } from '../../../../shared/services/data-manage.service';
import { ModelsListItemDto } from '../../models/models-list-item-dto';

@Component({
  selector: 'app-update-model-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './update-model-form.component.html',
  styleUrl: './update-model-form.component.scss',
})
export class UpdateModelFormComponent implements OnInit {
  private modelId: string | null = null;
  private modelToUpdate: ModelsListItemDto = {
    id: 0,
    name: '',
    brandId: 0,
    imageUrl: '',
    modelYear: 0,
    dailyPrice: 0,
    brand: {
      id: 0,
      name: '',
    },
  };

  ngOnInit(): void {
    this.modelId = this.route.snapshot.paramMap.get('id');
    this.dataManageService.data$.subscribe({
      next: (response) => {
        console.log(response);
        this.modelToUpdate = response;
        this.form.get('name')?.setValue(this.modelToUpdate.name);
        this.form.get('brandId')?.setValue(this.modelToUpdate.brandId);
        this.form.get('modelYear')?.setValue(this.modelToUpdate.modelYear);
        this.form.get('dailyPrice')?.setValue(this.modelToUpdate.dailyPrice);
        this.change.markForCheck();
      },
    });
  }

  form: FormGroup = this.fb.group({
    brandId: ['', [Validators.required]],
    name: ['', [Validators.required]],
    modelYear: ['', [Validators.required]],
    dailyPrice: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private modelsApiService: ModelsApiService,
    private dataManageService: DataManageService,
    private router: Router,
    private change: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  updateModel() {
    const request: UpdateModelRequest = {
      brandId: this.form.value.brandId,
      name: this.form.value.name,
      modelYear: this.form.value.modelYear,
      imageUrl: this.modelToUpdate.imageUrl,
      dailyPrice: this.form.value.dailyPrice,
      brand: this.modelToUpdate.brand,
    };

    this.modelsApiService.putModel(request, this.modelId).subscribe({
      next: (response) => {
        console.info('Response:', response);
      },
      error: (error) => {
        console.error('Error:', error);
      },
      complete: () => {
        console.info('Model created successfully');
        this.form.reset();
      },
    });
  }

  onFormSubmit() {
    console.log(this.form);
    if (this.form.invalid) {
      console.error('form is invalid');
      return;
    }
    this.updateModel();
    this.router.navigate(['/home/brands']);
  }
}
