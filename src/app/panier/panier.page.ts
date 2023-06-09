import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PanierGlobale } from '../globales/panier.global';
import { Produit } from '../model/produit.model';
import { StockService } from '../services/stock.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.page.html',
  styleUrls: ['./panier.page.scss'],
})
export class PanierPage implements OnInit {

  panier: Produit[] = [];

  constructor(private stock: StockService,
    private router: Router) { }

  ngOnInit() {
    this.panier = PanierGlobale;
  }
  
  getImg(nom: string): string {
    return "http://127.0.0.1:8000/upload/images/produits/" + nom;
  }

  prixTotal() : number{
    let total : number = 0;
    this.panier.forEach(x => {
      total+=x.quantite*x.prix;
    })
    return total;
  }
}
