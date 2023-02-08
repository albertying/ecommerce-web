import { useUserContext } from "../context/UserContext";

function Alert() {
  const { conditionals } = useUserContext();

  return <h5>{conditionals.alert.message}</h5>;
}

export default Alert;
