import { usePDFStore } from '../../store/pdf.store';
import htmlToPdfmake from 'html-to-pdfmake';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { SlNote } from 'react-icons/sl';

export const PDFReport = () => {
  const { instructions, data } = usePDFStore();

  function handleClick(e: any) {
    e.preventDefault();
    const pdfTable = document.getElementById('pdf-table');
    const html = htmlToPdfmake(String(pdfTable?.innerHTML));
    const pdfOfHtml = { content: html };

    pdfMake
      .createPdf(pdfOfHtml, undefined, undefined, pdfFonts.pdfMake.vfs)
      .download();
  }
  function normalizeTime(seconds: number): string {
    if (seconds < 60) {
      return `${Math.trunc(seconds)} секунд`;
    } else if (seconds < 3600) {
      const minutes = Math.trunc(seconds / 60);
      const remainingSeconds = Math.trunc(seconds % 60);
      return `${minutes} минут ${remainingSeconds} секунд`;
    } else if (seconds < 86400) {
      const hours = Math.trunc(seconds / 3600);
      const remainingMinutes = Math.trunc((seconds % 3600) / 60);
      const remainingSeconds = Math.trunc(seconds % 60);
      return `${hours} часов ${remainingMinutes} минут ${remainingSeconds} секунд`;
    } else {
      const days = Math.floor(seconds / 86400);
      const remainingHours = Math.trunc((seconds % 86400) / 3600);
      const remainingMinutes = Math.trunc((seconds % 3600) / 60);
      const remainingSeconds = Math.trunc(seconds % 60);
      return `${days} дней ${remainingHours} часов ${remainingMinutes} минут ${remainingSeconds} секунд`;
    }
  }

  function normalizeDistance(distance: number): string {
    if (distance >= 1000) {
      const distanceInKilometers = distance / 1000;
      return `${distanceInKilometers.toFixed(2)} км`;
    } else {
      return `${distance.toFixed(2)} м`;
    }
  }

  return (
    <div id="pdf-table">
      <>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="uppercase">
                <th scope="col" className="px-6 py-3">
                  Название маршрута
                </th>
                <th scope="col" className="px-6 py-3">
                  Дистанция
                </th>
                <th scope="col" className="px-6 py-3">
                  Время
                </th>
                <th scope="col" className="px-6 py-3">
                  Тип маршрута
                </th>
              </tr>
              <tr className="bg-blue-600 text-slate-50">
                <th scope="col" className="px-6 py-3">
                  <div>Из: {data.from}</div>
                  <div>В: {data.to}</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  {normalizeDistance(+data.totalDistance)}
                </th>
                <th scope="col" className="px-6 py-3">
                  {normalizeTime(+data.totalTime)}
                </th>
                <th scope="col" className="px-6 py-3">
                  Машина
                </th>
              </tr>
            </thead>
            <tbody>
              {instructions.map((instruction: any) => {
                return (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {instruction.text}
                    </th>
                    <td className="px-6 py-4">
                      {normalizeDistance(+instruction.distance)}
                    </td>
                    <td className="px-6 py-4">
                      {normalizeTime(+instruction.time)}
                    </td>
                    <td className="px-6 py-4">Машина</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="h-screen">
          <div
            className="border-b-4 border-indigo-600 flex justify-center items-center fixed bottom-0 right-0 w-16 h-16 mr-12 mb-8 cursor-pointer"
            id="box_btn"
            onClick={handleClick}
          >
            <SlNote size={50} />
          </div>
        </div>
      </>
    </div>
  );
};
