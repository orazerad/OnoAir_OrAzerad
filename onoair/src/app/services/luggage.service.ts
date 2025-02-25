import { Injectable } from '@angular/core';
import { LuggageItem, PassengerLuggage } from '../models/luggage.model';

@Injectable({
  providedIn: 'root'
})
export class LuggageService {

  constructor() { }

  /**
   * Validates luggage items for a passenger
   * @param items Luggage items to validate
   * @returns Object with validation result and error message
   */
  validateLuggageItems(items: LuggageItem[]): { valid: boolean, message?: string } {
    // Check if total items exceeds the maximum allowed (9 items per passenger)
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    if (totalItems > 9) {
      return { 
        valid: false, 
        message: 'לא ניתן להוסיף יותר מ-9 פריטי מטען לנוסע' 
      };
    }
    
    // Check if any individual item type exceeds its maximum allowed
    for (const item of items) {
      if (item.quantity > item.maxAllowed) {
        return { 
          valid: false, 
          message: `לא ניתן להוסיף יותר מ-${item.maxAllowed} פריטים מסוג ${item.type}` 
        };
      }
    }
    
    return { valid: true };
  }

  /**
   * Prepares luggage data for a passenger
   * @param passengerId Passenger ID
   * @param passengerName Passenger name
   * @param items Luggage items
   * @returns PassengerLuggage object
   */
  prepareLuggageData(passengerId: number, passengerName: string, items: LuggageItem[]): PassengerLuggage {
    return {
      passengerId,
      passengerName,
      items: items.filter(item => item.quantity > 0) // Only include items with quantity > 0
    };
  }
}