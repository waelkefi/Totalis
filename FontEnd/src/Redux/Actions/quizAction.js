export const ANSWER_QUESTION = 'ANSWER_QUESTION';
export const CALCULATE_RESULT = 'CALCULATE_RESULT';
export const RESET_QUIZ = 'RESET_QUIZ';

// Action pour enregistrer une réponse
export const answerQuestion = (questionId, value) => ({
  type: ANSWER_QUESTION,
  payload: { questionId, value },
});

// Action pour calculer le résultat
export const calculateResult = () => ({
  type: CALCULATE_RESULT,
});

// Action pour réinitialiser le quiz
export const resetQuiz = () => ({
  type: RESET_QUIZ,
});
