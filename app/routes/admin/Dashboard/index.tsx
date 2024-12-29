import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs';
import Overview from './Tabs/Overview';

export default function Dashboard() {
  return (
    <section className="mx-auto flex w-full max-w-screen-2xl flex-col items-start overflow-x-hidden px-4 sm:px-6 md:px-8 lg:px-12">
      <section className="flex w-full flex-col items-start gap-5">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-transparent">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-muted data-[state=active]:shadow-none"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-muted data-[state=active]:shadow-none"
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="payments"
              className="data-[state=active]:bg-muted data-[state=active]:shadow-none"
            >
              Payments
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-muted data-[state=active]:shadow-none"
            >
              Notifications
            </TabsTrigger>
          </TabsList>
          <Overview />
        </Tabs>
      </section>
    </section>
  );
}
