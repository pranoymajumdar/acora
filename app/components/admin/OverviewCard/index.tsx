import { LucideArrowUp } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';

export default function OverviewCard({
  title,
  titleData,
  contentData,
  footerData
}: {
  title: string;
  titleData: string;
  contentData: string;
  footerData: string;
}) {
  return (
    <Card className="w-full flex-shrink-0 gap-0">
      <CardHeader className="w-full flex-row p-6 pb-2">
        <CardTitle className="flex w-full items-center justify-between gap-4 font-normal">
          <span>{title}</span>
          <span className="flex items-center gap-1 text-green-500">
            {titleData}
            <LucideArrowUp className="h-4 w-4" />
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <span className="text-3xl font-semibold">{contentData}</span>
      </CardContent>
      <CardFooter className="justify-between text-sm">
        <span>vs. last month</span>
        <span>{footerData}</span>
      </CardFooter>
    </Card>
  );
}
