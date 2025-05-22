/* src/Pages/ResultsPage.jsx */
import React, { use, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetQuiz } from '../../Redux/Actions/quizAction';
// import { swotData } from '../../Data/swotData';
import MainLayout from '../../Components/MainLayout';
import TopBar from '../../Components/Navigation/TopBar';
import { getPersonalityByType } from '../../Redux/Actions/personality.action';
import ProsnalityCard from '../../Components/Core/ProsnalityCard';
import PersonalityTrait from '../../Components/Core/PersonnalityTrait';
import SwotAnalysis from '../../Components/Core/SwotAnalysis';
import MainLayoutScroll from '../../Components/MainLayoutScroll';
import { createUserPersonality } from '../../Redux/Actions/userPerso.actions';
import { toast } from 'react-hot-toast';
import {  updateUserDetails } from '../../Redux/Actions/Auth.action';
import LoadingSpinner from '../../Components/LoadingSpiner';
// const personalityDescriptions = {
//   ISTJ: 'ISTJ (Contrôleur) : Les ISTJ sont organisés, responsables et fiables. Ils préfèrent suivre des méthodes éprouvées et aiment maintenir l’ordre.',
//   ISFJ: 'ISFJ (Protecteur) : Les ISFJ sont attentionnés, loyaux et pratiques. Ils aiment soutenir les autres et maintenir l’harmonie.',
//   INFJ: 'INFJ (Conseiller) : Les INFJ sont intuitifs, empathiques et visionnaires. Ils cherchent à comprendre les motivations profondes des autres.',
//   INTJ: 'INTJ (Architecte) : Les INTJ sont logiques, analytiques et indépendants. Ils aiment planifier à long terme et innover.',
//   ISTP: 'ISTP (Artisan) : Les ISTP sont pratiques, adaptables et analytiques. Ils excellent à résoudre des problèmes concrets en situation.',
//   ISFP: 'ISFP (Compositeur) : Les ISFP sont artistiques, flexibles et empathiques. Ils apprécient l’authenticité et la liberté personnelle.',
//   INFP: 'INFP (Médiateur) : Les INFP sont idéalistes, créatifs et loyaux. Ils cherchent un sens profond dans leurs relations et leurs actions.',
//   INTP: 'INTP (Logicien) : Les INTP sont curieux, analytiques et innovants. Ils aiment explorer des idées abstraites et résoudre des énigmes intellectuelles.',
//   ESTP: 'ESTP (Dynamique) : Les ESTP sont énergiques, pratiques et persuasifs. Ils aiment l’action et les défis immédiats.',
//   ESFP: 'ESFP (Animateur) : Les ESFP sont sociables, spontanés et charismatiques. Ils aiment divertir et soutenir les autres.',
//   ENFP: 'ENFP (Inspirateur) : Les ENFP sont enthousiastes, créatifs et empathiques. Ils aiment explorer de nouvelles idées et motiver les autres.',
//   ENTP: 'ENTP (Innovateur) : Les ENTP sont vifs d’esprit, adaptables et argumentatifs. Ils aiment débattre et trouver des solutions originales.',
//   ESTJ: 'ESTJ (Directeur) : Les ESTJ sont organisés, décidés et structurés. Ils aiment diriger et optimiser les processus.',
//   ESFJ: 'ESFJ (Consul) : Les ESFJ sont chaleureux, loyaux et serviables. Ils aiment soutenir et encadrer les autres.',
//   ENFJ: 'ENFJ (Protagoniste) : Les ENFJ sont charismatiques, empathiques et inspirants. Ils aiment guider les autres vers leur potentiel.',
//   ENTJ: 'ENTJ (Commandant) : Les ENTJ sont stratégiques, confiants et décisionnels. Ils aiment fixer des objectifs ambitieux et mobiliser les ressources.'
// };

