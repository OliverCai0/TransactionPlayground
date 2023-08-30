import logo from './logo.svg';
import './App.css';
import { TransactionPlayground } from './pages/TransactionPlayground';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ElonMuskVsMark } from './pages/ElonMuskVsMark';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/">
        <Route index element={<TransactionPlayground />} />
        <Route path="elon-vs-mark" element={<ElonMuskVsMark />} />
          {/* <TransactionPlayground></TransactionPlayground> */}
          <Route path="*" element={<TransactionPlayground />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
