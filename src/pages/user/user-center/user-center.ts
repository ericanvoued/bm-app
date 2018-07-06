import {Component} from '@angular/core';
import {IonicPage, ToastController, LoadingController, normalizeURL,NavController, NavParams, Platform} from 'ionic-angular';
import { LoadingProvider } from '../../../providers/loading/loading'
import {ActionSheetController} from 'ionic-angular';
import { HttpClientProvider } from '../../../providers/http-client/http-client'


//camara
import {Camera, CameraOptions} from '@ionic-native/camera';
import {File} from '@ionic-native/file';
import {Transfer, TransferObject} from '@ionic-native/transfer';
import {FilePath} from '@ionic-native/file-path';



declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-user-center',
  templateUrl: './user-center.html',
})
export class UserCenterPage {

  unreadAnnouncements:number=0;
  userInfo: any = null;
  lastImage: string=null;
  toast:any = null;
  userId:string;
  // userInfo;

  constructor(
              public platform: Platform,
              private camera: Camera,
              private transfer: Transfer,
              private file: File,
              public http: HttpClientProvider,
              public toastCtrl: ToastController,
              public loadPrd:LoadingProvider,
              public LoadingCtrl: LoadingController,
              private filePath: FilePath,
              public actionSheetCtrl: ActionSheetController,
              public navCtrl: NavController,
              public navParams: NavParams) {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.announcementsUnreadnum();
  }

  async announcementsUnreadnum() {
    if(this.userInfo!=null){
      this.unreadAnnouncements = (await this.http.fetchData('/h5api-announcements/unreadnum?_t=' + this.userInfo.auth_token)).data.num;
    }else {
      this.unreadAnnouncements = (await this.http.fetchData('/h5api-announcements/unreadnum')).data.num;
    }
  }





  头像更换
  changePic() {



    // let u = navigator.userAgent;
    // if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
    //   //安卓手机
    //   alert('android')
    // } else if (u.indexOf('iPhone') > -1) {
    //   //苹果手机
    //   alert('ios')
    // } else if (u.indexOf('Windows Phone') > -1) {
    //   //winphone手机
    //   alert('wim')
    // }



    let actionSheet = this.actionSheetCtrl.create({
      // title: 'Modify your album',
      buttons: [
        {
          text: '从相册中选择',
          // role: 'destructive',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        }, {
          text: '拍照',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        }, {
          text: '取消',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }

  takePicture(sourceType) {
    //定义相机的一些参数
    var options = {
      quality: 60, //图片的质量
      sourceType: sourceType,
      saveToPhotoAlbum: false, //是否保存拍摄的照片到相册中去
      correctOrientation: true //是否纠正拍摄的照片的方向
    };

    //获取图片的方法
    this.camera.getPicture(options).then((imagePath) => {
      //特别处理 android 平台的文件路径问题
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath) //获取 android 平台下的真实路径
          .then(filePath => {
            //获取正确的路径
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            //获取正确的文件名
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      }
      else {
        //获取正确的路径
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        //获取正确的文件名
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      console.log("选择图片出现错误，请在 App 中操作或检查相关权限。")
      // super.showToast(this.toastCtrl, "选择图片出现错误，请在 App 中操作或检查相关权限。");
    });
  }

  //将获取到的图片或者相机拍摄到的图片进行一下另存为，用于后期的图片上传使用
  copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
    }, error => {
      console.log("存储图片到本地图库出现错误。")
      // super.showToast(this.toastCtrl, "存储图片到本地图库出现错误。");
    });
  }

  //为文件生成一个新的文件名
  createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg"; //拼接文件名
    return newFileName;
  }

  //处理图片的路径为可以上传的路径
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return normalizeURL(cordova.file.dataDirectory + img);
    }
  }

  uploadImage() {
    var url = 'http://www.zhenwin.com/h5api-users/setavatar?_t='+this.userInfo.auth_token;
    var targetPath = this.pathForImage(this.lastImage);
    var filename = this.userId + ".jpg"; //定义上传后的文件名

    //fileTransfer 上传的参数
    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: { 'Content-Type': 'application/x-www-form-urlencoded', '_token': this.userInfo.token}
    };

    const fileTransfer: TransferObject = this.transfer.create();

    // var loading = super.showLoading(this.loadingCtrl, "上传中...");
    console.log("上传中...")

    //开始正式地上传
    fileTransfer.upload(targetPath, url, options).then(data => {
      // loading.dismiss();
      // super.showToast(this.toastCtrl, "图片上传成功。");
      alert("图片上传成功。")
      //在用户看清弹窗提示后进行页面的关闭
      setTimeout(() => {
        // this.viewCtrl.dismiss();
      }, 3000);
    }, err => {
      // loading.dismiss();
      alert("图片上传发生错误，请重试。")
      // super.showToast(this.toastCtrl, "图片上传发生错误，请重试。");
    });
  }


  ionViewWillEnter() {

    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));

  }
  //页面跳转
  pushPage(page,needLogin,isOpen) {
    if(isOpen){
      if(needLogin){
        if(this.userInfo==null){
          this.toast = this.loadPrd.showToast(this.toastCtrl, '请先登陆');
        }else {
          this.navCtrl.push(page);
        }
      }else {
        this.navCtrl.push(page);
      }
    }else {
      this.toast = this.loadPrd.showToast(this.toastCtrl, '功能逐步开放中，敬请期待！');
    }

  }
}
