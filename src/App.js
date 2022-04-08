import AppRouter from "./router";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const initialOptions = {
  "client-id": "test",
  currency: "USD",
  components: "buttons",
};

function App() {
  return (
    <PayPalScriptProvider deferLoading={true} options={initialOptions}>
      <AppRouter />
    </PayPalScriptProvider>
  );
}

export default App;
