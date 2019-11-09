import React from 'react';
import Action from './Action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

const mockActions = [
  {
    name: "EOTSS: Migrate CommVault to the cloud",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sollicitudin, elit nec venenatis egestas, lorem magna molestie augue, eget consectetur turpis neque vel quam. Fusce convallis sed velit sit amet maximus. Nullam blandit iaculis dui, tristique tempus nulla tempor et. Nam et tellus sit amet nisl cursus iaculis non a ipsum.."
  }
]

const ActionList = () => {
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
        {mockActions.map((action) => <Action action={action} />)}
      </ul>
    </>
  );
}

export default ActionList;
