import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Auth } from './components/ui/Auth/Auth';
import { Register } from './components/ui/Register/Register';
import Main from './components/ui/Main/Main';
import { Notes } from './components/ui/Main/components/Notes';
import { Reviews } from './components/ui/Main/components/Reviews';
import { Start } from './components/ui/Start/Start';
import { Profile } from './components/ui/Profile/Profile';
import { Contact } from './components/ui/Contact/Contact';
import { Tutorial } from './components/ui/Tutorial/Tutorial';
import { About } from './components/ui/About/About';
import { PDFReport } from './components/PDF/PDFReport';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/main" element={<Main />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/" element={<Start />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/about" element={<About />} />
        <Route path="/report" element={<PDFReport />} />
      </Routes>
    </div>
  );
}

export default App;
