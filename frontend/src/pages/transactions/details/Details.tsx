import React, { FunctionComponent, useEffect } from 'react';
import sampleData from '../data.json';
import { useParams } from 'react-router-dom';
import Label from '../../../shared/components/label/Label';
import Value from '../../../shared/components/value/Value';
import DetailsCard from '../../../shared/components/details-card/DetailsCard';
import { NavLink } from 'react-router-dom';
import classes from './Details.module.scss';
import { DetailsTabItem, DetailsTabs } from '../../../shared/components/details-tabs/DetailsTabs';
import ContentDetailsScript from '../../../shared/components/content-details-script/ContentDetailsScript';
import Card from '../../../shared/components/card/Card';
import TimeAgo from '../../../shared/components/time-ago/TimeAgo';
import DateWithCalendar from '../../../shared/components/date-with-calendar/DateWithCalendar';
import { useSearch } from '../../../shared/hooks/search';
import { Breadcrumb, useNavigation } from '../../../shared/hooks/navigation';
import StatusCode from '../shared/StatusCode';
import Ellipsis from '../../../shared/components/ellipsis/Ellipsis';
import EventDetailsTable from '../../../shared/components/event-details-table/EventDetailsTable';

type RouteParams = {
    transactionId: string;
};

const Details: FunctionComponent<any> = () => {
    const { transactionId } = useParams<RouteParams>();
    const { setPlaceholder } = useSearch();
    const { setBreadcrumbs, showSearchBar } = useNavigation();
    const { showNavigationDrawer, showSubNavigation } = useNavigation();

    const breadcrumbs: Breadcrumb[] = [{ to: '/transactions', label: 'Transactions' }, { label: 'Details' }];

    useEffect(() => {
        showNavigationDrawer(true);
        showSubNavigation(false);
        setBreadcrumbs(breadcrumbs);
        showSearchBar(false);
    }, []);

    const data = sampleData.find((e) => e._id === transactionId) as any;
    const events = [
        {
            createdAt: 1633711711619,
            _id: '49bc6765a7a42873bbf9775ce604fe7e66cbff69d05f7bd93d0286357772bbe2:A.f8d6e0586b0a20c7.HelloWorld.Greet',
            transactionId: '49bc6765a7a42873bbf9775ce604fe7e66cbff69d05f7bd93d0286357772bbe2',
            name: '49bc6765a7a42873bbf9775ce604fe7e66cbff69d05f7bd93d0286357772bbe2',
            type: 'A.f8d6e0586b0a20c7.HelloWorld.Greet',
            transactionIndex: 1,
            eventIndex: 0,
            value: 'A.f8d6e0586b0a20c7.HelloWorld.Greet',
            data: {
                x: 'Hello, World!',
            },
        },
    ];

    return (
        <div className={classes.root}>
            <DetailsCard
                Header={() => (
                    <>
                        <div>
                            <Label variant="large">TRANSACTION</Label>
                            <Value variant="large">{data._id}</Value>
                        </div>
                        <div>
                            <StatusCode statusCode={data.status.statusCode} />
                        </div>
                    </>
                )}
                Footer={() => (
                    <>
                        <TimeAgo date={'2021-10-12T20:37:20.631Z'} />
                        <DateWithCalendar date={'2021-10-12T20:37:20.631Z'} />
                    </>
                )}
            >
                <div className={classes.firstLine}>
                    <Label variant="large">BLOCK ID</Label>
                    <Value variant="large">
                        <NavLink to={`/blocks/details/${data.referenceBlockId}`}>{data.referenceBlockId}</NavLink>
                    </Value>
                </div>
                <div className={classes.twoColumns}>
                    <Label variant="large">PROPOSER</Label>
                    <Value variant="large">
                        <NavLink to={`/accounts/details/${data.proposalKey.address}`}>
                            {data.proposalKey.address}
                        </NavLink>
                    </Value>
                    <Label variant="large" className={classes.inlineLabel}>
                        Sequence number:
                    </Label>
                    <Value variant="large" className={classes.inlineValue}>
                        {data.proposalKey.sequenceNumber}
                    </Value>
                </div>
                <div>
                    <Label variant="large">PAYER</Label>
                    <Value variant="large">
                        <NavLink to={`/accounts/details/${data.payer}`}>{data.payer}</NavLink>
                    </Value>
                </div>
                <div>
                    <Label variant="large" className={classes.authorizersLabel}>
                        AUTHORIZERS
                    </Label>
                    <Value variant="large">
                        {data.authorizers.map((address: string) => (
                            <NavLink key={address} className={classes.authorizersAddress} to={`/accounts/${address}`}>
                                {address}
                            </NavLink>
                        ))}
                    </Value>
                </div>
            </DetailsCard>
            <DetailsTabs>
                <DetailsTabItem label="SCRIPT" value="<>">
                    <ContentDetailsScript script={data.script} args={data.args} />
                </DetailsTabItem>
                <DetailsTabItem label="GAS LIMIT" value={9000} />
                <DetailsTabItem label="PAYLOAD SIGNATURES" value={data.payloadSignatures?.length || 0}>
                    {data.payloadSignatures &&
                        data.payloadSignatures.map((item: any, i: number) => (
                            <Card key={i} className={classes.listCard}>
                                <div>
                                    <Label className={classes.label}>ACCOUNT ADDRESS</Label>
                                    <Value>
                                        <NavLink to={`/accounts/details/${item.address}`}>{item.address}</NavLink>
                                    </Value>
                                </div>
                                <div>
                                    <Label className={classes.label}>SIGNATURE</Label>
                                    <Value>
                                        <Ellipsis className={classes.hash}>{item.signature}</Ellipsis>
                                    </Value>
                                </div>
                                <div>
                                    <Label className={classes.label}>KEY ID</Label>
                                    <Value>{item.keyId}</Value>
                                </div>
                                <div></div>
                            </Card>
                        ))}
                </DetailsTabItem>
                <DetailsTabItem label="ENVELOPE SIGNATURES" value={data.envelopeSignatures?.length || 0}>
                    {data.envelopeSignatures &&
                        data.envelopeSignatures.map((item: any, i: number) => (
                            <Card key={i} className={classes.listCard}>
                                <div>
                                    <Label className={classes.label}>ACCOUNT ADDRESS</Label>
                                    <Value>
                                        <NavLink to={`/accounts/details/${item.address}`}>{item.address}</NavLink>
                                    </Value>
                                </div>
                                <div>
                                    <Label className={classes.label}>SIGNATURE</Label>
                                    <Value>
                                        <Ellipsis className={classes.hash}>{item.signature}</Ellipsis>
                                    </Value>
                                </div>
                                <div>
                                    <Label className={classes.label}>KEY ID</Label>
                                    <Value>{item.keyId}</Value>
                                </div>
                                <div></div>
                            </Card>
                        ))}
                </DetailsTabItem>
                <DetailsTabItem label="EVENTS" value={data.status.eventsCount}>
                    {events && <EventDetailsTable className={classes.detailsTable} items={events} />}
                </DetailsTabItem>
            </DetailsTabs>
        </div>
    );
};

export default Details;
