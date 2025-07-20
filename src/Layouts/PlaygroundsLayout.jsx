import { Outlet } from 'react-router-dom'

export default function PlaygroundsLayout() {
  return (
    <div>
      {/* Optional: a sidebar, breadcrumbs, or filter UI here */}
      <Outlet /> 
    </div>
  )
}