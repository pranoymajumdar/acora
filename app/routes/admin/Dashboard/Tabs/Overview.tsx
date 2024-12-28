import OverviewCard from '~/components/admin/OverviewCard';
import { TabsContent } from '~/components/ui/tabs';

export default function Overview() {
  return (
    <TabsContent value="overview">
      <div className="mx-auto grid w-full grid-cols-1 items-center gap-2 sm:grid-cols-2 xl:grid-cols-4">
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
    </TabsContent>
  );
}
