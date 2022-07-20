import React, { FC, useState } from 'react';
import { Button, Callout, Dialog } from '@blueprintjs/core';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  Focus,
  selectFocusById,
  selectFocusesByIds,
} from '../../features/focuses';
import { RootState } from '../../app/store';

import styles from './styles.module.scss';

interface Props {
  focus: Focus;
  onClose: any;
}

const FocusInfoDialog: FC<Props> = ({ focus, onClose }) => {
  const [open, setOpen] = useState(true);
  const { selected: selectedVersion } = useSelector(
    (state: RootState) => state.releases,
  );
  const iconUrl = `${process.env.PUBLIC_URL}/assets/${selectedVersion}/icons/${focus.icon}.png`;

  const prerequisiteFocuses = useSelector((state: RootState) =>
    selectFocusesByIds(state, focus.prerequisiteFocusIds),
  );

  return (
    <Dialog
      title={focus.name}
      isOpen={open}
      className="bp4-dark"
      onClose={() => setOpen(false)}
      onClosed={onClose}
    >
      <div className="bp4-dialog-body">
        <Callout intent="danger" icon={null}>
          Requires:{' '}
          {prerequisiteFocuses.map((prerequisiteFocus) => (
            <Link key={prerequisiteFocus.id} to="#">
              {prerequisiteFocus.name}
            </Link>
          ))}
        </Callout>
        <img src={iconUrl} alt={focus.icon} />
        <p>
          <b>Cost:</b> {focus.cost} days
        </p>
        <p className="bp4-running-text">{focus.description}</p>
      </div>
      <div className="bp4-dialog-footer">
        <div className="bp4-dialog-footer-actions">
          <Button onClick={() => setOpen(false)}>Close</Button>
          <Button intent="primary">Copy Focus ID</Button>
        </div>
      </div>
    </Dialog>
  );
};

export { FocusInfoDialog };
