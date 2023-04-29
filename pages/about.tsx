import Head from 'next/head'

export default function About() {
  return (
    <>
      <Head>
        <title>About - Your Company</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-white min-h-screen">
        <header className="absolute inset-x-0 top-0 z-50">
          {/* Add your navigation code from the Tailwind component here */}
        </header>

        <main className="relative isolate px-6 pt-14 lg:px-8">
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
            {/* Add your background divs code from the Tailwind component here */}
          </div>
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">About Your Company</h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">Your Company provides data-driven solutions to help businesses grow online. Our team of experts is dedicated to delivering innovative products and services that enable our clients to thrive in an increasingly competitive digital landscape.</p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a href="/signup" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Join us</a>
                <a href="/contact" className="text-sm font-semibold leading-6 text-gray-900">Contact us <span aria-hidden="true">→</span></a>
              </div>
            </div>
          </div>
          <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
            {/* Add your background divs code from the Tailwind component here */}
          </div>
        </main>
      </div>
    </>
  )
}
