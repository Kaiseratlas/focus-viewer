import React, { useMemo, useState } from 'react';
import { Container, Stage } from '@inlet/react-pixi';
import { useQuery } from 'react-query';
import { FocusContainer } from './components/FocusContainer';
import Viewport from './components/Viewport';

function App() {
  const { isLoading, error, data } = useQuery<any[]>('repoData', () =>
    fetch('./assets/0.20.1/trees/panama.json').then((res) => res.json()),
  );

  const focusMap = useMemo(() => {
    if (!data) {
      return null;
    }
    return new Map(data.map((focus) => [focus.id, focus]));
  }, [data]);

  const refMap = new Map();

  console.log('focusMap', focusMap);

  const initialFocuses = useMemo(
    () => data?.filter((focus) => !focus.relativePositionId) ?? [],
    [data],
  );

  console.log('refMap', refMap);

  const [rendered, setRendered] = useState(0);

  return (
    <Stage width={1400} height={1000} options={{ backgroundColor: 0x1d2021 }}>
      <Viewport width={1400} height={1000}>
        <Container position={[100, 100]}>
          {data &&
            initialFocuses.map((focus) => {
              return (
                <FocusContainer
                  key={focus.id}
                  focus={focus}
                  allFocuses={data}
                  onMount={() => {
                    setRendered(rendered + 1);
                  }}
                />
              );
            })}
        </Container>
      </Viewport>
    </Stage>
  );
}

export default App;
