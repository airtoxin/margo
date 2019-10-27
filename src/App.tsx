import React from "react";
import "./App.css";
import { Game } from "./features/Game";

const App: React.FC = () => {
  return (
    <div className="app">
      <Game size={8} />
    </div>
  );
};

export default App;
