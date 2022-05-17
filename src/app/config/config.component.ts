import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Papa } from 'ngx-papaparse';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { DocumentViewerOptions } from '@awesome-cordova-plugins/document-viewer/ngx';
import { FormControl, FormGroup } from '@angular/forms';
const pdfMake = require("pdfmake/build/pdfmake");
const pdfFonts = require("pdfmake/build/vfs_fonts");

pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {


  liste_employe: any = [];
  mois: any;
  annee: any;
  fileNameEmploye: any;
  form: any = new FormGroup({
    anne: new FormControl(""),
    mois: new FormControl(""),
  });

  constructor(private papa: Papa, private http: HttpClient, private datePipe: DatePipe) {

    this.liste_employe = JSON.parse(localStorage.getItem('liste_employe') + "");
    this.chargerTemplate();
    this.templatePdfBase64();
    this.mois = new Date().getMonth() + 1
    this.annee = new Date().getFullYear();


  }


  choix_anne(ev: any) {
    this.annee = ev.value;
  }

  choix_mois(ev: any) {
    this.mois = ev.value;
  }

  ngOnInit(): void {
  }
  ch: any; obj: any;
  public readagent(ev: any): void {
    let file = ev.target.files[0];
    let fileReader: FileReader = new FileReader();
    let self = this;

    fileReader.onloadend = () => {
      this.ch = fileReader.result
      let t = this.ch.split('\n');
      this.liste_employe = []
      for (let i = 1; i < t.length; i++) {
        let t2 = t[i].split(",");
        this.obj = {}
        this.obj.code = t2[0]
        this.obj.nom = t2[1]
        this.obj.etat = "oui"
        this.obj.date = []

        if (this.obj.code != undefined || this.obj.code != "" || this.obj.code != " ") {
          this.liste_employe.push(this.obj)

        }
      }
      localStorage.setItem('liste_employe', JSON.stringify(this.liste_employe));
      localStorage.setItem('jour_ticket', JSON.stringify(  "3333333"));
      localStorage.setItem('mois_ticket', JSON.stringify("333333"));
      localStorage.setItem('annee_ticket', JSON.stringify("33333333"));
    }
    fileReader.readAsText(file);
  }

  modele: any
  modeleSrc: any;
  e: any = {}
  pdfObj: any;
  //Fixer le temps de chargement du modéle
  delai(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  //Définir le modéle pour pdf 
  async templatePdfBase64() {
    await this.delai(3000);
    const reader = new FileReader();
    reader.onloadend = () => {
      this.modeleSrc = reader.result;
      this.modeleSrc = btoa(this.modeleSrc);
      this.modeleSrc = atob(this.modeleSrc);
      this.modeleSrc = this.modeleSrc.replace(/^data:image\/[a-z]+;base64,/, "");
    }
    reader.readAsDataURL(this.modele);
  }


  //Charger le modéle de PDF
  async chargerTemplate() {
    this.http.get('assets/images/pdf.jpg', { responseType: 'blob' }).subscribe((resp: any) => {
      this.modele = resp;
      return this.modele;
    }, err => console.error(err),
      () => console.log())
  }

  // generation du rapport
  testpdf:any=false; 
  async generatePDF() {
    this.testpdf=true;
    await this.delai (2000);
    this.testpdf=false
    this.PDF() ;
     
  }

  // generation du rapport 
  async  PDF() {
     let moispdf = ""
    if (this.mois == 1) { moispdf = 'Janvier' }
    if (this.mois == 2) { moispdf = 'Février' }
    if (this.mois == 3) { moispdf = 'Mars' }
    if (this.mois == 4) { moispdf = 'Avril' }
    if (this.mois == 5) { moispdf = 'Mai' }
    if (this.mois == 6) { moispdf = 'Juin' }
    if (this.mois == 7) { moispdf = 'Juillet' }
    if (this.mois == 8) { moispdf = 'Août' }
    if (this.mois == 9) { moispdf = 'Septembre' }
    if (this.mois == 10) { moispdf = 'Octobre' }
    if (this.mois == 11) { moispdf = 'Novembre' }
    if (this.mois == 12) { moispdf = 'Décembre' }
    var body: any = [];
    var obj = new Array();
    this.e = { text: "Code", alignment: 'center' }
    obj.push(this.e)

    this.e = { text: "Nom" }
    obj.push(this.e)

    this.e = { text: "01", alignment: 'center' }
    obj.push(this.e)
    this.e = { text: "02", alignment: 'center' }
    obj.push(this.e)
    this.e = { text: "03", alignment: 'center' }
    obj.push(this.e)
    this.e = { text: "04", alignment: 'center' }
    obj.push(this.e)
    this.e = { text: "05", alignment: 'center' }
    obj.push(this.e)
    this.e = { text: "06", alignment: 'center' }
    obj.push(this.e)
    this.e = { text: "07", alignment: 'center' }
    obj.push(this.e)
    this.e = { text: "08", alignment: 'center' }
    obj.push(this.e)
    this.e = { text: "09", alignment: 'center' }
    obj.push(this.e)


    this.e = { text: "10", alignment: 'center' }
    obj.push(this.e)
    this.e = { text: "12", alignment: 'center' }
    obj.push(this.e)
    this.e = { text: "13", alignment: 'center' }
    obj.push(this.e)
    this.e = { text: "14", alignment: 'center' }
    obj.push(this.e)
    this.e = { text: "15", alignment: 'center' }
    obj.push(this.e)
    this.e = { text: "16", alignment: 'center' }
    obj.push(this.e)
    this.e = { text: "17", alignment: 'center' }
    obj.push(this.e)
    this.e = { text: "18", alignment: 'center' }
    obj.push(this.e)
    this.e = { text: "19", alignment: 'center' }
    obj.push(this.e)


    this.e = { text: "20", alignment: 'center' }
    obj.push(this.e)
    this.e = { text: "21", alignment: 'center' }
    obj.push(this.e)
    this.e = { text: "22", alignment: 'center' }
    obj.push(this.e)
    this.e = { text: "23", alignment: 'center' }
    obj.push(this.e)
    this.e = { text: "24", alignment: 'center' }
    obj.push(this.e)
    this.e = { text: "25", alignment: 'center' }
    obj.push(this.e)
    this.e = { text: "26", alignment: 'center' }
    obj.push(this.e)
    this.e = { text: "27", alignment: 'center' }
    obj.push(this.e)
    this.e = { text: "28", alignment: 'center' }
    obj.push(this.e)
    this.e = { text: "29", alignment: 'center' }
    obj.push(this.e)

    this.e = { text: "30", alignment: 'center' }
    obj.push(this.e)
    this.e = { text: "31", alignment: 'center' }
    obj.push(this.e)
    this.e = { text: "N.J", alignment: 'center' }
    obj.push(this.e)
    body.push(obj)



    for (let i = 0; i < this.liste_employe.length; i++) {
      if (this.liste_employe[i].nom != "" && this.liste_employe[i].nom != undefined) {
        var obj = new Array();
        this.e = { text: this.liste_employe[i].code, alignment: 'center' }
        obj.push(this.e)

        this.e = { text: this.liste_employe[i].nom }
        obj.push(this.e)
        let nb = 0;
        if (this.liste_employe[i].date.length == 0) {
          this.e = { text: "", alignment: 'center' }
          obj.push(this.e);
          obj.push(this.e)
          obj.push(this.e)
          obj.push(this.e)
          obj.push(this.e)
          obj.push(this.e)
          obj.push(this.e)
          obj.push(this.e)
          obj.push(this.e)
          obj.push(this.e)

          obj.push(this.e);
          obj.push(this.e)
          obj.push(this.e)
          obj.push(this.e)
          obj.push(this.e)
          obj.push(this.e)
          obj.push(this.e)
          obj.push(this.e)
          obj.push(this.e)
          obj.push(this.e)

          obj.push(this.e);
          obj.push(this.e)
          obj.push(this.e)
          obj.push(this.e)
          obj.push(this.e)
          obj.push(this.e)
          obj.push(this.e)
          obj.push(this.e)
          obj.push(this.e) 
          obj.push(this.e)
          this.e = { text: 0  } 
          obj.push(this.e)

          body.push(obj)

        } else {
          for (let k = 0; k < 31; k++) {
            this.e = ""; obj.push(this.e);
          }

          nb = 0;
          for (let j = 0; j < this.liste_employe[i].date.length; j++) {
            if (this.liste_employe[i].date[j].mois == this.mois && this.liste_employe[i].date[j].annee == this.annee && this.liste_employe[i].date[j].jour == "1") {
              nb = Number(nb) + 1; obj[1] = "*"
            }
            if (this.liste_employe[i].date[j].mois == this.mois && this.liste_employe[i].date[j].annee == this.annee && this.liste_employe[i].date[j].jour == "2") {
              nb = Number(nb) + 1; obj[2] = "*"
            }
            if (this.liste_employe[i].date[j].mois == this.mois && this.liste_employe[i].date[j].annee == this.annee && this.liste_employe[i].date[j].jour == "3") {
              nb = Number(nb) + 1; obj[3] = "*"
            }
            if (this.liste_employe[i].date[j].mois == this.mois && this.liste_employe[i].date[j].annee == this.annee && this.liste_employe[i].date[j].jour == "4") {
              nb = Number(nb) + 1; obj[4] = "*"
            }
            if (this.liste_employe[i].date[j].mois == this.mois && this.liste_employe[i].date[j].annee == this.annee && this.liste_employe[i].date[j].jour == "5") {
              nb = Number(nb) + 1; obj[5] = "*"
            }
            if (this.liste_employe[i].date[j].mois == this.mois && this.liste_employe[i].date[j].annee == this.annee && this.liste_employe[i].date[j].jour == "6") {
              nb = Number(nb) + 1; obj[6] = "*"
            }
            if (this.liste_employe[i].date[j].mois == this.mois && this.liste_employe[i].date[j].annee == this.annee && this.liste_employe[i].date[j].jour == "7") {
              nb = Number(nb) + 1; obj[7] = "*"
            }
            if (this.liste_employe[i].date[j].mois == this.mois && this.liste_employe[i].date[j].annee == this.annee && this.liste_employe[i].date[j].jour == "8") {
              nb = Number(nb) + 1; obj[8] = "*"
            }
            if (this.liste_employe[i].date[j].mois == this.mois && this.liste_employe[i].date[j].annee == this.annee && this.liste_employe[i].date[j].jour == "9") {
              nb = Number(nb) + 1; obj[9] = "*"
            }
            if (this.liste_employe[i].date[j].mois == this.mois && this.liste_employe[i].date[j].annee == this.annee && this.liste_employe[i].date[j].jour == "10") {
              nb = Number(nb) + 1; obj[10] = "*"
            }


            if (this.liste_employe[i].date[j].mois == this.mois && this.liste_employe[i].date[j].annee == this.annee && this.liste_employe[i].date[j].jour == "11") {
              nb = Number(nb) + 1; obj[11] = "*"
            }
            if (this.liste_employe[i].date[j].mois == this.mois && this.liste_employe[i].date[j].annee == this.annee && this.liste_employe[i].date[j].jour == "12") {
              nb = Number(nb) + 1; obj[12] = "*"
            }
            if (this.liste_employe[i].date[j].mois == this.mois && this.liste_employe[i].date[j].annee == this.annee && this.liste_employe[i].date[j].jour == "13") {
              nb = Number(nb) + 1; obj[13] = "*"
            }
            if (this.liste_employe[i].date[j].mois == this.mois && this.liste_employe[i].date[j].annee == this.annee && this.liste_employe[i].date[j].jour == "14") {
              nb = Number(nb) + 1; obj[14] = "*"
            }
            if (this.liste_employe[i].date[j].mois == this.mois && this.liste_employe[i].date[j].annee == this.annee && this.liste_employe[i].date[j].jour == "15") {
              nb = Number(nb) + 1; obj[15] = "*"
            }
            if (this.liste_employe[i].date[j].mois == this.mois && this.liste_employe[i].date[j].annee == this.annee && this.liste_employe[i].date[j].jour == "16") {
              nb = Number(nb) + 1; obj[16] = "*"
            }
            if (this.liste_employe[i].date[j].mois == this.mois && this.liste_employe[i].date[j].annee == this.annee && this.liste_employe[i].date[j].jour == "17") {
              nb = Number(nb) + 1; obj[17] = "*"
            }
            if (this.liste_employe[i].date[j].mois == this.mois && this.liste_employe[i].date[j].annee == this.annee && this.liste_employe[i].date[j].jour == "18") {
              nb = Number(nb) + 1; obj[18] = "*"
            }
            if (this.liste_employe[i].date[j].mois == this.mois && this.liste_employe[i].date[j].annee == this.annee && this.liste_employe[i].date[j].jour == "19") {
              nb = Number(nb) + 1; obj[19] = "*"
            }
            if (this.liste_employe[i].date[j].mois == this.mois && this.liste_employe[i].date[j].annee == this.annee && this.liste_employe[i].date[j].jour == "20") {
              nb = Number(nb) + 1; obj[20] = "*"
            }

            if (this.liste_employe[i].date[j].mois == this.mois && this.liste_employe[i].date[j].annee == this.annee && this.liste_employe[i].date[j].jour == "21") {
              nb = Number(nb) + 1; obj[21] = "*"
            }
            if (this.liste_employe[i].date[j].mois == this.mois && this.liste_employe[i].date[j].annee == this.annee && this.liste_employe[i].date[j].jour == "22") {
              nb = Number(nb) + 1; obj[22] = "*"
            }
            if (this.liste_employe[i].date[j].mois == this.mois && this.liste_employe[i].date[j].annee == this.annee && this.liste_employe[i].date[j].jour == "23") {
              nb = Number(nb) + 1; obj[23] = "*"
            }
            if (this.liste_employe[i].date[j].mois == this.mois && this.liste_employe[i].date[j].annee == this.annee && this.liste_employe[i].date[j].jour == "24") {
              nb = Number(nb) + 1; obj[24] = "*"
            }
            if (this.liste_employe[i].date[j].mois == this.mois && this.liste_employe[i].date[j].annee == this.annee && this.liste_employe[i].date[j].jour == "25") {
              nb = Number(nb) + 1; obj[25] = "*"
            }
            if (this.liste_employe[i].date[j].mois == this.mois && this.liste_employe[i].date[j].annee == this.annee && this.liste_employe[i].date[j].jour == "26") {
              nb = Number(nb) + 1; obj[26] = "*"
            }
            if (this.liste_employe[i].date[j].mois == this.mois && this.liste_employe[i].date[j].annee == this.annee && this.liste_employe[i].date[j].jour == "27") {
              nb = Number(nb) + 1; obj[27] = "*"
            }
            if (this.liste_employe[i].date[j].mois == this.mois && this.liste_employe[i].date[j].annee == this.annee && this.liste_employe[i].date[j].jour == "28") {
              nb = Number(nb) + 1; obj[28] = "*"
            }
            if (this.liste_employe[i].date[j].mois == this.mois && this.liste_employe[i].date[j].annee == this.annee && this.liste_employe[i].date[j].jour == "29") {
              nb = Number(nb) + 1; obj[29] = "*"
            }
            if (this.liste_employe[i].date[j].mois == this.mois && this.liste_employe[i].date[j].annee == this.annee && this.liste_employe[i].date[j].jour == "30") {
              nb = Number(nb) + 1; obj[30] = "*"
            }

            if (this.liste_employe[i].date[j].mois == this.mois && this.liste_employe[i].date[j].annee == this.annee && this.liste_employe[i].date[j].jour == "30") {
              nb = Number(nb) + 1; obj[31] = "*"
            }

          }
          obj[32] = "" + nb
          body.push(obj)
        }
      }
    }

    let date_edit = this.datePipe.transform(new Date(), 'dd/MM/yyyy  HH:MM');
    var obj = new Array();
    var def = {
      background: [
        {
          image: 'data:image/jpeg;base64,' + this.modeleSrc, width: 600
        }
      ],
      defaultStyle: {
        alignment: 'centre'
      },
      pageMargins: [40, 40, 40, 40],
      pageOrientation: 'landscape',

      info: {
        title: 'Siame',
      },

      header: [
        {
          text: ' Mois : ' + moispdf,
          fontSize: 12,
          color: 'black',

          relativePosition: { x: 200, y: 40 }
        },
        {
          text: ' Année : ' + this.annee,
          fontSize: 12,
          color: 'black',

          relativePosition: { x: 200, y: 70 }
        },
        {
          text: '  éditer le ' + date_edit,
          fontSize: 12,
          color: 'black',

          relativePosition: { x: 200, y: 100 }
        },
        {
          text: '  Rapport Cantine',
          fontSize: 18,
          color: '#1E90FF',
          blod: true,
          relativePosition: { x: 500, y: 60 }
        },
      ],
      content: [
        {
          table: {
            widths: [30, 100, 11, 11, 11, 11, 11, 11, 11, 11, 11, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 36],
            body: body,
          },
          fontSize: 8,
          margin: [-32, 95, 0, 0],

        }
      ],

    };

   
    this.pdfObj = pdfMake.createPdf(def);
     pdfMake.createPdf(def).open({ defaultFileName: 'facture' + new Date() + '.pdf' });
    const options: DocumentViewerOptions = {
      title: 'My PDF'
    }
  }


}
