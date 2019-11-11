import React from 'react';
import Action from './Action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

const ActionList = ({ data, setSelectedAction, page, setPage, totalRecords }) => {

  const totalPages = Math.ceil(totalRecords / 20);

  return (
    <>
      <h5 className="bg-secondary text-white p-2">Actions</h5>
      <div className="text-sm-right text-center mb-2 mb-sm-0">
        <span className="mr-2 d-block d-sm-inline">{totalRecords} Results</span>
        <FontAwesomeIcon className="border" icon={faAngleLeft} size="lg" onClick={() => setPage(page === 1 ? page : page - 1)} />
        <span className="mx-2">Page {page} of {totalPages}</span>
        <FontAwesomeIcon className="border" icon={faAngleRight} size="lg" onClick={() => setPage(page < totalPages ? page + 1 : page)}/>
      </div>
      <ul className="list-unstyled">
        {/* list actions returned from api */}
        {data.map((action) => <Action action={action} setSelectedAction={setSelectedAction} />)}
      </ul>
    </>
  );
}

export default ActionList;
