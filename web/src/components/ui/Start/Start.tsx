import { Link } from 'react-router-dom';
import { NavigationBar } from './Navigation';

export const Start = () => {
  return (
    <div>
      <NavigationBar />
      <section className="bg-center bg-no-repeat bg-[url('https://img.freepik.com/free-vector/hexagonal-dots-world-map-white-background-illustration-world-map-monochrome-style-map-geography-visualization-infographic_1284-51551.jpg?w=740&t=st=1685464725~exp=1685465325~hmac=438fc2bbacb2575df1b76cff4a035a97aaededa60a78cade862985fcee1f66a1')] bg-gray-700 bg-blend-multiply">
        <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
            OSM Map
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
            Сервис построения маршрутов на основе OpenStreetMap (OSM)
            предоставляет пользователям простой и эффективный способ планировать
            свои путешествия.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <Link
              to="/tutorial"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
              Начать
              <svg
                aria-hidden="true"
                className="ml-2 -mr-1 w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
            <Link
              to="/about"
              className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
            >
              Больше о сервисе
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
