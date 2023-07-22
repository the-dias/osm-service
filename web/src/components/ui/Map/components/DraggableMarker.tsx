import L, { LatLng, LatLngExpression, Popup } from 'leaflet';
import { useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import { FaMapMarkerAlt } from 'react-icons/fa';
import '../styles/Map.css';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import NoteService from '../../../../api/notes/note.api';
import { useMutation } from 'react-query';
import { getUserFromStorage } from '../../../../api/auth/auth.helper';
// import authService from "../../../../api/auth/auth.api";

export function DraggableMarker() {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);
  const [latlng, setLatlng] = useState<LatLng | null>(null);

  let popup: Popup = new L.Popup();

  const mutation = useMutation((data: Object) => NoteService.create(data));

  const handleClose = () => {
    setOpen(false);
    console.log(text);
    let marker = L.marker(latlng as LatLngExpression);
    marker.bindPopup(popup.setContent(text)).addTo(map);

    marker.addEventListener('click', () => {
      marker.openPopup();
    });

    const fields: Object = {
      text,
      userId: String(getUserFromStorage().id),
    };
    mutation.mutate(fields);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleButtonClick = (e: any) => {
    console.log(buttonClicked);
    if (buttonClicked) {
      setButtonClicked(false);
    } else {
      setButtonClicked(true);
    }
  };

  const map = useMapEvents({
    click(e) {
      if (
        buttonClicked &&
        String(e.originalEvent.srcElement) !== '[object SVGPathElement]'
      ) {
        setOpen(true);
        setLatlng(e.latlng);
      }
    },
  });

  return (
    <div className="draggable__marker">
      <div className="draggable_btn" onClick={handleButtonClick}>
        <button id="drg_btn">
          <FaMapMarkerAlt
            id="location_icon"
            size={30}
            color={buttonClicked ? 'red' : 'black'}
          />
        </button>
      </div>

      {!open ? null : (
        <div>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Заметка</DialogTitle>
            <DialogContent>
              <DialogContentText>Напишите текст</DialogContentText>
              <TextField
                autoFocus
                onChange={(event) => {
                  setText(event?.target.value);
                }}
                margin="dense"
                id="standard-multiline-static"
                label="Текст"
                multiline
                rows={4}
                placeholder="Текст..."
                variant="filled"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancel}>Отменить</Button>
              <Button onClick={handleClose}>Сохранить</Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </div>
  );
}
