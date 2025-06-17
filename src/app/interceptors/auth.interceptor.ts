import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = localStorage.getItem('auth_token');

  if (authToken && req.url.startsWith(environment.apiUrl)) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`),
    });
    return next(authReq);
  }

  return next(req);
};
