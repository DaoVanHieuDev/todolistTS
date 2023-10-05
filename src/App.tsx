import "./App.css";
import { Routes, Route } from "react-router-dom";
import TodoPage from "./pages/TodoPage";

function App() {
  return (
    <Routes>
      <Route path="/todo" element={<TodoPage />} />
    </Routes>
  );
}

export default App;
