import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./features/store";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";

function App() {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Register />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
