
import { ethers } from 'ethers'
import EventHub from '../EventHub.json'

const contractABI = EventHub.abi

const contractAddress = '0x8Afc582d8F7ab08Df7295386C4a039E15e93C9f1';

export const contractInstance = (provider: ethers.Signer | ethers.providers.Provider | undefined) => {
  return new ethers.Contract(contractAddress, contractABI, provider);
}

export const getEvents = async (provider: ethers.Signer | ethers.providers.Provider | undefined) => {
  try {
    const contract = await contractInstance(provider)

    const eventCount = await contract.getEventLength()

    let events = []

    for (let i = 0; i < eventCount; i++) {
      const eventData = await contract.getEvent(i)
      console.log(eventData[3])
      const event = {
        id: i,
        title: eventData[0],
        description: eventData[1],
        imagePath: eventData[2],
        owner: eventData[3],
        eventTimestamp: eventData[4],
        maxCapacity: eventData[5],
        deposit: eventData[6],
      }
      events.push(event)
    }
    console.log(events)
    return events

  } catch (e) {
    console.log(e)
  }
}

export const createEvent = async (
  provider: ethers.Signer | ethers.providers.Provider | undefined,
  title: string,
  description: string,
  eventTimestamp: number | undefined,
  deposit: number,
  maxCapacity: number,
  imagePath: string
  ) => {
  const contract = await contractInstance(provider)
  return await contract.createNewEvent(
    title,
    description,
    eventTimestamp,
    deposit,
    maxCapacity,
    imagePath
  )
}

