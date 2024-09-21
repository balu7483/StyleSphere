import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(){

  }

  public slides = [
    {
      src: '../../../assets/Images/carousel1.webp'
    },
    {
      src: '../../../assets/Images/carousel2.webp'
    },
    {
      src: '../../../assets/Images/carousel3.webp'
    }
];
public slides1 = [
  {
    src: '../../../assets/Images/levis.webp'
  },
  {
    src: '../../../assets/Images/addida.webp'
  },
  {
    src: '../../../assets/Images/puma.webp'
  }
];



  ngOnInit(): void {
    
  }
}
