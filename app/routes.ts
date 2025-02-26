import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./layouts/main.layout.tsx", [index("./routes/main/home/page.tsx")]),
  layout("./layouts/auth.layout.tsx", [
    route("sign-up/", "./routes/auth/sign-up/page.tsx"),
    route("sign-in/", "./routes/auth/sign-in/page.tsx"),
    route("forgot-password/", "./routes/auth/forgot-password/page.tsx"),
    route("reset-password/", "./routes/auth/reset-password/page.tsx"),
  ]),
] satisfies RouteConfig;
