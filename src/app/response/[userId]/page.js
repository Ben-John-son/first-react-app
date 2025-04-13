'use client';

import React, { useEffect, useState } from 'react';
import FactCard from '@/components/Card';
import PropTypes from 'prop-types';
import { readFacts } from '../../../api/facts';

// eslint-disable-next-line react/prop-types
export default function ResponseYesPage({ params, searchParams }) {
  // eslint-disable-next-line react/prop-types
  const [facts, setFacts] = useState([]);
  const getFacts = () => {
    readFacts(params.userId, searchParams.value).then(setFacts);
  };

  useEffect(() => {
    getFacts();
  }, []);

  return (
    <div>
      {Object.values(facts).map((fact) => (
        <FactCard key={fact.firebaseKey} fact={fact} deleteFunc={getFacts} />
      ))}
    </div>
  );
}

ResponseYesPage.propTypes = {
  params: PropTypes.string.isRequired,
  searchParams: PropTypes.string.isRequired,
};
