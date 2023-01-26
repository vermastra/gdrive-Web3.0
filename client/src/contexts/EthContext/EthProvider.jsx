import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback(
    async artifact => {
      if (artifact) {
        try {
          const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
          const accounts = await web3.eth.requestAccounts();
          const networkID = await web3.eth.net.getId();
          const { abi } = artifact;
          let address, contract;

          address = artifact.networks[networkID].address;
          contract = new web3.eth.Contract(abi, address);

          dispatch({
            type: actions.init,
            data: { artifact, web3, accounts, networkID, contract }
          });
        } catch (err) {
          alert("Metamask is not installed");
          console.error(err);
        }
      }
    }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        const artifact = require("../../contracts/Upload.json");
        // const artifact = require("../../contracts/SimpleStorage.json");
        init(artifact);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init(state.artifact);
    };

    events.forEach(e => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, state.artifact, state.accounts]);

  return (
    <EthContext.Provider value={{
      state,
      dispatch
    }}>
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
