import React, { useState } from 'react';
import Modal from "../../../Modal";
import Button from "../../../Button";
import { Row, Table, Cell } from '../../../Table';
import UserLink from '../../../UserLink';

const AvailabilityChecker = ({ availabilities }) => {
    const [open, setOpen] = useState(false);

    if (availabilities.length === 0) {
        return (
            <Button disabled className="button--small">None Available</Button>
        )
    };

    return (
        <>
            <Button onClick={() => setOpen(true)} className="button--small">
                Check Availability
            </Button>
            {open && <Modal onClose={() => setOpen(false)}>
                <div style={{ width: '400px', maxWidth: '75vw' }}>
                    <Table>
                        <Row isHeading>
                            <Cell isPriority>Owner</Cell>
                            <Cell>Quantity</Cell>
                        </Row>
                        {availabilities.map(({ collection: { user }, quantity }) => (
                            <Row>
                                <Cell isPriority>
                                    <UserLink user={user} />
                                </Cell>
                                <Cell>{quantity}</Cell>
                            </Row>
                        ))}
                    </Table>
                </div>
            </Modal>}
        </>
    )
}

export default AvailabilityChecker;