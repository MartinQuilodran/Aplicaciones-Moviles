import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  informacionQR: string = '';
  usuarioRegistrado: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['informacionQR']) { 
        this.informacionQR = params['informacionQR'];
      }
    });

    const usuarioGuardado = localStorage.getItem('Cuenta');
    if (usuarioGuardado) {
      this.usuarioRegistrado = JSON.parse(usuarioGuardado);
    }
  }
}
