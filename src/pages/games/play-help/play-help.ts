import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from '../../../providers/common/common'
/**
 * Generated class for the PlayHelpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-play-help',
  templateUrl: 'play-help.html',
})
export class PlayHelpPage {
  sscInfo:any[] = [
      ['黑龙江时时彩', '08:50-22:40', '10分钟', '84期', '08:48:00', '22:38:00'],
      ['新疆时时彩', '10:10-02:00', '10分钟', '96期', '10:08:00', '01:58:30'],
      ['天津时时彩', '09:10-23:00', '10分钟', '84期', '09:07:30', '22:57:30'],
      ['博猫1分彩', '全天', '1分钟', '1440期', '00:01:00', '24:00:00'],
      ['博猫2分彩', '全天', '2分钟', '720期', '00:02:00', '24:00:00'],
      ['博猫3分彩', '全天', '5分钟', '288期', '00:05:00', '24:00:00'],
      ['腾讯分分彩', '全天', '1分钟', '1440期', '00:01:00', '24:00:00']
  ]

  playInstructions:any[] 

  gameMethod:any

  targetGame:any[]


  constructor(public navCtrl: NavController, public navParams: NavParams, public common:CommonProvider) {
    console.log(this.common.gameMethodConfig)

   this.gameMethod = this.common.method 

   

   this.playInstructions =  this.common.gameMethodConfig.reduce((a,b) => {
        let name = b.name_cn, arr = []
        b.children.forEach(ele => {
            ele.children.forEach(item => {
                arr.push({name:item.name_cn, tip:item.bet_note})
            })
        })
        a.push({method:name, children:arr})
        return a
    },[])

    this.targetGame = this.playInstructions.filter(ele => ele.method == this.gameMethod)
  }
 

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayHelpPage');
  }

  changeMethod($event){
      console.log($event)
      this.targetGame = this.playInstructions.filter(ele => ele.method == $event)
  }
}
