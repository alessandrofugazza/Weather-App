import { Col, Row } from "react-bootstrap";

const DataRow = ({ label, value, unit = "", colWidth = 5 }) => {
  return (
    <Row className="justify-content-center">
      <Col xs={colWidth} className="d-flex  justify-content-between">
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
