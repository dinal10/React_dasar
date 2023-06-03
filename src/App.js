import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <Game />
      </Provider>
    </ChakraProvider>
  );
}

export default App;
