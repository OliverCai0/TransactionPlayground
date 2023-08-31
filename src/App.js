import logo from './logo.svg';
import './App.css';
import { TransactionPlayground } from './pages/TransactionPlayground';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PhishingForm } from './pages/PhishingForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/">
        <Route index element={<TransactionPlayground />} />
        <Route path="not-a-scam" element={<PhishingForm />} />
          {/* <TransactionPlayground></TransactionPlayground> */}
          <Route path="*" element={<TransactionPlayground />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
