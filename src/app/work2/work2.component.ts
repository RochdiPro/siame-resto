import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from 'mat-input';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-work2',
  templateUrl: './work2.component.html',
  styleUrls: ['./work2.component.scss']
})
export class Work2Component implements OnInit {

  x: any = "A60 B22"
  nb: any = 0;
  obj: any = {};
  nb_print_carton_10: any = 0;
  nb_print_carton_100: any = 0;
  nb_carton_10_controle_100: any = 0;
  info: any = "";
  value_code: any = ""
  data2: any = []
  data: any = []
  liste_produit: any = [];
  liste_agent: any = [];
  liste_of: any = [];
  val_resume: any = ""
  val_gamme: any = ""
  val_qte_reg: any = ""
  val_des: any = ""
  historique_of: any = [];
  qte_dis_empa: any;
  qte_dis_u: any;
  @ViewChild('ref_of', { static: false }) ref_of: any = MatInputModule;
  @ViewChild('ref_agent', { static: false }) ref_agent: any = MatInputModule;
  @ViewChild('ref_code', { static: false }) ref_code: any = MatInputModule;
  liste_des_codes: any = [];

  constructor(public datePipe: DatePipe, private router: Router) {
    this.liste_produit = JSON.parse(localStorage.getItem('liste_produit_dis') + "");
    this.liste_agent = JSON.parse(localStorage.getItem('liste_agent_dis') + "");
    this.liste_of = JSON.parse(localStorage.getItem('liste_of_dis') + "");
    this.form.controls['code'].disable();
    this.historique_of = JSON.parse(localStorage.getItem('historique_of_dis') + "");

    if (this.liste_agent == undefined || this.liste_of == undefined || this.liste_produit == undefined) {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'data ',
      })
    }

  }
  form: any = new FormGroup({
    of: new FormControl(""),
    code: new FormControl(""),
    agent: new FormControl(""),
  });

  form2: any = new FormGroup({
    led: new FormControl(""),
    w: new FormControl(""),
    k: new FormControl(""),
    E: new FormControl(""),
  });

  // traitement sur ordre de fabrication  
  test_of: any = false;
  index_ordre_fabrication: any;
  test_et_100: any;
  test_fermer: any = false
  set_of(event: any) {

    if (event.key == "Enter") {
      let v = this.form.get('of')?.value
      this.test_of = false
      this.test_fermer = false;
      this.nb = 0
      this.nb_carton_10 = 0
      this.nb_carton_100 = 0
      this.nb_carton_10_controle_100 = 0
      this.nb_print_carton_10 = 0
      this.nb_print_carton_100 = 0
      for (let i = 0; i < this.liste_of.length; i++) {

        if (this.liste_of[i].code_of == v) {

          if (this.liste_of[i].etat == "lancé") {
            this.test_of = true;
            this.index_ordre_fabrication = i;
            this.test_et_100 = this.liste_of[i].e100;
            Swal.fire({
              icon: 'success',
              title: 'Ordre de fabrication',
              showConfirmButton: false,
              timer: 1000
            })
            this.ref_agent.nativeElement.focus();
            this.form.controls['of'].disable();


          }
          else {
            this.form.controls["of"].setValue("");
            this.test_of = false;
            Swal.fire({
              icon: 'error',
              title: '',
              text: 'Ordre de fabrication soldé  ',
            })
            this.test_fermer = true
          }
        }
      }
      if (this.test_of == false && this.test_fermer == false) {
        this.form.controls["of"].setValue("");
        Swal.fire({
          icon: 'error',
          title: '',
          text: 'Ordre de fabrication Inconnu ',
        })
      }
      else {

        let test_historique_of = false;
        if (this.historique_of == null) {
          this.historique_of = []
        }
        for (let i = 0; i < this.historique_of.length; i++) {
          if (this.historique_of[i].of == v) {
            test_historique_of = true;
            this.nb = this.historique_of[i].nb
            this.nb_carton_10 = this.historique_of[i].nb_carton_10;
            this.nb_carton_100 = this.historique_of[i].nb_carton_100;
            this.nb_carton_10_controle_100 = this.historique_of[i].nb_carton_10_controle_100
            this.nb_print_carton_10 = this.historique_of[i].nb_print_carton_10
            this.nb_print_carton_100 = this.historique_of[i].nb_print_carton_100
          }
        }
        if (test_historique_of == false) {
          this.obj = {}
          this.obj.of = v;
          this.obj.nb = this.nb;
          this.obj.nb_carton_10 = this.nb_carton_10;
          this.obj.nb_carton_100 = this.nb_carton_100;
          this.obj.nb_carton_10_controle_100 = this.nb_carton_10_controle_100;
          this.obj.nb_print_carton_10 = this.nb_print_carton_10
          this.obj.nb_print_carton_100 = this.nb_print_carton_100
          this.historique_of.push(this.obj)
        }
        localStorage.setItem('historique_of_dis', JSON.stringify(this.historique_of));

        for (let i = 0; i < this.liste_produit.length; i++) {
          if (this.liste_produit[i].code == this.liste_of[this.index_ordre_fabrication].code) {
            this.test_code_produit = true
            let c = this.liste_produit[i].code
            this.value_code = c;
            this.val_resume = this.liste_produit[i].resume
            this.val_gamme = this.liste_produit[i].gamme.trim()
            this.val_des = this.liste_produit[i].des
            this.val_qte_reg = this.liste_produit[i].qte_reg

          }
        }
        this.info = "OF : " + this.form.get('of')?.value + " ,agent: " + this.form.get('agent')?.value + ",Date : " + new Date().toLocaleString() + " , Qte : " + this.nb;

      }
    }
  }

  ngOnInit(): void {
  }
  // traitement sur code a barre 

  nb_carton_100: any = ""
  nb_carton_10: any = ""
  test_code: any = false;
  test_code_produit: any = false;
  index_code_produit: any = -1
  test_correction_code: any = false
  test_redandance: any = false
  result_type_dis: any = false;
  v: any;
  async g_code(event: any) {
    if (event.key == "Enter") {
      let ch = this.form.get('code')?.value
      this.result_type_dis = ch.startsWith("FSB");
      this.test_redandance = false;
      if (this.result_type_dis == false) {
        this.v = ch
      }
      else {
        for (let cpt = 0; cpt < this.liste_des_codes.length; cpt++) {
          if (ch == this.liste_des_codes[cpt]) {
            this.test_redandance = true
          }
        }
        this.v = ch.split("_")[0]
      }
      this.test_code = false
      this.test_code_produit = false
      let code = ""
      // chercher produit et get code fl 
      for (let i = 0; i < this.liste_produit.length; i++) {
        if (this.liste_produit[i].code == this.v) {
          this.test_code_produit = true
          this.index_code_produit = i;
          code = this.liste_produit[i].code
          this.qte_dis_empa = this.liste_produit[i].qte_reg
          this.qte_dis_u = this.liste_produit[i].qte_u
        }
      }

      // get true false if code fl ==  code empallage
      for (let i = 0; i < this.liste_of.length; i++) {
        if (this.liste_of[i].code == code) {
          if (this.liste_of[i].code_of == this.form.get('of')?.value) {
            this.test_code = true;
            this.form.controls["code"].setValue("");
          }
        }
      }

      // message produit inconu 
      if (this.test_code_produit == false) {

        this.form.controls['code'].disable();
        this.test_correction_code = true
        Swal.fire({
          icon: 'error',
          title: " Produit Inconnu  ",
          html:
            '<table>' +
            '<tr><td>Code </td><td> <input type="password" id="swal-input1" value="" class="swal2-input" style="    margin-left: 16%;"    ></td></tr>' +
            '</table>',
          focusConfirm: false,
          preConfirm: () => {
            return [(<HTMLInputElement>document.getElementById('swal-input1')).value,
            ]
          },
          allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
          this.a = result.value

          let test = this.a[2] || this.a[3]
          if (result.isConfirmed) {
            if (this.a[0] == 'utilisateur') {
              this.test_correction_code = false
              this.form.controls["code"].setValue("");
              this.form.controls['code'].enable();
              this.ref_code.nativeElement.focus();

            }
            else {
              Swal.fire({

                text: 'Vérifier vos données',
                imageUrl: './../assets/images/panne.png',
                imageWidth: 400,
                imageHeight: 400,

              })
            }
          }
        });

      } else {
        // message erreur code produit et code fl et code of
        if (this.test_code == false && this.test_redandance == false) {

          this.form.controls['code'].disable();
          this.test_correction_code = true
          Swal.fire({
            icon: 'error',
            title: " l'ordre de fabrication et le code d'emballage ne correspondent pas  ",
            html:
              '<table>' +
              '<tr><td>Code </td><td> <input type="password" id="swal-input1" value="" class="swal2-input" style="    margin-left: 16%;"    ></td></tr>' +
              '</table>',
            focusConfirm: false,
            preConfirm: () => {
              return [(<HTMLInputElement>document.getElementById('swal-input1')).value,
              ]
            },
            allowOutsideClick: () => !Swal.isLoading()
          }).then((result) => {
            this.a = result.value

            let test = this.a[2] || this.a[3]
            if (result.isConfirmed) {
              if (this.a[0] == 'utilisateur') {
                this.test_correction_code = false
                this.form.controls['code'].enable();
                this.form.controls["code"].setValue("");

                this.ref_code.nativeElement.focus();

              }
              else {

                Swal.fire({
                  text: 'Vérifier vos données',
                  imageUrl: './../assets/images/panne.png',
                  imageWidth: 400,
                  imageHeight: 400,

                })
              }
            }
          });

        }
      }

      if (this.test_code == true && this.test_redandance == false) {
        this.value_code = this.form.get('code')?.value;
        this.liste_des_codes.push(ch)
        if (this.qte_dis_u == 1) {
          let n = this.nb; 
          this.info = "OF : " + this.form.get('of')?.value + " ,agent: " + this.form.get('agent')?.value + ",Date : " + new Date().toLocaleString() + " , Qte : 1";
          this.nb=1;
          await this.delai(300); 
          window.print()
          if (Number(this.nb) < Number(this.qte_dis_empa)) {
            this.nb = Number(n) + 1;
          }
          if ((Number(this.nb) % Number(this.qte_dis_empa)) == 0) {
            this.info = "OF : " + this.form.get('of')?.value + " ,agent: " + this.form.get('agent')?.value + ",Date : " + new Date().toLocaleString() + " , Qte : " + this.nb;
            await this.delai(300);
            window.print()
            this.nb = 0;
            this.nb_carton_10 = this.nb_carton_10 + 1
            //this.nb_print_carton_10 = Number(this.nb_print_carton_10) + 1
          }
        }
        else {
          if (Number(this.nb) < Number(this.qte_dis_empa)) {
            this.nb = Number(this.nb) + 1;
          }
          if ((Number(this.nb) % Number(this.qte_dis_empa)) == 0) {
            this.info = "OF : " + this.form.get('of')?.value + " ,agent: " + this.form.get('agent')?.value + ",Date : " + new Date().toLocaleString() + " , Qte : " + this.nb;

            await this.delai(200);
            window.print()
            this.nb = 0;
            this.nb_carton_10 = this.nb_carton_10 + 1
            //this.nb_print_carton_10 = Number(this.nb_print_carton_10) + 1
          }
        }

        this.save_data_of()
      }
      if (this.test_redandance) {
        Swal.fire({
          text: 'Redondance',
          icon: 'error',
        })
        this.form.controls['code'].enable();
        this.form.controls["code"].setValue("");
        this.ref_code.nativeElement.focus();
      }

    }
  }


  correction_code() {
    Swal.fire({
      icon: 'error',
      title: " Code ",
      html:
        '<table>' +
        '<tr> <td>Code </td><td> <input type="password" id="swal-input1" value="" class="swal2-input"   style="    margin-left: 16%;" ></td></tr>' +
        '</table>',
      focusConfirm: false,
      preConfirm: () => {
        return [(<HTMLInputElement>document.getElementById('swal-input1')).value,
        ]
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      this.a = result.value

      let test = this.a[2] || this.a[3]
      if (result.isConfirmed) {
        if (this.a[0] == 'utilisateur') {
          this.test_correction_code = false
          this.form.controls['code'].enable();
          this.form.controls["code"].setValue("");
          this.ref_code.nativeElement.focus();
        }
        else {
          Swal.fire({

            text: 'Vérifier vos données',
            imageUrl: './../assets/images/panne.png',
            imageWidth: 400,
            imageHeight: 400,

          })
        }
      }
    });

  }


  // temps d'attente pour le traitement de fonction 
  delai(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Enregistrer les données de of pour la prochaine étape 
  save_data_of() {
    let i = -1;
    for (let j = 0; j < this.historique_of.length; j++) {
      if (this.historique_of[j].of == this.form.get('of')?.value) {
        i = j;
        console.log(i)
      }
    }
    if (i > -1) {
      this.historique_of[i].nb = this.nb;
      this.historique_of[i].nb_carton_10 = this.nb_carton_10;
      this.historique_of[i].nb_carton_100 = this.nb_carton_100;
      this.historique_of[i].nb_carton_10_controle_100 = this.nb_carton_10_controle_100;
      this.historique_of[i].nb_print_carton_10 = this.nb_print_carton_10
      this.historique_of[i].nb_print_carton_100 = this.nb_print_carton_100
      localStorage.setItem('historique_of_dis', JSON.stringify(this.historique_of));
    }
  }

  // traitement sur agent 
  test_agent: any = false;
  nom_agent: any = ""
  set_agent(event: any) {
    if (event.key == "Enter") {
      let v = this.form.get('agent')?.value
      this.test_agent = false
      for (let i = 0; i < this.liste_agent.length; i++) {
        if (this.liste_agent[i].matricule == v) {
          this.nom_agent
          this.test_agent = true;
          this.nom_agent = this.liste_agent[i].nom
          this.lock();
          this.info = "OF : " + this.form.get('of')?.value + " ,agent: " + this.form.get('agent')?.value + ",Date : " + new Date().toLocaleString() + " , Qte : *";
          Swal.fire({
            icon: 'success',
            title: 'agent',
            showConfirmButton: false,
            timer: 1000
          })
          if (this.test_of) {
            this.ref_code.nativeElement.focus();
          }
          else {
            this.ref_of.nativeElement.focus();
            this.form.controls['agent'].disable();

          }

        }
      }
      if (this.test_agent == false) {
        this.form.controls["agent"].setValue("");
        Swal.fire({
          icon: 'error',
          title: '',
          text: 'Agent Inconnu ',
        })
      }
    }
  }

  // lock et unlock les of et le code agent 
  btnlock: any = false
  lock() {
    ///// lina code 
    this.form.controls['code'].enable();

    if (this.form.get('of')?.value == "" || this.form.get('agent')?.value == "" || this.test_agent == false || this.test_of == false) {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'ordre de fabrication ou agent manquant ',
      })
    }
    else {

      if (this.btnlock == false) {
        this.btnlock = true
        this.form.controls['of'].disable();
        this.form.controls['agent'].disable();
        this.form.controls['code'].enable();
      } else {

        Swal.fire({
          title: " Changer l'ordre de fabrication  ",
          html:
            '<table>' +
            '<tr><td>Code </td><td> <input type="password" id="swal-input1" value="" class="swal2-input"  margin-left: 16%;" ></td></tr>' +
            '</table>',
          focusConfirm: false,
          preConfirm: () => {
            return [(<HTMLInputElement>document.getElementById('swal-input1')).value,
            ]
          },
          allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
          this.a = result.value

          let test = this.a[2] || this.a[3]
          if (result.isConfirmed) {
            if (this.a[0] == 'utilisateur') {
              this.btnlock = false
              this.form.controls['of'].enable();
              this.form.controls['agent'].enable();
              this.form.controls['code'].disable();
            }
            else {
              Swal.fire({
                title: 'Erreur ',
                text: 'Vérifier vos données  ',
                icon: 'warning',
                confirmButtonText: 'ok',
              })
            }
          }
        });
      }
    }
  }


  // Parametre de code a barre  
  width: any = 2;
  height: any = 21;
  width_qr: any = 90;
  a: any;

  async slodee() {
    Swal.fire({
      title: " soldé  l'ordre de fabrication  ",
      html:
        '<table>' +
        '<tr><td>Code </td><td> <input type="password" id="swal-input1" value="" class="swal2-input"   margin-left: 16%;" ></td></tr>' +
        '</table>',
      focusConfirm: false,
      preConfirm: () => {
        return [(<HTMLInputElement>document.getElementById('swal-input1')).value,
        ]
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      this.a = result.value

      let test = this.a[2] || this.a[3]
      if (result.isConfirmed) {
        if (this.a[0] == 'utilisateur') {
          this.liste_of[this.index_ordre_fabrication].etat = "soldé"
          localStorage.setItem('liste_of_dis', JSON.stringify(this.liste_of));
          this.router.navigate(['/']);
        }
        else {
          Swal.fire({
            title: 'Erreur ',
            text: 'Vérifier vos données  ',
            icon: 'warning',
            confirmButtonText: 'ok',
          })
        }
      }
    });

  }

  async imprimer_slodee() {
    Swal.fire({
      title: " soldé l'ordre de fabrication  ",
      html:
        '<table>' +
        '<tr><td>Code </td><td> <input type="password" id="swal-input1" value="" class="swal2-input"   margin-left: 16%;" ></td></tr>' +
        '</table>',
      focusConfirm: false,
      preConfirm: () => {
        return [(<HTMLInputElement>document.getElementById('swal-input1')).value,
        ]
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      this.a = result.value
      let test = this.a[2] || this.a[3]
      if (result.isConfirmed) {
        if (this.a[0] == 'utilisateur') {
          this.imprimer_slodee_traitement()
        }
        else {
          Swal.fire({
            title: 'Erreur ',
            text: 'Vérifier vos données  ',
            icon: 'warning',
            confirmButtonText: 'ok',
          })
        }
      }
    });
  }

  async imprimer_slodee_traitement() {

    if (this.nb > 0) {
      this.info = "OF : " + this.form.get('of')?.value + " ,agent: " + this.form.get('agent')?.value + ",Date : " + new Date().toLocaleString() + " , Qte : " + this.nb;
      await this.delai(400);
      window.print()
      let a = this.nb
      this.nb = Number(this.nb_carton_10_controle_100) * 10 + Number(this.nb)
      if (this.test_et_100 == 1) {
        this.info = "OF : " + this.form.get('of')?.value + " ,agent: " + this.form.get('agent')?.value + ",Date : " + new Date().toLocaleString() + " , Qte : " + this.nb;
        await this.delai(3000);
        window.print()
      }

      this.liste_of[this.index_ordre_fabrication].etat = "soldé"
      localStorage.setItem('liste_of_dis', JSON.stringify(this.liste_of));
      this.router.navigate(['/']);
    }
    else if (this.nb == 0) {
      Swal.fire({
        title: 'Erreur ',
        icon: 'warning',
        confirmButtonText: 'ok',
      })
    }
  }

  reset() {
    Swal.fire({
      title: 'Êtes-vous sûr? ',
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'oui'
    }).then((result) => {
      if (result.isConfirmed) {
        this.form.controls["code"].setValue("");
        this.form.controls["of"].setValue("");
        this.form.controls["agent"].setValue("");
        this.val_resume = "";
        this.val_des = "";
        this.val_gamme = "";
        this.val_qte_reg = "";
        this.nb = 0
        this.nb_carton_10 = 0
        this.nb_carton_100 = 0
        this.nb_carton_10_controle_100 = 0
        this.nb_print_carton_10 = 0
        this.nb_print_carton_100 = 0

        Swal.fire(
          'Réinitialiser!',
          ' ',
          'success'
        )
      }
    })
  }

  sup_agent() {
    this.form.controls["agent"].setValue("");

  }


  sup_code() {
    this.form.controls["code"].setValue("");

  }

  sup_of() {
    this.form.controls["of"].setValue("");
  }
}
