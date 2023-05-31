import PageLayout from "../building_blocks/layout/PageLayout";
import QuizOptionsForm from "../building_blocks/components/QuizOptionsForm";
import QuizQuestionsForm from "../building_blocks/components/QuizQuestionForm";
import QuizCorrectAnswerForm from "../building_blocks/components/QuizCorrectAnswerForm";
import React, { useState, Component, useEffect } from 'react';
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Alert from 'react-bootstrap/Alert';
import qandamanager from "../managers/q-and-a-manager";
import userManager from "../managers/user-manager";
import { useAuth0 } from "@auth0/auth0-react";


function HomePage() {
  const [accountEmailAddress, setAccountEmailAddress] = useState(" ")
  const [categories, setCategories] = useState([' '])
  const [gameOptions, setGameOptions] = useState(" ")
  const [category, setCategory] = useState(" ")
  const [questions, setQuestions] = useState([' '])
  const [givenAnswers, setGivenAnswers] = useState([' '])
  const [questionMode, setQuestionMode] = useState(false)
  const [correctAnswersMode, setCorrectAnswersMode] = useState(false)
  const [showResultAlert, setShowResultAlert] = useState(false)
  const [showAccountAlert, setShowAccountAlert] = useState(false)
  const [processedAccount, setProcessedAccount] = useState(" ")
  const [submitResponse, setSubmitResponse] = useState(false)
  const { getAccessTokenSilently, user } = useAuth0();
    
  const populateCategories = async () => {
    const token = await getAccessTokenSilently();
    await userManager.getUser(token);
    await userManager.processUser(user.sub, user.nickname, user.email, token)
    .then(response=>{
       setProcessedAccount(response); setShowAccountAlert(true)
      });
    setAccountEmailAddress(user.email);
    await qandamanager.getQuizGameCategories(token).then(response=>{
      if(categories[0]==[' ']){
        setCategories(response);
        setQuestionMode(false);
      }     
    });
    // await qandamanager.getGameOptionsByAccountEmailAddress(user.email, token)
    // .then(response=>{
    //   if(gameOptions==" "){
    //     setGameOptions(response);
    //   }     
    // });
  };

  useEffect(() => {
    populateCategories();
  }, []);
  
  async function DeleteUserData (){
    const token = await getAccessTokenSilently();
    await userManager.deleteUser(user.nickname, user.email, token).then(response=>{
      console.log(response);
    });
  }
  async function GameOptionsCallBack (gameOptionsData){
    const token = await getAccessTokenSilently();
    await qandamanager.getQuizQuestions(gameOptionsData, token).then(response=>{
      if(questions[0]==[' ']){
        setQuestions(response);
        setQuestionMode(true);
      } 
    });
  }

  async function GameCategoryCallBack (gameCategory){
    setCategory(gameCategory);
  }


  async function GameQuestionsCallBack (gameQuestionsData, givenAnswers){
    const token = await getAccessTokenSilently();
    setGivenAnswers(givenAnswers);
    await qandamanager.submitQuizQuestions(gameQuestionsData, token).then((response)=>{
      setShowResultAlert(true);
      if(response == true){
        setSubmitResponse(response);
      }
      
    });
    setQuestionMode(false);
      setCorrectAnswersMode(true);
  }

  async function CorrectAnswersCallBack (){
    ResetGame();
  }

  function ResetGame(){
    setQuestionMode(false);
    setCorrectAnswersMode(false);
    setCategory(" ");
    setQuestions([' ']);
    
  }

  function QuizGameForm() {
    if (questionMode) {
      return <QuizQuestionsForm handleQuestionCallback= {GameQuestionsCallBack} questions={questions} category={category} accountEmailAddress={accountEmailAddress}/>;
    }
    else if(correctAnswersMode){
      return <QuizCorrectAnswerForm handleCorrectAnswersCallback= {CorrectAnswersCallBack} questions={questions} givenAnswers={givenAnswers}/>;
    }
    return <QuizOptionsForm handleOptionsCallback={GameOptionsCallBack} handleGameCategorySet={GameCategoryCallBack} categories={categories} accountEmailAddress={accountEmailAddress}/>;
  }

  function ShowResultAlert(){
  if(showResultAlert){
    if(submitResponse == true){
      return <Alert key="success" variant="success" dismissible onClose={() => setShowResultAlert(false)}>
              The game you played was successfully saved!
             </Alert>
    }
    else{
      return <Alert key= "dark" variant="dark" dismissible onClose={() => setShowResultAlert(false)}>
               We could not save the your game :/ .. sorry about that .. maybe try again
              </Alert>
    }}
  }
  function ProcessedAccountAlert(){
    if(showAccountAlert){
        return <Alert key="info" variant="info" dismissible onClose={() => setShowAccountAlert(false)}>
                {processedAccount}
               </Alert>
    }
  }
  
  return (
    <PageLayout>
      <>
        <Container style={{ paddingTop: "3.2rem", paddingBottom: "3.2rem" }}>
          <Row className="d-flex align-items-stretch">
            <ShowResultAlert />
            <ProcessedAccountAlert />
            <Card className="bg-dark text-white" border="primary" style={{ height: "100%", width: "100%" }}>
              <Button onClick={DeleteUserData}>Delete Account Info</Button>
              <Card.Title
                class="d-flex justify-content-center"
                style={{ paddingTop: "1rem" }}
              >
                <h1>QUIZ QUEST</h1>
              </Card.Title>
              <Card.Body>
                <QuizGameForm />
              </Card.Body>
            </Card>
          </Row>
        </Container>
      </>
    </PageLayout>
  );
}

export default HomePage;
