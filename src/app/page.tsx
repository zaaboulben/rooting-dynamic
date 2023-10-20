import Image from 'next/image'
import DynamicForm from './Components/Form'

export default function Home() {
  
  
  return (
    <main className="flex min-h-screen flex-col items-center content-center mt-10   p-3">
     
      <DynamicForm></DynamicForm>
    </main>
  )
}
