// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App'
import './index.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )
import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";

//labs
import App from "./App";

//project1
// import App from "./project1/App";

ReactDOM.createRoot(document.getElementById("root")).render(
 <React.StrictMode>
 <BrowserRouter>
 <App />
 </BrowserRouter>
 </React.StrictMode>
);
