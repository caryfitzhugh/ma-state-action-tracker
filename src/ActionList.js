import React from 'react';
import { useHistory } from "react-router-dom";
import Action from './Action';
import Loading from './utils/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'


const CurrentFilterList = ({setFilters, currentFilters, filterCategories}) => {
  const history = useHistory();
  const deleteFilter = (e, key, id) => {
    setFilters(key, id, true);
    e.preventDefault();
    e.stopPropagation();
  };

  if (Object.keys(currentFilters).length === 0) {
    return null;
  } else {
    return <span>
      {Object.keys(currentFilters).map((key) => {
        // For each key, look up it's data in the filterCategories
        let names = {};
        let category_name = "";
        filterCategories.forEach((category) => {
          if (category.filter_key === key) {
            category_name = category.title;
            category.data.forEach((catd) => {
              names[catd.id] = catd.display_name;
            });
          }
        });
        let badges = [];
        currentFilters[key].forEach((id) => {
          badges.push(<span key={key + '-' + id} style={{margin: "5px"}} className='badge badge-sm badge-primary'>{names[id]}
              &nbsp;
              <a href="#" onClick={(e) => deleteFilter(e, key, id)}>
                <FontAwesomeIcon className="text-white close-sm" icon={faTimesCircle} size="1x" />
              </a>
            </span>);
        });

        return <span key={key + 'badges'} ><strong>{category_name}:</strong> {badges}</span>;
      })}
    </span>;
  }
};

const ActionList = ({ totalPages, setFilters, data, setSelectedAction, page, navigatePages, totalRecords, loadingStatus, currentFilters, currentQuery, selectedFilters, filterCategories}) => {
  return (
    <>
      { currentQuery === "" ? null :

        <span key={'query-badges'} ><strong>Search:</strong> {currentQuery}</span>}
      <CurrentFilterList currentFilters={currentFilters}
                         setFilters={setFilters}
                         filterCategories={filterCategories} />
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
          data.map((action) => <Action key={"action-id-" + action.id}
                action={action}
                setSelectedAction={setSelectedAction}
                currentFilters={currentFilters}
                currentQuery={currentQuery}/>)
        }
      </ul>
    </>
  );
}

export default ActionList;
