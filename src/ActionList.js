import React from 'react';
import Action from './Action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

const ActionList = ({ data, setSelectedAction }) => {
  return (
    <>
      <h5 className="bg-secondary text-white p-2">Actions</h5>
      <div className="text-sm-right text-center mb-2 mb-sm-0">
        <span className="mr-2 d-block d-sm-inline">[number] Results</span>
        <FontAwesomeIcon className="border" icon={faAngleLeft} size="lg" />
        <span className="mx-2">Page [x] of [x]</span>
        <FontAwesomeIcon className="border" icon={faAngleRight} size="lg" />
      </div>
      <ul className="list-unstyled">
        {/* list actions returned from api */}
        {data.map((action) => <Action action={action} setSelectedAction={setSelectedAction} />)}
      </ul>
    </>
  );
}

export default ActionList;
