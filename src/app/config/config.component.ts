import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  liste_produit: any = [];
  liste_agent: any = [];
  liste_of: any = [];
  historique_of: any = [];
  accees_admin: any;
  constructor(private papa: Papa) {
    this.liste_produit = JSON.parse(localStorage.getItem('liste_produit') + "");
    this.liste_agent = JSON.parse(localStorage.getItem('liste_agent') + "");
    this.liste_of = JSON.parse(localStorage.getItem('liste_of') + "");
    this.accees_admin = JSON.parse(localStorage.getItem('accees_admin') + "");
    this.historique_of = JSON.parse(localStorage.getItem('historique_of') + "");
  }


  data: any
  headerRow: any = [];
  csvData: any = [];
  exporter() {
    Swal.fire({
      title: 'Code',
      html:
        '<table>' +
        '<tr><td>Code</td><td> <input id="swal-input1" value="" class="swal2-input"   ></td></tr>' +
        '</table>',
      focusConfirm: false,
      preConfirm: () => {
        return [(<HTMLInputElement>document.getElementById('swal-input1')).value,
        ]
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      this.a = result.value
      if (result.isConfirmed) {
        if (this.a[0] == 'infonet') {
          this.headerRow = [];
          this.csvData = [];
          this.headerRow.push('of')
          this.headerRow.push('carton_10')
          this.headerRow.push('carton_100')
          this.headerRow.push('Quantite')
          for (var item in this.historique_of) {
            const t = [];
            t.push(this.historique_of[item].of)
            t.push(this.historique_of[item].nb_print_carton_10)
            t.push(this.historique_of[item].nb_print_carton_100)
            let nb = Number(Number(this.historique_of[item].nb_print_carton_10) * 10) + Number(this.historique_of[item].nb)
            t.push(nb)
            t.push("")
            this.csvData.push(t);
          }

          let csv = this.papa.unparse({
            fields: this.headerRow,
            data: this.csvData
          });
          var blob = new Blob([csv]);
          var a = window.document.createElement('a');
          a.href = window.URL.createObjectURL(blob);
          a.download = 'Historique_of_lampes.csv';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
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

  ngOnInit(): void {
  }
  ch: any;

  public readof(ev: any): void {
    let file = ev.target.files[0];
    let fileReader: FileReader = new FileReader();
    let self = this;

    fileReader.onloadend = () => {
      this.ch = fileReader.result
      let t = this.ch.split('\n');
      this.liste_of = []

      for (let i = 1; i < t.length; i++) {
        let t2 = t[i].split(",");
        this.obj = {}
        this.obj.code_of = t2[0]
        this.obj.code_fl = t2[1]
        this.obj.e100 = t2[2]
        this.obj.etat = "lancé"


        if (this.obj.code_of != undefined || this.obj.code_of != " ") {
          if ((this.obj.code_of == "") == false) {
            this.liste_of.push(this.obj)
          }

        }
      }
      localStorage.setItem('liste_of', JSON.stringify(this.liste_of));

    }
    fileReader.readAsText(file);
  }
  obj: any = {}
  o: any;
  public readproduit(ev: any): void {
    let file = ev.target.files[0];
    let fileReader: FileReader = new FileReader();
    let self = this;

    fileReader.onloadend = () => {
      this.ch = fileReader.result
      let t = this.ch.split('\n');
      this.liste_produit = []
      for (let i = 1; i < t.length; i++) {
        let t2 = t[i].split(",");
        this.obj = {}
        this.obj.codefl = t2[0]
        this.obj.code = t2[1]
        this.obj.gamme = t2[2]
        this.obj.culot = t2[4]
        this.obj.puissance = t2[3]
        this.obj.couleur = t2[5]
        this.obj.e100 = t2[6]
        if (this.obj.code != undefined || this.obj.code != " ") {
          this.liste_produit.push(this.obj)
        }
      }
      localStorage.setItem('liste_produit', JSON.stringify(this.liste_produit));

    }
    fileReader.readAsText(file);
  }

  public readagent(ev: any): void {
    let file = ev.target.files[0];
    let fileReader: FileReader = new FileReader();
    let self = this;

    fileReader.onloadend = () => {
      this.ch = fileReader.result
      let t = this.ch.split('\n');
      this.liste_agent = []
      for (let i = 1; i < t.length; i++) {
        let t2 = t[i].split(",");
        this.obj = {}
        this.obj.matricule = t2[0]
        this.obj.nom = t2[1]

        if (this.obj.matricule != undefined || this.obj.matricule != "" || this.obj.matricule != " ") {
          this.liste_agent.push(this.obj)

        }
      }
      localStorage.setItem('liste_agent', JSON.stringify(this.liste_agent));

    }
    fileReader.readAsText(file);
  }


  a: any;
  ajouter() {

    Swal.fire({
      title: 'Ordre de fabrication',
      html:
        '<table>' +
        '<tr><td>N° OF</td><td> <input id="swal-input1" value="" class="swal2-input"  placeholder="OF" ></td></tr>' +
        '<tr><td>Code FL</td><td><input id="swal-input2" value="" class="swal2-input"  placeholder="FL..." >  </td></tr>' +

        '</table>',
      focusConfirm: false,
      preConfirm: () => {
        return [(<HTMLInputElement>document.getElementById('swal-input1')).value,
        (<HTMLInputElement>document.getElementById('swal-input2')).value,

        ]
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      this.a = result.value

      if (result.isConfirmed) {
        if (this.a[0] == '' || this.a[1] == '') {
          Swal.fire({
            title: 'Erreur ',
            text: 'Vérifier vos données  ',
            icon: 'warning',
            confirmButtonText: 'ok',
          })
        }
        else {
          this.obj = {}
          this.obj.code_of = this.a[0]
          this.obj.code_fl = this.a[1]
          this.obj.e100 = -1
          for (let j = 0; j < this.liste_produit.length; j++) {
            if (this.a[1] == this.liste_produit[j].codefl) {
              this.obj.e100 = this.liste_produit[j].e100
            }
          }

          this.obj.etat = "lancé"
          if (this.obj.e100 == -1) {
            Swal.fire({
              title: 'Erreur ',
              text: 'Code article ',
              icon: 'warning',
              confirmButtonText: 'ok',
            })
          }
          this.liste_of.push(this.obj)
          localStorage.setItem('liste_of', JSON.stringify(this.liste_of));

          Swal.fire(
            'succés',
            'Ordre de fabrication ',
            'success'
          )
        }
      }

    });
  }


  ajouter_agent() {

    Swal.fire({
      title: 'Agent',
      html:
        '<table>' +
        '<tr><td>Matricule</td><td> <input id="swal-input1" value="" class="swal2-input"  placeholder="" ></td></tr>' +
        '<tr><td>Nom</td><td><input id="swal-input2" value="" class="swal2-input"  placeholder="" >  </td></tr>' +

        '</table>',
      focusConfirm: false,
      preConfirm: () => {
        return [(<HTMLInputElement>document.getElementById('swal-input1')).value,
        (<HTMLInputElement>document.getElementById('swal-input2')).value,

        ]
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      this.a = result.value

      if (result.isConfirmed) {
        if (this.a[0] == '' || this.a[1] == '') {
          Swal.fire({
            title: 'Erreur ',
            text: 'Vérifier vos données  ',
            icon: 'warning',
            confirmButtonText: 'ok',
          })
        }
        else {
          this.obj = {}

          this.obj.matricule = this.a[0]
          this.obj.nom = this.a[1]

          this.liste_agent.push(this.obj)
          localStorage.setItem('liste_agent', JSON.stringify(this.liste_agent));

          Swal.fire(
            'succés',
            'Agent ',
            'success'
          )
        }
      }

    });
  }
}
