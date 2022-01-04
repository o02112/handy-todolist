import { useCallback, useState, useEffect } from 'react';

export const useMyHook = (() => {


  const myCallback = useCallback(() => {
    console.warn('this is myCallback');
  }, []);


  const [state, incresCount] = useState({
    count: {
      count1: 0
    }
  });


  useEffect(() => {
    console.info(state.count.count1, 'updated.')
    myCallback();
  }, [ state, myCallback ])


  const incresClick = () => {
    state.count.count1 += 1
    incresCount({...state})
  }



  return { myCallback, state, incresClick }


})