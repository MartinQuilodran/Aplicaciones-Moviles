import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario: string = '';
  contrasena: string = '';

  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder, private router: Router) {
    this.formularioLogin = this.fb.group({
      usuario: ['', [Validators.required]],
      contraseña: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ingresar() {
    const usuarioControl = this.formularioLogin.get('usuario');
    const contrasenaControl = this.formularioLogin.get('contraseña');
  
    if (usuarioControl && contrasenaControl) {
      const usuarioIngresado = usuarioControl.value;
      const contrasenaIngresada = contrasenaControl.value;
  
      const cuentaGuardadaString = localStorage.getItem('Cuenta');
  
      if (cuentaGuardadaString) {
        const cuentaGuardada = JSON.parse(cuentaGuardadaString);
  
        if (cuentaGuardada && cuentaGuardada.usuario === usuarioIngresado && cuentaGuardada.contrasena === contrasenaIngresada) {
          this.router.navigate(['/qr', { usuario: usuarioIngresado }]);
        } else {
          alert('Usuario o contraseña incorrectos');
        }
      } else {
        alert('No se encontraron credenciales almacenadas');
      }
    } else {
      alert('Error: Los campos del formulario no están disponibles');
    }
  }
  

  ngOnInit() {}
}
