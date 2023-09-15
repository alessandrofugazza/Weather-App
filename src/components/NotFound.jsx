import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <h1 className="display-4">Not found</h1>
      <p>
        La risorsa che stai cercando non esiste, <Link to="/">torna indietro.</Link>
      </p>

      <Link to="/">
        <Button variant={"warning"}>Torna alla pagina di ricerca</Button>
      </Link>
    </>
  );
};
export default NotFound;
