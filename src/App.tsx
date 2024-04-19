import React from 'react';
import './App.css';
import Header from "./auth/Header";
import Footer from "./auth/Footer";
import Home from "./components/Home";

function App() {
    return (
        <>
           <div className="App">
               <Header/>
               <Home />
               <Footer/>
           </div>
        </>
    );
}

export default App;
