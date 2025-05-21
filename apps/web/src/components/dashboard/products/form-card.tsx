import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ReactNode } from "react";

export const ProductFormCategoryCard = ({
  children,
  title,
  description,
}: {
  children: ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">{children}</CardContent>
    </Card>
  );
};
