import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="bg-cover h-screen flex flex-col justify-center items-center text-center" style={{ backgroundImage: "url('/static/images/background.png')"}}>
      <h2 className="text-5xl">404</h2>
      <h2 className="text m-3">Whoops, wrong page. Please leave before Mr. Goose finds out!</h2>
      <Link className="underline" href="/">Return Home</Link>
    </div>
  )
}