
import { useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers'
import { confirmAllAttendees, getContractBalance, getEvents, contractInstance } from '../utils';
import EventCard from '@/components/EventCard';
import { ModalContext } from '@/contexts/ModalContext'

const ContractInteraction = () => {

  const [events, setEvents] = useState([]);
  const { eventCreated } = useContext(ModalContext)

const getContractBalanceHandler = async () => {
   if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const res = await getContractBalance(provider.getSigner())
    console.log(res)
  } else {
    console.log('Install Metamask to continue')
  }
}

const confirm = async () => {
   if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const res = await confirmAllAttendees(provider.getSigner())
    console.log(res)
  } else {
    console.log('Install Metamask to continue')
  }
}


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

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
   const contract =  contractInstance(provider)

    const sendSMS = async (phones: any) => {
      console.log('the phones ', phones)
       // Use fetch to call your Next.js API route
      const response = await fetch('/api/twilio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          body: 'Your SMS body here',
          to: phones[0], // Assuming you want to send to the first phone number in the array
        }),
      });

      const data = await response.json();
      console.log('SMS API response:', data)
      
    };

    // Listen for the PhonesReturned event
    contract.on('Phones', sendSMS);

    // Remove the listener when the component is unmounted
    return () => {
      contract.off('Phones', sendSMS);
    };
  }, []);

  return (
  <div className="bg-black-1 px-4 py-12 md:py-20 mx-auto md:px-10 lg:px-16 xl:px-24">
    <div className='container flex flex-col items-center justify-center px-4 py-5 mx-auto md:px-10 lg:px-16 xl:px-24'>
      <p className="text-4xl md:text-6xl xl:text-8xl py-2 text-white font-bold leading-tight text-center font-ClashDisplay">
        <span className="bg-clip-text text-transparent bg-gradient-to-b from-red-1 to-gold-1">Event</span>
        <span className='bg-clip-text text-transparent bg-gradient-to-b from-blue-1 to-green-1'>Hub</span>
      </p>
      <p className="text-lg my-4 md:px-[48px] lg:px-40 font-light leading-normal text-center text-white">
        Organizing events does not need to be hard
      </p>
    </div>
    <p onClick={confirm}>Get EVents</p>
    

<div className="flex flex-wrap mx-4">
{events && events.map(event => (
      <EventCard
        key={event.id}
        id={event.id}
        title={event.title}
        confirmedRSVPs={event.confirmedRSVPs}
        deposit={event.deposit.toString()}
        owner={event.owner}
        imagePath={event.imagePath}
        maxCapacity={event.maxCapacity}
        startTime={event.eventTimestamp.toString()}

        // getTransactionsHandler={getTransactionsHandler}
            />
    ))}
  
</div>

  </div>


  );
};

export default ContractInteraction;
