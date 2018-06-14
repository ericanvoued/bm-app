import { Component } from '@angular/core';

/**
 * Generated class for the LhcBoseComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'lhc-bose',
  templateUrl: './lhc-bose.html'
})
export class LhcBoseComponent {

  resultsData = {data: [{code: ['01','05'], number: '180605031', sum: 0}]}
  bose = {
    red: ['01', '02', '07', '08', '12', '13', '18', '19', '23', '24', '29', '30', '34', '35', '40', '45', '46'],
    blue: ['03', '04', '09', '10', '14', '15', '20', '25', '26', '31', '36', '37', '41', '42', '47', '48'],
    green: ['05', '06', '11', '16', '17', '21', '22', '27', '28', '32', '33', '38', '39', '43', '44', '49']
  }
  constructor() {

  }

}
