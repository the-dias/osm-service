import React, { useState } from "react";
import { useMap } from "react-leaflet";
import { Marker, Popup } from "react-leaflet";

export function NoteMarker() {
  const [notePosition, setNotePosition] = useState<[number, number] | null>(
    null
  );
  const [noteInput, setNoteInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const map = useMap();

  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNoteInput(event.target.value);
  };

  const handleNoteSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (notePosition) {
      // Here you can perform necessary actions with the note,
      // such as saving it in state or sending it to the server.
      console.log("Saved note:", noteInput);
    }
    setNoteInput("");
    setShowModal(false);
  };

  const handleMapClick = (event: any) => {
    const { lat, lng } = event.latlng;
    if (!notePosition) {
      setNotePosition([lat, lng]);
      setShowModal(true);
    }
  };

  const handleMarkerDragEnd = (event: any) => {
    const { lat, lng } = event.target.getLatLng();
    setNotePosition([lat, lng]);
  };

  const MarkerComponent = notePosition ? (
    <Marker
      position={notePosition}
      draggable={true}
      eventHandlers={{ dragend: handleMarkerDragEnd }}
    >
      <Popup>
        <form onSubmit={handleNoteSubmit}>
          <input type="text" value={noteInput} onChange={handleNoteChange} />
          <button type="submit">Save</button>
        </form>
      </Popup>
    </Marker>
  ) : null;

  return <>{MarkerComponent}</>;
}
