import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'ngv-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutUsComponent implements OnInit, OnDestroy {
  slides2 = [
    {img: "assets/front-images4.jpg",text:''},
    {img: "assets/front-images.png",text:'Software-Development'},
    {img: "assets/front-images2.jpg",text:'Search engine optimization'},
    {img: "assets/front-images3.jpg",text:'Responsive websites'}
  ];

  slides = [
    {img: "assets/group-pic/vrd-group1.jpeg"},
    {img: "assets/group-pic/vrd-group2.jpeg"},
    {img: "assets/group-pic/vrd-group3.jpeg"},
    {img: "assets/group-pic/vrd-group4.jpg"}
  ];
  interval;
  count=0;
  ngOnInit() {
    this.interval = setInterval(() =>{
      this.next();
    },2000) 
  }
  
  next(){
    if(this.count < this.slides.length-1){
      this.count++;
    } else {
      this.count=0;
    }
  }
  prev(){
    if(this.count>0){
      this.count--;
    } else {
      this.count=this.slides.length-1;
    }
  }

  ngOnDestroy(){
    if(this.interval){
      clearInterval(this.interval);
    }
  }
}
