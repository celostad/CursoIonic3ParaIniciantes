import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers:[
    MoovieProvider
  ]
})
export class FeedPage {
  public objeto_feed = {
    titulo:"Marcelo Tadim",
    data:"Novembro 5, 1955",
    descricao:"Estou fazendo um App incrivel...",
    qntd_likes:12,
    qntd_coments:4,
    time_comment:"12h ago"
  }

  public nome_usuario:string = "Marcelo Tadim, veio do código";

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
    private MoovieProvider: MoovieProvider) {
  }

  public somaDoisNumeros(num1:number, num2:number):void{
    alert(num1 + num2);
  }

  ionViewDidLoad() {
    //this.somaDoisNumeros(10, 99);
    this.MoovieProvider.getLatestMoovies().subscribe(
      data=>{
        const response =(data as any);
        const objet_retorno = JSON.parse(response._body);
        console.log(objet_retorno);
      }, error =>{
        console.log(error);
      }
    )
  }

}
