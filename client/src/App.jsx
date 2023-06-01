import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./features/store";
import Register from "./pages/Register";
import Chat from "./pages/Chat";

function App() {
  return (
    <div className="bg-gray-500">
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
