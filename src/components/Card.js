'use client';

import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Form from './Form';
import { deleteFact } from '../api/facts';

// eslint-disable-next-line react/prop-types
function FactCard({ fact, deleteFunc }) {
  const [localFact, setLocalFact] = useState(fact);
  const [editMode, setEditMode] = useState(false);

  const deleteindFact = () => {
    deleteFact(fact.firebaseKey, 'Yes').then(() => deleteFunc());
  };
  return (
    <Card>
      <Card.Body>
        {editMode ? (
          <>
            <p>Edit Mode</p>
            <Form obj={localFact} func={setLocalFact} />
            <div>
              <button type="button" className="btn btn-success" onClick={() => setEditMode(false)}>
                Exit Edit Mode
              </button>
            </div>
          </>
        ) : (
          <>
            {localFact.text}

            <div>
              <button type="button" className="btn btn-success" onClick={() => setEditMode(true)}>
                Edit
              </button>
              <button type="button" className="btn btn-danger" onClick={deleteindFact}>
                Delete
              </button>
            </div>
          </>
        )}
        ;
      </Card.Body>
    </Card>
  );
}

FactCard.propTypes = {
  fact: PropTypes.string.isRequired,
};

export default FactCard;
