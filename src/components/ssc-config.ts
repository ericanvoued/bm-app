import { ZhixuanfushiComponent } from './ssc-game/wuxing/zhixuanfushi/zhixuanfushi'
import { WuxingzhixuanzuheComponent } from './ssc-game/wuxing/wuxingzhixuanzuhe/wuxingzhixuanzuhe'
import { Zuxuan20Component } from './ssc-game/wuxing/zuxuan20/zuxuan20'
import { Zuxuan30Component } from './ssc-game/wuxing/zuxuan30/zuxuan30'
import { Zuxuan60Component } from './ssc-game/wuxing/zuxuan60/zuxuan60'
import { Zuxuan120Component } from './ssc-game/wuxing/zuxuan120/zuxuan120'
import { Zuxuan10Component } from './ssc-game/wuxing/zuxuan10/zuxuan10'
import { Zuxuan5Component } from './ssc-game/wuxing/zuxuan5/zuxuan5'

import { SiXingZhixuanfushiComponent } from './ssc-game/sixing/zhixuanfushi/zhixuanfushi'
import { Zuxuan24Component } from './ssc-game/sixing/zuxuan24/zuxuan24'
import { Zuxuan12Component } from './ssc-game/sixing/zuxuan12/zuxuan12'
import { Zuxuan6Component } from './ssc-game/sixing/zuxuan6/zuxuan6'
import { Zuxuan4Component } from './ssc-game/sixing/zuxuan4/zuxuan4'

import { QisanzhixuanhezhiComponent } from './ssc-game/qiansan/qisanzhixuanhezhi/qisanzhixuanhezhi'
import { QisanzhixuankuaduComponent } from './ssc-game/qiansan/qisanzhixuankuadu/qisanzhixuankuadu'
import { QisanzhixuanfushiComponent } from './ssc-game/qiansan/qisanzhixuanfushi/qisanzhixuanfushi'
import { QisanzhixuanzuheComponent } from './ssc-game/qiansan/qisanzhixuanzuhe/qisanzhixuanzuhe'
import { Qisanzuxuan3Component } from './ssc-game/qiansan/qisanzuxuan3/qisanzuxuan3'
import { Qisanzuxuan6Component } from './ssc-game/qiansan/qisanzuxuan6/qisanzuxuan6'
import { QisanzuxuanhezhiComponent } from './ssc-game/qiansan/qisanzuxuanhezhi/qisanzuxuanhezhi'
import { QisanbaodanComponent } from './ssc-game/qiansan/qisanbaodan/qisanbaodan'
import { QisantesuhaomaComponent } from './ssc-game/qiansan/qisantesuhaoma/qisantesuhaoma'

import { ZhongsanzhixuanfushiComponent } from './ssc-game/zhongsan/zhongsanzhixuanfushi/zhongsanzhixuanfushi'
import { ZhongsanzhixuanhezhiComponent } from './ssc-game/zhongsan/zhongsanzhixuanhezhi/zhongsanzhixuanhezhi'
import { ZhongsanzhixuankuaduComponent } from './ssc-game/zhongsan/zhongsanzhixuankuadu/zhongsanzhixuankuadu'
import { ZhongsanzhixuanzuheComponent } from './ssc-game/zhongsan/zhongsanzhixuanzuhe/zhongsanzhixuanzuhe'
import { Zhongsanzuxuan6Component } from './ssc-game/zhongsan/zhongsanzuxuan6/zhongsanzuxuan6'
import { Zhongsanzuxuan3Component } from './ssc-game/zhongsan/zhongsanzuxuan3/zhongsanzuxuan3'
import { ZhongsanzuxuanhezhiComponent } from './ssc-game/zhongsan/zhongsanzuxuanhezhi/zhongsanzuxuanhezhi'
import { ZhongsanbaodanComponent } from './ssc-game/zhongsan/zhongsanbaodan/zhongsanbaodan'
import { ZhongsanhezhiweishuComponent } from './ssc-game/zhongsan/zhongsanhezhiweishu/zhongsanhezhiweishu'
import { ZhongsanteshuhaomaComponent  } from './ssc-game/zhongsan/zhongsanteshuhaoma/zhongsanteshuhaoma'

import { HousanzhixuanfushiComponent } from './ssc-game/housan/housanzhixuanfushi/housanzhixuanfushi'
import { HousanzhixuanhezhiComponent } from './ssc-game/housan/housanzhixuanhezhi/housanzhixuanhezhi'
import { HousanzhixuankuaduComponent } from './ssc-game/housan/housanzhixuankuadu/housanzhixuankuadu'
import { HousanzhixuanzuheComponent } from './ssc-game/housan/housanzhixuanzuhe/housanzhixuanzuhe'
import { HousanzusanComponent } from './ssc-game/housan/housanzusan/housanzusan'
import { HousanzuliuComponent } from './ssc-game/housan/housanzuliu/housanzuliu'

import { ErxingzhixuanhouerhezhiComponent } from './ssc-game/erxing/erxingzhixuanhouerhezhi/erxingzhixuanhouerhezhi'
import { ErxingzhixuanhouerfushiComponent } from './ssc-game/erxing/erxingzhixuanhouerfushi/erxingzhixuanhouerfushi'


export let gameConfig = {
    "五星直选复式":ZhixuanfushiComponent,
    "五星直选组合":WuxingzhixuanzuheComponent,
    "五星组选20":Zuxuan20Component,
    "五星组选30":Zuxuan30Component,
    "五星组选60":Zuxuan60Component,
    "五星组选120":Zuxuan120Component,
    "五星组选10":Zuxuan10Component,
    "五星组选5":Zuxuan5Component,
    "四星组选24":Zuxuan24Component,
    "四星组选12":Zuxuan12Component,
    "四星组选6":Zuxuan6Component,
    "四星组选4":Zuxuan4Component,
    "四星直选复式":SiXingZhixuanfushiComponent,

    "前三直选和值":QisanzhixuanhezhiComponent,
    "前三直选跨度":QisanzhixuankuaduComponent,
    "前三直选复式":QisanzhixuanfushiComponent,
    "前三直选组合":QisanzhixuanzuheComponent,
    "前三组三":Qisanzuxuan3Component,
    "前三组六":Qisanzuxuan6Component,
    "前三组选和值":QisanzuxuanhezhiComponent,
    "前三包胆":QisanbaodanComponent,
    "前三特殊号码": QisantesuhaomaComponent,
    
    "中三直选复式":ZhongsanzhixuanfushiComponent,
    "中三直选和值":ZhongsanzhixuanhezhiComponent,
    "中三直选跨度":ZhongsanzhixuankuaduComponent,
    "中三直选组合":ZhongsanzhixuanzuheComponent,
    "中三组六":Zhongsanzuxuan6Component,
    "中三组三":Zhongsanzuxuan3Component,
    "中三组选和值":ZhongsanzuxuanhezhiComponent,
    "中三包胆":ZhongsanbaodanComponent,
    "中三和值尾数":ZhongsanhezhiweishuComponent,
    "中三特殊号码":ZhongsanteshuhaomaComponent,

    "后三直选复式":HousanzhixuanfushiComponent,
    "后三直选和值":HousanzhixuanhezhiComponent,
    "后三直选跨度":HousanzhixuankuaduComponent,
    "后三直选组合":HousanzhixuanzuheComponent,
    "后三组三":HousanzusanComponent,
    "后三组六":HousanzuliuComponent,

    "二星直选后二和值":ErxingzhixuanhouerhezhiComponent,
    "二星直选后二复式":ErxingzhixuanhouerfushiComponent
}