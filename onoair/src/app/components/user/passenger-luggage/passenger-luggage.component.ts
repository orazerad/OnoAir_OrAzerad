import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Passenger } from '../../../models/booking.model';
import { LuggageItem, LUGGAGE_TYPES, PassengerLuggage } from '../../../models/luggage.model';
import { LuggageDialogComponent } from '../luggage-dialog/luggage-dialog.component';
import { LuggageService } from '../../../services/luggage.service';

@Component({
  selector: 'app-passenger-luggage',
  templateUrl: './passenger-luggage.component.html',
  styleUrls: ['./passenger-luggage.component.css'],
  standalone: true,

})
export class PassengerLuggageComponent implements OnInit {
  @Input() passengers: Passenger[] = [];
  @Input() readOnly: boolean = false;
  
  luggageTypes = LUGGAGE_TYPES;
  
  constructor(
    private dialog: MatDialog,
    private luggageService: LuggageService
  ) { }

  ngOnInit(): void {
    // Initialize luggage data if not present
    this.passengers.forEach(passenger => {
      if (!passenger.luggage) {
        passenger.luggage = {
          passengerId: passenger.id,
          passengerName: `${passenger.name} ${passenger.lastName}`,
          items: []
        };
      }
    });
  }

  openLuggageDialog(passenger: Passenger): void {
    const dialogRef = this.dialog.open(LuggageDialogComponent, {
      width: '600px',
      data: {
        passenger: passenger,
        luggageItems: passenger.luggage?.items || []
      },
      direction: 'rtl'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Update passenger luggage with selected items
        passenger.luggage = this.luggageService.prepareLuggageData(
          passenger.id,
          `${passenger.name} ${passenger.lastName}`,
          result
        );
      }
    });
  }

  getTotalLuggageItems(passenger: Passenger): number {
    if (!passenger.luggage || !passenger.luggage.items) {
      return 0;
    }
    
    return passenger.luggage.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  getLuggageItemsDescription(passenger: Passenger): string {
    if (!passenger.luggage || !passenger.luggage.items || passenger.luggage.items.length === 0) {
      return 'לא נבחר מטען';
    }
    
    const descriptions: string[] = [];
    
    passenger.luggage.items.forEach(item => {
      const luggageType = this.luggageTypes.find(type => type.type === item.type);
      if (luggageType && item.quantity > 0) {
        descriptions.push(`${luggageType.label}: ${item.quantity}`);
      }
    });
    
    return descriptions.join(', ');
  }
}