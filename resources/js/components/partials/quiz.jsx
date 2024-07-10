const QuizQuestion = ({ questionNumber, questionData }) => {
  const { mcq, options } = questionData;
  
  return (
    <div className="py-4">
      <h2>Soal {questionNumber}</h2>
      <p>{mcq}</p>
      <ul className="py-2">
        {Object.keys(options).map(optionKey => (
          <li key={optionKey}>
            <input type="radio" id={`option${optionKey}`} className="mr-2 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300" name={`question${questionNumber}`} value={optionKey} />
            <label htmlFor={`option${optionKey}`}>{options[optionKey]}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizQuestion;
