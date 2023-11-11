
import { ethers } from 'ethers'
import EventHub from '../artifacts/contracts/EventHub.sol/EventHub.json'

const contractABI = EventHub.abi

const contractAddress = '0xCc4F012E4D9D198e1Aa3cb8ccF718353af8D2d69';

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
      console.log(eventData)
      const event = {
        id: i,
        title: eventData[0],
        // description: eventData[1],
        imagePath: eventData[1],
        owner: eventData[2],
        eventTimestamp: eventData[3],
        maxCapacity: eventData[4],
        deposit: eventData[5],
        confirmedRSVPs: eventData[6],
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
  deposit: string,
  maxCapacity: number,
  imagePath: string
  ) => {
  const contract = await contractInstance(provider)
  return await contract.createNewEvent(
    title,
    description,
    eventTimestamp,
    ethers.utils.parseUnits(deposit, "ether"),
    maxCapacity,
    imagePath
  )
}

export const createNewRSVP = async (
  provider: ethers.Signer | ethers.providers.Provider | undefined,
  eventId: number,
  deposit: string
  ) => {
  const contract = await contractInstance(provider)
  return await contract.createNewRSVP(eventId, { value: deposit})
}

export const confirmAllAttendees = async (
  provider: ethers.Signer | ethers.providers.Provider | undefined,
  eventId: number
  ) => {
  const contract = await contractInstance(provider)
  return await contract.confirmAllAttendees(eventId)
}