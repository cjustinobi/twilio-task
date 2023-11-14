
import { ethers } from 'ethers'
import EventHub from '../artifacts/contracts/EventHub.sol/EventHub.json'
import { platformFee } from './helpers';

const contractABI = EventHub.abi

const contractAddress = '0xD041B2854D9F2F856AAdB77255C66cd09957c95C'

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
  imagePath: string,
  phone: string
  ) => {
  
  const contract = await contractInstance(provider)
  const tx = await contract.createNewEvent(
    title,
    // description,
    eventTimestamp,
    ethers.utils.parseUnits(deposit, "ether"),
    maxCapacity,
    imagePath,
    phone,
    {value: ethers.utils.parseUnits(deposit, "ether")}
  )
  if (tx) {
    const result = await tx.wait()
    return result
  }
}

export const createNewRSVP = async (
  provider: ethers.Signer | ethers.providers.Provider | undefined,
  eventId: number,
  deposit: string
  ) => {
  const contract = await contractInstance(provider)
  const tx = await contract.createNewRSVP(eventId, { value: deposit})
  if (tx) {
    return await tx.wait()
  }
}

export const confirmAllAttendees = async (
  provider: ethers.Signer | ethers.providers.Provider | undefined
  ) => {
  const contract = await contractInstance(provider)
  try {
    const tx = await contract.confirmAllAttendees()
    if (tx) {
      return await tx.wait()  
    }
  } catch (error) {
    console.log(error)
  }
}

export const getContractBalance = async (
  provider: ethers.Signer | ethers.providers.Provider | undefined
  ) => {
  const contract = await contractInstance(provider)
  return await contract.getContractBalance()
}