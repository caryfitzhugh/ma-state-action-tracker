import React from 'react';
import Action from './Action';
import Loading from './utils/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

const ActionList = ({ totalPages, data, setSelectedAction, page, navigatePages, totalRecords, loadingStatus }) => {
  return (
    <>
      <h5 className="bg-secondary text-white p-2">Actions</h5>
      <div className="text-sm-right text-center mb-2 mb-sm-0">
        <span className="mr-2 d-block d-sm-inline">{totalRecords} Results</span>
        <FontAwesomeIcon className="border" icon={faAngleLeft} size="lg" onClick={() => navigatePages("back")} />
        <span className="mx-2">Page {page} of {totalPages}</span>
        <FontAwesomeIcon className="border" icon={faAngleRight} size="lg" onClick={() => navigatePages("forward")}/>
      </div>
      <ul className="list-unstyled">
        {/* list actions returned from api */}
        {loadingStatus ? <Loading /> :
          data.map((action) => <Action key={"action-id-" + action.id} action={action} setSelectedAction={setSelectedAction} />)
        }
      </ul>
    </>
  );
}

export default ActionList;
