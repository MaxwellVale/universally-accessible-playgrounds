import { Outlet, Link } from 'react-router-dom'
import { playgrounds } from '../data/playgroundData.js'

playgrounds.sort((a, b) => {
  return a.name.localeCompare(b.name);
});
console.log(playgrounds);

export default function PlaygroundsLayout() {
  return (
    <>
      {/* Sidebar area */}
      <aside className='sidebar'>
          <h3 className='sidebar-heading'>Playgrounds</h3>
          <ul className='sidebar-content'>
          {playgrounds.map(p => (
              <li key={p.id}>
              <Link to={`/playgrounds/${p.id}`}>{p.name}</Link>
              </li>
          ))}
          </ul>
      </aside>

      {/* Main Content Area */}
      <div className='playgrounds-main'>
          <Outlet />
      </div>
    </>
  )
}