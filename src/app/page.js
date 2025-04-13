'use client';

// any component that uses useAuth needs this because if a component directly imports useAuth, it needs to be a client component since useAuth uses React hooks.

// import { Button } from 'react-bootstrap';
// import { signOut } from '@/utils/auth'; // anything in the src dir, you can use the @ instead of relative paths
import { useAuth } from '@/utils/context/authContext';
import { useEffect, useState } from 'react';
import { postFact, updateFact } from '../api/facts';

function Home() {
  const [uselessFact, setUselessFact] = useState({});
  const { user } = useAuth();
  const fetchFact = async () => {
    const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en');
    const fact = await response.json();
    setUselessFact(fact);
  };

  // const dbUrl = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL

  const selectResponse = async (boolean) => {
    const val = boolean ? 'Yes' : 'No';
    const obj = {
      userId: user.uid,
      text: uselessFact.text,
    };
    const response = await postFact(obj, val);
    await updateFact({ firebaseKey: response.name }, val);
    fetchFact();
    return obj;
  };

  useEffect(() => {
    fetchFact();
  }, []);
  return (
    <div>
      <h2>{uselessFact.text}</h2>
      <h4>Did you know this fact?</h4>
      <button type="button" className="btn btn-success" onClick={() => selectResponse(true)}>
        YES
      </button>
      <button type="button" className="btn btn-danger" onClick={() => selectResponse(false)}>
        NO
      </button>
    </div>
  );
}

export default Home;
