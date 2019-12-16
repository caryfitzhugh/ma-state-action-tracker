import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import './sass/Heading.scss';

const Heading = ({ title, closeButton, returnTo, page}) => {
  return (
    <>
    <div className="heading bg-secondary p-2 p-sm-5 shadow">
        <h1 className="d-sm-inline d-block text-white font-weight-bold text-center text-sm-left">{title}</h1>
        {closeButton ?
            <Link to={returnTo || "/"}>
                <FontAwesomeIcon className="text-white float-right close-sm" icon={faTimesCircle} size="4x" />
                <button className="btn btn-primary close-xs w-100">Back</button>
            </Link> :
            null
        }
    </div>
    {page == 1 ?
      <section className='heading-text'>
        <p>
  State agencies identified over 100 initial priority actions to increase resilience and overcome the Commonwealth's risks and vulnerabilities related to natural hazards and projected climate changes. SHMCAP actions can be sorted and viewed in multiple ways. The tracker is maintained by the State and contains a list of actions identified through the 2018 SHMCAP planning process as well as through the ongoing SHMCAP implementation process led by the Resilient Massachusetts Action Team (RMAT). Included are "global" actions that are intended to reduce risk across State government and the Commonwealth. All actions address at least one of the primary climate change interactions and associated climate change impacts identified in the risk assessment. Each action includes specific details, such as completion time frame, lead agency, agency priority score, and possible funding sources.
        </p>
      </section> : null}
    </>
  );
}

export default Heading;
