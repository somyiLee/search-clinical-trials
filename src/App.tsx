import { MainProvider } from './context/MainProvider';
import './index.css';
import Main from './pages/Main';

function App() {
  return (
    <MainProvider>
      <Main />
    </MainProvider>
  );
}
export default App;
