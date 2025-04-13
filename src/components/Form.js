'use client';

import React, { useState } from 'react';
import { useAuth } from '@/utils/context/authContext';
import { postFact, updateFact } from '@/api/facts';
// import { propTypes } from 'react-bootstrap/esm/Image';

const initialState = {
  text: '',
  name: '',
};

// eslint-disable-next-line react/prop-types
export default function Form({ obj = initialState, func }) {
  const { user } = useAuth();
  const [factDetails, setFactDetails] = useState(obj);

  const handleInputUpdate = (e) => {
    const { name, value } = e.target;

    setFactDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFactDetails(initialState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (factDetails.firebaseKey) {
      await updateFact(factDetails, 'Yes');
      func(factDetails);
    } else {
      const response = await postFact(
        {
          ...factDetails,
          userId: user.uid,
        },
        'Yes',
      );
      await updateFact({ firebaseKey: response.name }, 'Yes');
      resetForm();
    }
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="text">Fact</label>
        <input onChange={handleInputUpdate} type="text" name="text" id="text" className="form-control" value={factDetails.text} required />
      </div>
      <div>
        <label htmlFor="name">Your Name</label>
        <input onChange={handleInputUpdate} type="text" name="name" id="name" className="form-control" value={factDetails.name} required />
      </div>
      <button className="btn btn-success" type="submit">
        Submit
      </button>
    </form>
  );
}

// obj.propTypes = {
//   text: propTypes.string.isRequired,
//   name: propTypes.string.isRequired,
// }
