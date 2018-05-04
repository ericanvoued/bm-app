import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ToolsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToolsProvider {


  constructor(public http: HttpClient) {
    console.log('Hello ToolsProvider Provider');
  }

    isObject(val){
        return Object.prototype.toString.call(val).slice(8, -1) == 'Object';
    }

    isArray(val){
        return Object.prototype.toString.call(val).slice(8, -1) == 'Array';
    }

    isFunction(val){
        return Object.prototype.toString.call(val).slice(8, -1) == 'Function';
    }

    copy(obj:any,deep){
        if (obj === null || (typeof obj !== "object" && !this.isFunction(obj))) {
            return obj;
        }

        if (this.isFunction(obj)) {
            return new Function("return " + obj.toString())();
        }
        else {
            var name, target = this.isArray(obj) ? [] : {}, value;

            for (name in obj) {
                value = obj[name];

                if (value === obj) {
                    continue;
                }

                if (deep) {
                    if (this.isArray(value) || this.isObject(value)) {
                        target[name] = this.copy(value,deep);
                    } else if (this.isFunction(value)) {
                        target[name] = new Function("return " + value.toString())();
                    } else {
                        target[name] = value;
                    }
                } else {
                    target[name] = value;
                }
            }
            return target;
        }
    }


    zuhe1(m,n){
        if(m == n)
            return 1
    
        let gap = n,total = m, divider = 1;;

        for(let i = 1;i<gap;i++){
             total *= (m-i)
             divider *= (i+1)
        }

        return total/divider
    }

    removeElement(arr,ele){
        let temp = []
        let index = arr.indexOf(ele)
        for(let i = 0;i<arr.length;i++){
            if(index != i)
                temp.push(arr[i])
        }
        return temp
    }
}
