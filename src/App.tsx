import React from 'react';
import './App.css';
import Header from "./auth/Header";
import Footer from "./auth/Footer";

function App() {
    return (
        <>
           <div className="App">
               <Header/>
               <div style={{height:"9500px",background: "rebeccapurple",overflow: "auto"}}></div>
               <Footer/>
           </div>
        </>
    );
}

export default App;
