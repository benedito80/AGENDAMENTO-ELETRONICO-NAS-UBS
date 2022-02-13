import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { ModalService, TipoModal } from 'src/app/shared/modal.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private userService: AuthService,
    private router: Router,
    private alertService: ModalService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (
      !(
        this.userService.isLoggedIn() && this.userService.getFuncao() == 'admin'
      )
    ) {
      this.userService.mostrarMenuAdminEmitter.emit(false);
      this.userService.mostrarMenuUserEmitter.emit(false);
      this.userService.mostrarMenuProfEmitter.emit(false);
      this.userService.mostrarMenuSupEmitter.emit(false);
      this.userService.setToken('', '', '', '');
      this.alertService.showModalPerigo('Sua Sessão Expirou!', TipoModal.INFO);
      this.router.navigateByUrl('/admin/login');
      return false;
    }

    return true;
  }
}
