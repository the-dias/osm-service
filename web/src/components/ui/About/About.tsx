import { Link } from 'react-router-dom';
import { NavigationBar } from '../Start/Navigation';

export const About = () => {
  return (
    <>
      <NavigationBar />
      <div className="grid h-screen justify-center justify-items-center items-center">
        <div className="max-w-2xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <Link to="/">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Сервис построения маршрутов на основе OpenStreetMap
            </h5>
          </Link>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Сервис построения маршрутов на основе OSM (OpenStreetMap)
            предоставляет удобный способ навигации по маршрутам. Используя
            данные с открытых карт, сервис позволяет проложить путь между двумя
            точками. Благодаря этому сервису пользователи могут быстро и
            эффективно перемещаться по нужным им местам, осуществлять поездки и
            путешествия с комфортом и безопасностью.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Зарегистрироваться
            <svg
              aria-hidden="true"
              className="w-4 h-4 ml-2 -mr-1"
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
        </div>
      </div>
    </>
  );
};
