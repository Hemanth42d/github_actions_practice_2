import { Outlet } from "react-router-dom";
import NavBar from "../NavBar";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100 py-4">
        <NavBar />
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16 h-[90vh] flex justify-center items-center w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="space-y-6">
              <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                Stop drowning in
                <span className="text-blue-600"> sticky notes</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                A task manager that doesn't make you want to give up and go back
                to paper lists.
              </p>
            </div>

            <div className="mt-10 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <span className="font-medium text-gray-900">
                    No more forgotten deadlines
                  </span>
                  <p className="text-gray-600 text-sm mt-1">
                    Smart reminders that actually work
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <span className="font-medium text-gray-900">
                    Works with your team
                  </span>
                  <p className="text-gray-600 text-sm mt-1">
                    Share projects without the chaos
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <span className="font-medium text-gray-900">
                    Actually simple to use
                  </span>
                  <p className="text-gray-600 text-sm mt-1">
                    No 47-step tutorials required
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
