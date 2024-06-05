'use client';

import { useState } from 'react';
import { ResponsiveContainer } from 'recharts';
import { Button, Loading, TextInput } from '~/components';
import { ActionType, useAppState } from '~/context/useAppState';
import styles from './page.module.css';

const TripsPage = () => {
  const [newTripName, setNewTripName] = useState<string>('');
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
        <div className={styles.newTrip}>
          <TextInput
            label="Trip Name"
            value={newTripName}
            onChange={setNewTripName}
          />
          <Button
            disabled={!newTripName}
            onClick={() => {
              dispatch({ payload: newTripName, type: ActionType.SaveTrip });
            }}>
            Add Trip
          </Button>
          {trips.map((trip) => {
            return (
              <div key={trip.id} className={styles.trip}>
                <h3>{trip.name}</h3>
              </div>
            );
          })}
        </div>
      </ResponsiveContainer>
    </div>
  );
};

export default TripsPage;
