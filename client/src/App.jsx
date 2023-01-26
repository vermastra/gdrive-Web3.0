import { EthProvider } from "./contexts/EthContext";
import { useState } from "react";
import useEth from "./contexts/EthContext/useEth";
import FileUpload from "./components/FileUpload/FileUpload";
import Display from "./components/Display/Display";
import Modal from "./components/Modal/Modal";
import Background from "./components/Background/Background";
import "./App.css";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  
  return (
    <EthProvider>
      {!modalOpen && (
        <button className="share" onClick={() => setModalOpen(true)}>
          Share
        </button>
      )}
      {modalOpen && (
        <Modal setModalOpen={setModalOpen}></Modal>
      )}

      <div className="App">
        <Background></Background>
        <FileUpload></FileUpload>
        <Display></Display>
      </div>
    </EthProvider>
  );
}

export default App;
