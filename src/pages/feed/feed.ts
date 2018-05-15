import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';
import { FilmeDetalhesPage } from '../filme-detalhes/filme-detalhes';

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
  providers: [
    MoovieProvider
  ]
})
export class FeedPage {
  public objeto_feed = {
    titulo: "Marcelo Tadim",
    data: "Novembro 5, 1955",
    descricao: "Estou fazendo um App incrivel...",
    qntd_likes: 12,
    qntd_coments: 4,
    time_comment: "12h ago"
  }

  public lista_filmes = new Array<any>();
  public page = 1;
  public nome_usuario: string = "Marcelo Tadim, veio do código";
  public loader;
  public refresher;
  public isRefreshing: boolean = false;
  public infiniteScroll;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private MoovieProvider: MoovieProvider,
    public loadingCtrl: LoadingController
  ) {
  }

  abreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Por favor aguarde carregando filmes..."
    });
    this.loader.present();
  }

  fechaCarregando() {
    this.loader.dismiss();
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;
    this.carregarFilmes();
  }

  public somaDoisNumeros(num1: number, num2: number): void {
    alert(num1 + num2);
  }

  ionViewDidEnter() {
    this.carregarFilmes();
  }

  abrirDetalhes(filme) {
    console.log(filme);
    this.navCtrl.push(FilmeDetalhesPage, { id: filme.id });
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.infiniteScroll = infiniteScroll;
    this.carregarFilmes(true);

    infiniteScroll.complete();
  }
  //valor newpage para ele concatenar uma nova página
  carregarFilmes(newpage: boolean = false) {
    this.abreCarregando();
    this.MoovieProvider.getLatestMoovies(this.page).subscribe(
      data => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);

        if (newpage) {
          //Se for uma nova página só joga (adiciona) no final
          // Ou seja recebe ela mesma com objeto concatenado.

          this.lista_filmes = this.lista_filmes.concat(objeto_retorno.results);
          this.infiniteScroll.complete();

        } else {
          //se não for uma nova pagina adicone direto na lista de filmes

          this.lista_filmes = objeto_retorno.results;
        }

        this.fechaCarregando();
        if (this.isRefreshing) {
          this.refresher.complete();
          this.isRefreshing = false;
        }

      }, error => {
        console.log(error);
        this.fechaCarregando();
        if (this.isRefreshing) {
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }
    )
  }
}
