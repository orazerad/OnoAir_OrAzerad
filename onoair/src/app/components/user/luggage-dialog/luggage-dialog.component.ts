import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LuggageItem, LUGGAGE_TYPES } from '../../../models/luggage.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
    selector: 'app-luggage-dialog',
    templateUrl: './luggage-dialog.component.html',
    styleUrls: ['./luggage-dialog.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatDialogModule
    ]
})
export class LuggageDialogComponent implements OnInit {
    luggageForm: FormGroup;
    luggageTypes = LUGGAGE_TYPES;
    passenger: any;
    existingLuggageItems: LuggageItem[] = [];
    errorMessage: string = '';

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<LuggageDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.passenger = data.passenger;
        this.existingLuggageItems = data.luggageItems || [];

        // Initialize form with default values or existing values
        this.luggageForm = this.fb.group({});

        // Create a form control for each luggage type
        this.luggageTypes.forEach(type => {
            const existingItem = this.existingLuggageItems.find(item => item.type === type.type);
            const quantity = existingItem ? existingItem.quantity : 0;

            this.luggageForm.addControl(
                type.type,
                this.fb.control(quantity, [
                    Validators.required,
                    Validators.min(0),
                    Validators.max(type.maxAllowed)
                ])
            );
        });
    }

    ngOnInit(): void {}

    onCancel(): void {
        this.dialogRef.close();
    }

    onSubmit(): void {
        if (this.luggageForm.valid) {
            const luggageItems: LuggageItem[] = [];

            this.luggageTypes.forEach(type => {
                const quantity = this.luggageForm.get(type.type)?.value || 0;

                if (quantity > 0) {
                    luggageItems.push({
                        type: type.type,
                        weight: type.maxWeight,
                        quantity: quantity,
                        maxAllowed: type.maxAllowed
                    });
                }
            });

            // Check if total items exceeds the maximum allowed (9 items)
            const totalItems = luggageItems.reduce((sum, item) => sum + item.quantity, 0);
            if (totalItems > 9) {
                this.errorMessage = 'לא ניתן להוסיף יותר מ-9 פריטי מטען לנוסע';
                return;
            }

            this.dialogRef.close(luggageItems);
        }
    }

    getTypeMaxAllowed(type: string): number {
        const luggageType = this.luggageTypes.find(t => t.type === type);
        return luggageType ? luggageType.maxAllowed : 0;
    }
}