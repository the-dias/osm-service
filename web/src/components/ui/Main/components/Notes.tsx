import { useQuery } from 'react-query';
import NoteService from '../../../../api/notes/note.api';
import { Navigation } from '../Navigation';
import { useState } from 'react';

import '../styles/Notes.css';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import { getUserFromStorage } from '../../../../api/auth/auth.helper';

export const Notes = () => {
  const [{ id }] = useState(getUserFromStorage());
  console.log(id);
  const { data, isLoading, isError } = useQuery(['data', id], () =>
    NoteService.getById(id),
  );
  const [text, setText] = useState<any[]>([]);
  const [open, setOpen] = useState(true);
  console.log(data);
  // console.log(data[0].text);
  if (isLoading) {
    return <h3>Идет загрузка</h3>;
  }

  if (isError) {
    return <h3>Ошибка</h3>;
  }

  if (!data) {
    return <h3>Данные отсутствуют</h3>;
  }

  function handleClose(e: any) {
    e.preventDefault();
    console.log('Hello');
  }
  const handleTextChange = (index: number, value: string) => {
    // const updatedData = [...data];
    // updatedData[index] = { ...updatedData[index], text: value };
    // setText(updatedData);

    setText((prevData) => {
      const updatedData = [...prevData];
      updatedData[index].text = value;
      return updatedData;
    });
  };
  return (
    <>
      <Navigation />
      <div className="mx-auto container py-20 px-6 w-2/3">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.map(function (item: any, index: number) {
            return (
              <div className="w-full h-64 flex flex-col justify-between items-start bg-blue-300 rounded-lg border border-blue-300 mb-6 py-5 px-4">
                <div>
                  <h4 className="text-gray-800 font-bold mb-3">
                    Заметка {+item.id}
                  </h4>
                  <textarea
                    className="block p-2.5 w-full text-sm text-gray-900 bg-blue-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write your thoughts here..."
                    id="message"
                    rows={4}
                    maxLength={100}
                    onChange={(e: any) => {
                      handleTextChange(index, e?.target.value);
                      // setText(e?.target.value);
                    }}
                    value={text[index].text}
                  ></textarea>
                </div>
                <div className="w-full flex flex-col items-start">
                  <div
                    className="mb-3 border border-gray-800 rounded-full px-3 py-1 text-gray-800 text-xs flex items-center"
                    aria-label="Due on"
                    role="contentinfo"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-alarm"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z"></path>
                      <circle cx="12" cy="13" r="7"></circle>
                      <polyline points="12 10 12 13 14 13"></polyline>
                      <line x1="7" y1="4" x2="4.25" y2="6"></line>
                      <line x1="17" y1="4" x2="19.75" y2="6"></line>
                    </svg>
                    <p className="ml-2">{item.updatedAt}</p>
                  </div>
                  <div className="flex items-center justify-between text-gray-800 w-full">
                    <p className="text-sm">{item.createdAt}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
