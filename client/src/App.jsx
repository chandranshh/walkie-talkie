import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./features/store";
import Register from "./pages/Auth/Register";

function App() {
  return (
    <div className="bg-gray-500">
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
