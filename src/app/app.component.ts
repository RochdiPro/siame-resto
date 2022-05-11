import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, Observable } from 'rxjs';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'projet';
  click$: Observable<any> = fromEvent(document, 'click');
  rightClick$: Observable<any> = fromEvent(document, 'auxclick');
  mouseOver$: Observable<any> = fromEvent(document, 'mouseover');
  wheel$: Observable<any> = fromEvent(document, 'wheel');
  d$: Observable<any> = fromEvent(document, 'keypress');
 ch:any=""
 i:any=0;
 result_type_dis:any;
private subscribeToObservables() {

  this.d$.subscribe((data:any) => { 
     
      let start = 1;
      if(data.key=="0")
      {           
        this.ch=this.ch+data.key
        start=0      
        if(this.ch=="0000000000000000")   
        {
          this.router.navigate([''])
        }  
      }
     
      else {
        start=1
        this.ch=""
      }

      
    
  } );
  
 }
ngOnInit() {
  this.subscribeToObservables();
 }
 constructor(   private router: Router ) {
 }
  

}
