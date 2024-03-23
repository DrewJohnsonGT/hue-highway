'use client';

import { ResponsiveContainer } from 'recharts';
import { Button, Loading } from '~/components';
import { ActionType, useAppState } from '~/context/useAppState';
import styles from './page.module.css';

const TripsPage = () => {
  const {
    dispatch,
    state: { isLoading, trips },
  } = useAppState();
  return isLoading ? (
    <Loading />
  ) : (
    <div className={styles.root}>
      <h2 className={styles.total}>Past Trips</h2>
      <ResponsiveContainer width="100%" height={400}>
        <>
          <Button
            onClick={() => {
              dispatch({ type: ActionType.SaveTrip });
            }}>
            Add Trip
          </Button>
          {trips.map((trip) => {
            return (
              <div key={trip.id} className={styles.trip}>
                <h3>{trip.name}</h3>
                <p>{trip.description}</p>
              </div>
            );
          })}
        </>
      </ResponsiveContainer>
    </div>
  );
};

export default TripsPage;
