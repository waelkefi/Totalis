const questions = [
    // Questions E/I
    {
      id: 1,
      dimension: 'E/I',
      question: 'Etes-vous plutôt extraverti ou introverti ?',
      options: [
        { text: 'Je suis dynamique', value: 'E' },
        { text: 'Je suis calme', value: 'I' },
      ],
    },
    {
      id: 2,
      dimension: 'E/I',
      question: 'Vous aimez parler ou écouter ?',
      options: [
        { text: 'J’aime parler', value: 'E' },
        { text: 'J’aime écouter', value: 'I' },
      ],
    },
    {
      id: 3,
      dimension: 'E/I',
      question: 'Vous pensez à voix haute ou réfléchissez posément ?',
      options: [
        { text: 'Je pense à voix haute', value: 'E' },
        { text: 'Je réfléchis posément', value: 'I' },
      ],
    },
    {
      id: 4,
      dimension: 'E/I',
      question: 'Vous agissez d’abord ou pensez d’abord ?',
      options: [
        { text: 'J’agis, puis je pense', value: 'E' },
        { text: 'Je pense, puis j’agis', value: 'I' },
      ],
    },
    {
      id: 5,
      dimension: 'E/I',
      question: 'Vous aimez établir de nouveaux contacts ou approfondir vos contacts ?',
      options: [
        { text: 'J’aime établir de nouveaux contacts', value: 'E' },
        { text: 'J’aime approfondir mes contacts', value: 'I' },
      ],
    },
    {
      id: 6,
      dimension: 'E/I',
      question: 'Vous êtes plutôt distrait ou concentré ?',
      options: [
        { text: 'Je suis facilement distrait', value: 'E' },
        { text: 'Je suis concentré', value: 'I' },
      ],
    },
    {
      id: 7,
      dimension: 'E/I',
      question: 'Vous préférez faire plusieurs choses à la fois ou une seule à la fois ?',
      options: [
        { text: 'Je préfère faire plusieurs choses à la fois', value: 'E' },
        { text: 'Je préfère me concentrer sur une seule chose à la fois', value: 'I' },
      ],
    },
    {
      id: 8,
      dimension: 'E/I',
      question: 'Vous avez parfois un discours changeant ou vous êtes plus indépendant ?',
      options: [
        { text: 'Mon discours est parfois changeant', value: 'E' },
        { text: 'Je suis indépendant', value: 'I' },
      ],
    },
    {
      id: 9,
      dimension: 'E/I',
      question: 'Vous aimez parler plutôt qu’écrire ou l’inverse ?',
      options: [
        { text: 'Je préfère parler', value: 'E' },
        { text: 'Je préfère écrire', value: 'I' },
      ],
    },
    {
      id: 10,
      dimension: 'E/I',
      question: 'Vous n’aimez pas être seul ou vous vous sentez bien seul ?',
      options: [
        { text: 'Je n’aime pas être seul', value: 'E' },
        { text: 'Je me sens bien seul', value: 'I' },
      ],
    },
  
    // Questions S/N
    {
      id: 11,
      dimension: 'S/N',
      question: 'Êtes-vous plus attaché aux faits ou aux idées ?',
      options: [
        { text: 'Je m’attache aux faits et aux détails', value: 'S' },
        { text: 'Je m’intéresse aux idées', value: 'N' },
      ],
    },
    {
      id: 12,
      dimension: 'S/N',
      question: 'Préférez-vous les choses utiles ou les nouvelles idées ?',
      options: [
        { text: 'Je préfère les choses utiles', value: 'S' },
        { text: 'Je préfère les idées nouvelles', value: 'N' },
      ],
    },
    {
      id: 13,
      dimension: 'S/N',
      question: 'Vous vivez dans l’instant ou vous pensez aux implications futures ?',
      options: [
        { text: 'Je vis dans l’instant', value: 'S' },
        { text: 'Je pense aux implications futures', value: 'N' },
      ],
    },
    {
      id: 14,
      dimension: 'S/N',
      question: 'Vous faites confiance à l’expérience ou à votre instinct ?',
      options: [
        { text: 'Je fais confiance à l’expérience', value: 'S' },
        { text: 'Je fais confiance à mon instinct', value: 'N' },
      ],
    },
    {
      id: 15,
      dimension: 'S/N',
      question: 'Vous aimez approfondir vos compétences ou apprendre de nouvelles compétences ?',
      options: [
        { text: 'Je préfère approfondir mes compétences', value: 'S' },
        { text: 'Je préfère apprendre de nouvelles compétences', value: 'N' },
      ],
    },
    {
      id: 16,
      dimension: 'S/N',
      question: 'Préférez-vous la routine ou l’innovation ?',
      options: [
        { text: 'Je préfère la routine', value: 'S' },
        { text: 'Je préfère l’innovation', value: 'N' },
      ],
    },
    {
      id: 17,
      dimension: 'S/N',
      question: 'Préférez-vous des instructions étape par étape ou comprendre par vous-même ?',
      options: [
        { text: 'Je préfère des instructions étape par étape', value: 'S' },
        { text: 'Je préfère comprendre par moi-même', value: 'N' },
      ],
    },
    {
      id: 18,
      dimension: 'S/N',
      question: 'Vous êtes pratique ou théorique ?',
      options: [
        { text: 'Je suis pratique', value: 'S' },
        { text: 'Je suis théorique', value: 'N' },
      ],
    },
    {
      id: 19,
      dimension: 'S/N',
      question: 'Vous aimez ce qui est concret ou ce qui est abstrait ?',
      options: [
        { text: 'Je préfère ce qui est concret', value: 'S' },
        { text: 'Je préfère ce qui est abstrait', value: 'N' },
      ],
    },
    {
      id: 20,
      dimension: 'S/N',
      question: 'Vous êtes réaliste ou imaginatif ?',
      options: [
        { text: 'Je suis réaliste', value: 'S' },
        { text: 'Je suis imaginatif', value: 'N' },
      ],
    },
  
    // Questions T/F
    {
      id: 21,
      dimension: 'T/F',
      question: 'Vous prenez des décisions de manière objective ou subjective ?',
      options: [
        { text: 'Je suis objectif', value: 'T' },
        { text: 'Je suis subjectif', value: 'F' },
      ],
    },
    {
      id: 22,
      dimension: 'T/F',
      question: 'Vous avez un sens de la justice ou de la clémence ?',
      options: [
        { text: 'J’ai un sens de la justice', value: 'T' },
        { text: 'Je suis clément', value: 'F' },
      ],
    },
    {
      id: 23,
      dimension: 'T/F',
      question: 'Vous êtes plutôt critique ou tentant de faire plaisir ?',
      options: [
        { text: 'Je suis critique', value: 'T' },
        { text: 'Je fais plaisir', value: 'F' },
      ],
    },
    {
      id: 24,
      dimension: 'T/F',
      question: 'Vous êtes franc et direct ou diplomate ?',
      options: [
        { text: 'Je suis franc et direct', value: 'T' },
        { text: 'Je suis diplomate', value: 'F' },
      ],
    },
    {
      id: 25,
      dimension: 'T/F',
      question: 'Vous êtes motivé par les projets ou par l’estime des autres ?',
      options: [
        { text: 'Je suis motivé par les projets', value: 'T' },
        { text: 'Je suis motivé par l’estime des autres', value: 'F' },
      ],
    },
    {
      id: 26,
      dimension: 'T/F',
      question: 'Vous aimez vous placer en observateur ou êtes-vous sensible ?',
      options: [
        { text: 'Je suis un observateur', value: 'T' },
        { text: 'Je suis sensible', value: 'F' },
      ],
    },
    {
      id: 27,
      dimension: 'T/F',
      question: 'Vous êtes plus logique ou plus émotionnel ?',
      options: [
        { text: 'Je suis logique', value: 'T' },
        { text: 'Je suis émotionnel', value: 'F' },
      ],
    },
    {
      id: 28,
      dimension: 'T/F',
      question: 'Vous aimez argumenter ou éviter le conflit ?',
      options: [
        { text: 'J’aime argumenter', value: 'T' },
        { text: 'J’évite le conflit', value: 'F' },
      ],
    },
    {
      id: 29,
      dimension: 'T/F',
      question: 'Vous faites confiance à la logique ou à vos impressions ?',
      options: [
        { text: 'Je fais confiance à la logique', value: 'T' },
        { text: 'Je fais confiance à mes impressions', value: 'F' },
      ],
    },
    {
      id: 30,
      dimension: 'T/F',
      question: 'Vous êtes plus motivé par la raison ou par l’harmonie ?',
      options: [
        { text: 'Je suis motivé par la raison', value: 'T' },
        { text: 'Je suis motivé par l’harmonie', value: 'F' },
      ],
    },
  
    // Questions J/P
    {
      id: 31,
      dimension: 'J/P',
      question: 'Vous aimez organiser ou expérimenter ?',
      options: [
        { text: 'J’aime organiser', value: 'J' },
        { text: 'J’aime expérimenter', value: 'P' },
      ],
    },
    {
      id: 32,
      dimension: 'J/P',
      question: 'Vous êtes sérieux ou ludique ?',
      options: [
        { text: 'Je suis sérieux', value: 'J' },
        { text: 'Je suis ludique', value: 'P' },
      ],
    },
    {
      id: 33,
      dimension: 'J/P',
      question: 'Vous suivez votre calendrier ou vous préférez la liberté ?',
      options: [
        { text: 'Je suis ponctuel et suivi mon calendrier', value: 'J' },
        { text: 'Je préfère la liberté', value: 'P' },
      ],
    },
    {
      id: 34,
      dimension: 'J/P',
      question: 'Vous préférez un emploi du temps structuré ou flexible ?',
      options: [
        { text: 'Je préfère un emploi du temps structuré', value: 'J' },
        { text: 'Je préfère un emploi du temps flexible', value: 'P' },
      ],
    },
    {
      id: 35,
      dimension: 'J/P',
      question: 'Vous êtes plus productif dans un environnement organisé ou flexible ?',
      options: [
        { text: 'Je suis plus productif dans un environnement organisé', value: 'J' },
        { text: 'Je suis plus productif dans un environnement flexible', value: 'P' },
      ],
    },
    {
      id: 36,
      dimension: 'J/P',
      question: 'Vous préférez prendre une décision rapide ou garder des options ouvertes ?',
      options: [
        { text: 'Je prends une décision rapide', value: 'J' },
        { text: 'Je garde des options ouvertes', value: 'P' },
      ],
    },
    {
      id: 37,
      dimension: 'J/P',
      question: 'Vous êtes plutôt prévisible ou spontané ?',
      options: [
        { text: 'Je suis prévisible', value: 'J' },
        { text: 'Je suis spontané', value: 'P' },
      ],
    },
    {
      id: 38,
      dimension: 'J/P',
      question: 'Vous aimez suivre un plan ou improviser ?',
      options: [
        { text: 'Je préfère suivre un plan', value: 'J' },
        { text: 'Je préfère improviser', value: 'P' },
      ],
    },
    {
      id: 39,
      dimension: 'J/P',
      question: 'Vous êtes plus organisé ou flexible ?',
      options: [
        { text: 'Je suis organisé', value: 'J' },
        { text: 'Je suis flexible', value: 'P' },
      ],
    },
    {
      id: 40,
      dimension: 'J/P',
      question: 'Vous préférez finir une tâche rapidement ou la perfectionner ?',
      options: [
        { text: 'Je préfère finir rapidement', value: 'J' },
        { text: 'Je préfère perfectionner', value: 'P' },
      ],
    },
  ];
  
  
  export default questions;
  