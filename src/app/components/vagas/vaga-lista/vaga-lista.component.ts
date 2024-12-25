import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Vaga } from 'src/app/models/Vaga';
import { VagaService } from 'src/app/services/Vaga.service';

@Component({
  selector: 'app-vaga-lista',
  templateUrl: './vaga-lista.component.html',
  styleUrls: ['./vaga-lista.component.scss']
})
export class VagaListaComponent implements OnInit {

  public vagas: Vaga[] = [];

  public eventoId = 0;

  // tslint:disable-next-line:variable-name
  private _filtroLista = '';

  modalRef!: BsModalRef;

  termoBuscaChanged: Subject<string> = new Subject<string>();

  constructor(
    private vagaService: VagaService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService) {

  }

  public ngOnInit(): void {
    this.getVagas();
  }

  public getVagas(): void {
    this.vagaService.getVagas().subscribe({
      next: (vagas: Vaga[]) => {
        this.vagas = vagas;
      },
      error: (error: any) => {
        console.log(error);
        this.spinner.hide();
        this.toastr.error('Erro ao Carregar os Vagas', 'Erro!');
      },
      complete: () => this.spinner.hide()
    });
  }

  openModal(event: any, template: TemplateRef<any>, eventoId: number): void {
    event.stopPropagation();
    this.eventoId = eventoId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef.hide();
    this.spinner.show();

    this.vagaService.deleteVaga(this.eventoId).subscribe(
      (result: any) => {
        if (result.message === 'Deletado') {
          this.toastr.success('O Vaga foi deletado com Sucesso.', 'Deletado!');
          this.getVagas();
        }
      },
      (error: any) => {
        console.error(error);
        this.toastr.error(`Erro ao tentar deletar o vaga ${this.eventoId}`, 'Erro');
      }
    ).add(() => this.spinner.hide());
  }

  decline(): void {
    this.modalRef.hide();
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  detalheVaga(id: number): void{
    this.router.navigate([`vagas/detalhe/${id}`]);
  }

}
