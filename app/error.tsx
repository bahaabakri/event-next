// app/events/error.tsx
"use client"

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-4 text-red-600">
      <p>Something went wrong: {error.message}</p>
      <button onClick={() => reset()} className="mt-2 px-3 py-1 bg-red-500 text-white rounded">
        Try again
      </button>
    </div>
  )
}
