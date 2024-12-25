import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Vaga } from 'src/app/models/Vaga';
import { VagaService } from 'src/app/services/Vaga.service';

@Component({
  selector: 'app-vaga-detalhe',
  templateUrl: './vaga-detalhe.component.html',
  styleUrls: ['./vaga-detalhe.component.scss']
})
export class VagaDetalheComponent implements OnInit {

  modalRef!: BsModalRef;
  vagaId!: number;
  vaga = {} as Vaga;
  form!: FormGroup;
  estadoSalvar = 'post';

  get modoEditar(): boolean {
    return this.estadoSalvar === 'put';
  }

  get lotes(): FormArray {
    return this.form.get('lotes') as FormArray;
  }

  get f(): any {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private vagaService: VagaService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private router: Router,
  ) {

  }

  public carregarVaga(): void {
    // tslint:disable-next-line:no-non-null-assertion
    this.vagaId = + this.activatedRouter.snapshot.paramMap.get('id')!;

    if (this.vagaId !== null && this.vagaId !== 0) {
      this.spinner.show();

      this.estadoSalvar = 'put';

      this.vagaService
        .getVagaById(this.vagaId)
        .subscribe(
          (vaga: Vaga) => {
            this.vaga = { ...vaga };
            this.form.patchValue(this.vaga);
          },
          (error: any) => {
            this.toastr.error('Erro ao tentar carregar Vaga.', 'Erro!');
            console.error(error);
          }
        )
        .add(() => this.spinner.hide());
    }
  }

  ngOnInit(): void {
    this.carregarVaga();
    this.validation();
  }

  public validation(): void {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
    });
  }

  public resetForm(): void {
    this.form.reset();
  }

  public cssValidator(campoForm: FormControl | AbstractControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  public salvarVaga(): void {
    this.spinner.show();
    if (this.form.valid) {
      this.vaga =
        this.estadoSalvar === 'post'
          ? { ...this.form.value }
          : { id: this.vaga.id, ...this.form.value };

      // this.vagaService[this.estadoSalvar](this.vaga).subscribe(
      this.vagaService.post(this.vaga).subscribe(
        (vagaRetorno: Vaga) => {
          this.toastr.success('Vaga salva com Sucesso!', 'Sucesso');
          this.router.navigate([`vaga/detalhe/${vagaRetorno.id}`]);
        },
        (error: any) => {
          console.error(error);
          this.spinner.hide();
          this.toastr.error('Error ao salvar vaga', 'Erro');
        },
        () => this.spinner.hide()
      );
    }
  }

}



