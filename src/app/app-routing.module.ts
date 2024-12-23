import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { VagasComponent } from './components/vagas/vagas.component';
import { VagaDetalheComponent } from './components/vagas/vaga-detalhe/vaga-detalhe.component';
import { VagaListaComponent } from './components/vagas/vaga-lista/vaga-lista.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'user', redirectTo: 'user/perfil' },
      { path: 'vagas', redirectTo: 'vagas/lista' },
      {
        path: 'vagas',
        component: VagasComponent,
        children: [
          { path: 'detalhe/:id', component: VagaDetalheComponent },
          { path: 'detalhe', component: VagaDetalheComponent },
          { path: 'lista', component: VagaListaComponent },
        ],
      },

      { path: 'dashboard', component: DashboardComponent },
    ],
  },
  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent },
    ],
  },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
