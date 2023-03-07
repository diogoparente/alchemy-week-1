import React, {
  createContext,
  useState,
  useMemo,
  useContext,
  useEffect,
} from "react";
import server from "./server";

export const AppContext = createContext({
  balance: 0,
  setBalance: (balance) => {},
  address: "",
  setAddress: (address) => {},
  privateKey: "",
  setPrivateKey: (privateKey) => {},
  recipient: "",
  setRecipient: (recipient) => {},
  addresses: [],
  setAddresses: (addresses) => {},
});

const AppProvider = ({ children }) => {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [privateKey, setPrivateKey] = useState("");
  const [recipient, setRecipient] = useState("");

  useEffect(() => {
    async function getAddresses() {
      const { data } = await server.get(`/addresses`);
      setAddresses(data.response);
    }
    getAddresses();
  }, []);

  const memoizedValue = useMemo(
    () => ({
      balance,
      setBalance,
      address,
      setAddress,
      privateKey,
      setPrivateKey,
      recipient,
      setRecipient,
      addresses,
      setAddresses,
    }),
    [balance, address, privateKey, recipient, addresses]
  );

  return (
    <AppContext.Provider
      value={{
        balance: memoizedValue.balance,
        setBalance: memoizedValue.setBalance,
        address: memoizedValue.address,
        setAddress: memoizedValue.setAddress,
        privateKey: memoizedValue.privateKey,
        setPrivateKey: memoizedValue.setPrivateKey,
        recipient: memoizedValue.recipient,
        setRecipient: memoizedValue.setRecipient,
        addresses: memoizedValue.addresses,
        setAddresses: memoizedValue.setAddresses,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export { AppProvider };
