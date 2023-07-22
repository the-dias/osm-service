import { usePDFStore } from '../../../../store/pdf.store';
import '../styles/Map.css';
import { BsFileEarmarkPdf } from 'react-icons/bs';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from '@react-pdf/renderer';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    color: 'black',
    marginLeft: '350px',
    // marginHorizontal: '400px',
  },
  section: {
    margin: 10,
    padding: 10,
  },
  viewer: {
    width: window.innerWidth, //the pdf viewer will take up all of the width and height
    height: window.innerHeight,
    // marginLeft: '400px',
  },
});
export const PDFReport = () => {
  const { instructions } = usePDFStore();
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();
  function handleClick(e: any) {
    e.preventDefault();
    // if (isOpen) {
    //   console.log(isOpen);
    //   setOpen(false);
    //   return;
    // }
    setOpen(true);
    // console.log(instructions);
    instructions.map((element: any) => {
      console.log(
        element.text,
        ' ',
        element.distance,
        ' ',
        element.time,
        ' ',
        element.direction,
      );
      navigate('/report');
      //   console.log(e)
    });
  }
  return (
    <>
      <div className="pdf-report">
        <button id="pdf-btn" onClick={handleClick}>
          <BsFileEarmarkPdf id="location_icon" size={30} />
        </button>
      </div>
    </>
  );
};
