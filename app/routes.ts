import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("./layouts/main.layout.tsx", [index("./routes/main/home/page.tsx")]),
  layout("./layouts/auth.layout.tsx", [route('sign-up/',"./routes/auth/sign-up/page.tsx")]),
] satisfies RouteConfig;
