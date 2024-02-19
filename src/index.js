import express from "express";
import cors from "cors";
import morgan from "morgan";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import router from "./routes/tasks.routes.js";
//import { port } from "./config.js";

const port = 4000
const app = express();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my API" });
});

// app.use(router);

// // handling errors
// app.use((err, req, res, next) => {
//   return res.status(500).json({
//     status: "error",
//     message: err.message,
//   });
// });

app.listen(port);
console.log(`Server on port ${port}`);