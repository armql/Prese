
const navLinks = {
    guestLinks: [
        { to: '/home', text: 'Home' },
        { to: '/aboutus', text: 'About' },
        { to: '/contactus', text: 'Contact' },
        { to: '/login', text: 'Login' },
        { to: '/signup', text: 'Signup' },
        { to: '/guest', text: 'Guest' },
    ],
    customerLinks: [
        { to: '/home', text: 'Home' },
        { to: '/aboutus', text: 'About' },
        { to: '/contactus', text: 'Contact' },
        { to: `/user`, text: `user` },
        { to: '/logout', text: 'Log out' },
    ],
    employeeLinks: [
        { to: '/home', text: 'Home' },
        { to: '/aboutus', text: 'About' },
        { to: '/contactus', text: 'Contact' },
        { to: `/user`, text: `employee` },
        { to: '/logout', text: 'Log out' },
    ],
    driverLinks: [
        { to: '/home', text: 'Home' },
        { to: '/aboutus', text: 'About' },
        { to: '/contactus', text: 'Contact' },
        { to: `/user`, text: `driver` },
        { to: '/logout', text: 'Log out' },
    ],
    managerLinks: [
        { to: 'default', text: 'Home' },
        { to: 'aboutus', text: 'About' },
        { to: 'contactus', text: 'Contact' },
        { to: 'userlist', text: 'User List' },
        { to: 'productlist', text: 'Product List' },
        { to: '/admin', text: `manager` },
        { to: '/logout', text: 'Log out' },
    ]
}

export default navLinks