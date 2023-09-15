import { Col, Row } from "react-bootstrap";

const DataRow = ({ label, value, unit = "" }) => {
  return (
    <Row className="justify-content-center">
      <Col xs={5} className="d-flex  justify-content-between">
        <p>{label}:</p>
        <p>
          {value}
          {unit ? ` ${unit}` : null}
        </p>
      </Col>
    </Row>
  );
};

export default DataRow;
