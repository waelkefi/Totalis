import React, { useEffect, useState } from 'react';
import TopBar from '../Navigation/TopBar';
import MainLayout from '../MainLayout';
import Navigation from './Navigation';
import Dashboard from './Dashboard';
import { getVisionByUserIdReq } from '../../Redux/Actions/vision.action';
import { useDispatch, useSelector } from 'react-redux';

function IndexMomentum() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const visions = useSelector((state) => state.visions.byUser || []);
  const [activeVision, setActiveVision] = useState('');

  // Fetch user's visions on mount
  useEffect(() => {
    if (user?._id) {
      dispatch(getVisionByUserIdReq(user._id));
    }
  }, [dispatch, user]);

  // Update activeVision when visions load
  useEffect(() => {
    if (visions.length > 0 && activeVision === '') {
      setActiveVision(visions[0].area);
    }
  }, [visions, activeVision]);
  return (
    <MainLayout>
      <TopBar title="Momentum" />
      <Navigation
        visions={visions}
        activeVision={activeVision}
        onChangeVision={setActiveVision}
      />
      <Dashboard vision={visions.find(v => v.area === activeVision)} />
    </MainLayout>
  );
}

export default IndexMomentum;
