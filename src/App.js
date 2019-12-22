import React from 'react';
import { Machine, assign } from 'xstate';
import { useMachine } from '@xstate/react';

import './App.css';

const machine = Machine({
  id: 'teamp-converter',
  context: { C: undefined, F: undefined },
  initial: 'active',
  states: {
    active: {
      on: {
        CELSIUS: {
          actions: assign({
            C: (ctx, evt) => evt.value,
            F: (ctx, evt) => (evt.value.length ? +evt.value * (9 / 5) + 32 : '')
          })
        },
        FAHRENHEIT: {
          actions: assign({
            F: (ctx, evt) => evt.value,
            C: (ctx, evt) => (evt.value.length ? +evt.value * (9 / 5) + 32 : '')
          })
        }
      }
    }
  }
});

function App() {
  const [current, send] = useMachine(machine);
  return (
    <div className="App">
      <h1>XState - Temperature converter</h1>
      <section>
        <label>
          <input
            type="number"
            id="C"
            value={current.context.C}
            onChange={e => send('CELSIUS', { value: e.target.value })}
            placeholder="Celsius"
          />
          <span>C</span>
        </label>
      </section>

      <section>
        <label>
          <input
            type="number"
            id="F"
            value={current.context.F}
            onChange={e => send('FAHRENHEIT', { value: e.target.value })}
            placeholder="Fahrenheit"
          />
          <span>F</span>
        </label>
      </section>
    </div>
  );
}

export default App;
