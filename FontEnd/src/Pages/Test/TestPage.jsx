import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { answerQuestion, calculateResult } from '../../Redux/Actions/quizAction';
import questions from '../../Data/Questions';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../Components/MainLayout';
import TopBar from '../../Components/Navigation/TopBar';

const steps = ['E/I', 'S/N', 'T/F', 'J/P'];

const TestPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const answers = useSelector((state) => state.quiz.answers);
  const [currentStep, setCurrentStep] = useState(0);

  const currentDimension = steps[currentStep];
  const stepQuestions = questions.filter(q => q.dimension === currentDimension);

  const handleAnswer = (questionId, value) => {
    const question = questions.find((q) => q.id === questionId);
    const formattedAnswer = `${question.dimension},${value}`;
    dispatch(answerQuestion(questionId, formattedAnswer));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    dispatch(calculateResult());
    navigate('/results');
  };

  const allStepQuestionsAnswered = stepQuestions.every(q => answers[q.id]);

  return (
    <MainLayout>
        <TopBar title={"Test MBTI"} />
      <div className='full-section-container mb-3 '>
        {/* <h4 className='mb-2 mt-2 section-container-title'>Étape {currentStep + 1} : Questions {currentDimension}</h4>
<hr /> */}
        {stepQuestions.map((q) => (
          <div key={q.id} style={{ marginBottom: '20px' }}>
            <h5 className='text'>{q.question}</h5>
            {q.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(q.id, option.value)}
                style={{
                  margin: '5px',
                  padding: '10px 20px',
                  backgroundColor: answers[q.id] === `${q.dimension},${option.value}` ? '#83D2E1' : '#f1f1f1',
                  color: answers[q.id] === `${q.dimension},${option.value}` ? '#fff' : '#15133A',
                  border: '1px solid #ccc',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                {option.text}
              </button>
            ))}
          </div>
        ))}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
          <button onClick={handleBack} disabled={currentStep === 0} className='primary-btn '>
            Précédent
          </button>

          {currentStep < steps.length - 1 ? (
            <button onClick={handleNext} disabled={!allStepQuestionsAnswered} className='primary-btn '>
              Suivant
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!allStepQuestionsAnswered}
              style={{
                backgroundColor: allStepQuestionsAnswered ? '#4CAF50' : '#ccc',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                cursor: allStepQuestionsAnswered ? 'pointer' : 'not-allowed',
              }}
            >
              Soumettre mes réponses
            </button>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default TestPage;
