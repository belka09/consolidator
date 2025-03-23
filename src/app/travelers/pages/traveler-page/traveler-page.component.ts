import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { StorageService } from '../../../core/services/storage.service';
import { SummaryComponent } from '../../components/summary/summary.component';

@Component({
  selector: 'app-traveler-page',
  standalone: true,
  templateUrl: './traveler-page.component.html',
  styleUrl: './traveler-page.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    RadioButtonModule,
    ButtonModule,
    RouterModule,
    SummaryComponent,
  ],
})
export class TravelerPageComponent implements OnInit {
  flightId: string = '';
  travelerForm!: FormGroup;

  price = 4440.81;

  months = [
    { label: '01 – January', value: '01' },
    { label: '02 – February', value: '02' },
    { label: '03 – March', value: '03' },
    { label: '04 – April', value: '04' },
    { label: '05 – May', value: '05' },
    { label: '06 – June', value: '06' },
    { label: '07 – July', value: '07' },
    { label: '08 – August', value: '08' },
    { label: '09 – September', value: '09' },
    { label: '10 – October', value: '10' },
    { label: '11 – November', value: '11' },
    { label: '12 – December', value: '12' },
  ];

  days = Array.from({ length: 31 }, (_, i) => ({
    label: `${(i + 1).toString().padStart(2, '0')}`,
    value: (i + 1).toString().padStart(2, '0'),
  }));

  years = Array.from({ length: 100 }, (_, i) => {
    const year = new Date().getFullYear() - i;
    return { label: `${year}`, value: `${year}` };
  });

  citizenships = [{ label: 'United States', value: 'US' }];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.flightId = this.route.snapshot.paramMap.get('id') ?? 'unknown';

    this.travelerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['Male', Validators.required],
      birthMonth: ['', Validators.required],
      birthDay: ['', Validators.required],
      birthYear: ['', Validators.required],
      citizenship: ['', Validators.required],
    });

    const storedData = this.storageService.load();
    if (storedData) {
      this.travelerForm.patchValue(storedData);
    }
  }

  onSubmit(): void {
    if (this.travelerForm.valid) {
      const formData = this.travelerForm.value;
      this.storageService.save(formData);

      alert(
        `Traveler data:\n${JSON.stringify(
          formData,
          null,
          2
        )}\nFlight ID: 123456`
      );
    } else {
      this.travelerForm.markAllAsTouched();
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.travelerForm.get(controlName);
    return !!(control && control.invalid && control.touched);
  }
}
