import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ModelsApiService } from '../../services/models-api.service';
import { PostModelRequest } from '../../models/post-model-request';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-model-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './create-model-form.component.html',
  styleUrl: './create-model-form.component.scss',
})
export class CreateModelFormComponent {
  form: FormGroup = this.fb.group({
    brandId: ['', [Validators.required]],
    name: ['', [Validators.required]],
    modelYear: ['', [Validators.required]],
    dailyPrice: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private modelsApiService: ModelsApiService,
    private router: Router
  ) {}

  createModel() {
    const request: PostModelRequest = {
      brandId: this.form.value.brandId,
      name: this.form.value.name,
      modelYear: this.form.value.modelYear,
      dailyPrice: this.form.value.dailyPrice,
    };
    this.modelsApiService.postModel(request).subscribe({
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
    this.createModel();
    this.router.navigate(['/home/brands']);
  }
}
