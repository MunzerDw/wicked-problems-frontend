import TopMenu from './TopMenu'

function Page({ className, children }) {
  console.log('Page')
  return (
    <div className="h-screen w-screen overflow-hidden">
      <TopMenu />
      <div className="h-full w-full p-6 overflow-y-auto dark:bg-gray-800">
        <div className={className}>{children}</div>
      </div>
    </div>
  )
}
export default Page
