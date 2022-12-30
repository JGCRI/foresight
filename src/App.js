import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createContext, useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { Bartop } from "./components/Bartop";
import { Home } from "./components/Home";

export const ThemeContext = createContext("light");

function App() {
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  return (
    <div className="App" id={theme}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <DarkModeSwitch
          className="toggle"
          checked={theme === "dark"}
          onChange={toggleTheme}
        />
        <Bartop />
        <Home />
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
