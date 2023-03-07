import Wallet from "./Wallet";
import Confirm from "./Confirm";
import "./App.scss";
import { AppProvider } from "./AppContext";
import Transfer from "./Transfer";

function App() {
  return (
    <AppProvider>
      <div className="app">
        <Transfer />
        <Wallet />
        <Confirm />
      </div>
    </AppProvider>
  );
}

export default App;
