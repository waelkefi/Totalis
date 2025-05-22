import React from 'react'
import MainLayoutScroll from '../MainLayoutScroll'
import TopBar from '../Navigation/TopBar'
import { useNavigate } from 'react-router-dom';

function VisionForm() {
    const navigate = useNavigate();
    const visionData = [
        {
            area: "Personal Life",
            icon: "bi-person",
            color: "primary",
            description: "Live in a comfortable home with a garden, travel the world at least twice a year, spend quality time with family and friends, and pursue meaningful hobbies."
        },
        {
            area: "Career",
            icon: "bi-briefcase",
            color: "purple",
            description: "Lead a successful tech company that makes a positive impact, mentor junior developers, write a tech book, and speak at major conferences."
        },
        {
            area: "Health & Fitness",
            icon: "bi-heart-pulse",
            color: "success",
            description: "Exercise 4 times a week, maintain healthy BMI, practice yoga or meditation daily, sleep 7–8 hours each night, and eat nutrient-rich meals."
        },
        {
            area: "Finances",
            icon: "bi-cash-coin",
            color: "warning",
            description: "Be debt-free, have 12 months of emergency savings, invest 20% of income, own property, and have a comfortable retirement fund."
        },
        {
            area: "Relationships",
            icon: "bi-people",
            color: "pink",
            description: "Nurture deep connections with family and friends, participate in community events, volunteer monthly, and build a supportive network."
        },
        {
            area: "Spiritual Life",
            icon: "bi-brightness-high",
            color: "orange",
            description: "Practice daily gratitude, spend time in nature weekly, read philosophical works, and dedicate time to personal reflection and growth."
        },
    ];
    return (
        <MainLayoutScroll>
            <TopBar title="Vision Board" />
            <div style={{ width: "100%" }} className='d-flex justify-content-end align-items-center'>
                <button className='dark-btn' style={{ float: "right" }} onClick={() => navigate('/vision')}>Vision Board</button>
            </div>
            <div className="card mt-3">
                <div className="card-body">
                    <h4 className="card-title mb-3">Define Your Vision</h4>

                    <form>
                        <div className="mb-3">
                            <label className="form-label" style={{ color: "#0d6efd", fontWeight: 'bold' }}>Personal Life</label>
                            <div className='vison-questions'>
                                <p>What does a typical day look like?

                                </p> <p>   What are you doing?</p> <p>How do you feel?</p></div>
                            <textarea className="form-control" rows="2" placeholder={`Describe your vision for Personal Life...`}></textarea>
                        </div>
                        <div className="mb-3" >
                            <label className="form-label" style={{ color: "#6f42c1", fontWeight: 'bold' }}>Career</label>
                            <div className='vison-questions'>
                                <p>Describe your work life</p>  <p>what are you doing?</p>
                                <p>Who are you working with?</p>
                            </div>


                            <textarea className="form-control" rows="2" placeholder={`Describe your vision for Career...`}></textarea>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" style={{ color: "#198754", fontWeight: 'bold' }}>Health & Fitness</label>
                            <div className='vison-questions'>
                                <p> What is your physical health like?</p>
                                <p>How do you take care of your body?</p>


                            </div>

                            <textarea className="form-control" rows="2" placeholder={`Describe your vision for Health & Fitness"...`}></textarea>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" style={{ color: "#ffc107", fontWeight: 'bold' }}>Finances</label>
                            <div className='vison-questions'>
                                <p>Picture your ideal financial situation.</p>
                                <p>How do you feel about money?</p>
                                <p> What kind of freedom does it give you?</p>

                            </div>
                            <textarea className="form-control" rows="2" placeholder={`Describe your vision for Finances...`}></textarea>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" style={{ color: "#d63384", fontWeight: 'bold' }}>Relationships</label>
                            <div className='vison-questions'>
                                <p>Who are the friends around you?</p>
                                <p>How do they support you and bring joy into your life?</p>
                                <p> How are your relationships with family members?
                                </p> <p>
                                    What do you do together?</p>



                            </div>
                            <textarea className="form-control" rows="2" placeholder={`Describe your vision for Relationships...`}></textarea>
                        </div>
                        <div className="mb-3" F>
                            <label className="form-label" style={{ color: "#fd7e14", fontWeight: 'bold' }}>Spiritual Life</label>
                             <div className='vison-questions'>
                                <p>What practices ground and uplift you?

</p>
                   <p>How do you connect with God?</p>


                            </div>
                            <textarea className="form-control" rows="2" placeholder={`Describe your vision for Spiritual Life...`}></textarea>
                        </div>

                        <button className="dark-btn" type="submit">Create Vision Board</button>
                    </form>
                </div>
            </div>
        </MainLayoutScroll>
    )
}

export default VisionForm