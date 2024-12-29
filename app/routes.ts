import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

export default [
  layout('./layouts/MainLayout.tsx', [
    index('routes/public/Home/index.tsx'),
    route('cart/', './routes/public/Cart/index.tsx')
  ]),
  layout('./layouts/AuthLayout.tsx', [
    route('/login', './routes/auth/Login/index.tsx'),
    route('/sign-up', './routes/auth/SignUp/index.tsx'),
    route('/forgot-password', './routes/auth/ForgotPassword/index.tsx')
  ]),
  layout('./layouts/AdminLayout.tsx', [
    route('admin/dashboard', './routes/admin/Dashboard/index.tsx'),
    route('admin/orders', './routes/admin/Orders/index.tsx'),
    route('admin/customers', './routes/admin/Customers/index.tsx'),
    route('admin/settings', './routes/admin/Settings/index.tsx'),
    route('admin/products', './routes/admin/Products/index.tsx')
  ])
] satisfies RouteConfig;
