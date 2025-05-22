import React from 'react'
import './styles.css';
function PersonalityType() {
    return (
        <section className="personality-section">
            <h2>Your Personality</h2>
            <div className="architect-card">
                <h1>The Architect</h1>
                <h2>INTJ</h2>
                <h3>Analysts</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu.</p>
            </div>

            <div className="traits-container">
                <PersonalityTrait
                    leftText="Extraverted"
                    rightText="Introverted"
                    percentage={84}
                />
                <PersonalityTrait
                    leftText="Intuitive"
                    rightText="Observant"
                    percentage={84}
                />
                <PersonalityTrait
                    leftText="Thinking"
                    rightText="Feeling"
                    percentage={84}
                />
                <PersonalityTrait
                    leftText="Judging"
                    rightText="Prospecting"
                    percentage={84}
                />
                <PersonalityTrait
                    leftText="Assertive"
                    rightText="Turbulent"
                    percentage={84}
                />
            </div>
        </section>
    )
}

export default PersonalityType