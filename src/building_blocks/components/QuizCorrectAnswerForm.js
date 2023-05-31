import React, { useState, Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Badge from 'react-bootstrap/Badge';

function QuizCorrectAnswerForm(props) {
  const [data, setData] = useState([' ']);
  if(data[0] == [' '] ){
    var propData = []
    var givenAnswerData = []
    for (let index = 0; index < props.questions.length; index++) {
        props.givenAnswers.forEach(element => {
            givenAnswerData.push(element[0])
            if(props.questions[index].questionId==element[0]){
                propData.push([props.questions[index].question, 
                                props.questions[index].correctAnswer, 
                                element[1]])
                            }
        });
    }
    for (let index = 0; index < props.questions.length; index++){
        if(!givenAnswerData.includes(props.questions[index].questionId)){
            propData.push([props.questions[index].question, 
                props.questions[index].correctAnswer, 
                "no answer"])
        }
    }
    setData(propData)
  }
  function ShowCorrectAnswer(item){
    if(item.item[1] != item.item[2]){
        return <h5><Badge bg="danger">{item.item[2]}</Badge></h5>
    }
    else if(item.item[2] == "no answer"){
        return <h5><Badge bg="secondary">{item.item[2]}</Badge></h5>
    }
    return 
  }
  function startNewGame(){
    props.handleCorrectAnswersCallback();
  }
  return (
    <>
      <Container>
        <Row>
          <Form >
            <fieldset>
              {data.map(item => (
                <Card style={{marginTop: "1rem", paddingLeft: "1rem", paddingRight: "1rem"}} 
                      border="info" 
                      className="bg-dark text-white d-flex align-items-stretch">
                  <Card.Title class="d-flex justify-content-center"
                              style={{ paddingTop: "1rem" }}>
                               {item[0]}
                  </Card.Title>
                  <Card.Body>
                  <h5><Badge bg="success">{item[1]}</Badge></h5>
                    <ShowCorrectAnswer item={item}/>
                    
                  </Card.Body>
                </Card>
                ))}
            </fieldset> 
            <Form.Group as={Row} className="mb-3">
              <div class="d-flex justify-content-center">
                <Button onClick={startNewGame} style={{marginTop: "1rem"}} size="lg" variant="outline-warning">
                  New Game
                </Button>
              </div>
            </Form.Group>
          </Form>
        </Row>
      </Container>
    </>
  );
}

export default QuizCorrectAnswerForm;
