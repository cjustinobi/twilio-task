
import { useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers'
import { getEvents } from '../utils';
import EventCard from '@/components/EventCard';
import { ModalContext } from '@/contexts/ModalContext';

const ContractInteraction = () => {

  const [events, setEvents] = useState([]);
  const { eventCreated } = useContext(ModalContext)

const getEventHandler = async () => {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const eventList = await getEvents(provider)
    setEvents(eventList);
  } else {
    console.log('Install Metamask to continue')
  }
}

useEffect(() => {
    getEventHandler();
  }, [eventCreated]);

  return (
  <div className="bg-black-1 flex flex-col items-center justify-center px-4 py-12 md:py-20 mx-auto md:px-10 lg:px-16 xl:px-24">
    <div className='container flex flex-col items-center justify-center px-4 py-5 mx-auto md:px-10 lg:px-16 xl:px-24'>
      <p className="text-4xl md:text-6xl xl:text-8xl py-2 text-white font-bold leading-tight text-center font-ClashDisplay">
        <span className="bg-clip-text text-transparent bg-gradient-to-b from-red-1 to-gold-1">Event</span>
        <span className='bg-clip-text text-transparent bg-gradient-to-b from-blue-1 to-green-1'>Hub</span>
      </p>
      <p className="text-lg my-4 md:px-[48px] lg:px-40 font-light leading-normal text-center text-white">
        Organizing events does not need to be hard
      </p>
    </div>
    <p onClick={getEventHandler}>Get EVents</p>
    {events && events.map(event => (
//       deposit
// : 
// BigNumber {_hex: '0x0b', _isBigNumber: true}
// eventDataCID
// : 
// "66"
// eventOwner
// : 
// "0x6ad513fDA973Bf1FC24c04256D686CbE05d714c7"
// eventTimestamp
// : 
// BigNumber {_hex: '0x22c3', _isBigNumber: true}
// maxCapacity
// : 
// BigNumber {_hex: '0x21', _isBigNumber: true}
      <EventCard
              key={event.id}
              id={event.id}
              deposit={event.deposit}
              owner={event.eventOwner}
              maxCapacity={event.maxCapacity}
              startTime={event.eventTimestamp.toString()}

              // getTransactionsHandler={getTransactionsHandler}
            />
    ))}
  </div>
  );
};

export default ContractInteraction;
