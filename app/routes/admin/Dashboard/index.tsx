import { LucideArrowUp } from 'lucide-react';
import OverviewCard from '~/components/admin/OverviewCard';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';

export default function Dashboard() {
  return (
    <section>
      <section className="flex flex-col items-start justify-center gap-5 overflow-hidden">
        <h2 className="text-3xl font-bold">Overview</h2>
        <div className="flex w-full flex-col items-center gap-4 md:flex-row md:overflow-x-scroll vertical-scrollbar pb-2">
          <OverviewCard
            title="Product viewed"
            titleData="2.9%"
            contentData="449.7K"
            footerData="312K"
          />
          <OverviewCard
            title="Product viewed"
            titleData="2.9%"
            contentData="449.7K"
            footerData="312K"
          />
          <OverviewCard
            title="Product viewed"
            titleData="2.9%"
            contentData="449.7K"
            footerData="312K"
          />
          <OverviewCard
            title="Product viewed"
            titleData="2.9%"
            contentData="449.7K"
            footerData="312K"
          />
          <OverviewCard
            title="Product viewed"
            titleData="2.9%"
            contentData="449.7K"
            footerData="312K"
          />
          <OverviewCard
            title="Product viewed"
            titleData="2.9%"
            contentData="449.7K"
            footerData="312K"
          />
        </div>
      </section>
    </section>
  );
}
