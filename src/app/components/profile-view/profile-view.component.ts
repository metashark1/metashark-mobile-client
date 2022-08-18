import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { StorageService } from "src/app/services/storage.service";
import { UserService } from "src/app/services/user.service";
import { NgFerhadoTranslator } from "src/app/services/ng-f-translator";
import { HttpUserService } from "../../services/http-user.service";
import { ActionSheetController, ModalController } from "@ionic/angular";
import { Crop } from "@ionic-native/crop/ngx";
import { ImagePicker } from "@ionic-native/image-picker/ngx";
import { File } from "@ionic-native/file/ngx";
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject,
} from "@ionic-native/file-transfer/ngx";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { NgFerhadoTranslatorPipe } from "src/app/services/ng-f-translator/ng-f-translator.pipe";
import { InAppBrowserService } from "src/app/services/in-app-browser.service";
import { GlobalToastService } from "src/app/services/global-toast.service";
// import { OneSignalService } from 'src/app/services/one-signal.service';

@Component({
  selector: "app-profile-view",
  templateUrl: "./profile-view.component.html",
  styleUrls: ["./profile-view.component.scss"],
})
export class ProfileViewComponent implements OnInit {
  fileUrl: any = null;
  lang: string = this.storage.get("f-language-lang");
  cityName: string;
  file_url: string = "";
  filesize: any;
  photoUrl: string = this._userService.userData?.photoUrl;
  isAvaLoadProcess: boolean = false;
  isWork: boolean = this._userService.userData?.work;
  userCourierSwitchProcess: boolean = false;
  wanaBeCourier: any = this.storage.get("wanaBeCourier");
  wanaBeCourierHelper: boolean = false;

  constructor(
    private router: Router,
    public translator: NgFerhadoTranslator,
    private storage: StorageService,
    public _userService: UserService,
    private httpService: HttpUserService,
    private imagePicker: ImagePicker,
    private crop: Crop,
    private transfer: FileTransfer,
    public actionSheetController: ActionSheetController,
    private camera: Camera,
    private file: File,
    public tr: NgFerhadoTranslatorPipe,
    public modalController: ModalController,
    private iBrowser: InAppBrowserService,
    private GlobalToastService: GlobalToastService
  ) // private os: OneSignalService
  {}

  ngOnInit() {
    console.log("ProfileViewComponent init");
    this.getWanaBeCourier();

    this._userService.appConfigLoaded.subscribe((data) => {
      // if (data)
      // this.getUserCity();
    });
  }

  getWanaBeCourier() {
    this.wanaBeCourier = this.storage.get("wanaBeCourier");
  }

  editUser(id) {
    this.router.navigate(["/profile-form/user", id]);
  }

  // getUserCity() {
  //   this.cityName = this._userService.appConfig.cities[this.storage.get('city')].name[this.lang];
  // }

  logout() {
    this._userService.logOut();
  }

  soonWillBe() {
    this.GlobalToastService.callToast(
      "it_will_be_soon",
      "wait",
      "top",
      "hourglass-outline",
      3000,
      true
    );
  }

  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 80,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      targetWidth: 640,
      targetHeight: 640,
    };
    this.isAvaLoadProcess = true;

    this.camera.getPicture(options).then(
      (imageData) => {
        // imageData is URL TO ORIGINAL PHOTO
        // START CROP IMG
        this.crop.crop(imageData, { quality: 80 }).then(
          (newImage) => {
            // newImage is URL TO CROPPED PHOTO

            // GET UPLOAD LINK FROM AWS START
            this.httpService
              .avatarUploadPrepare(
                newImage
                  .substr(newImage.lastIndexOf("/") + 1)
                  .replace(/\?.*/, "")
              )
              .subscribe(
                (response: any) => {
                  this.file_url = response.url;
                  this.file
                    .resolveLocalFilesystemUrl(newImage)
                    .then((fileEntry) => {
                      fileEntry.getMetadata((metadata) => {
                        this.filesize = metadata.size;
                      });
                    });

                  // FileUploadOptions START
                  const uploadOpts: FileUploadOptions = {
                    fileKey: "file",
                    fileName: newImage
                      .substr(newImage.lastIndexOf("/") + 1)
                      .replace(/\?.*/, ""),
                    httpMethod: "PUT",
                    chunkedMode: false,
                    headers: {
                      "Content-Length": this.filesize,
                      "Content-Type": "image/jpeg",
                    },
                  };
                  // FileUploadOptions END

                  // FILEUPLOAD START
                  const fileTransfer: FileTransferObject =
                    this.transfer.create();
                  fileTransfer
                    .upload(newImage, response.upload_url, uploadOpts)
                    .then(
                      (data) => {
                        this.photoUrl = this.file_url;

                        // PATCH PROFILE URL START
                        this.httpService
                          .simplePatchData({ photoUrl: this.file_url })
                          .subscribe(
                            (evt) => {
                              this.GlobalToastService.callToast(
                                "load_success",
                                "",
                                "top",
                                "cloud-upload-outline",
                                3000,
                                false
                              );
                              this.isAvaLoadProcess = false;
                              this._userService.updateUserData();
                            },
                            (error) => console.log(error)
                          );
                        // PATCH PROFILE URL END

                        // HERE this.file_url
                      },
                      (err) => {
                        console.log(err);
                      }
                    );
                  // FILEUPLOAD END
                },
                (error) => {
                  this.isAvaLoadProcess = false;
                  console.log(error);
                }
              );
          },
          (error) => {
            this.isAvaLoadProcess = false;
            console.error("Error cropping image", error);
          }
        );
      },
      (err) => {
        this.isAvaLoadProcess = false;
        console.log(err);
      }
    );
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      // header: "Select Image source",
      buttons: [
        {
          text: this.tr.transform("choose_from_photo"),
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
          },
        },
        {
          text: this.tr.transform("camera"),
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.CAMERA);
          },
        },
        {
          text: this.tr.transform("cancel"),
          icon: "close",
          role: "cancel",
        },
      ],
    });
    await actionSheet.present();
  }
}
