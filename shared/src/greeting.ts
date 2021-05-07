export function getGreeting(variant: number) {
  switch (variant) {
    case 1: return "Hi! 👋"
    case 2: return "Greetings!"

    default:
    case 0: return "Hello"
  }
}