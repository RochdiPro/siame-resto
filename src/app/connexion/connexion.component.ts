import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { MatInputModule } from 'mat-input';



@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements AfterViewInit {
  form: FormGroup;
  value = '';
  cercle: any = false;
  connecter: any = false;
  infonet: any = {};
  @ViewChild('code', { static: false }) code_emp: any = MatInputModule;



  src_img: any = "./../../assets/images/a.svg"
  liste_employe: any;
  date: any;mois:any
  constructor(private fb: FormBuilder, private router: Router, private datePipe: DatePipe) {
    this.form = this.fb.group({
      code: ['']
    });
    this.liste_employe = JSON.parse(localStorage.getItem('liste_employe') + "");
    this.date =  new Date().getDay()
    this.mois=new Date().getMonth() + 1
  }
  ngAfterViewInit(): void {
    this.code_emp.nativeElement.focus();
  }

  ngOnInit(): void {
  }

  popupWin: any; inconnu: any = false; emp: any; repeter: any = false ; obj:any;
  // generation des tickets

  async g_code(event: any) {
    if (event.key == "Enter") {
      this.repeter = false;
      let ch = this.form.get('code')?.value
      this.code_emp.nativeElement.focus();
      this.form.controls["code"].setValue("");
      if (ch == "5500001C3836CD01") {
        this.router.navigate(['config'])
      } else if ((ch == "0000000000000000") == false) {
        this.inconnu = false

        for (let i = 0; i < this.liste_employe.length; i++) {
          if (ch == this.liste_employe[i].code) {
            this.emp = this.liste_employe[i]; this.inconnu = true
            for (let j = 0; j < this.liste_employe[i].date.length; j++) {
              if (this.liste_employe[i].date[j].jour==this.date && this.liste_employe[i].date[j].mois == this.mois) { 
                this.repeter = true
              }
            } 
            if(this.repeter==false){
              this.obj={};
              this.obj.mois = this.mois 
              this.obj.jour = this.date  
              this.liste_employe[i].date.push(this.obj)}
           }
        } 
        if (this.inconnu && this.repeter==false) {

          let printContents =
            " <img style='width: 60%; margin-left: 20%; '  src='./../../assets/images/a.svg'>" +
            "<br> " +
            "<h1 style='text-align: center; '>  Ticket N° : 124 </h1> <br>" +
            "<h4 > Date : " + this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss') + "</h4> "+
            "<h4 >  Nom : " + this.emp.nom + " </h4> " +
            "<br> " +
            "<p style='text-align: center; '>  Siame cantine </p>" +
            "<br> "
            ;
          this.popupWin = window.open('', 'test', 'top=0,left=0,height=auto,width=auto,toolbar=0,scrollbars=0,status=0');
          this.popupWin.document.open();
          this.popupWin.document.write(`
       <html>
         <head>  
           <script>
           function fn()
           {           
             window.print();window.close();
             }
           </script>
           <style  >
           @media print{ .doNotPrint{display:none !important;} } 
           </style>
            
         </head>
          <body onload="fn()">${printContents} </body>
       </html>`
          );
          this.popupWin.document.close();
          localStorage.setItem('liste_employe', JSON.stringify(this.liste_employe));

        }
        else if (this.repeter==true) {
          Swal.fire({
            icon: 'error',
            title: '',
            text: " Vous avez le droit de bénéficier de ce service une fois par jour",
          })
        }
        else {
          Swal.fire({
            icon: 'error',
            title: '',
            text: " Vous n'avez pas le droit",
          })
        }
      }

    }
  }





  
 


}
