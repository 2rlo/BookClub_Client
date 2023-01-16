import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="bg-yellow-500">
        <p className="h-10 x-10 to-green-700">tailwindCss</p>
      </div>
    </Router>
  );
}

export default App;
