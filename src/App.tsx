import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Details from './pages/Details';
import CardContextProvider from './context/cardContext';
import MenuBar from './components/MenuBar';
import { ToastContainer } from 'react-toastify'


function App() {
  return (
    <div className="App">
      <CardContextProvider>
        <BrowserRouter>
          <MenuBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details" element={<Details />} />
          </Routes>
        </BrowserRouter>
      </CardContextProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
