import React, { useState, Component, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

function QuizOptionsForm(props) {
  const [list, setList] = useState([' ']);
  const [category, setCategory] = useState(['']);
  const [amount, setAmount] = useState(1);
  const [difficulty, setDifficulty] = useState("easy");
  const [preferences, setPreferences] = useState(false);

//  const populateGameOptions = async () => {
//     if(props.preDefinedGameOptions != " "){
//         setAmount(props.preDefinedGameOptions.amount);
//         setDifficulty(props.preDefinedGameOptions.difficulty);
//         setPreferences(true);
//     }
//   };

//   useEffect(() => {
//     populateGameOptions();
//   }, []);

  const handleCategoryList = () => {
    const list2 = []
    for (let index = 0; index < props.categories.length; index++) {
      list2.push(props.categories[index].categoryName);
    }
    setList(list2);
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  }

  const handleAmount = (e) => {
    setAmount(e.target.value);
  }

  const handleDifficulty = (e) => {
    setDifficulty(e.target.id);
  }

  // const handlePreferences = (e) => {
  //   setPreferences(e.target.checked);
  // }

  const handleSaveChanges = (e) => {
    var data = JSON.stringify({
      "accountEmailAddress": props.accountEmailAddress,
      "category": category,
      "difficulty": difficulty,
      "amount": amount,
      "preferences": preferences
    });
    props.handleGameCategorySet(category);
    props.handleOptionsCallback(data);
  }
  return (
    <>
      <Container>
        <Row>
          <Form onSubmit={handleSaveChanges}>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalCategories"
            >
              <Form.Label column sm={2}>
                Categories
              </Form.Label>
              <Col sm={10}>
              <Form.Select placeholder={"Choose a category"} onClick={handleCategoryList} onChange={handleCategory} aria-label="Default select example">
                {list.map(item => (
                  <option value={item} >{item}</option>
                ))}
              </Form.Select>
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalAmount"
            >
              <Form.Label column sm={2}>
                Amount 
              </Form.Label>
              <Col sm={10}>
                <Form.Control value={amount} onChange={handleAmount} type="number" max={50} min={1} />
              </Col>
            </Form.Group>
            <fieldset>
              <Form.Group as={Row} className="mb-3">
                <Form.Label as="legend" column sm={2}>
                  Difficulty
                </Form.Label>
                <Col sm={10}>
                  <Form onChange={handleDifficulty}>
                 <Form.Check
                    type="radio"
                    label="easy"
                    name="formHorizontalRadios"
                    id="easy"
                  />
                  <Form.Check
                    type="radio"
                    label="medium"
                    name="formHorizontalRadios"
                    id="medium"
                  />
                  <Form.Check
                    type="radio"
                    label="hard"
                    name="formHorizontalRadios"
                    id="hard"
                  /></Form>
                </Col>
              </Form.Group>
            </fieldset>
            {/* <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalCheck"
            >
              <Col sm={{ span: 10, offset: 2 }}>
                <Form.Check checked={preferences} onChange={handlePreferences} label="Remember my preferences" />
              </Col>
            </Form.Group> */}

            <Form.Group as={Row} className="mb-3">
              <div class="d-flex justify-content-center">
                <Button onClick={handleSaveChanges} size="lg" variant="outline-warning">
                  PLAY
                </Button>
              </div>
            </Form.Group>
          </Form>
        </Row>
      </Container>
    </>
  );
}

export default QuizOptionsForm;
