import { Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import UrlRedirect from "./components/UrlRedirect.jsx";
import './App.css';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path='/' element={ <Home /> } />
                <Route path='/:urlCode' element={ <UrlRedirect /> } />
            </Routes>
        </div>
    );
}

export default App;