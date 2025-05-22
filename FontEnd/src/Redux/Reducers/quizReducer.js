import { ANSWER_QUESTION, CALCULATE_RESULT, RESET_QUIZ } from '../Actions/quizAction';

const initialState = {
  answers: {},      // Stocke les réponses données à chaque question
  result: '',       // Type MBTI final (ex: INFP)
  testResult: null, // Détails des scores (ex: { I: 3, E: 5, ... })
};

export const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case ANSWER_QUESTION: {
      const { questionId, value } = action.payload;
      return {
        ...state,
        answers: {
          ...state.answers,
          [questionId]: value,
        },
      };
    }

    case CALCULATE_RESULT: {
      const dimensions = {
        I: 0, E: 0,
        S: 0, N: 0,
        T: 0, F: 0,
        J: 0, P: 0,
      };

      console.log('Réponses enregistrées :', state.answers);

      Object.values(state.answers).forEach((answer) => {
        if (!answer) return;

        const [dimensionPair, choice] = answer.split(',');

        const validMap = {
          'E/I': ['E', 'I'],
          'S/N': ['S', 'N'],
          'T/F': ['T', 'F'],
          'J/P': ['J', 'P'],
        };

        const validLetters = validMap[dimensionPair];

        if (validLetters && validLetters.includes(choice)) {
          dimensions[choice]++;
        } else {
          console.error(`Erreur : Réponse mal formatée ou non valide : "${answer}"`);
        }
      });

      console.log('Scores des dimensions :', dimensions);

      const result =
        (dimensions.E >= dimensions.I ? 'E' : 'I') +
        (dimensions.S >= dimensions.N ? 'S' : 'N') +
        (dimensions.T >= dimensions.F ? 'T' : 'F') +
        (dimensions.J >= dimensions.P ? 'J' : 'P');

      console.log('Résultat calculé :', result);

      return {
        ...state,
        result,
        testResult: dimensions, // ex: { I: 4, E: 6, ... }
      };
    }

    case RESET_QUIZ:
      return initialState;

    default:
      return state;
  }
};
