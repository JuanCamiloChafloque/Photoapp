import React from "react";
import { Container, Button, Form } from "react-bootstrap";
import { AiFillFilter } from "react-icons/ai";

const FilterForm = ({
  setShowFilter,
  setDate,
  date,
  setLocation,
  location,
  handleSubmitFilters,
  handleClearFilters,
  filterMessage,
}) => {
  return (
    <>
      <hr />
      <Container className="d-flex">
        <AiFillFilter
          className="filter-icon mb-3"
          size={28}
          onClick={() => setShowFilter((prev) => !prev)}
        />
        <p className="text-muted"> Hide Filter Search</p>
      </Container>
      <Container className="filter-container">
        <Form onSubmit={(e) => handleSubmitFilters(e)}>
          <Form.Group className="mb-2">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter any city, country, or a specific location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Form.Group>
          <Button variant="secondary" type="submit">
            Filter
          </Button>
          <Button
            className="ms-3"
            variant="danger"
            type="button"
            onClick={handleClearFilters}
          >
            Clear
          </Button>
        </Form>
        <Container className="text-center error-message">
          {filterMessage}
        </Container>
      </Container>
      <hr />
    </>
  );
};

export default FilterForm;
