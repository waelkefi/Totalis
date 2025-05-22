import React, { useEffect } from 'react';
import './styles.css';
import PersonalityTrait from './PersonnalityTrait';
import SwotAnalysis from './SwotAnalysis';
import ProsnalityCard from './ProsnalityCard';
import TopBar from '../Navigation/TopBar';
import MainLayoutScroll from '../MainLayoutScroll';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserPersonality } from '../../Redux/Actions/userPerso.actions';
import LoadingSpinner from '../LoadingSpiner';

const Index = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const userPerso = useSelector((state) => state.userPerso);

    useEffect(() => {
        if (user?._id) {
          dispatch(fetchUserPersonality(user._id));
        }
      }, []);
  
    return (
        <MainLayoutScroll>
            <TopBar title={"Core"} />
            <div className="section-container mb-3 ">
                <h4 className='section-container-title'>Personality</h4>
                {
                   (userPerso && userPerso.testResult)  ? <section className="personality-section mt-4">
                        <div className="personality-container">
                            <ProsnalityCard personality={userPerso} />
                        </div>


                        <div className="traits-container">
                            <PersonalityTrait
                                leftText="Extraversion"
                                rightText="Introversion"
                                percentage={
                                    userPerso.testResult.E > userPerso.testResult.I
                                        ? 100 - userPerso.testResult.E * 10
                                        : userPerso.testResult.I * 10
                                }
                                label={
                                    userPerso.testResult.E > userPerso.testResult.I
                                        ? `${userPerso.testResult.E * 10}% Extraverted`
                                        : `${userPerso.testResult.I * 10}% Introverted`
                                }
                                category={userPerso.categorie}
                            />
                            <PersonalityTrait
                                leftText="Intuition"
                                rightText="Sensing"
                                percentage={
                                    userPerso.testResult.N > userPerso.testResult.S
                                        ? 100 - userPerso.testResult.N * 10
                                        : userPerso.testResult.S * 10
                                }
                                label={
                                    userPerso.testResult.N > userPerso.testResult.S
                                        ? `${userPerso.testResult.N * 10}% Intuitive`
                                        : `${userPerso.testResult.S * 10}% Sensing`
                                }
                                category={userPerso.categorie}
                            />
                            <PersonalityTrait
                                leftText="Thinking"
                                rightText="Feeling"
                                percentage={
                                    userPerso.testResult.T > userPerso.testResult.F
                                        ? 100 - userPerso.testResult.T * 10
                                        : userPerso.testResult.F * 10
                                }
                                label={
                                    userPerso.testResult.T > userPerso.testResult.F
                                        ? `${userPerso.testResult.T * 10}% Thinking`
                                        : `${userPerso.testResult.F * 10}% Feeling`
                                }
                                category={userPerso.categorie}
                            />
                            <PersonalityTrait
                                leftText="Judging"
                                rightText="Prospecting"
                                percentage={
                                    userPerso.testResult.J > userPerso.testResult.P
                                        ? 100 - userPerso.testResult.J * 10
                                        : userPerso.testResult.P * 10
                                }
                                label={
                                    userPerso.testResult.J > userPerso.testResult.P
                                        ? `${userPerso.testResult.J * 10}% Judging`
                                        : `${userPerso.testResult.P * 10}% Prospecting`
                                }
                                category={userPerso.categorie}
                            />
                        </div>
                    </section>
                        : <LoadingSpinner/>
                }

            </div>
            <div className="section-container">
                {/* <h4 className='section-container-title'>SWOT</h4> */}
                {(userPerso && userPerso.swot)?
                (
                    <SwotAnalysis swot={userPerso.swot} />) : <LoadingSpinner/>
                }
            </div>
        </MainLayoutScroll>
    );
};

export default Index;