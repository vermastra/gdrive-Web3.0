import { useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import "./Modal.css";

const Modal = ({ setModalOpen }) => {
  const { state: { contract, accounts } } = useEth();

  const sharing = async () => {
    const address = document.querySelector(".address").value;
    if(address===""){
      alert("Please enter the address");
      return;
    }
    await contract.methods.allow(address).send({ from: accounts[0] });
    setModalOpen(false);
  };

  const withdraw = async () => {
    const address = document.querySelector("#selectNumber").value;
    await contract.methods.disallow(address).send({ from: accounts[0] });
    setModalOpen(false);
  }

  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.methods.shareAccess().call({ from: accounts[0] });
      let select = document.querySelector("#selectNumber");
      const options = addressList;

      for (let i = 0; i < options.length; i++) {
        if(options[i].access===false)continue;
        let opt = options[i].user;
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };
    accessList();
  }, [accounts, contract]);

  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="title">Share with</div>
          <div className="body">
            <input
              type="text"
              className="address"
              placeholder="Enter Address"
            ></input>
          </div>
          <form id="myForm">
            <select id="selectNumber">
              <option className="address">People With Access</option>
            </select>
          </form>
          <div className="footer">
            <button
              onClick={() => {
                setModalOpen(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button onClick={() => sharing()}>Share</button>
            <button style={{backgroundColor: "#dccd13"}} onClick={() => withdraw()}>Withdraw</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal;
