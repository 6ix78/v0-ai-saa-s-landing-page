export interface ActivityItem {
  id: string
  user: string
  message: string
  type: "withdraw" | "deposit" | "claim"
  timestamp: Date
}

const randomNames = [
  "Alice",
  "Bob",
  "Charlie",
  "Diana",
  "Eve",
  "Frank",
  "Grace",
  "Heidi",
  "Ivan",
  "Judy",
  "Liam",
  "Olivia",
  "Noah",
  "Emma",
  "Jackson",
  "Ava",
  "Lucas",
  "Sophia",
  "Aiden",
  "Isabella",
]

const actualUsernames = [
  "CryptoKing",
  "MinerPro",
  "ETHMaster",
  "HashHunter",
  "BlockBoss",
  "CoinCollector",
  "DigitalGold",
  "ChainLinker",
  "DecentralizedDev",
  "TokenTitan",
]

const generateRandomActivity = (): ActivityItem => {
  const type = ["withdraw", "deposit", "claim"][Math.floor(Math.random() * 3)] as ActivityItem["type"]
  const isActualUser = Math.random() > 0.5 // 50% chance of being an actual username
  const user = isActualUser
    ? actualUsernames[Math.floor(Math.random() * actualUsernames.length)]
    : randomNames[Math.floor(Math.random() * randomNames.length)]

  let message: string
  const amount = (Math.random() * 500 + 10).toFixed(2) // Random amount between 10 and 510

  switch (type) {
    case "withdraw":
      message = `withdrew $${amount}`
      break
    case "deposit":
      message = `deposited $${amount}`
      break
    case "claim":
      const ethAmount = (Math.random() * 0.1 + 0.001).toFixed(4) // Random ETH amount
      message = `claimed ${ethAmount} ETH from mining pool`
      break
  }

  return {
    id: Math.random().toString(36).substring(2, 15),
    user,
    message,
    type,
    timestamp: new Date(),
  }
}

export const activityGenerator = {
  generate: generateRandomActivity,
}
