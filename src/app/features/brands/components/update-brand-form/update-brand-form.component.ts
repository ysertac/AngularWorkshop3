import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BrandsApiService } from '../../services/brands-api.service';
import { UpdateBrandRequest } from '../../models/update-brand-request';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-brand-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './update-brand-form.component.html',
  styleUrl: './update-brand-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateBrandFormComponent implements OnInit {
  private brandId: string | null = null;
  private brandName: string | null = null;

  ngOnInit(): void {
    this.brandId = this.route.snapshot.paramMap.get('id');
  }

  form: FormGroup = this.fb.group({
    name: [this.brandId, [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private brandsApiService: BrandsApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  updateBrand() {
    const request: UpdateBrandRequest = {
      name: this.form.value.name,
    };
    this.brandsApiService.updateBrand(request, this.brandId).subscribe({
      next: (response) => {
        console.info('Response:', response);
      },
      error: (error) => {
        console.error('Error:', error);
      },
      complete: () => {
        console.info('Brand updated successfully');
        this.form.reset();
      },
    });
  }

  onFormSubmit() {
    console.log(this.form);
    if (this.form.invalid) {
      console.error('form is invalid');
    }
    this.updateBrand();
    this.router.navigate(['/home/brands']);
  }
}
