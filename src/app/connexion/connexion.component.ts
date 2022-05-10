import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
 import { FileOpener } from '@ionic-native/file-opener/ngx';



import { Platform } from '@angular/cdk/platform';
const pdfMake = require("pdfmake/build/pdfmake");
const pdfFonts = require("pdfmake/build/vfs_fonts");

pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { File } from '@ionic-native/file/ngx';

import { Printer, PrintOptions } from '@awesome-cordova-plugins/printer/ngx';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
 
@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {
  cnx: FormGroup;
  value = '';
  cercle: any = false;
  connecter: any = false; 
  infonet: any = {};

  constructor(   private fb: FormBuilder, private router: Router ) {
    this.cnx = this.fb.group({
      id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      pwd: ['', Validators.required],
    });
  }

  action: any = {} 
  pdfObj: any;
  res: any; 
  connexion() {
    localStorage.setItem('accees_admin', "false"); 
    if (this.cnx.get("id")?.value == "admin" && this.cnx.get("pwd")?.value == "admin") { 
      this.router.navigate(['/menu']);
      localStorage.setItem('accees_admin', "true");
    }
    else if (this.cnx.get("id")?.value == "utilisateur" && this.cnx.get("pwd")?.value == "lampe") { 
      this.router.navigate(['/config']);
 
    }
    else if (this.cnx.get("id")?.value == "utilisateur" && this.cnx.get("pwd")?.value == "disjoncteur") { 
      this.router.navigate(['/config2']);
 
    }else
    if (this.cnx.get("id")?.value == "agent" && this.cnx.get("pwd")?.value == "lampe") { 
      this.router.navigate(['/work']); 
    }
    else
    if (this.cnx.get("id")?.value == "agent" && this.cnx.get("pwd")?.value == "disjoncteur") { 
      this.router.navigate(['/work2']); 
    }
    else 
    {
      Swal.fire({
        title: 'Erreur ',
        text: 'Vérifier vos données  ',
        icon: 'warning',
        confirmButtonText: 'ok',
      })
    } 
  }

  ngOnInit(): void {
  }
 

}