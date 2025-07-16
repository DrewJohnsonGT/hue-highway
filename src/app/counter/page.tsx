'use client';

import { AddColor, ColorSquare, Loading } from '~/components';
import { ActionType, useAppState } from '~/context/useAppState';

import styles from './page.module.css';

const CountingPage = () => {
  const {
    dispatch,
    state: { colors, isEditMode, isLoading },
  } = useAppState();

  return (
    <div className={styles.root}>
      <div className={styles.colorSquares}>
        {isLoading ? (
          <Loading />
        ) : (
          colors.map((color) => (
            <ColorSquare
              key={color.id}
              color={color.hex}
              count={color.count}
              isEditMode={isEditMode}
              handleRemove={() => {
                dispatch({ payload: color.id, type: ActionType.RemoveColor });
              }}
              increment={() => {
                dispatch({ payload: color.id, type: ActionType.Increment });
              }}
              decrement={() => {
                dispatch({ payload: color.id, type: ActionType.Decrement });
              }}
            />
          ))
        )}
      </div>
      <AddColor
        onSelectNewColor={(newColor) => {
          dispatch({ payload: newColor, type: ActionType.AddNewColor });
        }}
      />
    </div>
  );
};

export default CountingPage;
