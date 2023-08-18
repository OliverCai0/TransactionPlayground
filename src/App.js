import logo from './logo.svg';
import './App.css';
import { TransactionPlayground } from './pages/TransactionPlayground';
import { ConfigProvider, theme } from 'antd'

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
        },
        algorithm: theme.defaultAlgorithm
      }}
    >
        <TransactionPlayground></TransactionPlayground>
      </ConfigProvider>
  );
}

export default App;
