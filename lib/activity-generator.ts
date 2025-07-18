import type { ActivityItem } from "@/components/activity-popup"

const users = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Heidi", "Ivan", "Judy"]

const activities: ActivityItem[] = [
  {
    type: "payout",
    user: "Just now, {user} received a payout!",
    amount: "0.005 ETH",
    message: "received a payout of {amount}!",
  },
  {
    type: "signup",
    user: "Welcome, {user}!",
    message: "just joined PulseCloud!",
  },
  {
    type: "mining",
    user: "Great job, {user}!",
    amount: "0.0001 ETH",
    message: "mined {amount} in the last hour!",
  },
]

export function generateRandomActivity(): ActivityItem {
  const randomUser = users[Math.floor(Math.random() * users.length)]
  const randomActivityTemplate = activities[Math.floor(Math.random() * activities.length)]

  let message = randomActivityTemplate.message.replace("{user}", randomUser)
  if (randomActivityTemplate.amount) {
    message = message.replace("{amount}", randomActivityTemplate.amount)
  }

  return {
    type: randomActivityTemplate.type,
    user: randomUser,
    amount: randomActivityTemplate.amount,
    message: message,
  }
}
