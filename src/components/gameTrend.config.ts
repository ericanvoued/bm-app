import { WuxingComponent } from '../components/gametrend/wuxing/wuxing'
import { SixingComponent } from '../components/gametrend/sixing/sixing'
import { ZhixuanhezhiComponent } from '../components/gametrend/qiansan/zhixuanhezhi/zhixuanhezhi'
import { KuadutrendComponent } from '../components/gametrend/kuadutrend/kuadutrend'

export let config = {
    '五星':WuxingComponent,
    '四星':SixingComponent,
    '前三直选和值':ZhixuanhezhiComponent
}

export const trendAll = {
    'SSC':{
       'WuxingComponent':["五星直选复式","五星直选组合","五星组选20","五星组选60","五星组选120","五星组选10","五星组选5","五星组选30","四星直选组合","四星直选复式",
       "四星组选4","四星组选6","四星组选12","四星组选24","前三直选复式","前三直选组合","中三直选复式","中三直选组合","后三直选复式","后三直选组合",
       "二星后二复式", "二星前二复式" , "一星定位胆", "任选直选复式", "任选组选复式", "任选组三复式", "任选组六复式", "任选组选24", "任选组选12", "任选组选6", "任选组选4",
       "任选直选和值","任选组选和值"
       ],
       'ZhixuanhezhiComponent':["前三直选和值", "前三组选和值", "中三直选和值", "中三组选和值", "后三直选和值", "后三组选和值", "二星后二和值", "二星前二和值"],
       'KuadutrendComponent':["前三直选跨度","前三组三","前三组六","前三包胆","前三和值尾数","前三特殊号码","中三直选跨度","中三组三","中三组六","中三包胆","中三和值尾数",
        "中三特殊号码", "后三直选跨度", "后三组三", "后三组六", "后三包胆", "后三和值尾数","后三特殊号码", "二星后二跨度", "二星前二跨度", "二星后二包胆", "二星前二包胆",
        "不定位后三一码不定位", "不定位后三二码不定位", "不定位前三一码不定位", "不定位前三二码不定位", "不定位中三一码不定位", "不定位中三二码不定位", "不定位四星一码不定位",
        "不定位四星二码不定位" , "不定位五星二码不定位" , "不定位五星三码不定位"     
       ]
    }  
}

export const judgeTrend = (gameKind, gameMethod) => {
    let total = trendAll[gameKind], component;
    for(let key in total){
        if(total[key].indexOf(gameMethod) != -1){
             component = key
             break
        }
    } 
    console.log(component)
    switch(component){
        case 'WuxingComponent':
           return {component:WuxingComponent, menus:getWei(gameMethod), position:[3,4,5,6]}
        case 'ZhixuanhezhiComponent':
           return {component:ZhixuanhezhiComponent, menus:getWei(gameMethod),position:[]}
        case 'KuadutrendComponent':
           return {component:KuadutrendComponent, menus:getWei(gameMethod),position:getPosition(gameMethod)}   

    }
}

function getWei(gameMethod){
    if(["五星直选复式","五星直选组合","五星组选20","五星组选60","五星组选120","五星组选10","五星组选5","五星组选30","任选直选复式", "任选组选复式", 
        "任选组三复式", "任选组六复式", "任选组选24", "任选组选12", "任选组选6", "任选组选4", "一星定位胆"].indexOf(gameMethod) != -1)
        return ['开奖','万位走势','千位走势','百位走势','十位走势','个位走势']

    else if(["四星直选组合","四星直选复式","四星组选4","四星组选6","四星组选12","四星组选24"].indexOf(gameMethod) != -1)
        return ['开奖','千位走势','百位走势','十位走势','个位走势']

    else if(["前三直选复式","前三直选组合",].indexOf(gameMethod) != -1)
        return ['开奖','万位走势','千位走势','百位走势']

    else if(["中三直选复式","中三直选组合"].indexOf(gameMethod) != -1)
        return ['开奖','千位走势','百位走势','十位走势']

    else if(["后三直选复式","后三直选组合"].indexOf(gameMethod) != -1)
        return ['开奖','百位走势','十位走势','个位走势']

    else if(["二星后二复式","二星前二复式"].indexOf(gameMethod) != -1)
        return ['开奖','十位走势','个位走势']

    else if(["前三直选和值", "前三组选和值", "中三直选和值", "中三组选和值", "后三直选和值", "后三组选和值", "二星后二和值", "二星前二和值"].indexOf(gameMethod) != -1)
        return ['开奖','号码走势','和值走势','冷热']

    else if(["前三直选跨度","前三组三","前三组六","前三包胆","前三和值尾数","前三特殊号码","中三直选跨度","中三组三","中三组六","中三包胆","中三和值尾数",
        "中三特殊号码", "后三直选跨度", "后三组三", "后三组六", "后三包胆", "后三和值尾数","后三特殊号码", "二星后二跨度", "二星前二跨度", "二星后二包胆", "二星前二包胆",
        "不定位后三一码不定位", "不定位后三二码不定位", "不定位前三一码不定位", "不定位前三二码不定位", "不定位中三一码不定位", "不定位中三二码不定位", "不定位四星一码不定位",
        "不定位四星二码不定位"].indexOf(gameMethod) != -1)
        return ['开奖','走势','跨度','冷热']
}

function getPosition(gameMethod){
      if(["前三直选跨度","前三组三","前三组六","前三包胆","前三和值尾数","前三特殊号码","不定位前三一码不定位","不定位前三二码不定位"].indexOf(gameMethod) != -1)
         return [0,3]
      else if(["中三直选跨度","中三组三","中三组六","中三包胆","中三和值尾数","中三特殊号码","不定位中三一码不定位","不定位中三二码不定位"].indexOf(gameMethod) != -1)
         return [1,4]
      else if(["后三直选跨度", "后三组三", "后三组六", "后三包胆", "后三和值尾数","后三特殊号码","不定位后三一码不定位","不定位后三二码不定位"].indexOf(gameMethod) != -1)
         return [2,5]
      else if(["二星后二跨度","二星后二包胆"].indexOf(gameMethod) != -1)
         return [3,5]
      else if(["二星前二跨度","二星前二包胆"].indexOf(gameMethod) != -1)
         return [0,2]
      else if(["不定位四星一码不定位","不定位四星二码不定位"].indexOf(gameMethod) != -1)
         return [1,5]
      else if(["不定位五星二码不定位" , "不定位五星三码不定位" ])
         return [0,5]  
}

