import React from 'react';
import './Apps.scss';
import Header from "./auth/Header";
import Footer from "./auth/Footer";
import "./fonts/futura-pt/FuturaCyrillicDemi.ttf"
import IndexRoute from "./routes/IndexRoute";

function App() {
    return (
        <>
           <div className="App">
               <div className="app-layout">
                   <Header/>
                    <IndexRoute />
                   <Footer/>
               </div>
           </div>
        </>
    );
}

export default App;