const ResultsPage = () => {
  const { user } = useSelector((state) => state.auth);
  const result = useSelector((state) => state.quiz.result);
  const testResult = useSelector((state) => state.quiz.testResult);
  const personality = useSelector((state) => state.personality.selected);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {

    if (result) {
      dispatch(getPersonalityByType(result));
    }
  }, [result, dispatch]);

  // const swot = swotData[result] || {
  //   strengths: [],
  //   weaknesses: [],
  //   opportunities: [],
  //   threats: []
  // };

  const handleRetake = () => {
    dispatch(resetQuiz());
    navigate('/');
  };

  const createProfile = async () => {
    // Clone profond pour éviter de modifier l'objet original
    const cleanPersonality = JSON.parse(JSON.stringify(personality));

    // Supprimer les champs indésirables
    delete cleanPersonality._id;
    delete cleanPersonality.__v;

    if (cleanPersonality.swot && cleanPersonality.swot._id) {
      delete cleanPersonality.swot._id;
    }

    const payload = {
      ...cleanPersonality,
      userId: user._id,
      testResult: testResult
    };

    try {
      await dispatch(createUserPersonality(payload));
      toast.success("Profil créé avec succès");
      await dispatch(updateUserDetails(user._id, { firstLogin: false }));
      toast.success("Compte modifiée avec succès");
      navigate('/');
    } catch (error) {
      toast.error("Échec de la création du profil");
    }
  };

  if (!result) {
    return (
      <MainLayout>
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
          <h1>Votre résultat MBTI</h1>
          <p>Vous n’avez pas complété le test. Veuillez revenir à la page d’accueil pour le commencer.</p>
          <button onClick={() => navigate('/')} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', cursor: 'pointer' }}>Retour à l'accueil</button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayoutScroll>
      {/* <TopBar title={"Résultat MBTI"} /> */}
      {/* <div className='full-section-container mb-3 '>
      <h2>Type de personnalité : {result}</h2>
      <p>{personalityDescriptions[result]}</p>

      <h3>Analyse SWOT</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        <div>
          <h4>Forces</h4>
          <ul>{swot.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>
        </div>
        <div>
          <h4>Faiblesses</h4>
          <ul>{swot.weaknesses.map((w, i) => <li key={i}>{w}</li>)}</ul>
        </div>
        <div>
          <h4>Opportunités</h4>
          <ul>{swot.opportunities.map((o, i) => <li key={i}>{o}</li>)}</ul>
        </div>
        <div>
          <h4>Menaces</h4>
          <ul>{swot.threats.map((t, i) => <li key={i}>{t}</li>)}</ul>
        </div>
      </div>

      <button className='primary-btn' onClick={handleRetake} >
        Refaire le test
      </button>
      </div> */} 
      <header className='shadowheader' style={{ backgroundColor: '#fff', marginBottom: "20px", borderRadius: "12px", padding: "10px 20px", border:"1px solid #83D2E1", position:"sticky", top:0, zIndex:999 }} >
            <h1 className='title'>Résultat MBTI</h1>
            <button className=' primary-btn ' onClick={() => createProfile()}>Enregitrer Profile</button>
        </header>
    
       
      
      <div className="section-container mb-3 ">
        <h4 className='section-container-title'>Personality</h4>
        {
          personality && personality.description && personality.role && personality.categorie ? (
            <section className="personality-section mt-4">
              <div className="personality-container">
                <ProsnalityCard personality={personality} />
              </div>


              <div className="traits-container">
                <PersonalityTrait
                  leftText="Extraversion"
                  rightText="Introversion"
                  percentage={
                    testResult.E > testResult.I
                      ? 100 - testResult.E * 10
                      : testResult.I * 10
                  }
                  label={
                    testResult.E > testResult.I
                      ? `${testResult.E * 10}% Extraverted`
                      : `${testResult.I * 10}% Introverted`
                  }
                  category={personality.categorie}
                />
                <PersonalityTrait
                  leftText="Intuition"
                  rightText="Sensing"
                  percentage={
                    testResult.N > testResult.S
                      ? 100 - testResult.N * 10
                      : testResult.S * 10
                  }
                  label={
                    testResult.N > testResult.S
                      ? `${testResult.N * 10}% Intuitive`
                      : `${testResult.S * 10}% Sensing`
                  }
                  category={personality.categorie}
                />
                <PersonalityTrait
                  leftText="Thinking"
                  rightText="Feeling"
                  percentage={
                    testResult.T > testResult.F
                      ? 100 - testResult.T * 10
                      : testResult.F * 10
                  }
                  label={
                    testResult.T > testResult.F
                      ? `${testResult.T * 10}% Thinking`
                      : `${testResult.F * 10}% Feeling`
                  }
                  category={personality.categorie}
                />
                <PersonalityTrait
                  leftText="Judging"
                  rightText="Prospecting"
                  percentage={
                    testResult.J > testResult.P
                      ? 100 - testResult.J * 10
                      : testResult.P * 10
                  }
                  label={
                    testResult.J > testResult.P
                      ? `${testResult.J * 10}% Judging`
                      : `${testResult.P * 10}% Prospecting`
                  }
                  category={personality.categorie}
                />
              </div>
            </section>
          ) : (
            <LoadingSpinner/>
          )}


      </div>

      <div className="section-container">
        <h4 className='section-container-title'>SWOT</h4>
        {personality && personality.description && personality.role && personality.categorie ? (
          <SwotAnalysis swot={personality.swot} isEditable />

        ) : (
          <LoadingSpinner/>
        )}


      </div>

   
    </MainLayoutScroll>
  );
};

export default ResultsPage;
