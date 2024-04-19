import React from 'react';
import './App.css';
import Header from "./auth/Header";
import Footer from "./auth/Footer";
import Home from "./components/Home";
import "./fonts/futura-pt/FuturaCyrillicDemi.ttf"

function App() {
    return (
        <>
           <div className="App">
               <div className="app-layout">
                   <Header/>
                   <Home />
                   <Footer/>
               </div>
           </div>
        </>
    );
}

export default App;
