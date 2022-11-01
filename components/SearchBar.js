import { InputGroup, FormControl } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";

export default function SearchBar({ onFocus, filter, setFilter, setSort }) {
  return (
    <Container>
      <Row>
        <Col>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search"
              onChange={(event) => {
                setFilter({
                  ...filter,
                  search: event.target.value,
                });
              }}
              onFocus={onFocus}
            />
          </InputGroup>
        </Col>
        <Col>
          <Sort setSort={setSort} />
        </Col>
        <Col>
          <Filter filter={filter} setFilter={setFilter} />
        </Col>
      </Row>
    </Container>
  );
}

export function Sort({ setSort }) {
  return (
    <InputGroup className="mb-3">
      <InputGroup.Text>Sort</InputGroup.Text>
      <FormControl
        as="select"
        onChange={(event) => setSort(event.target.value)}
      >
        <option value="id">ID</option>
        <option value="dueDate">Due Date</option>
        <option value="createdAt">Created Date</option>
      </FormControl>
    </InputGroup>
  );
}

export function Filter({ filter, setFilter }) {
  return (
    <InputGroup className="mb-3">
      <InputGroup.Text>Filter</InputGroup.Text>
      <FormControl
        as="select"
        onChange={(event) => {
          setFilter({
            ...filter,
            by: event.target.value,
          });
        }}
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </FormControl>
    </InputGroup>
  );
}
