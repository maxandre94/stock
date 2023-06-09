export class Produit {
    id!: number;
    nom!: string;
    prix!: number;
    active!: boolean;
    quantite!: number;
    produitCategorie!: string;
    img!: string;
    select: boolean = false;
}