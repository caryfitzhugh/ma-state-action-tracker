import React from 'react';
import Action from './Action';
import Loading from './Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

const ActionList = ({ data, setSelectedAction, page, setPage, totalRecords, loadingStatus, getRecords }) => {

  const totalPages = totalRecords !== 0 ? Math.ceil(totalRecords / 20) : 1;

  const navigate = (direction) => {
    if (direction === "back")
      setPage(page === 1 ? page : page - 1)
    else
      setPage(page < totalPages ? page + 1 : page)
      getRecords(page)
  }

  return (
    <>
      <h5 className="bg-secondary text-white p-2">Actions</h5>
      <div className="text-sm-right text-center mb-2 mb-sm-0">
        <span className="mr-2 d-block d-sm-inline">{totalRecords} Results</span>
        <FontAwesomeIcon className="border" icon={faAngleLeft} size="lg" onClick={() => navigate("back")} />
        <span className="mx-2">Page {page} of {totalPages}</span>
        <FontAwesomeIcon className="border" icon={faAngleRight} size="lg" onClick={() => navigate("next")}/>
      </div>
      <ul className="list-unstyled">
        {/* list actions returned from api */}
        {loadingStatus ? <Loading /> :
          data.map((action) => <Action action={action} setSelectedAction={setSelectedAction} />)
        }
      </ul>
    </>
  );
}

export default ActionList;
