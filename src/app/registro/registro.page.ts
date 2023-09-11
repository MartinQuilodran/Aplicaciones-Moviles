import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

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

  constructor(private router: Router, private route: ActivatedRoute, private alertController: AlertController) { }

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
