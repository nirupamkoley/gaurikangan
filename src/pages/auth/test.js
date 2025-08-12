import React, { useState } from 'react';

export default function Test() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Hello Counter from test Page</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </>
  );
}