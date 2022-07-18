import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  // GET: questions from API
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((questions) => setQuestions(questions));
  }, []);

  // DELETE:
  function handleQuestionDeleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        const updatedQuestions = questions.filter(
          (question) => question.id !== id
        );
        setQuestions(updatedQuestions);
      });
  }

  //PATCH:
  function handleModifyAnswerClick(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((res) => res.json())
      .then((updatedQuestion) => {
        const updatedQuestions = questions.map((question) => {
          if (question.id === updatedQuestion.id) {
            return updatedQuestion;
          } else {
            return question;
          }
        });
        setQuestions(updatedQuestions);
      });
  }

  const questionsDisplayed = questions.map((question) => (
    <QuestionItem
      key={question.id}
      question={question}
      onQuestionDeleteClick={handleQuestionDeleteClick}
      onModifyAnswerClick={handleModifyAnswerClick}
    />
  ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionsDisplayed}</ul>
    </section>
  );
}

export default QuestionList;
