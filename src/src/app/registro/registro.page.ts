import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Comuna } from 'src/app/models/comuna';
import { Region } from 'src/app/models/region';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { LocationService } from 'src/app/services/location.service';




@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  rutInput: string ="";
  usuarioInput: string ="";
  nombreInput: string = "";
  apellidoInput: string = "";
  correoInput: string = "";
  contrasenaInput: string = "";
  confcontrasenaInput: string = "";

  regiones:Region[]=[];
  comunas:Comuna[]=[];
  regionSel:number = 0;
  comunaSel:number = 0;

  disabledComuna:boolean = true;

  constructor(private router: Router, private route: ActivatedRoute, private alertController: AlertController, private helper:HelperService, private locationService:LocationService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.rutInput = params['rutInput'];
      this.usuarioInput = params['usuarioInput'];
      this.nombreInput = params['nombreInput'];
      this.apellidoInput = params['apellidoInput'];
      this.correoInput = params['correoInput'];
      this.contrasenaInput = params['contrasenaInput'];
      this.confcontrasenaInput = params['confcontrasenaInput'];
    })
    this.cargarRegion();
  }

  limpiarCampos() {
    this.rutInput = '';
    this.usuarioInput = '';
    this.nombreInput = '';
    this.apellidoInput = '';
    this.correoInput = '';
    this.contrasenaInput = '';
    this.confcontrasenaInput = '';
  }

  async cargarRegion(){
    const req = await this.locationService.getRegion();
    this.regiones = req.data;
    
    console.log("REGIONES",this.regiones);
  }

  async cargarComuna(){
    try {
      const req = await this.locationService.getComuna(this.regionSel);
      this.comunas = req.data;
      this.disabledComuna = false;
    } catch (error:any) {
      await this.helper.showAlert(error.error.msg,"Error");
    }
  }

  async guardarDatos() {

    if (this.contrasenaInput != null && this.confcontrasenaInput != null && this.contrasenaInput === this.confcontrasenaInput) {

      let cuenta = {
        rut: this.rutInput,
        usuario: this.usuarioInput,
        nombre: this.nombreInput,
        apellido: this.apellidoInput,
        correo: this.correoInput,
        contrasena: this.contrasenaInput
      }
localStorage.setItem("Cuenta", JSON.stringify(cuenta))

      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'Su cuenta ha sido creada.',
        buttons: ['Aceptar']
      });
      await alert.present();

      this.router.navigate(['/login'])
    }
    else{
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Las contraseñas no coinciden.',
        buttons: ['Aceptar']
      });
      await alert.present();
    }

  }

  contrasenaVisible: boolean = false;

  toggleContrasenaVisibility() {
    this.contrasenaVisible = !this.contrasenaVisible;
  }

}
