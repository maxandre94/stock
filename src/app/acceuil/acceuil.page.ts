import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PanierGlobale } from '../globales/panier.global';
import { Cat } from '../model/cat.model';
import { Produit } from '../model/produit.model';
import { StockService } from '../services/stock.service';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.page.html',
  styleUrls: ['./acceuil.page.scss'],
})
export class AcceuilPage implements OnInit {

  categories: Cat[] = [];
  produits: Produit[] = [];
  produitsAffiche: Produit[] = [];
  produitsProgress: Produit[] = [];
  categoriesProgress: Cat[] = [];
  selection: string = '';

  constructor(private stock: StockService,
    private router: Router) { }

  ngOnInit() {
    this.stock.getAllCategorie().subscribe((data) => {
      data["hydra:member"].forEach((element: Cat) => {
        if (element.active) {
          this.categories.push(element);
        }
      }
      )
    }
    )
    this.categoriesProgress = this.categories;

    this.stock.getAllProduit().subscribe((data) => {
      data["hydra:member"].forEach((element: Produit) => {
        if (element.active) {
          this.produits.push(element);
        }
      }
      )
    }
    )
    this.produitsProgress = this.produits;
  }

  onSelected(value: string, cherche : any) {
    if(cherche == null || cherche == undefined){
      cherche = '';
    }
    this.produitsProgress = [];
    this.selection = value;
    if (+value != 0 && cherche=='') {
      this.produitsProgress = this.produits.filter(x => x.produitCategorie === "/api/categories/" + value);
    }else if(+value!=0 && cherche !=''){
      let temps : Produit[] = [];
      temps = this.produits.filter(x => x.produitCategorie === "/api/categories/" + value);
      this.produitsProgress = temps.filter(x => x.nom.search(cherche)==0);
    } else if(+value==0 && cherche == '') {
      this.produitsProgress = this.produits;
    }else if(+value==0 && cherche != ''){
      this.produitsProgress = this.produits.filter(x => x.nom.search(cherche)==0);
    }

  }

  oncherche(recheche: any=''): Produit[] {
    this.produitsProgress = [];
    if (this.selection == '') {
      this.produitsProgress = this.produits;
      return this.produits;
    } else {
      this.produits.forEach(element => {
        if (element.produitCategorie === "/api/categories/" + this.selection) {
          if (element.nom.search(recheche) != -1) {
            this.produitsProgress.push(element);
          }
        }
      })
      return this.produitsProgress;
    }
  }

  onClick(value: Produit) {
    let index = PanierGlobale.indexOf(value);
    let indexP = this.produits.indexOf(value);
    if (index !== -1) {
      this.produits[indexP].select = false;
      PanierGlobale.splice(index, 1)
    } else {
      this.produits[indexP].select = true;
      value.quantite = 1;
      PanierGlobale.push(value);
    }
  }

  getImg(nom: string): string {
    return "http://127.0.0.1:8000/upload/images/produits/" + nom;
  }

  onPannier() {
    this.router.navigateByUrl('panier');
  }

  getNbProduitSelect(): number {
    return PanierGlobale.length;
  }

}
