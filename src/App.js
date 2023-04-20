import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ContactProvider } from './ContactContext';
import List from './List';
import Form from './Form';


function App() {
  return (
    <ContactProvider>
      <Router>
          <Routes>
              <Route path="/" element={<List />}/>
              <Route path="/list" element={<List />}/>
              <Route path="/form" element={<Form />}/>
          </Routes>
      </Router>
    </ContactProvider>
    
    
  );
}

export default App;
