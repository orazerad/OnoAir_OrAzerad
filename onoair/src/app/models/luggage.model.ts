export interface LuggageItem {
    type: string;
    weight: number;
    quantity: number;
    maxAllowed: number;
  }
  
  export interface PassengerLuggage {
    passengerId: number;
    passengerName: string;
    items: LuggageItem[];
  }
  
  export const LUGGAGE_TYPES = [
    {
      type: 'personal_item',
      label: 'תיק אישי',
      maxWeight: 5,
      maxAllowed: 1,
      description: 'תיק יד קטן (תיק, מחשב נייד, וכו׳)'
    },
    {
      type: 'cabin_baggage',
      label: 'מזוודת תא מטען',
      maxWeight: 10,
      maxAllowed: 2,
      description: 'מזוודה לתא המטען במטוס'
    },
    {
      type: 'checked_baggage',
      label: 'מזוודה לבטן המטוס',
      maxWeight: 23,
      maxAllowed: 6,
      description: 'מזוודה רגילה לבטן המטוס'
    }
  ];