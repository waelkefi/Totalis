import React, { useState, useEffect } from "react";
import { MBTIDistributionChart } from "../components/chart";
import PersonalityCard, { ActivityCard } from "../components/personality-card";
import { Spinner, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllPersonalitiesReq } from "../../Redux/Actions/personality.action";
import TopBar from "../../Components/Navigation/TopBar";

export default function Dashboard() {

  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const personalities = useSelector((state) => state.personality.all || []);


  // Fetch user's visions on mount
useEffect(() => {
  const fetchData = async () => {
    await dispatch(getAllPersonalitiesReq());
    setIsLoading(false);
  };

  fetchData();
}, [dispatch]);

  // useEffect(() => {

  //   dispatch(getAllPersonalitiesReq());
  //   // Simule un chargement
  //   setTimeout(() => {
  //     setPersonalities(fakeData);
  //     setIsLoading(false);
  //   }, 1000);
  // }, []);

  const getCategoryCounts = () => {
    if (!Array.isArray(personalities)) return {
      analysts: 0, diplomats: 0, sentinels: 0, explorers: 0, total: 0,
    };

    const counts = {
      analysts: 0,
      diplomats: 0,
      sentinels: 0,
      explorers: 0,
      total: personalities.length,
    };

    personalities.forEach((p) => {
      switch (p.categorie) {
        case "Analysts":
          counts.analysts++;
          break;
        case "Diplomats":
          counts.diplomats++;
          break;
        case "Sentinels":
          counts.sentinels++;
          break;
        case "Explorers":
          counts.explorers++;
          break;
      }
    });

    return counts;
  };

  const counts = getCategoryCounts();

  const LoadingSkeleton = () => (
    <div className="d-flex justify-content-center align-items-center p-5">
      <Spinner animation="border" role="status" variant="primary">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );

  return (
    <div>
       <TopBar title={"Dashboard"} />
      <div className="mb-4">
        <p className="text-secondary">Overview of MBTI personality types data</p>
      </div>

      {/* Stats Cards */}
      <Row className="g-4 mt-2">
        {isLoading ? (
          <>
            <Col xs={12} sm={6} lg={3}><LoadingSkeleton /></Col>
            <Col xs={12} sm={6} lg={3}><LoadingSkeleton /></Col>
            <Col xs={12} sm={6} lg={3}><LoadingSkeleton /></Col>
            <Col xs={12} sm={6} lg={3}><LoadingSkeleton /></Col>
            <Col xs={12} sm={6}><LoadingSkeleton /></Col>
            <Col xs={12} sm={6}><LoadingSkeleton /></Col>
          </>
        ) : (
          <>
            <Col xs={12} sm={6} lg={3}>
               <PersonalityCard
                icon="bi-compass"
                title="Explorers"
                value={counts.explorers}
                category="Explorers"
              />
            </Col>
            <Col xs={12} sm={6} lg={3}>
              <PersonalityCard
                icon="bi-graph-up"
                title="Analysts"
                value={counts.analysts}
                category="Analysts"
              />
            </Col>
            <Col xs={12} sm={6} lg={3}>
              <PersonalityCard
                icon="bi-people"
                title="Diplomats"
                value={counts.diplomats}
                category="Diplomats"
              />
            </Col>
            <Col xs={12} sm={6} lg={3}>
              <PersonalityCard
                icon="bi-shield-check"
                title="Sentinels"
                value={counts.sentinels}
                category="Sentinels"
              />
            </Col>
            <Col xs={12} sm={3} >
            
               <PersonalityCard
                icon="bi-person-fill"
                title="Total Personalities"
                value={counts.total}
              />
            </Col>
            <Col xs={12} sm={9}>
              <ActivityCard />
            </Col>
          </>
        )}
      </Row>

      {/* MBTI Distribution Chart */}
      <div className="mt-4">
        {isLoading ? (
          <div className="card p-5"><LoadingSkeleton /></div>
        ) : (
          <MBTIDistributionChart personalities={personalities} />
        )}
      </div>
    </div>
  );
}
