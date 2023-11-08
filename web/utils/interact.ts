
import { ethers } from 'ethers'
import { useQuery } from 'react-query';
import EventHub from '../EventHub.json'

const contractABI = EventHub.abi

// const provider = new ethers.JsonRpcProvider(sepoliaConfig.network);
const contractAddress = '0xC8eE1722255964a43B9Fb7547b9189a5e9d13317';

export const contractInstance = (provider: ethers.Signer | ethers.providers.Provider | undefined) => {
  // const provider = new ethers.providers.Web3Provider(window.ethereum);
  return new ethers.Contract(contractAddress, contractABI, provider);
}

export const getEvents = async (provider: ethers.Signer | ethers.providers.Provider | undefined) => {
  try {
    const contract = await contractInstance(provider)

    const eventCount = await contract.getEventLength()

    let events = []

    for (let i = 0; i < eventCount; i++) {
      const eventData = await contract.getEvent(i)
      const event = {
        id: i,
        eventDataCID: eventData[0],
        eventOwner: eventData[1],
        eventTimestamp: eventData[2],
        maxCapacity: eventData[3],
        deposit: eventData[4],
        eventId: eventData[5],
      }
      events.push(event)
    }
    console.log(events)
    return events

  } catch (e) {
    console.log(e)
  }
}

const getContractData = async (contract, methodName, args) => {
  const contractFunction = contract[methodName];
  const result = await contractFunction(...args);
  return result;
};

export const useContractQuery = async (provider, methodName, args) => {
  const contract = await contractInstance(provider)
  return useQuery(['contractData', methodName, args], () =>
    getContractData(contract, methodName, args)
  );
}
