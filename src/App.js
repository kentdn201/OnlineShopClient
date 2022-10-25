import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import 'antd/dist/antd.min.css';

function App() {
  return (
    <div className="main">
      <BrowserRouter>
      <Routes>
        <Route key="/" path="/" element={<HomePage />}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
