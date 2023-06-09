import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cat } from '../model/cat.model';
import { StockService } from '../services/stock.service';
import * as shajs from 'sha.js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  connexionForm!: FormGroup;
  categories: Cat[] = [];

  constructor(private router: Router,
    private formBuilder: FormBuilder){}

  ngOnInit(): void {
  //   this.stock.getAllCategorie().subscribe((data)=>
  //   {
  //     data["hydra:member"].forEach((element: Cat)=>
  //       {
  //         this.categories.push(element);
  //         console.log(element);
  //       }
  //     )
  //     console.log(this.categories);
  //   }
  // )
  // let pas = shajs('sha256').update('max').digest('hex')
  // console.log(pas)
  // let pas1 = shajs('sha256').update('max').digest('hex')
  // pas === pas1 ? console.log(true) : console.log(false);
  this.connexionForm = this.formBuilder.group({
    email: [null, [Validators.required]],
    mp: [null, [Validators.required]]
    });

  }

  submitForm(){
    console.log(this.connexionForm.value)
  }

  onConnexion(){
    this.router.navigateByUrl('acceuil');
  }

  onInscription(){
    this.router.navigateByUrl('inscription')
  }
}
