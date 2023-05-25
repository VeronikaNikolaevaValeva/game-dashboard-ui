import React, { useState, Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Loading from "./Loading"

function QuizQuestionsForm(props) {
  const [questions, setQuestions] = useState([' ']);
  const [returnData, setReturnData] = useState([' ']);
  const [givenAnswers, setGivenAnswers] = useState([' ']);
  const [loading, setLoading] = useState(false);
  if(questions[0] == [' '] ){
    const qData = []
    const returndata = []
    var aData = []
    for (let index = 0; index < props.questions.length; index++) {
        aData= [];
        aData.push(props.questions[index].correctAnswer, 
                    props.questions[index].incorrectAnswers[0],
                    props.questions[index].incorrectAnswers[1],
                    props.questions[index].incorrectAnswers[2]);
        aData = shuffle(aData);
        qData.push([props.questions[index].question, 
          aData[0], aData[1], aData[2], aData[3],
                    props.questions[index].questionId]);
        returndata.push([props.questions[index].questionId,
          props.questions[index].correctAnswer]);
    }
    setQuestions(qData);
    setReturnData(returndata);
  }

  function shuffle(array) {
      let currentIndex = array.length
      let randomIndex = " ";
      // While there remain elements to shuffle.
      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex); // Pick a remaining element.
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [    // And swap it with the current element.
          array[randomIndex], array[currentIndex]];
      }
      return array;
    }
  const submitAnswer = (e) => {
    var unique = true;
    const answer_array = e.target.id.split(',')
    if(givenAnswers[0] == [' ']){
      unique = false;
      setGivenAnswers([answer_array]);
    }
    givenAnswers.forEach(element => {
      if(element[0]==answer_array[0]){
        unique = false;
        element[1] = answer_array[1]
        return;
      }
    });
    if(unique){
      givenAnswers.push(answer_array);
    }
  }

  function submitQuestions(){
    setLoading(true);
    var data = JSON.stringify({
      "accountEmailAddress": props.accountEmailAddress,
      "category": props.category,
      "correctAnswers": returnData,
      "givenAnswers": givenAnswers
    });
    console.log(data);
    props.handleQuestionCallback(data, givenAnswers);
  }
  if(loading){
    return <Loading />;
  }
  else{
  return (
    <>
      <Container>
        <Row>
          <Form onSubmit={submitQuestions}>
            <fieldset>
              {questions.map(item => (
                <Card style={{marginTop: "1rem", paddingLeft: "1rem", paddingRight: "1rem"}} 
                      border="info" 
                      className="bg-dark text-white d-flex align-items-stretch">
                  <Card.Title class="d-flex justify-content-center"
                              style={{ paddingTop: "1rem" }}>
                               {item[0]}
                  </Card.Title>
                  <Card.Body>
                    <Form  onChange={submitAnswer}>
                     <Form.Check
                          type="radio"
                          label={item[1]}
                          name="formHorizontalRadios"
                          id={[item[5], item[1]]}
                      />    
                      <Form.Check
                          type="radio"
                          label={item[2]}
                          name="formHorizontalRadios"
                          id={[item[5], item[2]]}
                      />
                      <Form.Check
                          type="radio"
                          label={item[3]}
                          name="formHorizontalRadios"
                          id={[item[5], item[3]]}

                      />
                      <Form.Check
                        type="radio"
                        label={item[4]}
                        name="formHorizontalRadios"
                        id={[item[5], item[4]]}
                      /> 
                    </Form> 
                  </Card.Body>
                </Card>
                ))}
            </fieldset>
            <Form.Group as={Row} className="mb-3">
              <div class="d-flex justify-content-center">
                <Button onClick={submitQuestions} style={{marginTop: "1rem"}} size="lg" variant="outline-warning">
                  Submit
                </Button>
              </div>
            </Form.Group>
          </Form>
        </Row>
      </Container>
    </>
  );
}
}
export default QuizQuestionsForm;