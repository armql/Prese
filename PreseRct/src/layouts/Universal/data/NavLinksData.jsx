let pageNumber = 1;

const navLinks = {
    guestLinks: [
        { to: '/home', text: 'Home' },
        { to: '/aboutus', text: 'About' },
        { to: '/ourlocations', text: 'Our Locations' },
        { to: '/login', text: 'Login' },
        { to: '/signup', text: 'Signup' },
    ],
    customerLinks: [
        { to: '/app', text: 'Home' },
        { to: 'aboutus', text: 'About' },
        { to: 'ourlocations', text: 'Our Locations' },
        { to: `orderhistory/orders?page=${pageNumber}`, text: 'Order History' },
        { to: 'order', text: 'Order' },
        { to: '/logout', text: 'Log out' },
    ],
    employeeLinks: [
        { to: '/workspace', text: 'Dashboard' },
        { to: `manageorders/orders?page=${pageNumber}`, text: 'Manage Orders' },
        { to: '/logout', text: 'Log out' },
    ],
    driverLinks: [
        { to: `dashboard/orders?page=${pageNumber}`, text: 'Dashboard' },
        { to: '/logout', text: 'Log out' },
    ],
    managerLinks: [
        { to: '/management', text: 'Dashboard' },
        { to: 'userlist', text: 'User List' },
        { to: 'productlist', text: 'Product List' },
        { to: `categorylist/category?page=${pageNumber}`, text: 'Category List' },
        { to: 'orderlist', text: 'Order List' },
        { to: '/logout', text: 'Log out' },
    ]
};

export default navLinks;
