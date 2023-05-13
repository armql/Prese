
const navLinks = {
    guestLinks: [
        { to: '/home', text: 'Home' },
        { to: '/aboutus', text: 'About' },
        { to: '/ourlocations', text: 'Our Locations' },
        { to: '/login', text: 'Login' },
        { to: '/signup', text: 'Signup' },
        { to: '/guest', text: 'Guest' },
    ],
    customerLinks: [
        { to: '/home', text: 'Home' },
        { to: '/aboutus', text: 'About' },
        { to: '/ourlocations', text: 'Our Locations' },
        { to: `/user`, text: `user` },
        { to: '/logout', text: 'Log out' },
    ],
    employeeLinks: [
        { to: '/home', text: 'Home' },
        { to: '/aboutus', text: 'About' },
        { to: '/ourlocations', text: 'Our Locations' },
        { to: `/user`, text: `employee` },
        { to: '/logout', text: 'Log out' },
    ],
    driverLinks: [
        { to: '/home', text: 'Home' },
        { to: '/aboutus', text: 'About' },
        { to: '/ourlocations', text: 'Our Locations' },
        { to: `/user`, text: `driver` },
        { to: '/logout', text: 'Log out' },
    ],
    managerLinks: [
        { to: 'dashboard', text: 'Dashboard' },
        { to: 'ourlocations', text: 'Our Locations' },
        { to: 'userlist', text: 'User List' },
        { to: 'productlist', text: 'Product List' },
        { to: 'categorylist', text: 'Category List' },
        { to: '/admin', text: `manager` },
        { to: '/logout', text: 'Log out' },
    ]
}

export default navLinks