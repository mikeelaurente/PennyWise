import { NavLink, Outlet } from 'react-router-dom';

function AppLayout() {
  return (
    <div>
      <header>
        <h1>PennyWise</h1>
      </header>

      <aside>
        <nav>
          <NavLink to="/app" end>
            Dashboard
          </NavLink>
          <NavLink
            to="/app/accounts"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Accounts
          </NavLink>
        </nav>
      </aside>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
