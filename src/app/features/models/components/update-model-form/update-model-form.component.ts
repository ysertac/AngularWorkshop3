import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ModelsApiService } from '../../services/models-api.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PostModelRequest } from '../../models/post-model-request';
import { CommonModule } from '@angular/common';
import { UpdateModelRequest } from '../../models/update-model-request';

@Component({
  selector: 'app-update-model-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './update-model-form.component.html',
  styleUrl: './update-model-form.component.scss',
})
export class UpdateModelFormComponent implements OnInit {
  private modelId: string | null = null;

  ngOnInit(): void {
    this.modelId = this.route.snapshot.paramMap.get('id');
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
    private router: Router,
    private route: ActivatedRoute
  ) {}

  updateModel() {
    const request: UpdateModelRequest = {
      brandId: this.form.value.brandId,
      name: this.form.value.name,
      modelYear: this.form.value.modelYear,
      dailyPrice: this.form.value.dailyPrice,
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
