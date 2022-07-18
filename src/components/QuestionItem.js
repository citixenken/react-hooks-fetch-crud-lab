import React from "react";

function QuestionItem({
  question,
  onQuestionDeleteClick,
  onModifyAnswerClick,
}) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleQuestionDeleteClick() {
    onQuestionDeleteClick(id);
  }

  function handleModifyAnswerClick(e) {
    onModifyAnswerClick(id, parseInt(e.target.value));
  }
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onClick={handleModifyAnswerClick}>
          {options}
        </select>
      </label>
      <button onClick={handleQuestionDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
