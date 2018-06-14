import { Component } from '@angular/core';

/**
 * Generated class for the LhcShengxiaoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'lhc-shengxiao',
  templateUrl: './lhc-shengxiao.html'
})
export class LhcShengxiaoComponent {

  shengxiao = {
    shu: ['10', '22', '34', '46'],
    niu: ['09', '21', '33', '45'],
    hu: ['08', '20', '32', '44'],
    tu: ['07', '19', '31', '43'],
    long: ['06', '18', '30', '42'],
    she: ['05', '17', '29', '41'],
    ma: ['04', '16', '28', '40'],
    yang: ['03', '15', '27', '39'],
    hou: ['02', '14', '26', '38'],
    ji: ['01', '13', '25', '37', '49'],
    gou: ['12', '24', '36', '48'],
    pig: ['11', '23', '35', '47']
  }
  resultsData = {data: [{code: ['01','05'], number: '180605031', sum: 0}]}

  constructor() {

  }

}
