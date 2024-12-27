import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

export default [
  layout('./layouts/MainLayout.tsx', [
    index('routes/public/Home/index.tsx'),
    route('cart/', './routes/public/Cart/index.tsx')
  ]),
  layout('./layouts/AuthLayout.tsx', [
    route('/login', './routes/auth/Login/index.tsx'),
    route('/register', './routes/auth/Register/index.tsx'),
    route('/forgot-password', './routes/auth/ForgotPassword/index.tsx')
  ]),
  layout('./layouts/AdminLayout.tsx', [
    route('admin/dashboard/', './routes/admin/Dashboard/index.tsx')
  ])
] satisfies RouteConfig;
