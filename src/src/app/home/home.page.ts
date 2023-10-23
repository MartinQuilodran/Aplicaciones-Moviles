import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  informacionQR: string = '';
  usuarioRegistrado: any;
  imagenes:any[]=[];
  hola: string[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['informacionQR']) { 
        const informacionQR = params['informacionQR'];
        this.hola = informacionQR.split(',');
      }
    });
    

    const usuarioGuardado = localStorage.getItem('Cuenta');
    if (usuarioGuardado) {
      this.usuarioRegistrado = JSON.parse(usuarioGuardado);
    }

    defineCustomElements(window);
  }

  async takePhoto(){

    var cSource = CameraSource.Prompt

    if((await Camera.checkPermissions()).camera == 'granted'){
      const image = await Camera.getPhoto({
          resultType: CameraResultType.Uri,
          quality:100,
          height:1024,
          width:1024,
          source:cSource,
          presentationStyle:'popover',
          promptLabelCancel:"Cancelar",
          promptLabelHeader:"Seleccione",
          promptLabelPhoto:"Desde la galeria",
          promptLabelPicture:"Desde la camara"
        });

        if (image.webPath) {
          var blob = (await fetch(image.webPath)).blob();
          this.imagenes.unshift({fname:'foto'+image.format,src:image.webPath,file:blob});
        }

        console.log("IMAGENES GUARDADAS ====>", this.imagenes)

      }
  }
}
