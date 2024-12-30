import { Outlet } from 'react-router';
export default function AuthLayout() {
  return (
    <main className="flex min-h-screen">
      {/* Left Side Form */}
      <section className="flex flex-1 flex-col items-center justify-center mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="w-full max-w-sm">
          <Outlet />
        </div>
      </section>
      {/* Right Side Image */}
      <section className="hidden flex-1 lg:block relative">
        <img src='/images/auth/shopping.jpg' className='absolute inset-0 w-full h-full object-cover'/>
      </section>
    </main>
  );
}
