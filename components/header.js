import ActiveLink from './ActiveLink'

export default function Header() {
  return (
    <header>
      <div>
        <nav>
          <ul>
            <li>
              <ActiveLink href='/'>
                Profile
              </ActiveLink>
            </li>
            <li>
              <ActiveLink href="/dashboard">
                Dashboard
              </ActiveLink>
            </li>
            <li>
              <ActiveLink href="/reports">
                Reports
              </ActiveLink>
            </li>
            <li>
              <ActiveLink href="/settings">
                Settings
              </ActiveLink>
            </li>
            <li>
              <ActiveLink href="/about">
                Mock data
              </ActiveLink>
            </li>
            <li>
              {/* TODO: this logout button does not work */}
              <ActiveLink href="/Logout">
                Logout
              </ActiveLink>
            </li>
          </ul>
        </nav>

      </div>
    </header>
  )
}
